/**
 * UNIDAR – Contracts API
 * All contract operations via /api/contracts/[action]
 * Supported actions: generate, sign, status, update-status, user-contracts,
 *   download, calculate-payment, process-payment, payment-status,
 *   terminate, request-termination, get-termination-requests,
 *   approve-termination, reject-termination, check-expired
 */
import { query, rawPool } from '../../../lib/db';
import { requireAuth }    from '../../../lib/auth';
import fs                 from 'fs';
import path               from 'path';
import { put as blobPut } from '@vercel/blob';

export default async function handler(req, res) {
  const user = requireAuth(req, res);
  if (!user) return;

  const { action } = req.query;

  try {
    switch (action) {
      case 'generate':             return await handleGenerate(req, res, user);
      case 'sign':                 return await handleSign(req, res, user);
      case 'status':               return await handleStatus(req, res, user);
      case 'update-status':        return await handleUpdateStatus(req, res, user);
      case 'user-contracts':       return await handleUserContracts(req, res, user);
      case 'download':             return await handleDownload(req, res, user);
      case 'calculate-payment':    return await handleCalculatePayment(req, res, user);
      case 'process-payment':      return await handleProcessPayment(req, res, user);
      case 'payment-status':       return await handlePaymentStatus(req, res, user);
      case 'terminate':            return await handleTerminate(req, res, user);
      case 'request-termination':  return await handleRequestTermination(req, res, user);
      case 'get-termination-requests': return await handleGetTerminationRequests(req, res, user);
      case 'approve-termination':  return await handleApproveTermination(req, res, user);
      case 'reject-termination':   return await handleRejectTermination(req, res, user);
      case 'check-expired':        return await handleCheckExpired(req, res, user);
      default:
        return res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } catch (err) {
    console.error('Contracts error:', err);
    return res.status(500).json({ success: false, error: 'Server error: ' + err.message });
  }
}

// ── Generate contract ────────────────────────────────────────────────────────
async function handleGenerate(req, res, user) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  if (user.role !== 'student') return res.status(403).json({ success: false, error: 'Students only' });

  const { listing_id, start_date, duration = 12 } = req.body;
  if (!listing_id) return res.status(400).json({ success: false, error: 'listing_id required' });

  // Get listing
  const listings = await query(`
    SELECT l.*, u.full_name as owner_name, u.email as owner_email, u.phone as owner_phone, u.id as owner_id
    FROM listings l JOIN users u ON l.owner_id = u.id WHERE l.id = ?
  `, [listing_id]);
  if (!listings.length) return res.status(404).json({ success: false, error: 'Listing not found' });
  const listing = listings[0];

  // Get student info
  const students = await query('SELECT * FROM users WHERE id = ?', [user.id]);
  const student  = students[0];

  // Check for existing active contract for this student+listing
  const existing = await query(`
    SELECT id FROM contracts WHERE listing_id = ? AND student_id = ?
    AND status NOT IN ('expired','terminated','rejected')
  `, [listing_id, user.id]);
  if (existing.length) return res.status(409).json({ success: false, error: 'Contract already exists for this listing' });

  const startDate = start_date ? new Date(start_date) : new Date();
  const endDate   = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + parseInt(duration));
  const toMysql = d => d.toISOString().slice(0, 10);

  // Some DB schemas require a unique contract_number (legacy PHP compatibility).
  // Generate a unique, deterministic-enough number before INSERT to avoid duplicate '' defaults.
  const contractNumber = `CN-${listing_id}-${user.id}-${Date.now()}`;

  // Insert contract — use 'draft' (valid ENUM value; 'pending' not in schema ENUM)
  // contract_template_id defaults to 0 / contract_content filled via UPDATE below
  const result = await query(`
    INSERT INTO contracts (contract_number, listing_id, student_id, owner_id, start_date, end_date, monthly_rent, status, contract_template_id, contract_content)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'draft', 0, '')
  `, [contractNumber, listing_id, user.id, listing.owner_id, toMysql(startDate), toMysql(endDate), listing.price]);

  const contractId = result.insertId;

  // Generate contract content text
  const content = generateContractText({ listing, student, startDate, endDate, contractId, duration });

  await query('UPDATE contracts SET contract_content = ? WHERE id = ?', [content, contractId]);

  return res.json({
    success:     true,
    contract_id: contractId,
    contract:    { id: contractId, status: 'draft', content, start_date: toMysql(startDate), end_date: toMysql(endDate), monthly_rent: listing.price }
  });
}

// ── Sign contract ────────────────────────────────────────────────────────────
async function handleSign(req, res, user) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { contract_id, signature } = req.body;
  if (!contract_id || !signature) return res.status(400).json({ success: false, error: 'Contract and signature required' });

  const sigData = signature.replace('data:image/png;base64,', '').replace(/ /g, '+');
  const decoded = Buffer.from(sigData, 'base64');
  if (!decoded.length) return res.status(400).json({ success: false, error: 'Invalid signature data' });

  const sigName = `signatures/student_${contract_id}_${Date.now()}.png`;
  let sigPath;

  // On Vercel the filesystem is read-only — upload to Blob storage
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await blobPut(sigName, decoded, { access: 'public', contentType: 'image/png' });
      sigPath = blob.url;
    } catch (e) {
      return res.status(500).json({ success: false, error: 'Signature upload failed: ' + e.message });
    }
  } else {
    // Local dev: write to /tmp then copy to public/uploads/signatures
    const tmpPath = path.join('/tmp', `sig_${contract_id}_${Date.now()}.png`);
    fs.writeFileSync(tmpPath, decoded);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'signatures');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const localName = `student_${contract_id}_${Date.now()}.png`;
    fs.copyFileSync(tmpPath, path.join(uploadDir, localName));
    sigPath = 'uploads/signatures/' + localName;
  }

  const result = await query(
    "UPDATE contracts SET student_signature_path = ?, status = 'signed_by_student' WHERE id = ? AND student_id = ?",
    [sigPath, contract_id, user.id]
  );

  if (!result.affectedRows) return res.status(404).json({ success: false, error: 'Contract not found or access denied' });

  return res.json({ success: true, message: 'Contract signed successfully' });
}

// ── Contract status ──────────────────────────────────────────────────────────
async function handleStatus(req, res, user) {
  const id = req.query.contract_id;
  if (!id) return res.status(400).json({ success: false, error: 'contract_id required' });

  const rows = await query(`
    SELECT c.*, l.title as listing_title, l.address, l.price,
           s.full_name as student_name, s.email as student_email,
           o.full_name as owner_name, o.email as owner_email,
           l.owner_signature_path
    FROM contracts c
    JOIN listings l ON c.listing_id = l.id
    JOIN users s ON c.student_id = s.id
    JOIN users o ON c.owner_id = o.id
    WHERE c.id = ?
  `, [id]);

  if (!rows.length) return res.status(404).json({ success: false, error: 'Contract not found' });
  const contract = rows[0];

  // Access check
  if (user.role !== 'admin' && contract.student_id !== user.id && contract.owner_id !== user.id) {
    return res.status(403).json({ success: false, error: 'Access denied' });
  }

  return res.json({ success: true, contract });
}

// ── Update status ────────────────────────────────────────────────────────────
async function handleUpdateStatus(req, res, user) {
  if (req.method !== 'PUT') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const { contract_id, status } = req.body;
  if (!contract_id || !status) return res.status(400).json({ success: false, error: 'contract_id and status required' });
  await query('UPDATE contracts SET status = ? WHERE id = ?', [status, contract_id]);
  return res.json({ success: true });
}

// ── User contracts ───────────────────────────────────────────────────────────
async function handleUserContracts(req, res, user) {
  let sql, params;

  if (user.role === 'student') {
    sql = `SELECT c.*, l.title as listing_title, l.address, l.price,
                  o.full_name as owner_name, o.email as owner_email
           FROM contracts c
           JOIN listings l ON c.listing_id = l.id
           JOIN users o ON c.owner_id = o.id
           WHERE c.student_id = ? ORDER BY c.created_at DESC`;
    params = [user.id];
  } else if (user.role === 'owner') {
    sql = `SELECT c.*, l.title as listing_title, l.address, l.price,
                  s.full_name as student_name, s.email as student_email
           FROM contracts c
           JOIN listings l ON c.listing_id = l.id
           JOIN users s ON c.student_id = s.id
           WHERE c.owner_id = ? ORDER BY c.created_at DESC`;
    params = [user.id];
  } else {
    // admin
    sql = `SELECT c.*, l.title as listing_title,
                  s.full_name as student_name, o.full_name as owner_name
           FROM contracts c
           JOIN listings l ON c.listing_id = l.id
           JOIN users s ON c.student_id = s.id
           JOIN users o ON c.owner_id = o.id
           ORDER BY c.created_at DESC LIMIT 200`;
    params = [];
  }

  const contracts = await query(sql, params);
  return res.json({ success: true, contracts });
}

// ── Download contract ────────────────────────────────────────────────────────
async function handleDownload(req, res, user) {
  const id = req.query.contract_id;
  if (!id) return res.status(400).json({ success: false, error: 'contract_id required' });

  const rows = await query('SELECT * FROM contracts WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ success: false, error: 'Contract not found' });
  const c = rows[0];

  if (user.role !== 'admin' && c.student_id !== user.id && c.owner_id !== user.id) {
    return res.status(403).json({ success: false, error: 'Access denied' });
  }

  const html = generateContractHTML(c.contract_content || '', c);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', `inline; filename="contract_${id}.html"`);
  return res.send(html);
}

// ── Calculate payment ────────────────────────────────────────────────────────
async function handleCalculatePayment(req, res, user) {
  const { listing_id } = req.query;
  if (!listing_id) return res.status(400).json({ success: false, error: 'listing_id required' });

  const rows = await query('SELECT price FROM listings WHERE id = ?', [listing_id]);
  if (!rows.length) return res.status(404).json({ success: false, error: 'Listing not found' });

  const rent    = parseFloat(rows[0].price);
  const deposit = rent * 2;
  const fee     = rent * 0.05;

  return res.json({ success: true, monthly_rent: rent, deposit, platform_fee: fee, total_due: deposit + fee });
}

// ── Process payment ──────────────────────────────────────────────────────────
async function handleProcessPayment(req, res, user) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const { contract_id, payment_method = 'card' } = req.body;
  if (!contract_id) return res.status(400).json({ success: false, error: 'contract_id required' });

  const rows = await query('SELECT * FROM contracts WHERE id = ?', [contract_id]);
  if (!rows.length) return res.status(404).json({ success: false, error: 'Contract not found' });

  // Simulate payment success – insert payment record
  const result = await query(`
    INSERT INTO payments (contract_id, user_id, amount, payment_method, status)
    VALUES (?, ?, ?, ?, 'completed')
  `, [contract_id, user.id, rows[0].monthly_rent, payment_method]).catch(() => ({ insertId: null }));

  await query("UPDATE contracts SET status = 'paid' WHERE id = ?", [contract_id]);

  return res.json({ success: true, payment_id: result.insertId, status: 'completed' });
}

// ── Payment status ───────────────────────────────────────────────────────────
async function handlePaymentStatus(req, res, user) {
  const { payment_id } = req.query;
  const rows = await query('SELECT * FROM payments WHERE id = ?', [payment_id]).catch(() => []);
  return res.json({ success: true, payment: rows[0] || null });
}

// ── Terminate (owner direct) ─────────────────────────────────────────────────
async function handleTerminate(req, res, user) {
  if (user.role !== 'owner' && user.role !== 'admin') return res.status(403).json({ success: false, error: 'Owners/admin only' });
  const { contract_id, reason = '' } = req.body;
  if (!contract_id) return res.status(400).json({ success: false, error: 'contract_id required' });

  const rows = await query('SELECT owner_id, listing_id FROM contracts WHERE id = ?', [contract_id]);
  if (!rows.length) return res.status(404).json({ success: false, error: 'Contract not found' });
  if (user.role !== 'admin' && rows[0].owner_id !== user.id) return res.status(403).json({ success: false, error: 'Not authorized' });

  await query("UPDATE contracts SET status = 'terminated', termination_reason = ? WHERE id = ?", [reason, contract_id]);
  // Release listing back to available if no other active contracts
  await releaseListingIfFree(rows[0].listing_id);
  return res.json({ success: true });
}

// ── Request termination (student) ────────────────────────────────────────────
async function handleRequestTermination(req, res, user) {
  const { contract_id, reason = '' } = req.body;
  if (!contract_id) return res.status(400).json({ success: false, error: 'contract_id required' });

  await query(`INSERT INTO termination_requests (contract_id, requester_id, reason, status)
               VALUES (?, ?, ?, 'pending')
               ON DUPLICATE KEY UPDATE reason = VALUES(reason), status = 'pending'`,
               [contract_id, user.id, reason]).catch(async () => {
    // fallback if table doesn't exist yet – just update contract
    await query("UPDATE contracts SET status = 'termination_requested' WHERE id = ?", [contract_id]);
  });

  return res.json({ success: true });
}

// ── Get termination requests ─────────────────────────────────────────────────
async function handleGetTerminationRequests(req, res, user) {
  let sql, params;
  if (user.role === 'admin') {
    sql = `SELECT tr.*, c.listing_id, l.title as listing_title, u.full_name as requester_name
           FROM termination_requests tr
           JOIN contracts c ON tr.contract_id = c.id
           JOIN listings l ON c.listing_id = l.id
           JOIN users u ON tr.requester_id = u.id
           WHERE tr.status = 'pending' ORDER BY tr.created_at DESC`;
    params = [];
  } else {
    sql = `SELECT tr.*, c.listing_id, l.title as listing_title, u.full_name as requester_name
           FROM termination_requests tr
           JOIN contracts c ON tr.contract_id = c.id
           JOIN listings l ON c.listing_id = l.id
           JOIN users u ON tr.requester_id = u.id
           WHERE (c.owner_id = ? OR c.student_id = ?) AND tr.status = 'pending' 
           ORDER BY tr.created_at DESC`;
    params = [user.id, user.id];
  }
  
  const rows = await query(sql, params).catch(() => []);
  return res.json({ success: true, requests: rows });
}

// ── Approve/reject termination ───────────────────────────────────────────────
async function handleApproveTermination(req, res, user) {
  const { request_id } = req.body;
  if (!request_id) return res.status(400).json({ success: false, error: 'request_id required' });
  
  // Get contract_id first
  const requests = await query('SELECT contract_id FROM termination_requests WHERE id = ?', [request_id]);
  if (!requests.length) return res.status(404).json({ success: false, error: 'Request not found' });
  const { contract_id } = requests[0];

  // Update request
  await query("UPDATE termination_requests SET status = 'approved' WHERE id = ?", [request_id]);
  // Update contract
  await query("UPDATE contracts SET status = 'terminated' WHERE id = ?", [contract_id]);
  // Release listing back to available
  const cRows = await query('SELECT listing_id FROM contracts WHERE id = ?', [contract_id]).catch(() => []);
  if (cRows.length) await releaseListingIfFree(cRows[0].listing_id);

  // Log admin action if admin
  if (user.role === 'admin') {
     await query('INSERT INTO admin_actions (admin_id, action_type, notes) VALUES (?, ?, ?)',
                 [user.id, 'approve_termination', `Approved termination for contract ${contract_id}`]).catch(() => {});
  }

  return res.json({ success: true });
}

async function handleRejectTermination(req, res, user) {
  const { request_id } = req.body;
  if (!request_id) return res.status(400).json({ success: false, error: 'request_id required' });
  
  await query("UPDATE termination_requests SET status = 'rejected' WHERE id = ?", [request_id]);
  
  // If student requested it, reset contract status from 'termination_requested' back to 'active'/'paid'
  const requests = await query('SELECT contract_id FROM termination_requests WHERE id = ?', [request_id]);
  if (requests.length) {
     await query("UPDATE contracts SET status = 'active' WHERE id = ? AND status = 'termination_requested'", [requests[0].contract_id]);
  }

  return res.json({ success: true });
}

// ── Check expired ────────────────────────────────────────────────────────────
async function handleCheckExpired(req, res, user) {
  // Get listing_ids of contracts that are about to expire
  const toExpire = await query(`
    SELECT id, listing_id FROM contracts
    WHERE end_date < CURDATE()
    AND status IN ('active','paid','signed_by_both','signed_by_student','draft','pending','pending_signature')
  `).catch(() => []);

  if (toExpire.length) {
    const ids = toExpire.map(r => r.id);
    await query(`UPDATE contracts SET status = 'expired' WHERE id IN (${ids.map(() => '?').join(',')})`, ids);
    // Release listings for each expired contract
    const listingIds = [...new Set(toExpire.map(r => r.listing_id))];
    for (const lid of listingIds) {
      await releaseListingIfFree(lid);
    }
  }

  return res.json({ success: true, expired: toExpire.length });
}

// ── Helper: set listing back to active if no blocking contracts remain ────────
async function releaseListingIfFree(listingId) {
  if (!listingId) return;
  try {
    const blocking = await query(`
      SELECT id FROM contracts
      WHERE listing_id = ?
      AND status NOT IN ('expired','terminated','cancelled','rejected','draft')
    `, [listingId]);
    if (!blocking.length) {
      await query("UPDATE listings SET status = 'active' WHERE id = ?", [listingId]);
    }
  } catch (e) {
    console.error('releaseListingIfFree error:', e.message);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function generateContractText({ listing, student, startDate, endDate, contractId, duration }) {
  const fmt = d => d.toLocaleDateString('fr-FR');
  return `CONTRAT DE LOCATION RÉSIDENTIELLE

UNIDAR – Plateforme de Location Étudiante
Contrat N°: ${contractId}
Date: ${fmt(new Date())}

ENTRE LES SOUSSIGNÉS

LE PROPRIÉTAIRE:
Nom: ${listing.owner_name}
Email: ${listing.owner_email}
Téléphone: ${listing.owner_phone || 'N/A'}

LE LOCATAIRE (ÉTUDIANT):
Nom: ${student.full_name}
Email: ${student.email}
Téléphone: ${student.phone || 'N/A'}
Université: ${student.university || 'N/A'}

IL A ÉTÉ CONVENU CE QUI SUIT:

ARTICLE 1 – OBJET DU CONTRAT
Le présent contrat porte sur la location du logement situé à:
${listing.address}

ARTICLE 2 – DURÉE
Le présent contrat est conclu pour une durée de ${duration} mois,
du ${fmt(startDate)} au ${fmt(endDate)}.

ARTICLE 3 – LOYER
Le loyer mensuel est fixé à ${listing.price} TND/mois.
Le dépôt de garantie équivaut à 2 mois de loyer (${listing.price * 2} TND).

ARTICLE 4 – OBLIGATIONS DU LOCATAIRE
- Payer le loyer à la date convenue
- Entretenir le logement en bon état
- Ne pas sous-louer sans autorisation écrite
- Respecter le règlement intérieur de la résidence

ARTICLE 5 – OBLIGATIONS DU PROPRIÉTAIRE
- Assurer la jouissance paisible du logement
- Effectuer les réparations nécessaires
- Délivrer un logement en bon état

ARTICLE 6 – RÉSILIATION
Le contrat peut être résilié par l'une des parties avec un préavis d'un mois.

Fait en double exemplaire,

  `;
}

function generateContractHTML(textContent, contract) {
  const paragraphs = textContent.split('\n')
    .map(l => l.trim())
    .filter(l => l)
    .map(l => {
      if (/^(ARTICLE|CONTRAT|ENTRE LES|IL A ÉTÉ)/i.test(l)) return `<h3>${l}</h3>`;
      return `<p>${l}</p>`;
    }).join('');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Contrat de Location – UNIDAR</title>
  <style>
    body { font-family: "Times New Roman", serif; max-width: 21cm; margin: 0 auto; padding: 2cm; color: #000; }
    h1 { text-align:center; text-transform:uppercase; border-bottom: 3px solid #000; padding-bottom: 16px; }
    h3 { text-transform:uppercase; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 20px; }
    p  { text-align: justify; }
    .sig { display:flex; gap:40px; margin-top:60px; }
    .sig div { flex:1; border-top: 2px solid #000; padding-top:8px; text-align:center; }
    .print-btn { text-align:center; margin:20px 0; }
    @media print { .print-btn { display:none; } }
  </style>
</head>
<body>
  <h1>UNIDAR<br><small style="font-size:14pt;font-weight:normal">Contrat de Location Étudiante</small></h1>
  <div class="print-btn">
    <button onclick="window.print()" style="padding:10px 24px;background:#0070f3;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">
      🖨️ Imprimer / Enregistrer PDF
    </button>
  </div>
  ${paragraphs}
  <div class="sig">
    <div>
      <strong>Le Propriétaire</strong>
      ${contract.owner_signature_path ? `<br><img src="/${contract.owner_signature_path}" style="max-height:80px">` : ''}
    </div>
    <div>
      <strong>Le Locataire</strong>
      ${contract.student_signature_path ? `<br><img src="/${contract.student_signature_path}" style="max-height:80px">` : ''}
    </div>
  </div>
</body>
</html>`;
}

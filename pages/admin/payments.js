/**
 * UNIDAR – Admin Payments Record
 */
import Head from 'next/head';
import Script from 'next/script';

export default function AdminPaymentsPage() {
  return (
    <>
      <Head><title>Payments Ledger - UNIDAR</title></Head>
      <nav className="navbar black" style={{background:'#0f172a',color:'white'}}>
        <div className="nav-container">
          <a href="/" className="nav-logo" style={{color:'white'}}><span style={{color:'var(--color-brand)'}}>UNI</span>DAR</a>
          <div className="nav-links">
            <a href="/admin" className="nav-link" style={{color:'white'}}>Overview</a>
            <a href="/admin/payments" className="nav-link active" style={{color:'white'}}>Payments Ledger</a>
            <button id="logoutBtn" className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      <main className="section" style={{background:'#f1f5f9',minHeight:'calc(100vh - 70px)',padding:'40px 0'}}>
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
            <h1 style={{margin:0,fontSize:'2.5rem',fontWeight:800}}>Payments Ledger</h1>
            <div style={{display:'flex',gap:12}}>
               <button id="refreshBtn" className="btn btn-secondary btn-sm">🔄 Refresh</button>
               <select id="periodFilter" className="form-input" style={{width:150,padding:'4px 12px'}}>
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
               </select>
            </div>
          </div>

          <div className="card" style={{padding:24}}>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.9rem'}}>
                <thead style={{background:'#f8fafc',textAlign:'left'}}>
                  <tr>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Date</th>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Student / Payer</th>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Owner / Recipient</th>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Listing</th>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Total (TND)</th>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Comm. (5%)</th>
                    <th style={{padding:12,borderBottom:'2px solid #e2e8f0'}}>Status</th>
                  </tr>
                </thead>
                <tbody id="paymentTableBody">
                  <tr><td colSpan="7" style={{padding:40,textAlign:'center',color:'#94a3b8'}}>Loading payments…</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Script id="payments-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        const api = window.UNIDAR_API;

        async function loadPayments() {
          const period = document.getElementById('periodFilter').value;
          try {
            const data = await api.Admin.getPayments(period);
            const list = data.payments || [];
            document.getElementById('paymentTableBody').innerHTML = list.length ? list.map(p => {
              const statusBadge = p.status === 'completed' ? 'badge-success' : (p.status === 'failed' ? 'badge-error' : 'badge-warning');
              return '<tr style="border-bottom:1px solid #f1f5f9">' +
                '<td style="padding:16px">' +
                   '<div style="font-weight:600">' + new Date(p.created_at).toLocaleDateString() + '</div>' +
                   '<div style="font-size:0.7rem;color:#64748b">' + new Date(p.created_at).toLocaleTimeString() + '</div>' +
                '</td>' +
                '<td style="padding:16px">' +
                  '<div style="font-weight:600">' + p.student_name + '</div>' +
                  '<div style="font-size:0.75rem;color:#64748b">' + p.student_email + '</div>' +
                '</td>' +
                '<td style="padding:16px">' +
                  '<div style="font-weight:600">' + p.owner_name + '</div>' +
                  '<div style="font-size:0.75rem;color:#64748b">' + p.owner_email + '</div>' +
                '</td>' +
                '<td style="padding:16px;max-width:200px">' +
                  '<div class="text-truncate" title="' + (p.listing_title || 'N/A') + '">' + (p.listing_title || 'N/A') + '</div>' +
                '</td>' +
                '<td style="padding:16px;font-weight:800;font-size:1.1rem">' + p.amount + '</td>' +
                '<td style="padding:16px;color:#10b981;font-weight:700">' + p.commission + '</td>' +
                '<td style="padding:16px"><span class="badge ' + statusBadge + '">' + p.status + '</span></td>' +
              '</tr>';
            }).join('') : '<tr><td colspan="7" style="padding:60px;text-align:center;color:#94a3b8">No payments found for this period</td></tr>';
          } catch (e) {
            console.error('Payments load failed', e);
            document.getElementById('paymentTableBody').innerHTML = '<tr><td colspan="7" style="padding:40px;text-align:center;color:var(--color-error)">Failed to load payments.</td></tr>';
          }
        }

        async function init() {
           const auth = await api.Auth.check();
           if (!auth.authenticated || auth.user.role !== 'admin') { 
              window.location.href = '/login'; 
              return; 
           }
           loadPayments();
        }

        document.getElementById('periodFilter').addEventListener('change', loadPayments);
        document.getElementById('refreshBtn').addEventListener('click', loadPayments);
        document.getElementById('logoutBtn').addEventListener('click', async () => { 
          await api.Auth.logout(); 
          window.location.href = '/login'; 
        });

        init();
      ` }} />
    </>
  );
}

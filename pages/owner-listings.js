/**
 * UNIDAR – Owner Listings Page
 */
import Head from 'next/head';
import Script from 'next/script';

export default function OwnerListingsPage() {
  return (
    <>
      <Head><title>My Listings - UNIDAR</title></Head>
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <span style={{ color: 'var(--color-brand)' }}>UNI</span>DAR
          </a>
          <div className="nav-links">
            <a href="/messages" className="nav-link">Messages</a>
            <button id="logoutBtn" className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
            <div>
              <h1>My Listings</h1>
              <p className="text-muted" id="ownerName">Manage your properties</p>
            </div>
            <button id="createListingBtn" className="btn btn-primary">+ Add Listing</button>
          </div>

          {/* Contracts / Active Tenants */}
          <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-lg)' }}>Active Contracts</h2>
            <div id="contractsList"><p className="text-muted">Loading…</p></div>
          </div>

          {/* Listings grid */}
          <div id="listingsGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 'var(--space-xl)' }}>
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
              <p>Loading listings…</p>
            </div>
          </div>
        </div>
      </main>

      {/* Create listing modal */}
      <div id="createModal" style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        <div className="card" style={{ maxWidth: 600, width: '90%', margin: '40px auto', padding: 'var(--space-xl)', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
          <button id="closeCreateModal" style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
          <h2>Create New Listing</h2>
          <form id="createListingForm">
            {[
              { id: 'lTitle', label: 'Title', type: 'text', required: true },
              { id: 'lAddress', label: 'Address', type: 'text', required: true },
              { id: 'lPrice', label: 'Price (TND/month)', type: 'number', required: true },
              { id: 'lBedrooms', label: 'Bedrooms', type: 'number', required: true },
              { id: 'lBathrooms', label: 'Bathrooms', type: 'number', required: false },
              { id: 'lCapacity', label: 'Capacity (persons)', type: 'number', required: false },
            ].map(f => (
              <div key={f.id} className="form-group">
                <label className="form-label" htmlFor={f.id}>{f.label}</label>
                <input type={f.type} id={f.id} className="form-input" required={f.required} />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select id="lType" className="form-input">
                {['apartment', 'house', 'studio', 'room'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Gender Preference</label>
              <select id="lGender" className="form-input">
                <option value="any">Any</option>
                <option value="male">Male only</option>
                <option value="female">Female only</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea id="lDesc" className="form-input" rows={3}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Listing Images</label>
              <input type="file" id="lImages" className="form-input" multiple accept="image/*" />
              <p className="text-tiny text-muted mt-xs">You can select multiple images</p>
            </div>
            <div id="createError" className="alert alert-error" style={{ display: 'none' }}></div>
            <div id="createSuccess" className="alert alert-success" style={{ display: 'none' }}></div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Listing</button>
          </form>
        </div>
      </div>

      <Script id="owner-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        async function initOwner() {
          const api = window.UNIDAR_API;
          if (!api) return;
          const auth = await api.Auth.check();
          if (!auth || !auth.authenticated || auth.user.role !== 'owner') { window.location.href = '/login'; return; }
          if (document.getElementById('ownerName')) document.getElementById('ownerName').textContent = auth.user.full_name;

          // Load listings
          const data = await api.Listings.getAll();
          const listings = data.listings || [];
          const grid = document.getElementById('listingsGrid');
          if (!grid) return;
          
          if (!listings.length) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px"><p class="text-muted">No listings yet. Create your first one!</p></div>';
          } else {
            grid.innerHTML = listings.map(l => {
              const thumb = l.thumbnail ? '/' + l.thumbnail : '/placeholder.jpg';
              const badgeClass = l.status === 'active' ? 'success' : 'warning';
              
              return '<div class="card" style="overflow:hidden">' +
                '<div style="height:160px;background:#f3f4f6;overflow:hidden">' +
                  '<img src="' + thumb + '" style="width:100%;height:100%;object-fit:cover" onerror="this.src=\\'/placeholder.jpg\\'" />' +
                '</div>' +
                '<div style="padding:var(--space-lg)">' +
                  '<h3 style="margin-bottom:4px">' + l.title + '</h3>' +
                  '<p class="text-muted text-small">' + l.address + '</p>' +
                  '<div style="display:flex;justify-content:space-between;margin-top:12px;align-items:center">' +
                    '<strong style="color:var(--color-brand)">' + l.price + ' TND/mo</strong>' +
                    '<span class="badge badge-' + badgeClass + '">' + l.status + '</span>' +
                  '</div>' +
                  '<div style="display:flex;gap:8px;margin-top:12px">' +
                    '<a href="/listings/' + l.id + '" class="btn btn-secondary btn-sm" style="flex:1;text-align:center">View</a>' +
                    '<button onclick="removeListing(' + l.id + ')" class="btn btn-sm" style="background:#fee2e2;color:#b91c1c;flex:1">Delete</button>' +
                  '</div>' +
                '</div>' +
              '</div>';
            }).join('');
          }

          // Auto-expire silently
          api.Contracts.checkExpired().catch(() => {});

          // Load contracts (all non-terminal)
          const cRes = await api.Contracts.getUserContracts();
          const allContracts = cRes.contracts || [];
          const activeContracts = allContracts.filter(c =>
            !['terminated','expired','cancelled','rejected'].includes(c.status)
          );
          const cList = document.getElementById('contractsList');
          if (cList) {
            if (!activeContracts.length) {
              cList.innerHTML = '<p class="text-muted">No active contracts.</p>';
            } else {
              cList.innerHTML = activeContracts.map(c => {
                const statusColor = {
                  draft: '#64748b', pending: '#f59e0b', pending_signature: '#f59e0b',
                  signed_by_student: '#3b82f6', signed_by_both: '#10b981',
                  active: '#10b981', paid: '#10b981', completed: '#6366f1',
                  termination_requested: '#f97316'
                }[c.status] || '#64748b';
                const canTerminate = !['terminated','expired','cancelled','rejected','completed'].includes(c.status);
                return '<div style="border:1px solid var(--color-surface-200);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:12px">' +
                  '<div style="flex:1;min-width:0">' +
                    '<strong style="color:#1e293b;display:block">' + (c.listing_title || 'Listing') + '</strong>' +
                    '<p class="text-muted text-small m-0">👤 ' + (c.student_name || 'Student') + ' · ' +
                      '<span style="color:' + statusColor + ';font-weight:600">' + (c.status || '') + '</span>' +
                    '</p>' +
                    '<p class="text-small m-0 text-muted">' + (c.start_date ? c.start_date.slice(0,10) : '') + ' → ' + (c.end_date ? c.end_date.slice(0,10) : '') +
                      (c.monthly_rent ? ' · <strong>' + Number(c.monthly_rent).toLocaleString() + ' TND/mo</strong>' : '') +
                    '</p>' +
                    (c.status === 'termination_requested' ? '<p class="text-small mt-xs" style="color:#f97316;font-weight:600">⚠️ Student requested cancellation</p>' : '') +
                  '</div>' +
                  '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">' +
                    '<a href="/api/contracts/download?contract_id=' + c.id + '" target="_blank" class="btn btn-secondary btn-sm">📄 Doc</a>' +
                    (canTerminate ? '<button onclick="terminateContract(' + c.id + ')" class="btn btn-sm" style="background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5">🚫 Terminate</button>' : '') +
                  '</div>' +
                '</div>';
              }).join('');
            }
          }
        }

        window.removeListing = async (id) => {
          if (!confirm('Remove this listing?')) return;
          try { await window.UNIDAR_API.Listings.delete(id); initOwner(); } catch (e) { alert(e.message); }
        };

        window.terminateContract = async (contractId) => {
          const reason = prompt('Reason for termination (optional):') ?? '';
          if (reason === null) return;
          try {
            await window.UNIDAR_API.Contracts.terminate(contractId, reason);
            alert('✅ Contract terminated. The listing is now available again.');
            initOwner();
          } catch (e) {
            alert('Error: ' + (e.message || 'Unknown error'));
          }
        };

        document.getElementById('createListingBtn')?.addEventListener('click', () => {
          const modal = document.getElementById('createModal');
          if (modal) modal.style.display = 'flex';
        });
        document.getElementById('closeCreateModal')?.addEventListener('click', () => {
          const modal = document.getElementById('createModal');
          if (modal) modal.style.display = 'none';
        });

        document.getElementById('createListingForm')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          const errDiv = document.getElementById('createError');
          const okDiv  = document.getElementById('createSuccess');
          if (errDiv) errDiv.style.display = 'none';
          if (okDiv) okDiv.style.display = 'none';
          
          try {
            const fd = new FormData();
            fd.append('title', document.getElementById('lTitle').value);
            fd.append('address', document.getElementById('lAddress').value);
            fd.append('price', document.getElementById('lPrice').value);
            fd.append('bedrooms', document.getElementById('lBedrooms').value);
            fd.append('bathrooms', document.getElementById('lBathrooms').value || 0);
            fd.append('capacity', document.getElementById('lCapacity').value || 1);
            fd.append('property_type', document.getElementById('lType').value);
            fd.append('gender_preference', document.getElementById('lGender').value);
            fd.append('description', document.getElementById('lDesc').value);

            const imageFiles = document.getElementById('lImages').files;
            for (let i = 0; i < imageFiles.length; i++) {
              fd.append('images', imageFiles[i]);
            }

            await window.UNIDAR_API.Listings.create(fd);
            if (okDiv) { okDiv.textContent = 'Listing created!'; okDiv.style.display = 'block'; }
            setTimeout(() => { 
                const mod = document.getElementById('createModal');
                if (mod) mod.style.display = 'none'; 
                initOwner(); 
            }, 1500);
          } catch (err) {
            if (errDiv) { errDiv.textContent = err.message || 'Failed to create listing'; errDiv.style.display = 'block'; }
          }
        });

        document.getElementById('logoutBtn')?.addEventListener('click', async () => {
          await window.UNIDAR_API.Auth.logout();
          localStorage.removeItem('unidar_auth_user');
          sessionStorage.clear();
          window.location.href = '/login';
        });

        initOwner();
      ` }} />
    </>
  );
}

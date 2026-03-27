/**
 * UNIDAR – Admin Dashboard
 */
import Head from 'next/head';
import Script from 'next/script';

function StatCard({ title, value, icon, color, id }) {
  return (
    <div className="card fade-in" style={{padding:24,display:'flex',alignItems:'center',gap:20,borderLeft:`4px solid ${color}`}}>
      <div style={{fontSize:'2.5rem'}}>{icon}</div>
      <div>
        <div style={{fontSize:'0.85rem',color:'#64748b',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{title}</div>
        <div id={id} style={{fontSize:'1.75rem',fontWeight:800,color:'#1e293b'}}>{value}</div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <>
      <Head><title>Admin Panel - UNIDAR</title></Head>
      <nav className="navbar black" style={{background:'#0f172a',color:'white'}}>
        <div className="nav-container">
          <a href="/" className="nav-logo" style={{color:'white'}}><span style={{color:'var(--color-brand)'}}>UNI</span>DAR</a>
          <div className="nav-links">
            <a href="/admin" className="nav-link active" style={{color:'white'}}>Overview</a>
            <a href="/admin/payments" className="nav-link" style={{color:'white'}}>Payments</a>
            <button id="logoutBtn" className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      <main className="section" style={{background:'#f8fafc',minHeight:'calc(100vh - 70px)',padding:'40px 0'}}>
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:16,flexWrap:'wrap',marginBottom:40}}>
            <div>
              <h1 style={{fontSize:'2.5rem',fontWeight:800,marginBottom:8}}>Admin Dashboard</h1>
              <p style={{color:'#64748b'}}>Manage verifications, reports, users, contracts, and termination requests.</p>
            </div>
            <div style={{display:'flex',gap:12}}>
              <button id="refreshBtn" className="btn btn-secondary btn-sm">🔄 Refresh</button>
            </div>
          </div>
          
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:24,marginBottom:48}}>
            <StatCard title="Total Users" value="0" icon="👥" color="#3b82f6" id="totalUsers" />
            <StatCard title="Active Listings" value="0" icon="🏠" color="#10b981" id="totalListings" />
            <StatCard title="Pending Verifications" value="0" icon="⏳" color="#f59e0b" id="pendingVerifications" />
            <StatCard title="Open Reports" value="0" icon="🚩" color="#f43f5e" id="totalReports" />
            <StatCard title="Total Contracts" value="0" icon="📄" color="#8b5cf6" id="totalContracts" />
            <StatCard title="Active Subscriptions" value="0" icon="✨" color="#06b6d4" id="totalSubscriptions" />
          </div>

          {/* Pending Verifications */}
          <section style={{marginBottom:40}}>
            <div className="card" style={{padding:0}}>
              <div style={{padding:20,borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h2 style={{margin:0}}>Pending Verifications</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Email</th><th>University</th><th>Submitted</th><th>Documents</th><th>Status</th><th style={{textAlign:'center'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="verificationsTableBody">
                    <tr><td colSpan="7" className="empty-state"><div className="loading-spinner" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Reports */}
          <section style={{marginBottom:40}}>
            <div className="card" style={{padding:0}}>
              <div style={{padding:20,borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h2 style={{margin:0}}>Recent Reports</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Reporter</th><th>Type</th><th>Reason</th><th>Description</th><th>Created</th><th style={{textAlign:'center'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="reportsTableBody">
                    <tr><td colSpan="6" className="empty-state"><div className="loading-spinner" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Users */}
          <section style={{marginBottom:40}}>
            <div className="card" style={{padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:16,flexWrap:'wrap'}}>
                <h2 style={{margin:0}}>Users Management <span id="userCount" className="badge badge-info" style={{marginLeft:8}}>0</span></h2>
                <div className="filter-bar">
                  <input type="text" id="userSearch" className="form-input" placeholder="Search users…" />
                  <select id="roleFilter" className="form-input">
                    <option value="">All Roles</option>
                    <option value="student">Students</option>
                    <option value="owner">Owners</option>
                    <option value="admin">Admins</option>
                  </select>
                  <select id="statusFilter" className="form-input">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="banned">Banned</option>
                  </select>
                  <button id="applyUserFilters" className="btn btn-secondary btn-sm">Apply</button>
                </div>
              </div>
            </div>
            <div className="card" style={{padding:0,marginTop:12}}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th style={{textAlign:'center'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="usersTableBody">
                    <tr><td colSpan="5" className="empty-state"><div className="loading-spinner" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Termination Requests */}
          <section style={{marginBottom:40}}>
            <div className="card" style={{padding:0}}>
              <div style={{padding:20,borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h2 style={{margin:0}}>Pending Termination Requests</h2>
                <button id="refreshTermsBtn" className="btn btn-secondary btn-sm">🔄 Refresh</button>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th><th>Listing</th><th>Requester</th><th>Reason</th><th>Created</th><th style={{textAlign:'center'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="termsTableBody">
                    <tr><td colSpan="6" className="empty-state"><div className="loading-spinner" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* All Contracts */}
          <section style={{marginBottom:40}}>
            <div className="card" style={{padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                <h2 style={{margin:0}}>All Contracts</h2>
                <button id="refreshContractsBtn" className="btn btn-secondary btn-sm">Refresh</button>
              </div>
              <div id="contractsList" style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}>
                <div className="empty-state">Loading contracts…</div>
              </div>
            </div>
          </section>

          {/* Subscriptions */}
          <section style={{marginBottom:40}}>
            <div className="card" style={{padding:0}}>
              <div style={{padding:20,borderBottom:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                <h2 style={{margin:0}}>Subscriptions</h2>
                <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <select id="subsStatusFilter" className="form-input" style={{width:180}}>
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button id="refreshSubsBtn" className="btn btn-secondary btn-sm">🔄 Refresh</button>
                </div>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th><th>Plan</th><th>Status</th><th>Started</th><th>Expires</th><th style={{textAlign:'right'}}>Amount</th>
                    </tr>
                  </thead>
                  <tbody id="subsTableBody">
                    <tr><td colSpan="6" className="empty-state"><div className="loading-spinner" /></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Doc preview modal (simple) */}
      <div id="docViewerModal" className="modal-overlay" style={{display:'none',zIndex:10000}}>
        <div className="modal-content" style={{maxWidth:900,width:'95%'}}>
          <div className="card-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{margin:0}}>📋 Verification Documents</h3>
            <button className="btn btn-secondary btn-sm" onclick="window.closeDocModal()">✕</button>
          </div>
          <div id="docViewerContent" style={{padding:20,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}} />
        </div>
      </div>

      <Script src="/js/admin-dashboard.js?v=4" strategy="afterInteractive" />

      {/* Needed for contracts viewer modal */}
      <Script src="/js/contracts.js?v=6" strategy="afterInteractive" />
      
      <style jsx global>{`
        .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-error { background: #fee2e2; color: #991b1b; }
        .badge-warning { background: #fef3c7; color: #92400e; }
        .badge-info { background: #dbeafe; color: #1e40af; }
        .btn-danger { background: var(--color-error); color: #fff; }
        .btn-danger:hover { background: #dc2626; }
        .text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .table-wrapper { overflow-x: auto; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
        .data-table th { background: #f8fafc; font-size: 0.85rem; color: #475569; }
        .data-table tbody tr:hover { background: #f8fafc; }
        .empty-state { padding: 24px; text-align: center; color: #94a3b8; }
        .loading-spinner { width: 24px; height: 24px; border: 3px solid #e2e8f0; border-top-color: var(--color-brand); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .action-buttons { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .filter-bar { display: flex; gap: 10px; flex-wrap: wrap; align-items: end; }
      `}</style>
    </>
  );
}

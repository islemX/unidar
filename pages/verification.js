/**
 * UNIDAR – Verification Page
 */
import Head from 'next/head';
import Script from 'next/script';

export default function VerificationPage() {
  return (
    <>
      <Head><title>Identity Verification - UNIDAR</title></Head>
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo" aria-label="UNIDAR"><img src="/logo-nav.svg" alt="UNIDAR" style={{height:'44px',width:'auto',display:'block'}} /></a>
          <div className="nav-links">
            <a href="/user-dashboard" className="nav-link">← Back to Dashboard</a>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container" style={{maxWidth:600}}>
          <div className="section-header">
            <h1>Identity Verification</h1>
            <p className="text-muted">Verify your account to access more features and build trust</p>
          </div>

          <div id="verifStatus" className="card" style={{padding:'var(--space-xl)',marginBottom:'var(--space-xl)',textAlign:'center',display:'none'}}>
            <h3 id="statusTitle">Verification Status</h3>
            <div id="statusBadge" className="badge" style={{fontSize:'1.1rem',padding:'8px 24px',margin:'16px 0'}}>Pending</div>
            <p id="statusMsg" className="text-muted">Your documents are being reviewed by our team.</p>
          </div>

          <div id="verifFormCard" className="card" style={{padding:'var(--space-xl)'}}>
            <h2>Submit Documents</h2>
            <p className="text-muted" style={{marginBottom:'var(--space-xl)'}}>Please upload clear photos or scans of your identification documents.</p>
            
            <form id="verifForm">
              <div className="form-group">
                <label className="form-label" htmlFor="studentId">Student ID Card</label>
                <input type="file" id="studentId" className="form-input" accept="image/*,.pdf" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="nationalId">National ID (CIN)</label>
                <input type="file" id="nationalId" className="form-input" accept="image/*,.pdf" required />
              </div>
              
              <div id="verifError" className="alert alert-error" style={{display:'none'}}></div>
              <div id="verifSuccess" className="alert alert-success" style={{display:'none'}}></div>
              
              <button type="submit" id="submitBtn" className="btn btn-primary" style={{width:'100%'}}>Submit for Review</button>
            </form>
          </div>
        </div>
      </main>

      <Script id="verif-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        async function checkStatus() {
          try {
            const data = await window.UNIDAR_API.Verifications.getMine();
            const v = data.verification;
            if (v) {
              document.getElementById('verifStatus').style.display = 'block';
              document.getElementById('statusBadge').textContent = v.status.toUpperCase();
              document.getElementById('statusBadge').className = 'badge badge-' + (v.status === 'approved' ? 'success' : v.status === 'rejected' ? 'error' : 'warning');
              
              if (v.status === 'pending') {
                document.getElementById('verifFormCard').style.display = 'none';
              } else if (v.status === 'rejected') {
                document.getElementById('statusMsg').textContent = 'Rejection reason: ' + (v.rejection_reason || 'Unknown');
                document.getElementById('statusMsg').style.color = 'var(--color-error)';
              } else {
                document.getElementById('statusMsg').textContent = 'Your account is verified. You can now sign contracts.';
                document.getElementById('verifFormCard').style.display = 'none';
              }
            }
          } catch (e) {}
        }

        const vf = document.getElementById('verifForm');
        if (vf) {
          vf.addEventListener('submit', async (e) => {
            e.preventDefault();
            const sid  = document.getElementById('studentId').files[0];
            const nid  = document.getElementById('nationalId').files[0];
            const btn  = document.getElementById('submitBtn');
            const errDiv = document.getElementById('verifError');
            const okDiv  = document.getElementById('verifSuccess');

            if (errDiv) errDiv.style.display = 'none'; 
            if (okDiv) okDiv.style.display = 'none';
            if (!sid || !nid) { 
              if (errDiv) { errDiv.textContent = 'Both files required'; errDiv.style.display='block'; }
              return; 
            }

            const fd = new FormData();
            fd.append('student_id_file', sid);
            fd.append('national_id_file', nid);

            if (btn) { btn.disabled = true; btn.textContent = 'Uploading...'; }
            try {
              await window.UNIDAR_API.Verifications.submit(fd);
              if (okDiv) { okDiv.textContent = 'Verification submitted successfully!'; okDiv.style.display = 'block'; }
              setTimeout(() => window.location.reload(), 1500);
            } catch (err) {
              if (errDiv) { errDiv.textContent = err.message || 'Failed to submit'; errDiv.style.display = 'block'; }
              if (btn) { btn.disabled = false; btn.textContent = 'Submit for Review'; }
            }
          });
        }

        checkStatus();
      ` }} />
    </>
  );
}

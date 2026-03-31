/**
 * UNIDAR – Subscription Page (Premium)
 * Single yearly plan — 25 TND/year
 */
import Head from 'next/head';
import Script from 'next/script';

export default function SubscriptionPage() {
  return (
    <>
      <Head>
        <title>Subscribe — UNIDAR</title>
      </Head>

      <main className="sub-page glass" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav className="navbar" style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="nav-container">
            <a href="/" className="nav-logo" style={{ color: 'white' }}><span style={{ color: 'var(--color-brand)' }}>UNI</span>DAR</a>
            <div className="nav-links">
              <a href="/user-dashboard" className="nav-link" style={{ color: 'white' }}>Dashboard</a>
            </div>
          </div>
        </nav>

        <section className="section" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <div className="sub-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: 60, alignItems: 'start' }}>

              {/* Left Column: Plan */}
              <div className="sub-plans" style={{ color: 'white' }}>
                <div className="hero-badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', marginBottom: '1.5rem' }}>✨ Premium Access</div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-2px' }}>Go Premium</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem' }}>Unlock the full potential of UNIDAR. Verified listings, direct messaging, and secure digital contracts.</p>

                {/* Yearly Plan — only plan */}
                <div className="plan-card active" style={{ padding: 28, borderRadius: 24, border: '2px solid var(--color-brand)', background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -12, right: 24, background: 'var(--color-brand)', color: 'white', padding: '4px 14px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 800 }}>Full Year Access</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Yearly</h3>
                      <p style={{ opacity: 0.7, margin: '4px 0 0' }}>Complete access for a full year</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>25</span>
                      <span style={{ opacity: 0.7, fontSize: '1.1rem' }}> TND/yr</span>
                    </div>
                  </div>
                  <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {['✓ Access all verified listings', '✓ Unlimited direct messaging', '✓ Secure digital contracts', '✓ Priority support'].map(f => (
                      <li key={f} style={{ opacity: 0.85, fontSize: '0.95rem' }}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Payment Form & Card Preview */}
              <div className="sub-payment stagger-2">
                <div className="premium-card-v2" style={{ background: 'white', borderRadius: 32, padding: 32, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>

                  {/* Virtual Card Preview */}
                  <div className="virtual-card-preview" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: 20, padding: 24, color: 'white', marginBottom: 32, position: 'relative', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                    <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                      <div style={{ width: 45, height: 35, background: 'linear-gradient(135deg, #fbbf24, #d97706)', borderRadius: 6 }}></div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, fontStyle: 'italic', opacity: 0.5 }}>UNIDAR</div>
                    </div>
                    <div id="displayCardNum" style={{ fontSize: '1.4rem', letterSpacing: 4, marginBottom: 20, fontFamily: 'monospace' }}>•••• •••• •••• ••••</div>
                    <div className="flex justify-between">
                      <div>
                        <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.5 }}>Card Holder</div>
                        <div id="displayName" style={{ fontSize: '0.9rem', fontWeight: 600 }}>USER NAME</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.5 }}>Expires</div>
                        <div id="displayExpiry" style={{ fontSize: '0.9rem', fontWeight: 600 }}>MM/YY</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#065f46', fontWeight: 600, fontSize: '0.9rem' }}>Total due today</span>
                    <span style={{ color: '#065f46', fontWeight: 800, fontSize: '1.1rem' }}>25 TND</span>
                  </div>

                  <form id="paymentForm">
                    <div className="form-group mb-lg">
                      <label className="form-label uppercase font-bold text-tiny text-muted">Cardholder Name</label>
                      <input type="text" id="cardName" className="form-input" placeholder="FULL NAME" required />
                    </div>
                    <div className="form-group mb-lg">
                      <label className="form-label uppercase font-bold text-tiny text-muted">Card Number</label>
                      <input type="text" id="cardNum" className="form-input" placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </div>
                    <div className="grid grid-2 gap-md mb-xl">
                      <div className="form-group">
                        <label className="form-label uppercase font-bold text-tiny text-muted">Expiry Date</label>
                        <input type="text" id="cardExpiry" className="form-input" placeholder="MM/YY" maxLength="5" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label uppercase font-bold text-tiny text-muted">CVC</label>
                        <input type="text" id="cardCvc" className="form-input" placeholder="000" maxLength="3" required />
                      </div>
                    </div>
                    <button type="submit" id="payBtn" className="btn btn-primary" style={{ width: '100%', padding: '16px', borderRadius: 16, fontWeight: 800, fontSize: '1.1rem' }}>
                      Pay 25 TND / Year
                    </button>
                    <p className="text-center text-tiny text-muted mt-md">Secure SSL Encrypted Payment</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Script id="subscription-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        async function init() {
          const auth = await window.UNIDAR_API.Auth.check();
          if (!auth || !auth.authenticated) { window.location.href = '/login'; return; }
          const currentUser = auth.user;
          const disp = document.getElementById('displayName');
          if (disp && currentUser.full_name) disp.textContent = currentUser.full_name.toUpperCase();

          // Card Input Visual Sync
          document.getElementById('cardName')?.addEventListener('input', e => {
            const el = document.getElementById('displayName');
            if (el) el.textContent = e.target.value.toUpperCase() || (currentUser ? currentUser.full_name.toUpperCase() : 'USER NAME');
          });
          document.getElementById('cardNum')?.addEventListener('input', e => {
             let v = e.target.value.replace(/\\s+/g, '').replace(/[^0-9]/gi, '');
             let matches = v.match(/\\d{4,16}/g);
             let match = matches && matches[0] || '';
             let parts = [];
             for (let i=0, len=match.length; i<len; i+=4) { parts.push(match.substring(i, i+4)); }
             if (parts.length) {
               e.target.value = parts.join(' ');
               const el = document.getElementById('displayCardNum');
               if (el) el.textContent = parts.join(' ');
             } else {
               const el = document.getElementById('displayCardNum');
               if (el) el.textContent = '•••• •••• •••• ••••';
             }
          });
          document.getElementById('cardExpiry')?.addEventListener('input', e => {
            const el = document.getElementById('displayExpiry');
            if (el) el.textContent = e.target.value || 'MM/YY';
          });

          // Form Submission
          document.getElementById('paymentForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('payBtn');
            if (btn) { btn.disabled = true; btn.textContent = 'Processing...'; }
            try {
              const res = await window.UNIDAR_API.Subscriptions.create({ plan: 'yearly' });
              if (res.success) {
                if (btn) { btn.style.background = '#10b981'; btn.textContent = 'Payment Successful! Redirecting...'; }
                setTimeout(() => window.location.href = '/user-dashboard', 1500);
              }
            } catch (err) {
              alert(err.message || 'Payment failed');
              if (btn) { btn.disabled = false; btn.textContent = 'Pay 25 TND / Year'; }
            }
          });
        }

        init();
      ` }} />

      <style jsx global>{`
        .sub-page {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            min-height: 100vh;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            background: rgba(255,255,255,0.1);
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        .plan-card.active {
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
      `}</style>
    </>
  );
}

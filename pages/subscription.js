/**
 * UNIDAR – Subscription Page (Premium)
 * Pro redesign — single yearly plan at 25 TND/year
 */
import Head from 'next/head';
import Script from 'next/script';

export default function SubscriptionPage() {
  return (
    <>
      <Head>
        <title>Go Premium — UNIDAR</title>
      </Head>

      <div className="sp-root">
        {/* Ambient background elements */}
        <div className="sp-orb sp-orb-1" />
        <div className="sp-orb sp-orb-2" />
        <div className="sp-orb sp-orb-3" />
        <div className="sp-grid-lines" />

        {/* Nav */}
        <nav className="sp-nav">
          <a href="/" className="sp-logo">
            <span className="sp-logo-uni">UNI</span>DAR
          </a>
          <a href="/user-dashboard" className="sp-nav-link">← Back to Dashboard</a>
        </nav>

        <div className="sp-layout">

          {/* ── LEFT COLUMN ───────────────────────────────── */}
          <div className="sp-left">

            <div className="sp-overline">
              <span className="sp-overline-dot" />
              Premium Membership
            </div>

            <h1 className="sp-headline">
              Unlock Your<br />
              <span className="sp-headline-grad">Full Potential</span>
            </h1>

            <p className="sp-subtext">
              Everything you need to find, secure, and manage student housing — all in one place, for less than a coffee a month.
            </p>

            {/* Stats row */}
            <div className="sp-stats">
              {[
                { n: '2 000+', l: 'Active Students' },
                { n: '100%', l: 'Secure & Verified' },
                { n: '25 TND', l: 'Full Year Access' },
              ].map(s => (
                <div key={s.l} className="sp-stat">
                  <span className="sp-stat-n">{s.n}</span>
                  <span className="sp-stat-l">{s.l}</span>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="sp-features">
              {[
                { icon: '🏠', title: 'Verified Listings Only', desc: 'Every listing is reviewed and certified by our team.' },
                { icon: '💬', title: 'Unlimited Messaging', desc: 'Contact owners directly with no limits or paywalls.' },
                { icon: '📄', title: 'Digital Contracts', desc: 'Sign legally binding contracts online, instantly.' },
                { icon: '🗺️', title: 'Neighborhood Map', desc: 'Explore listings and nearby services on the map.' },
                { icon: '🤝', title: 'Roommate Matching', desc: 'Find compatible roommates based on your profile.' },
                { icon: '⚡', title: 'Priority Support', desc: 'Get help from our team whenever you need it.' },
              ].map(f => (
                <div key={f.title} className="sp-feat">
                  <div className="sp-feat-icon">{f.icon}</div>
                  <div>
                    <div className="sp-feat-title">{f.title}</div>
                    <div className="sp-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="sp-testimonial">
              <div className="sp-stars">★★★★★</div>
              <p className="sp-quote">"Found my apartment in 3 days. The contracts feature saved me so much stress during my first year."</p>
              <div className="sp-reviewer">
                <div className="sp-reviewer-avatar">A</div>
                <div>
                  <div className="sp-reviewer-name">Amine B.</div>
                  <div className="sp-reviewer-role">Engineering Student, INSAT</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ──────────────────────────────── */}
          <div className="sp-right">
            <div className="sp-card">

              {/* Header */}
              <div className="sp-card-header">
                <div className="sp-card-badge">✦ UNIDAR PRO</div>
                <div className="sp-card-price">
                  <span className="sp-card-amount">25</span>
                  <div className="sp-card-price-meta">
                    <span className="sp-card-currency">TND</span>
                    <span className="sp-card-period">/ year</span>
                  </div>
                </div>
                <div className="sp-card-saving">That's less than 2.10 TND/month</div>
              </div>

              {/* Virtual Card Preview — realistic with chip, contactless, brand detection */}
                  <div id="sp-card-face" style={{ background: 'linear-gradient(135deg,#1e293b,#0f172a)', borderRadius: 16, padding: '20px 22px', color: 'white', marginBottom: 24, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.07)', transition: 'background 0.5s ease', aspectRatio: '1.586', display: 'flex', flexDirection: 'column' }}>
                    {/* Shine */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.06) 50%,transparent 60%)', backgroundSize: '300% 100%', animation: 'sp-shine 5s ease-in-out infinite', pointerEvents: 'none' }} />
                    {/* Top row: chip + contactless */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <svg width="42" height="32" viewBox="0 0 42 32" style={{ flexShrink: 0 }}>
                        <rect width="42" height="32" rx="5" fill="#fbbf24"/>
                        <rect x="3" y="3" width="36" height="26" rx="3" fill="#d97706"/>
                        <rect x="7" y="11" width="28" height="10" rx="2" fill="#fbbf24"/>
                        <line x1="21" y1="3" x2="21" y2="29" stroke="#b45309" strokeWidth="1.5"/>
                        <line x1="3" y1="16" x2="39" y2="16" stroke="#b45309" strokeWidth="1.5"/>
                        <line x1="7" y1="11" x2="7" y2="21" stroke="#b45309" strokeWidth="1"/>
                        <line x1="35" y1="11" x2="35" y2="21" stroke="#b45309" strokeWidth="1"/>
                      </svg>
                      <svg width="22" height="22" viewBox="0 0 22 22" style={{ opacity: 0.55, flexShrink: 0 }}>
                        <circle cx="6" cy="11" r="2.2" fill="white"/>
                        <path d="M9.5,6.5 a6.5,6.5 0 0,1 0,9" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        <path d="M12.5,4 a10,10 0 0,1 0,14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                        <path d="M15.5,1.5 a13.5,13.5 0 0,1 0,19" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
                      </svg>
                    </div>
                    {/* Card number */}
                    <div id="displayCardNum" style={{ fontFamily: "'Courier New',monospace", fontSize: 'clamp(0.85rem,3.5vw,1.1rem)', letterSpacing: '0.2em', textShadow: '0 2px 6px rgba(0,0,0,0.4)', marginBottom: 12, flex: 1, display: 'flex', alignItems: 'flex-end' }}>•••• •••• •••• ••••</div>
                    {/* Bottom row */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 3 }}>Card Holder</div>
                        <div id="displayName" style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>USER NAME</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 3 }}>Expires</div>
                        <div id="displayExpiry" style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>MM/YY</div>
                      </div>
                      <div id="sp-card-brand" style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center' }}></div>
                    </div>
                  </div>

              {/* Payment Form */}
              <form id="paymentForm" className="sp-form">
                <div className="sp-field">
                  <label className="sp-label">Cardholder Name</label>
                  <input type="text" id="cardName" className="sp-input" placeholder="As it appears on card" required autoComplete="cc-name" />
                </div>
                <div className="sp-field">
                  <label className="sp-label">Card Number</label>
                  <div className="sp-input-wrap">
                    <input type="text" id="cardNum" className="sp-input sp-input-card" placeholder="0000  0000  0000  0000" maxLength="19" required autoComplete="cc-number" inputMode="numeric" />
                    <div className="sp-card-icons">
                      <span className="sp-ci sp-ci-visa">VISA</span>
                      <span className="sp-ci sp-ci-mc">MC</span>
                    </div>
                  </div>
                </div>
                <div className="sp-row2">
                  <div className="sp-field">
                    <label className="sp-label">Expiry</label>
                    <input type="text" id="cardExpiry" className="sp-input" placeholder="MM / YY" maxLength="7" required autoComplete="cc-exp" inputMode="numeric" />
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">CVC</label>
                    <div className="sp-input-wrap">
                      <input type="text" id="cardCvc" className="sp-input" placeholder="•••" maxLength="3" required autoComplete="cc-csc" inputMode="numeric" />
                      <span className="sp-cvc-icon" title="3-digit code on back of card">?</span>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="sp-summary">
                  <div className="sp-summary-row">
                    <span>UNIDAR Pro — 1 Year</span>
                    <span>25.00 TND</span>
                  </div>
                  <div className="sp-summary-row sp-summary-discount">
                    <span>Student discount</span>
                    <span>-0.00 TND</span>
                  </div>
                  <div className="sp-summary-divider" />
                  <div className="sp-summary-row sp-summary-total">
                    <span>Total due today</span>
                    <span>25.00 TND</span>
                  </div>
                </div>

                <button type="submit" id="payBtn" className="sp-btn">
                  <span id="payBtnText">🔒 Pay 25 TND — Start Premium</span>
                  <div id="payBtnLoader" className="sp-btn-loader" style={{ display: 'none' }}>
                    <div className="sp-spinner" />
                    Processing…
                  </div>
                </button>

                <div className="sp-trust">
                  <span className="sp-trust-item">🔒 SSL Encrypted</span>
                  <span className="sp-trust-item">✓ No auto-renewal</span>
                  <span className="sp-trust-item">✓ Cancel anytime</span>
                </div>
              </form>
            </div>

            {/* Below card note */}
            <div className="sp-below-card">
              <span>By subscribing you agree to our</span>
              <a href="/terms" className="sp-terms-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <Script id="subscription-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        async function init() {
          const auth = await window.UNIDAR_API.Auth.check();
          if (!auth || !auth.authenticated) { window.location.href = '/login'; return; }
          const currentUser = auth.user;

          const setDisplay = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
          if (currentUser.full_name) setDisplay('displayName', currentUser.full_name.toUpperCase());

          // ── Card number formatting & preview sync
          document.getElementById('cardName')?.addEventListener('input', e => {
            setDisplay('displayName', e.target.value.toUpperCase() || currentUser.full_name.toUpperCase());
          });

          // Card brand themes for subscription page
          const SP_BRANDS = {
            'e-Dinar':    { gradient: 'linear-gradient(135deg,#052e16,#14532d,#166534)', logo: '<span style="font-size:0.72rem;font-weight:900;letter-spacing:1.5px;color:#4ade80">e•DINAR</span>' },
            'Visa':       { gradient: 'linear-gradient(135deg,#0a1628,#1e3a8a,#1d4ed8)', logo: '<svg width="48" height="16" viewBox="0 0 48 16"><text x="1" y="14" fill="white" font-size="15" font-style="italic" font-weight="900" font-family="Arial,sans-serif">VISA</text></svg>' },
            'Mastercard': { gradient: 'linear-gradient(135deg,#1a0505,#450a0a,#7f1d1d)', logo: '<svg width="40" height="24" viewBox="0 0 40 24"><circle cx="13" cy="12" r="11" fill="#eb001b"/><circle cx="27" cy="12" r="11" fill="#f79e1b"/><path d="M20 3.2a11 11 0 0 1 0 17.6A11 11 0 0 1 20 3.2z" fill="#ff5f00"/></svg>' },
            'Amex':       { gradient: 'linear-gradient(135deg,#0c1a2e,#1d3461,#1e40af)', logo: '<svg width="46" height="18" viewBox="0 0 46 18"><text x="1" y="14" fill="white" font-size="11" font-weight="900" font-family="Arial,sans-serif" letter-spacing="2">AMEX</text></svg>' },
            '':           { gradient: 'linear-gradient(135deg,#1e293b,#0f172a)', logo: '' },
          };
          function spDetectBrand(num) {
            const n = num.replace(/\\D/g, '');
            if (/^4030/.test(n)) return 'e-Dinar';
            if (/^4/.test(n))    return 'Visa';
            if (/^5[1-5]|^2[2-7]/.test(n)) return 'Mastercard';
            if (/^3[47]/.test(n)) return 'Amex';
            return '';
          }
          function spApplyBrand(raw) {
            const b = spDetectBrand(raw);
            const theme = SP_BRANDS[b] || SP_BRANDS[''];
            const face = document.getElementById('sp-card-face');
            if (face) face.style.background = theme.gradient;
            const brandEl = document.getElementById('sp-card-brand');
            if (brandEl) brandEl.innerHTML = theme.logo;
          }

          document.getElementById('cardNum')?.addEventListener('input', e => {
            const digits = e.target.value.replace(/\\D/g, '').substring(0, 16);
            const parts = digits.match(/.{1,4}/g) || [];
            e.target.value = parts.join('  ');
            const masked = parts.length
              ? parts.map((p, i) => i < parts.length - 1 ? p.replace(/\\d/g, '•') : p).join('  ')
              : '•••• •••• •••• ••••';
            const el = document.getElementById('displayCardNum');
            if (el) el.textContent = masked || '•••• •••• •••• ••••';
            spApplyBrand(e.target.value);
          });
          document.getElementById('cardExpiry')?.addEventListener('input', e => {
            const v = e.target.value.replace(/\\D/g, '').substring(0, 4);
            e.target.value = v.length >= 3 ? v.substring(0,2) + ' / ' + v.substring(2) : v;
            const el = document.getElementById('displayExpiry');
            if (el) el.textContent = e.target.value || 'MM/YY';
          });

          document.getElementById('cardCvc')?.addEventListener('input', e => {
            e.target.value = e.target.value.replace(/\\D/g, '').substring(0, 3);
          });

          // ── Form submission
          document.getElementById('paymentForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('payBtn');
            const btnText = document.getElementById('payBtnText');
            const btnLoader = document.getElementById('payBtnLoader');
            if (btn) btn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'flex';

            try {
              const res = await window.UNIDAR_API.Subscriptions.create({ plan: 'yearly' });
              if (res.success) {
                if (btn) {
                  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                  btn.style.boxShadow = '0 0 30px rgba(16,185,129,0.4)';
                  btnLoader.style.display = 'none';
                  btnText.style.display = 'flex';
                  btnText.textContent = '✓ Payment Successful! Redirecting…';
                  btnText.style.justifyContent = 'center';
                }
                setTimeout(() => window.location.href = '/user-dashboard', 1800);
              }
            } catch (err) {
              if (btn) btn.disabled = false;
              if (btnLoader) btnLoader.style.display = 'none';
              if (btnText) { btnText.style.display = 'flex'; btnText.textContent = '🔒 Pay 25 TND — Start Premium'; }
              // Show inline error
              let errEl = document.getElementById('sp-error');
              if (!errEl) {
                errEl = document.createElement('div');
                errEl.id = 'sp-error';
                errEl.className = 'sp-error';
                document.getElementById('payBtn').insertAdjacentElement('afterend', errEl);
              }
              errEl.textContent = '⚠ ' + (err.message || 'Payment failed. Please try again.');
              setTimeout(() => { if (errEl) errEl.remove(); }, 5000);
            }
          });
        }

        init();
      ` }} />

      <style jsx global>{`
        /* ── Root & background ────────────────── */
        .sp-root {
          min-height: 100vh;
          background: #080d1a;
          position: relative;
          overflow-x: hidden;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
        }

        /* Ambient orbs */
        .sp-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .sp-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          top: -150px; left: -100px;
          animation: sp-drift 18s ease-in-out infinite alternate;
        }
        .sp-orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: sp-drift 22s ease-in-out infinite alternate-reverse;
        }
        .sp-orb-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%);
          top: 40%; left: 40%;
          animation: sp-drift 15s ease-in-out infinite alternate;
        }
        @keyframes sp-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.06); }
        }

        /* Grid overlay */
        .sp-grid-lines {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Nav ────────────────────────────────── */
        .sp-nav {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .sp-logo {
          font-size: 1.5rem; font-weight: 900; color: white; text-decoration: none; letter-spacing: -0.5px;
        }
        .sp-logo-uni { color: var(--color-brand, #6366f1); }
        .sp-nav-link {
          color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.875rem;
          transition: color 0.2s;
        }
        .sp-nav-link:hover { color: white; }

        /* ── Layout ─────────────────────────────── */
        .sp-layout {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 60px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px 80px;
        }

        /* ── LEFT COLUMN ─────────────────────────── */
        .sp-overline {
          display: inline-flex; align-items: center; gap: 8px;
          color: var(--color-brand, #6366f1);
          font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 20px;
        }
        .sp-overline-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--color-brand, #6366f1);
          box-shadow: 0 0 10px var(--color-brand, #6366f1);
          animation: sp-pulse 2s ease-in-out infinite;
        }
        @keyframes sp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        .sp-headline {
          font-size: clamp(2.8rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2px;
          color: white;
          margin: 0 0 20px;
        }
        .sp-headline-grad {
          background: linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sp-subtext {
          font-size: 1.1rem; line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 480px;
          margin-bottom: 36px;
        }

        /* Stats row */
        .sp-stats {
          display: flex; gap: 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 40px;
        }
        .sp-stat {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          padding: 18px 16px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .sp-stat:last-child { border-right: none; }
        .sp-stat-n {
          font-size: 1.4rem; font-weight: 900; color: white; letter-spacing: -0.5px;
        }
        .sp-stat-l {
          font-size: 0.72rem; color: rgba(255,255,255,0.45); text-align: center; margin-top: 2px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        /* Features */
        .sp-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 36px;
        }
        .sp-feat {
          display: flex; gap: 12px; align-items: flex-start;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 14px;
          transition: border-color 0.2s, background 0.2s;
        }
        .sp-feat:hover {
          border-color: rgba(99,102,241,0.3);
          background: rgba(99,102,241,0.06);
        }
        .sp-feat-icon {
          font-size: 1.3rem; flex-shrink: 0;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .sp-feat-title {
          font-size: 0.85rem; font-weight: 700; color: white; margin-bottom: 2px;
        }
        .sp-feat-desc {
          font-size: 0.75rem; color: rgba(255,255,255,0.4); line-height: 1.4;
        }

        /* Testimonial */
        .sp-testimonial {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 22px 24px;
        }
        .sp-stars { color: #fbbf24; font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 10px; }
        .sp-quote {
          font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.7);
          font-style: italic; margin: 0 0 16px;
        }
        .sp-reviewer { display: flex; align-items: center; gap: 12px; }
        .sp-reviewer-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a78bfa);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 800; font-size: 0.9rem; flex-shrink: 0;
        }
        .sp-reviewer-name { font-size: 0.875rem; font-weight: 700; color: white; }
        .sp-reviewer-role { font-size: 0.75rem; color: rgba(255,255,255,0.4); }

        /* ── RIGHT COLUMN / CARD ─────────────────── */
        .sp-right { position: sticky; top: 30px; }

        .sp-card {
          background: white;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08);
        }

        /* Card header gradient */
        .sp-card-header {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%);
          padding: 28px 28px 24px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .sp-card-header::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 250px; height: 250px;
          background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .sp-card-badge {
          display: inline-flex; align-items: center;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          padding: 4px 12px; border-radius: 100px;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 1.5px;
          margin-bottom: 16px;
        }
        .sp-card-price {
          display: flex; align-items: flex-end; gap: 4px;
          margin-bottom: 6px;
        }
        .sp-card-amount {
          font-size: 3.5rem; font-weight: 900; letter-spacing: -2px; line-height: 1;
        }
        .sp-card-price-meta {
          display: flex; flex-direction: column; padding-bottom: 6px;
        }
        .sp-card-currency { font-size: 1.1rem; font-weight: 700; opacity: 0.9; }
        .sp-card-period   { font-size: 0.8rem; opacity: 0.5; }
        .sp-card-saving {
          font-size: 0.8rem;
          color: #34d399;
          font-weight: 600;
        }

        /* Virtual bank card */
        .sp-vcard {
          position: relative; overflow: hidden;
          margin: 0 28px 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 40%, #1a1040 100%);
          padding: 20px 22px 18px;
          color: white;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          transform: translateY(-16px);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .sp-vcard-shine {
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          animation: sp-shine 4s ease-in-out infinite;
        }
        @keyframes sp-shine {
          0%        { background-position: -200% 0; }
          60%, 100% { background-position: 300% 0; }
        }
        .sp-vcard-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 22px;
        }
        .sp-vcard-chip {
          width: 34px; height: 26px;
          background: linear-gradient(135deg, #fbbf24, #d97706);
          border-radius: 5px;
          display: flex; flex-direction: column; justify-content: center;
          gap: 4px; padding: 0 4px;
        }
        .sp-chip-line {
          height: 2px; background: rgba(0,0,0,0.25); border-radius: 1px;
        }
        .sp-vcard-brand {
          font-size: 1rem; font-weight: 800; font-style: italic;
          opacity: 0.35; letter-spacing: 1px;
        }
        .sp-vcard-num {
          font-family: 'Courier New', monospace;
          font-size: 1.15rem; letter-spacing: 3px;
          margin-bottom: 18px; color: rgba(255,255,255,0.9);
        }
        .sp-vcard-bottom {
          display: flex; align-items: flex-end; gap: 24px; position: relative;
        }
        .sp-vcard-label {
          font-size: 0.55rem; text-transform: uppercase; letter-spacing: 1px;
          opacity: 0.4; margin-bottom: 2px;
        }
        .sp-vcard-value {
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.5px;
        }
        .sp-vcard-circles {
          position: absolute; right: 0; bottom: 0;
          display: flex;
        }
        .sp-vcard-circle {
          width: 28px; height: 28px; border-radius: 50%;
        }
        .sp-vcard-circle-1 { background: rgba(239,68,68,0.7); }
        .sp-vcard-circle-2 { background: rgba(251,191,36,0.7); margin-left: -10px; }

        /* Form */
        .sp-form { padding: 4px 28px 28px; }

        .sp-field { margin-bottom: 14px; }
        .sp-label {
          display: block;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.8px;
          text-transform: uppercase; color: #64748b;
          margin-bottom: 6px;
        }
        .sp-input {
          width: 100%; box-sizing: border-box;
          padding: 12px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          color: #0f172a;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          font-family: inherit;
        }
        .sp-input:focus {
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .sp-input-wrap { position: relative; }
        .sp-input-card { padding-right: 80px; }
        .sp-card-icons {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          display: flex; gap: 4px;
        }
        .sp-ci {
          font-size: 0.6rem; font-weight: 900; padding: 3px 6px; border-radius: 4px;
        }
        .sp-ci-visa { background: #1a1f71; color: white; letter-spacing: 1px; }
        .sp-ci-mc   { background: #eb001b; color: white; }

        .sp-cvc-icon {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          width: 20px; height: 20px; border-radius: 50%;
          background: #e2e8f0; color: #64748b;
          font-size: 0.75rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          cursor: help;
        }

        .sp-row2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;
        }

        /* Order summary */
        .sp-summary {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }
        .sp-summary-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.875rem; color: #475569;
          margin-bottom: 6px;
        }
        .sp-summary-discount { color: #10b981; }
        .sp-summary-divider {
          height: 1px; background: #e2e8f0; margin: 10px 0;
        }
        .sp-summary-total {
          font-weight: 800; font-size: 0.95rem; color: #0f172a; margin-bottom: 0;
        }

        /* CTA button */
        .sp-btn {
          width: 100%;
          padding: 16px;
          border: none; border-radius: 14px; cursor: pointer;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #6366f1 100%);
          background-size: 200% auto;
          color: white;
          font-size: 1rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
          transition: transform 0.15s, box-shadow 0.15s, background-position 0.4s;
          margin-bottom: 14px;
          letter-spacing: 0.2px;
        }
        .sp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.55);
          background-position: right center;
        }
        .sp-btn:active:not(:disabled) { transform: translateY(0); }
        .sp-btn:disabled { opacity: 0.75; cursor: not-allowed; }

        #payBtnText { display: flex; align-items: center; gap: 6px; }
        .sp-btn-loader {
          display: flex; align-items: center; gap: 10px;
        }
        .sp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: sp-spin 0.7s linear infinite;
        }
        @keyframes sp-spin { to { transform: rotate(360deg); } }

        /* Trust bar */
        .sp-trust {
          display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;
          font-size: 0.72rem; color: #94a3b8; font-weight: 600;
        }
        .sp-trust-item::before { margin-right: 4px; }

        /* Inline error */
        .sp-error {
          background: #fef2f2; border: 1px solid #fca5a5;
          color: #b91c1c; border-radius: 10px;
          padding: 10px 14px; font-size: 0.85rem;
          margin-top: 10px; font-weight: 600;
        }

        /* Below card */
        .sp-below-card {
          text-align: center; margin-top: 16px;
          font-size: 0.75rem; color: rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .sp-terms-link { color: rgba(255,255,255,0.5); text-decoration: underline; }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 900px) {
          .sp-layout {
            grid-template-columns: 1fr;
            padding: 30px 20px 60px;
            gap: 40px;
          }
          .sp-right { position: static; }
          .sp-features { grid-template-columns: 1fr 1fr; }
          .sp-nav { padding: 16px 20px; }
        }
        @media (max-width: 540px) {
          .sp-headline { font-size: 2.4rem; }
          .sp-features { grid-template-columns: 1fr; }
          .sp-stats { flex-direction: column; }
          .sp-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .sp-stat:last-child { border-bottom: none; }
        }
      `}</style>
    </>
  );
}

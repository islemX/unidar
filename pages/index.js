/**
 * UNIDAR – Premium Home Page
 */
import Head from 'next/head';
import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>UNIDAR - Student Housing Platform | Find Your Perfect Home</title>
        <meta name="description" content="UNIDAR - The premier student housing platform in Tunisia. Find verified listings, find compatible roommates, and secure your housing with digital contracts." />
      </Head>

      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo" style={{ gap: 0 }}>
            <span style={{ color: 'var(--color-brand)' }}>UNI</span>DAR
          </a>
          <div className="nav-links" id="navLinks">
            <a href="/" className="nav-link active" data-i18n="nav_home">Home</a>
            <a href="/listings" className="nav-link auth-only" style={{ display: 'none' }} data-i18n="nav_listings">Listings</a>
            <a href="/roommates" className="nav-link auth-only" style={{ display: 'none' }} data-i18n="nav_roommates">Roommates</a>
          </div>
          <div className="header-actions" id="headerActions" style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
            <a href="/login" id="navLoginBtn" className="btn btn-secondary btn-sm" data-i18n="nav_login">Login</a>
            <a href="/register" id="navSignupBtn" className="btn btn-primary btn-sm" data-i18n="nav_signup">Sign Up</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                <span data-i18n="home_hero_badge">Trusted by Students Across Tunisia</span>
              </div>
              <h1 data-i18n="home_hero_title">Find Your <span>Perfect</span><br />Student Home</h1>
              <p data-i18n="home_hero_subtitle">The premier platform for Tunisian university students. Discover verified listings, find compatible roommates, and secure safe housing near your campus—all in one place.</p>
              <div className="hero-actions">
                <a href="/listings" className="btn btn-primary" data-i18n="home_hero_explore">Explore Listings</a>
                <a href="/roommates" className="btn btn-secondary" data-i18n="home_hero_roommates">Find Roommates</a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-number" id="stat_listings">500+</span>
                  <span className="hero-stat-label" data-i18n="home_hero_stat_listings">Verified Listings</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number" id="stat_students">2000+</span>
                  <span className="hero-stat-label" data-i18n="home_hero_stat_students">Active Students</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">15+</span>
                  <span className="hero-stat-label" data-i18n="home_hero_stat_unis">Universities Covered</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section (Why UNIDAR) */}
        <section className="features-section section">
          <div className="container">
            <div className="section-header">
              <div className="section-tag" data-i18n="home_why_tag">Why UNIDAR</div>
              <h2 data-i18n="home_why_title">Everything You Need for Student Living</h2>
              <p data-i18n="home_why_subtitle">The most comprehensive platform for students.</p>
            </div>
            <div className="feature-grid">
               {[
                 { icon: '🛡️', color: 'blue', key: '1' },
                 { icon: '📍', color: 'green', key: '2' },
                 { icon: '🤝', color: 'purple', key: '3' },
                 { icon: '💬', color: 'orange', key: '4' },
                 { icon: '📋', color: 'pink', key: '5' },
                 { icon: '⚡', color: 'cyan', key: '6' }
               ].map(f => (
                 <div key={f.key} className="feature-card reveal">
                    <div className={`feature-icon ${f.color}`}>{f.icon}</div>
                    <h3 data-i18n={`home_feat${f.key}_title`}>...</h3>
                    <p data-i18n={`home_feat${f.key}_desc`}>...</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* For Students Section */}
        <section className="students-section section">
          <div className="container">
            <div className="split-content">
              <div className="split-visual reveal">
                <style>{`
                  @keyframes tierSlideIn {
                    from { opacity: 0; transform: translateX(-18px); }
                    to   { opacity: 1; transform: translateX(0); }
                  }
                  @keyframes arrowDrop {
                    0%,100% { transform: translateY(0); opacity:.45; }
                    50%      { transform: translateY(5px); opacity:1; }
                  }
                  @keyframes premiumPulse {
                    0%,100% { box-shadow: 0 4px 24px rgba(99,102,241,.18); }
                    50%      { box-shadow: 0 8px 36px rgba(99,102,241,.38); }
                  }
                  @keyframes lockPop {
                    0%   { transform: scale(1); }
                    40%  { transform: scale(1.18) rotate(-8deg); }
                    70%  { transform: scale(0.95) rotate(4deg); }
                    100% { transform: scale(1); }
                  }
                  .tier-card-1 { animation: tierSlideIn .55s ease forwards; animation-delay:.12s; opacity:0; }
                  .tier-card-2 { animation: tierSlideIn .55s ease forwards; animation-delay:.32s; opacity:0; }
                  .tier-card-3 { animation: tierSlideIn .55s ease forwards, premiumPulse 2.8s ease infinite; animation-delay:.52s, .9s; opacity:0; }
                  .tier-arrow  { animation: arrowDrop 1.3s ease infinite; }
                  .tier-lock:hover { animation: lockPop .4s ease; }
                `}</style>

                <div style={{ padding: '4px 0' }}>
                  {/* Header pill */}
                  <div style={{ marginBottom: '18px', textAlign: 'center' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'rgba(99,102,241,.09)', border:'1.5px solid rgba(99,102,241,.18)', borderRadius:'20px', padding:'5px 16px', fontSize:'.78rem', fontWeight:700, color:'var(--color-brand)', letterSpacing:'.02em' }}>
                      🔑 How Access Works
                    </span>
                  </div>

                  {/* Tier 1 – Browse */}
                  <div className="tier-card-1" style={{ background:'#fff', borderRadius:'16px', padding:'13px 16px', display:'flex', alignItems:'center', gap:'13px', boxShadow:'0 2px 14px rgba(0,0,0,.06)', border:'1.5px solid #e2e8f0' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'linear-gradient(135deg,#10b981,#34d399)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>🌐</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:'.88rem', color:'#1e293b' }}>Browse &amp; Explore</div>
                      <div style={{ fontSize:'.72rem', color:'#64748b', marginTop:'2px' }}>View all listings &amp; details freely</div>
                    </div>
                    <span style={{ background:'#dcfce7', color:'#15803d', borderRadius:'20px', padding:'3px 10px', fontSize:'.68rem', fontWeight:700, flexShrink:0 }}>FREE</span>
                  </div>

                  {/* Arrow */}
                  <div className="tier-arrow" style={{ textAlign:'center', padding:'7px 0', color:'#94a3b8', fontSize:'1.05rem' }}>↓</div>

                  {/* Tier 2 – Verified */}
                  <div className="tier-card-2" style={{ background:'#fff', borderRadius:'16px', padding:'13px 16px', display:'flex', alignItems:'center', gap:'13px', boxShadow:'0 2px 14px rgba(0,0,0,.06)', border:'1.5px solid #bfdbfe' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'linear-gradient(135deg,#3b82f6,#60a5fa)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>🎓</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:'.88rem', color:'#1e293b' }}>Student Verified</div>
                      <div style={{ fontSize:'.72rem', color:'#64748b', marginTop:'2px' }}>Upload your student ID card</div>
                    </div>
                    <span style={{ background:'#dbeafe', color:'#1d4ed8', borderRadius:'20px', padding:'3px 10px', fontSize:'.68rem', fontWeight:700, flexShrink:0 }}>STEP 2</span>
                  </div>

                  {/* Arrow */}
                  <div className="tier-arrow" style={{ textAlign:'center', padding:'7px 0', color:'#94a3b8', fontSize:'1.05rem' }}>↓</div>

                  {/* Tier 3 – Premium */}
                  <div className="tier-card-3" style={{ background:'linear-gradient(135deg,rgba(99,102,241,.06),rgba(168,85,247,.06))', borderRadius:'16px', padding:'13px 16px', display:'flex', alignItems:'center', gap:'13px', border:'1.5px solid rgba(99,102,241,.3)' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:'linear-gradient(135deg,#6366f1,#a855f7)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>⭐</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:'.88rem', color:'#1e293b' }}>Premium Unlocked</div>
                      <div style={{ fontSize:'.72rem', color:'#64748b', marginTop:'2px' }}>Contact owners · Sign contracts · Pay</div>
                    </div>
                    <span style={{ background:'linear-gradient(135deg,#6366f1,#a855f7)', color:'#fff', borderRadius:'20px', padding:'3px 10px', fontSize:'.68rem', fontWeight:700, flexShrink:0, whiteSpace:'nowrap' }}>25 TND/yr</span>
                  </div>

                  {/* Action pills */}
                  <div style={{ display:'flex', gap:'8px', marginTop:'14px', background:'rgba(0,0,0,.03)', borderRadius:'12px', padding:'11px 14px' }}>
                    {[['💬','Contact'],['📄','Contract'],['💳','Pay']].map(([icon, label]) => (
                      <div key={label} style={{ flex:1, textAlign:'center' }}>
                        <div className="tier-lock" style={{ fontSize:'1.15rem', cursor:'default' }}>{icon}</div>
                        <div style={{ fontSize:'.63rem', color:'#64748b', fontWeight:600, marginTop:'3px' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="split-text reveal">
                <div className="section-tag">For Students</div>
                <h2>Built for Students, By Students</h2>
                <p>We understand the unique challenges of finding student housing in Tunisia. Browse freely, get verified, and unlock full access with Premium.</p>
                <ul className="benefit-list">
                  <li><span className="benefit-icon">✓</span> <span>Browse all listings for free — no upgrade needed</span></li>
                  <li><span className="benefit-icon">✓</span> <span>Get verified with your student ID card</span></li>
                  <li><span className="benefit-icon">✓</span> <span>Go Premium to contact owners, sign digital contracts &amp; pay securely</span></li>
                </ul>
                <a href="/register" className="btn btn-primary btn-lg">Start Your Search</a>
              </div>
            </div>
          </div>
        </section>

        {/* For Owners Section */}
        <section className="owners-section section">
          <div className="container">
            <div className="split-content">
              <div className="split-text reveal">
                <div className="section-tag" data-i18n="home_owners_tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>For Owners</div>
                <h2 data-i18n="home_owners_title">Reach Thousands of Verified Students</h2>
                <p data-i18n="home_owners_subtitle">List your property on UNIDAR and connect with verified university students.</p>
                <ul className="benefit-list">
                  <li><span className="benefit-icon" style={{ background: 'linear-gradient(135deg, #fbbf24, #fb923c)' }}>✓</span> <span data-i18n="home_owners_benefit1">Free listing creation</span></li>
                  <li><span className="benefit-icon" style={{ background: 'linear-gradient(135deg, #fbbf24, #fb923c)' }}>✓</span> <span data-i18n="home_owners_benefit2">Direct messaging</span></li>
                  <li><span className="benefit-icon" style={{ background: 'linear-gradient(135deg, #fbbf24, #fb923c)' }}>✓</span> <span data-i18n="home_owners_benefit3">Manage bookings</span></li>
                </ul>
                <a href="/register" className="btn btn-primary btn-lg" data-i18n="home_owners_cta">List Your Property</a>
              </div>
              <div className="split-visual reveal">
                <div className="glow-card">
                  <div className="glow-card-content">
                    <div className="stats-grid">
                      <div className="stat-item">
                        <div className="stat-number">95%</div>
                        <div className="stat-label" data-i18n="home_stat_occupancy">Occupancy Rate</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">24h</div>
                        <div className="stat-label" data-i18n="home_stat_response">Avg. Response</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">4.9/5</div>
                        <div className="stat-label" data-i18n="home_stat_satisfaction">Owner Satisfaction</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">100k+</div>
                        <div className="stat-label" data-i18n="home_stat_started">Students Reached</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-section section">
          <div className="container">
            <div className="section-header">
              <div className="section-tag" data-i18n="home_how_tag">How It Works</div>
              <h2 data-i18n="home_how_title">Get Started in 3 Simple Steps</h2>
              <p data-i18n="home_how_subtitle">Finding your perfect student housing has never been easier.</p>
            </div>
            <div className="steps-container">
               {[1,2,3].map(i => (
                 <div key={i} className={`step-card reveal stagger-${i}`}>
                    <div className="step-number">{i}</div>
                    <h3 data-i18n={`home_step${i}_title`}>Step {i}</h3>
                    <p data-i18n={`home_step${i}_desc`}>Description for step {i}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Trust & Safety */}
        <section className="trust-section section">
            <div className="container">
                <div className="section-header">
                    <div className="section-tag" data-i18n="home_trust_tag">Security</div>
                    <h2 data-i18n="home_trust_title">Your Safety First</h2>
                </div>
                <div className="trust-badges">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="trust-badge reveal">
                            <span className="trust-badge-icon">{['🎓','🔒','✅','🛡️','⭐'][i-1]}</span>
                            <span className="trust-badge-text" data-i18n={`home_trust_badge${i}`}>...</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content reveal">
              <h2 data-i18n="home_cta_title">Ready to Find Your Perfect Home?</h2>
              <p data-i18n="home_cta_subtitle">Join thousands of Tunisian students who have already found their ideal housing through UNIDAR. Start your search today—it's free!</p>
              <a href="/register" className="btn btn-primary" data-i18n="home_cta_btn">Get Started for Free</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3><span style={{ color: 'var(--color-primary-400)' }}>UNI</span>DAR</h3>
              <p data-i18n="footer_brand_desc">The premier student housing platform in Tunisia.</p>
            </div>
            <div className="footer-links">
               <h4 data-i18n="footer_platform">Platform</h4>
               <ul>
                 <li><a href="/listings" data-i18n="footer_browse">Browse</a></li>
                 <li><a href="/roommates" data-i18n="footer_find_roommates">Roommates</a></li>
               </ul>
            </div>
            <div className="footer-links">
               <h4 data-i18n="footer_for_owners">For Owners</h4>
               <ul>
                 <li><a href="/register" data-i18n="footer_list_property">List Property</a></li>
               </ul>
            </div>
            <div className="footer-links">
               <h4 data-i18n="footer_support">Support</h4>
               <ul>
                 <li><a href="#" data-i18n="footer_contact">Contact Us</a></li>
               </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p data-i18n="footer_copyright">© 2026 UNIDAR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Script id="home-dynamic-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        async function initHome() {
          try {
            const api = window.UNIDAR_API;
            if (!api) return;
            const auth = await api.Auth.check();
            if (auth && auth.authenticated) {
              document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'block');
              const actions = document.getElementById('headerActions');
              if (actions) {
                const dashUrl = auth.user.role === 'admin' ? '/admin' : (auth.user.role === 'owner' ? '/owner-listings' : '/user-dashboard');
                const firstName = auth.user.full_name ? auth.user.full_name.split(' ')[0] : 'User';
                actions.innerHTML = '<span class="text-muted mr-md" style="color:#64748b">Hi, ' + firstName + '</span>' +
                                  '<a href="' + dashUrl + '" class="btn btn-primary btn-sm">Dashboard</a>';
              }
            }
          } catch(e) {}
          
          const reveal = () => {
            document.querySelectorAll(".reveal").forEach(el => {
              if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add("active");
            });
          };
          window.addEventListener("scroll", reveal);
          setTimeout(reveal, 500);
        }

        initHome();
      ` }} />
    </>
  );
}

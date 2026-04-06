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
                  @keyframes tierIn {
                    from { opacity:0; transform:translateY(14px); }
                    to   { opacity:1; transform:translateY(0); }
                  }
                  @keyframes premiumGlow {
                    0%,100% { box-shadow:0 4px 20px rgba(99,102,241,.12), 0 0 0 0 rgba(99,102,241,0); }
                    50%     { box-shadow:0 8px 36px rgba(99,102,241,.22), 0 0 0 5px rgba(99,102,241,.06); }
                  }
                  @keyframes orbFloat {
                    0%,100% { transform:translate(0,0) scale(1); }
                    40%     { transform:translate(10px,-8px) scale(1.06); }
                    70%     { transform:translate(-6px,5px) scale(.96); }
                  }
                  @keyframes connFade {
                    0%,100% { opacity:.3; }
                    50%     { opacity:.7; }
                  }
                  .tc1 { animation:tierIn .5s cubic-bezier(.22,1,.36,1) .08s both; }
                  .tc2 { animation:tierIn .5s cubic-bezier(.22,1,.36,1) .24s both; }
                  .tc3 { animation:tierIn .5s cubic-bezier(.22,1,.36,1) .4s both, premiumGlow 2.8s ease infinite .7s; }
                  .t-orb-1 { animation:orbFloat 7s ease infinite; }
                  .t-orb-2 { animation:orbFloat 9s ease infinite reverse; }
                  .t-conn   { animation:connFade 1.6s ease infinite; }
                `}</style>

                {/* Glass card wrapper */}
                <div style={{
                  position:'relative',
                  background:'linear-gradient(150deg,rgba(255,255,255,.92) 0%,rgba(248,250,252,.95) 100%)',
                  borderRadius:'28px',
                  padding:'32px 28px 26px',
                  border:'1.5px solid rgba(226,232,240,.9)',
                  boxShadow:'0 10px 48px rgba(0,0,0,.07), 0 1px 0 rgba(255,255,255,.95) inset',
                  overflow:'hidden'
                }}>

                  {/* Decorative orbs */}
                  <div className="t-orb-1" style={{ position:'absolute', top:'-40px', right:'-40px', width:'180px', height:'180px', background:'radial-gradient(circle, rgba(99,102,241,.13) 0%, transparent 68%)', borderRadius:'50%', pointerEvents:'none' }} />
                  <div className="t-orb-2" style={{ position:'absolute', bottom:'-30px', left:'-30px', width:'130px', height:'130px', background:'radial-gradient(circle, rgba(168,85,247,.1) 0%, transparent 68%)', borderRadius:'50%', pointerEvents:'none' }} />

                  {/* Header pill */}
                  <div style={{ textAlign:'center', marginBottom:'26px' }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:'7px',
                      background:'linear-gradient(135deg,rgba(99,102,241,.1),rgba(168,85,247,.08))',
                      border:'1px solid rgba(99,102,241,.22)',
                      borderRadius:'30px', padding:'7px 20px',
                      fontSize:'.73rem', fontWeight:800, color:'#6366f1', letterSpacing:'.06em', textTransform:'uppercase'
                    }}>
                      🔑 <span data-i18n="tier_how_access">HOW ACCESS WORKS</span>
                    </span>
                  </div>

                  {/* Tier 1 – Browse */}
                  <div className="tc1" style={{
                    background:'#fff', borderRadius:'18px',
                    padding:'18px 20px', display:'flex', alignItems:'center', gap:'16px',
                    boxShadow:'0 2px 16px rgba(0,0,0,.05), 0 1px 0 rgba(255,255,255,.9) inset',
                    border:'1px solid #f0fdf4', borderLeft:'4px solid #10b981'
                  }}>
                    <div style={{
                      width:'52px', height:'52px', borderRadius:'16px', flexShrink:0,
                      background:'linear-gradient(135deg,#10b981,#34d399)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'1.4rem', boxShadow:'0 4px 14px rgba(16,185,129,.28)'
                    }}>🌐</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div data-i18n="tier_browse_title" style={{ fontWeight:700, fontSize:'.95rem', color:'#0f172a', letterSpacing:'-.015em' }}>Browse &amp; Explore</div>
                      <div data-i18n="tier_browse_desc" style={{ fontSize:'.77rem', color:'#64748b', marginTop:'4px', lineHeight:1.4 }}>View all listings &amp; details — no upgrade needed</div>
                    </div>
                    <div data-i18n="tier_badge_free" style={{
                      background:'linear-gradient(135deg,#d1fae5,#a7f3d0)',
                      color:'#065f46', borderRadius:'20px', flexShrink:0,
                      padding:'5px 13px', fontSize:'.68rem', fontWeight:800, letterSpacing:'.05em'
                    }}>FREE ✓</div>
                  </div>

                  {/* Connector 1 */}
                  <div style={{ display:'flex', alignItems:'stretch', paddingLeft:'38px', height:'28px' }}>
                    <div className="t-conn" style={{ width:'2px', background:'linear-gradient(to bottom,#10b981,#3b82f6)', borderRadius:'2px', margin:'0 auto' }} />
                  </div>

                  {/* Tier 2 – Verified */}
                  <div className="tc2" style={{
                    background:'#fff', borderRadius:'18px',
                    padding:'18px 20px', display:'flex', alignItems:'center', gap:'16px',
                    boxShadow:'0 2px 16px rgba(0,0,0,.05), 0 1px 0 rgba(255,255,255,.9) inset',
                    border:'1px solid #eff6ff', borderLeft:'4px solid #3b82f6'
                  }}>
                    <div style={{
                      width:'52px', height:'52px', borderRadius:'16px', flexShrink:0,
                      background:'linear-gradient(135deg,#3b82f6,#60a5fa)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'1.4rem', boxShadow:'0 4px 14px rgba(59,130,246,.28)'
                    }}>🎓</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div data-i18n="tier_verify_title" style={{ fontWeight:700, fontSize:'.95rem', color:'#0f172a', letterSpacing:'-.015em' }}>Student Verified</div>
                      <div data-i18n="tier_verify_desc" style={{ fontSize:'.77rem', color:'#64748b', marginTop:'4px', lineHeight:1.4 }}>Upload your student ID card to confirm enrollment</div>
                    </div>
                    <div data-i18n="tier_badge_step2" style={{
                      background:'linear-gradient(135deg,#dbeafe,#bfdbfe)',
                      color:'#1e40af', borderRadius:'20px', flexShrink:0,
                      padding:'5px 13px', fontSize:'.68rem', fontWeight:800, letterSpacing:'.05em'
                    }}>STEP 2 →</div>
                  </div>

                  {/* Connector 2 */}
                  <div style={{ display:'flex', alignItems:'stretch', paddingLeft:'38px', height:'28px' }}>
                    <div className="t-conn" style={{ width:'2px', background:'linear-gradient(to bottom,#3b82f6,#6366f1)', borderRadius:'2px', margin:'0 auto' }} />
                  </div>

                  {/* Tier 3 – Premium */}
                  <div className="tc3" style={{
                    background:'linear-gradient(135deg,#fafaff,#f5f3ff)',
                    borderRadius:'18px', padding:'18px 20px',
                    display:'flex', alignItems:'center', gap:'16px',
                    border:'1px solid rgba(99,102,241,.18)', borderLeft:'4px solid #6366f1',
                    position:'relative', overflow:'hidden'
                  }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(110deg,transparent 38%,rgba(255,255,255,.55) 50%,transparent 62%)', pointerEvents:'none' }} />
                    <div style={{
                      width:'52px', height:'52px', borderRadius:'16px', flexShrink:0,
                      background:'linear-gradient(135deg,#6366f1,#a855f7)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'1.4rem', boxShadow:'0 4px 16px rgba(99,102,241,.38)'
                    }}>⭐</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div data-i18n="tier_premium_title" style={{ fontWeight:700, fontSize:'.95rem', color:'#0f172a', letterSpacing:'-.015em' }}>Premium Unlocked</div>
                      <div data-i18n="tier_premium_desc" style={{ fontSize:'.77rem', color:'#64748b', marginTop:'4px', lineHeight:1.4 }}>Contact owners · Sign contracts · Pay securely</div>
                    </div>
                    <div style={{
                      background:'linear-gradient(135deg,#6366f1,#a855f7)',
                      color:'#fff', borderRadius:'20px', flexShrink:0,
                      padding:'5px 13px', fontSize:'.68rem', fontWeight:800,
                      letterSpacing:'.04em', whiteSpace:'nowrap',
                      boxShadow:'0 3px 10px rgba(99,102,241,.4)'
                    }}>25 TND/yr</div>
                  </div>

                  {/* Premium actions row */}
                  <div style={{
                    marginTop:'20px',
                    background:'linear-gradient(135deg,rgba(99,102,241,.06),rgba(168,85,247,.06))',
                    border:'1px dashed rgba(99,102,241,.22)',
                    borderRadius:'16px', padding:'16px 18px'
                  }}>
                    <div style={{ fontSize:'.67rem', fontWeight:800, color:'#6366f1', textTransform:'uppercase', letterSpacing:'.08em', textAlign:'center', marginBottom:'12px' }}>
                      🔓 <span data-i18n="tier_premium_actions_label">Premium-only Actions</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px' }}>
                      {[
                        { icon:'💬', iKey:'tier_action_contact', sKey:'tier_action_contact_sub', label:'Contact', sub:'Owner' },
                        { icon:'📄', iKey:'tier_action_contract', sKey:'tier_action_contract_sub', label:'Contract', sub:'Digital' },
                        { icon:'💳', iKey:'tier_action_pay', sKey:'tier_action_pay_sub', label:'Pay', sub:'Secure' }
                      ].map(({ icon, iKey, sKey, label, sub }) => (
                        <div key={iKey} style={{
                          textAlign:'center', padding:'12px 6px',
                          background:'rgba(255,255,255,.75)',
                          borderRadius:'12px',
                          border:'1px solid rgba(99,102,241,.1)',
                          backdropFilter:'blur(6px)'
                        }}>
                          <div style={{ fontSize:'1.3rem', lineHeight:1 }}>{icon}</div>
                          <div data-i18n={iKey} style={{ fontSize:'.74rem', fontWeight:700, color:'#1e293b', marginTop:'6px' }}>{label}</div>
                          <div data-i18n={sKey} style={{ fontSize:'.62rem', color:'#94a3b8', marginTop:'2px' }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              <div className="split-text reveal">
                <div className="section-tag" data-i18n="home_students_tag">For Students</div>
                <h2 data-i18n="home_students_title">Built for Students, By Students</h2>
                <p data-i18n="home_students_subtitle">We understand the unique challenges of finding student housing in Tunisia. Browse freely, get verified, and unlock full access with Premium.</p>
                <ul className="benefit-list">
                  <li><span className="benefit-icon">✓</span> <span data-i18n="home_students_benefit1">Browse all listings for free — no upgrade needed</span></li>
                  <li><span className="benefit-icon">✓</span> <span data-i18n="home_students_benefit2">Get verified with your student ID card</span></li>
                  <li><span className="benefit-icon">✓</span> <span data-i18n="home_students_benefit3">Go Premium to contact owners, sign digital contracts &amp; pay securely</span></li>
                </ul>
                <a href="/register" className="btn btn-primary btn-lg" data-i18n="home_students_cta">Start Your Search</a>
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

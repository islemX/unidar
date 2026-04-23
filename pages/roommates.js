/**
 * UNIDAR – Roommate Matching Page (Premium)
 */
import Head from 'next/head';
import Script from 'next/script';

export default function RoommatesPage() {
  return (
    <>
      <Head><title>Find Roommates - UNIDAR</title></Head>
      
      {/* Navbar */}
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo" aria-label="UNIDAR"><img src="/logo.svg" alt="UNIDAR" style={{height:'40px',width:'auto',display:'block'}} /></a>
          <div className="nav-links">
            <a href="/listings" className="nav-link">Listings</a>
            <a href="/roommates" className="nav-link active">Roommates</a>
            <a href="/user-dashboard" className="nav-link">Dashboard</a>
          </div>
          <div className="flex items-center gap-md">
            <button id="logoutBtn" className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      {/* Preferences Modal (match PHP version options/fields) */}
      <div id="preferencesModal" className="modal-overlay" style={{ display: 'none', zIndex: 1000, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="modal-content glow-card-premium" style={{ maxWidth: 550, width: '95%', margin: '40px auto', position: 'relative' }}>
            <div className="matching-overlay" id="matchingOverlay">
                <div className="matching-pulse"><span style={{ fontSize: '3rem' }}>🤝</span></div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: 800 }} data-i18n="roommate_overlay_title">Finding Matches</h3>
                <p className="text-muted" data-i18n="roommate_overlay_sub">Analyzing compatibility scores...</p>
            </div>

            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
                <div className="flex justify-between items-center mb-lg">
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-brand)' }} data-i18n="roommate_prefs_title">Preferences</h2>
                        <p className="text-muted" data-i18n="roommate_prefs_subtitle">Tell us who you&apos;re looking for</p>
                    </div>
                    <button id="closePrefs" className="btn btn-secondary" style={{ borderRadius: '50%', width: 40, height: 40, padding: 0 }}>✕</button>
                </div>

                <form id="preferencesForm" style={{ overflowY: 'auto', paddingRight: 10 }}>
                    <div className="flex-column gap-lg">
                        <div className="form-group">
                            <label className="form-label uppercase font-bold text-tiny text-muted" data-i18n="pref_monthly_budget">Monthly Budget (TND)</label>
                            <div className="grid grid-2 gap-md">
                                <input type="number" id="budget_min" className="form-input" placeholder="Min" />
                                <input type="number" id="budget_max" className="form-input" placeholder="Max" />
                            </div>
                        </div>

                        {/* Cleanliness Visual Selector */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_cleanliness">Cleanliness</span>
                            <div className="visual-selector" id="cleanlinessSelectors">
                                {[
                                  { v:'relaxed', icon:'🧸', labelKey:'pref_relaxed' },
                                  { v:'moderate', icon:'🧹', labelKey:'pref_moderate' },
                                  { v:'clean', icon:'✨', labelKey:'pref_clean' },
                                  { v:'very_clean', icon:'🧼', labelKey:'pref_very_clean' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="cleanliness" data-value={v}>
                                        <input type="radio" name="cleanliness" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sleep Schedule */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_sleep">Sleep Schedule</span>
                            <div className="visual-selector">
                                {[
                                  { v:'early_riser', icon:'☀️', labelKey:'pref_early_riser' },
                                  { v:'normal', icon:'☕', labelKey:'pref_normal' },
                                  { v:'night_owl', icon:'🦉', labelKey:'pref_night_owl' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="sleep" data-value={v}>
                                        <input type="radio" name="sleep_schedule" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Gender Pref */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_gender">Gender Preference</span>
                            <div className="visual-selector">
                                {[
                                  { v:'male', icon:'👨', labelKey:'pref_male' },
                                  { v:'female', icon:'👩', labelKey:'pref_female' },
                                  { v:'no_preference', icon:'🤷', labelKey:'pref_no_preference' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="gender" data-value={v}>
                                        <input type="radio" name="gender_preference" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Smoking */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_smoking">Smoking</span>
                            <div className="visual-selector">
                                {[
                                  { v:'non_smoker', icon:'🚭', labelKey:'pref_non_smoker' },
                                  { v:'smoker', icon:'🚬', labelKey:'pref_smoker' },
                                  { v:'no_preference', icon:'🤷‍♂️', labelKey:'pref_any' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="smoking" data-value={v}>
                                        <input type="radio" name="smoking_preference" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Noise Tolerance */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_noise">Noise Tolerance</span>
                            <div className="visual-selector">
                                {[
                                  { v:'quiet', icon:'🤫', labelKey:'pref_quiet' },
                                  { v:'moderate', icon:'🔉', labelKey:'pref_moderate' },
                                  { v:'social', icon:'🎉', labelKey:'pref_social' },
                                  { v:'no_preference', icon:'🤷', labelKey:'pref_any' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="noise" data-value={v}>
                                        <input type="radio" name="noise_tolerance" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Guests */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_guests">Guests Policy</span>
                            <div className="visual-selector">
                                {[
                                  { v:'no_guests', icon:'🚫', labelKey:'pref_no_guests' },
                                  { v:'occasional', icon:'👥', labelKey:'pref_occasional' },
                                  { v:'no_preference', icon:'🤷‍♂️', labelKey:'pref_any' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="guests" data-value={v}>
                                        <input type="radio" name="guests" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Pets */}
                        <div>
                            <span className="form-label uppercase font-bold text-tiny text-muted mb-sm block" data-i18n="pref_pets">Pets</span>
                            <div className="visual-selector">
                                {[
                                  { v:'no_pets', icon:'🚫', labelKey:'pref_no_pets' },
                                  { v:'pets_ok', icon:'🐾', labelKey:'pref_pets_ok' },
                                  { v:'no_preference', icon:'🤷', labelKey:'pref_any' }
                                ].map(({ v, icon, labelKey }) => (
                                    <label key={v} className="visual-option" data-group="pets" data-value={v}>
                                        <input type="radio" name="pets" value={v} />
                                        <span className="visual-option-icon">{icon}</span>
                                        <span className="visual-option-label" data-i18n={labelKey}>{v.replace('_', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Age Range */}
                        <div className="form-group">
                            <label className="form-label uppercase font-bold text-tiny text-muted" data-i18n="pref_age_range">Age Range</label>
                            <div className="grid grid-2 gap-md">
                                <input type="number" id="age_min" className="form-input" data-i18n-placeholder="pref_age_min_placeholder" placeholder="Min age" min="18" max="100" />
                                <input type="number" id="age_max" className="form-input" data-i18n-placeholder="pref_age_max_placeholder" placeholder="Max age" min="18" max="100" />
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 16, borderRadius: 12, fontWeight: 800 }} data-i18n="roommate_save_matches">
                           Save &amp; Find Matches
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>

      <main className="section page-transition">
        <div className="container">
          {/* Premium Hero */}
          <div className="roommate-hero">
            <div className="floating-shapes">
              <div className="shape" style={{ width: 400, height: 400, background: 'rgba(255,255,255,0.05)', top: -150, right: -100, filter: 'blur(40px)' }}></div>
              <div className="shape" style={{ width: 250, height: 250, background: 'rgba(255,255,255,0.03)', bottom: -50, left: -50, filter: 'blur(30px)' }}></div>
            </div>
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 650 }}>
              <div className="hero-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }} data-i18n="roommate_hero_badge">✨ Smart Matching</div>
              <h1 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '3.5rem', fontWeight: 800 }} data-i18n="roommate_hero_title">Find Your Ideal Roommate</h1>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem', color: 'white' }} data-i18n="roommate_hero_subtitle">
                Don&apos;t settle for just anyone. Our algorithm matches you with students who share your lifestyle and habits.
              </p>
              <button className="btn" id="openPrefsBtn" style={{ background: 'white', color: 'var(--color-brand)', fontWeight: 800, borderRadius: 14 }} data-i18n="roommate_open_prefs">
                ⚙️ Update My Preferences
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div id="matchesContainer" className="roommate-grid">
            <div className="flex-column items-center justify-center p-2xl" style={{ gridColumn: '1/-1' }}>
              <div className="matching-pulse">🤝</div>
              <p className="text-muted font-bold mt-md">Finding compatibility matches...</p>
            </div>
          </div>
        </div>
      </main>

      <Script id="roommate-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        const _t = k => window.UNIDAR_I18N?.t(k) || k;
        let currentUser = null;

        async function loadMatches() {
          const api = window.UNIDAR_API;
          if (!api) return;
          const container = document.getElementById('matchesContainer');
          if (!container) return;

          try {
            const data = await api.Roommates.getMatches();
            const matches = (data.matches || []).filter(m => m.user_id !== (currentUser ? currentUser.id : -1));
            
            if (!matches.length) {
              container.innerHTML = '<div class="glass p-2xl text-center" style="grid-column:1/-1;border-radius:24px">' +
                '<h2 style="font-size:2rem;font-weight:800">' + _t('roommate_no_matches') + '</h2>' +
                '<p class="text-muted">' + _t('roommate_no_matches_sub') + '</p>' +
              '</div>';
              return;
            }

            container.innerHTML = matches.map((m, idx) => {
              const initials = (m.full_name || 'U').split(' ').map(n=>n[0]).join('').toUpperCase().substring(0,2);
              const score = Math.round(m.compatibility_score || 0);
              const offset = 188.5 * (1 - score / 100);
              
              return '<div class="roommate-card-v2 stagger-' + ((idx % 3) + 1) + '">' +
                '<div class="flex justify-between items-start">' +
                  '<div class="profile-avatar-pro" style="margin:0;width:60px;height:60px;font-size:1.5rem;border-radius:18px">' + initials + '</div>' +
                  '<div class="comp-gauge">' +
                    '<svg class="comp-svg" viewBox="0 0 64 64"><circle class="comp-bg" cx="32" cy="32" r="30"></circle>' +
                    '<circle class="comp-fill" cx="32" cy="32" r="30" stroke-dasharray="188.4" style="stroke-dashoffset:' + offset + '"></circle></svg>' +
                    '<span class="comp-text">' + score + '%</span>' +
                  '</div>' +
                '</div>' +
                '<div style="flex-grow:1">' +
                  '<h3 style="font-size:1.4rem;font-weight:800;color:#1e293b;margin-bottom:4px">' + m.full_name + '</h3>' +
                  '<p class="text-tiny uppercase font-bold text-muted">🎓 ' + (m.university || 'Étudiant') + '</p>' +
                  '<div class="flex flex-wrap gap-xs mt-md">' +
                    '<span class="badge badge-premium">✨ ' + (m.preferences?.cleanliness_level || 'Clean') + '</span>' +
                    '<span class="badge badge-premium">☕ ' + (m.preferences?.sleep_schedule || 'Normal') + '</span>' +
                  '</div>' +
                '</div>' +
                '<button onclick="startRoommateChat(' + m.user_id + ')" class="btn btn-primary" style="width:100%;border-radius:12px;font-weight:800">' + _t('roommate_message') + '</button>' +
              '</div>';
            }).join('');

          } catch (e) { console.error(e); }
        }

        async function initRoommates() {
          const api = window.UNIDAR_API;
          if (!api) return;
          const auth = await api.Auth.check();
          if (!auth || !auth.authenticated) { window.location.href = '/login'; return; }
          currentUser = auth.user;

          // Setup visual selectors
          document.querySelectorAll('.visual-option').forEach(opt => {
             opt.onclick = function() {
                const group = this.dataset.group;
                document.querySelectorAll('.visual-option[data-group="' + group + '"]').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                const radio = this.querySelector('input');
                if (radio) radio.checked = true;
             };
          });

          // Load existing preferences
          try {
             const pRes = await api.Roommates.getPreferences();
             const p = pRes.preferences;
             if (p) {
                if (document.getElementById('budget_min')) document.getElementById('budget_min').value = p.budget_min || '';
                if (document.getElementById('budget_max')) document.getElementById('budget_max').value = p.budget_max || '';
                
                const groupMap = { 'cleanliness_level': 'cleanliness', 'gender_preference': 'gender', 'smoking': 'smoking', 'sleep_schedule': 'sleep', 'noise_level': 'noise' };
                Object.keys(groupMap).forEach(key => {
                   const val = p[key];
                   if (val) {
                      const opt = document.querySelector('.visual-option[data-group="' + groupMap[key] + '"][data-value="' + val + '"]');
                      if (opt) { 
                        opt.classList.add('active'); 
                        const r = opt.querySelector('input');
                        if (r) r.checked = true;
                      }
                   }
                });
             }
          } catch (e) {}

          loadMatches();
        }

        window.startRoommateChat = (uid) => {
          // Prefer the floating widget (PHP behavior)
          window.dispatchEvent(new CustomEvent('openChat', { detail: { userId: uid } }));
          if (window.chatWidget) window.chatWidget.toggle(true);
        };

        const modal = document.getElementById('preferencesModal');
        document.getElementById('openPrefsBtn')?.addEventListener('click', () => { if (modal) modal.style.display = 'flex'; });
        document.getElementById('closePrefs')?.addEventListener('click', () => { if (modal) modal.style.display = 'none'; });

        document.getElementById('preferencesForm')?.addEventListener('submit', async (e) => {
           e.preventDefault();
           const overlay = document.getElementById('matchingOverlay');
           if (overlay) overlay.classList.add('active');
           
           const prefs = {
             budget_min: document.getElementById('budget_min').value || null,
             budget_max: document.getElementById('budget_max').value || null,
             age_min: document.getElementById('age_min')?.value || null,
             age_max: document.getElementById('age_max')?.value || null,
             cleanliness_level: document.querySelector('input[name="cleanliness"]:checked')?.value || null,
             sleep_schedule: document.querySelector('input[name="sleep_schedule"]:checked')?.value || null,
             gender_preference: document.querySelector('input[name="gender_preference"]:checked')?.value || 'no_preference',
             smoking_preference: document.querySelector('input[name="smoking_preference"]:checked')?.value || 'no_preference',
             noise_tolerance: document.querySelector('input[name="noise_tolerance"]:checked')?.value || 'no_preference',
             guests: document.querySelector('input[name="guests"]:checked')?.value || 'no_preference',
             pets: document.querySelector('input[name="pets"]:checked')?.value || 'no_preference'
           };

           try {
             await window.UNIDAR_API.Roommates.savePreferences(prefs);
             setTimeout(() => {
                if (overlay) overlay.classList.remove('active');
                if (modal) modal.style.display = 'none';
                loadMatches();
             }, 1000);
           } catch (err) { if (overlay) overlay.classList.remove('active'); }
        });

        document.getElementById('logoutBtn')?.addEventListener('click', async () => {
          await window.UNIDAR_API.Auth.logout(); window.location.href = '/login';
        });

        initRoommates();
      ` }} />
    </>
  );
}

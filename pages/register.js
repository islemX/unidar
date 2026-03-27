/**
 * UNIDAR – Register Page
 * Matches PHP version exactly (Map + Premium Layout)
 */
import Head from 'next/head';
import Script from 'next/script';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register - UNIDAR</title>
        {/* Leaflet CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
      </Head>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <span style={{ color: 'var(--color-brand)' }}>UNI</span>DAR
          </a>
          <div className="nav-links">
            <a href="/login" className="nav-link" data-i18n="nav_login">Log In</a>
            <a href="/register" className="nav-link active" data-i18n="nav_signup">Sign Up</a>
          </div>
        </div>
      </nav>

      <div className="section" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '40px 0' }}>
        <div className="container" style={{ maxWidth: 650 }}>
          <div className="card fade-in-up">
            <div className="card-header text-center">
              <div className="section-tag" data-i18n="register_welcome">Join US</div>
              <h1 className="mb-xs" data-i18n="register_title">Create Account</h1>
              <p className="text-muted" data-i18n="register_start">Start your journey with UNIDAR</p>
            </div>
            <div className="card-body">
              <form id="registerForm">
                {/* Name & Role row */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 'var(--space-md)' }}>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label className="form-label" htmlFor="full_name" data-i18n="register_fullname">Full Name</label>
                    <input type="text" id="full_name" className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label className="form-label" htmlFor="role" data-i18n="register_role">I am a</label>
                    <select id="role" className="form-input" required>
                      <option value="" data-i18n="register_role_select">Select...</option>
                      <option value="student" data-i18n="register_student">Student</option>
                      <option value="owner" data-i18n="register_owner">Property Owner</option>
                    </select>
                  </div>
                </div>

                {/* Gender Field (Student Only) */}
                <div id="genderGroup" style={{ display: 'none' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="gender">Gender *</label>
                    <select id="gender" className="form-input">
                      <option value="">Select Gender...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email" data-i18n="register_email">Email Address</label>
                  <input type="email" id="email" className="form-input" placeholder="student@university.edu" required />
                  <span className="form-hint" data-i18n="register_email_hint">University email helps with trust and verification.</span>
                </div>

                {/* Password & Confirm row */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 'var(--space-md)' }}>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label className="form-label" htmlFor="password" data-i18n="register_password">Password</label>
                    <input type="password" id="password" className="form-input" placeholder="Min. 8 characters" minLength="8" required />
                  </div>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label className="form-label" htmlFor="confirm_password" data-i18n="register_confirm">Confirm Password</label>
                    <input type="password" id="confirm_password" className="form-input" placeholder="Re-enter password" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone" data-i18n="register_phone">Phone Number (Optional)</label>
                  <input type="tel" id="phone" className="form-input" placeholder="+216 ..." />
                </div>

                {/* University Section (Student Only) */}
                <div id="universityGroup" style={{ display: 'none' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="university" data-i18n="register_university">University Name</label>
                    <input type="text" id="university" className="form-input" placeholder="e.g. ESPRIT, INSAT, MSB..." />
                  </div>

                  <div className="form-group">
                    <label className="form-label" data-i18n="register_map_radius">Search Radius (Preferred Area)</label>
                    <p className="text-small text-muted mb-sm" data-i18n="register_map_hint">Click on the map to mark your study area.</p>
                    <div id="map" style={{ height: 250, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: 10 }}></div>
                    <input type="hidden" id="preferred_lat" />
                    <input type="hidden" id="preferred_lng" />
                    <input type="hidden" id="preferred_address" />
                    <div id="selectedLocationDisplay" className="text-small" style={{ color: 'var(--color-brand)', fontWeight: 500 }}></div>
                  </div>
                </div>

                <div id="errorMessage" className="alert alert-error" style={{ display: 'none' }}></div>

                <button type="submit" id="submitBtn" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                  <span data-i18n="register_create">Create Account</span>
                </button>
              </form>

              <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
                <p className="text-small text-muted">
                  <span data-i18n="register_have_account">Already have an account? </span>
                  <a href="/login" style={{ fontWeight: 600 }} data-i18n="register_signin">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />
      <Script id="register-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        let map;
        let marker;

        function initMap() {
          if (map) return;
          const mapEl = document.getElementById('map');
          if (!mapEl || typeof L === 'undefined') {
            setTimeout(initMap, 200);
            return;
          }
          
          map = L.map('map').setView([36.8065, 10.1815], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
          }).addTo(map);

          map.on('click', onMapClick);
        }

        async function onMapClick(e) {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          if (marker) map.removeLayer(marker);
          marker = L.marker([lat, lng]).addTo(map);

          document.getElementById('preferred_lat').value = lat;
          document.getElementById('preferred_lng').value = lng;

          try {
            const res = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng);
            const data = await res.json();
            const address = data.display_name;
            document.getElementById('preferred_address').value = address;
            document.getElementById('selectedLocationDisplay').textContent = "📍 " + address;
          } catch (e) {
            document.getElementById('preferred_address').value = lat + "," + lng;
            document.getElementById('selectedLocationDisplay').textContent = "📍 " + lat.toFixed(4) + ", " + lng.toFixed(4);
          }
        }

        // Toggle Fields
        document.getElementById('role')?.addEventListener('change', (e) => {
          const isStudent = e.target.value === 'student';
          const uGrp = document.getElementById('universityGroup');
          const gGrp = document.getElementById('genderGroup');
          if (uGrp) uGrp.style.display = isStudent ? 'block' : 'none';
          if (gGrp) gGrp.style.display = isStudent ? 'block' : 'none';
          
          const uInp = document.getElementById('university');
          const gInp = document.getElementById('gender');
          if (uInp) uInp.required = isStudent;
          if (gInp) gInp.required = isStudent;

          if (isStudent) {
            setTimeout(() => {
              initMap();
              if (map) map.invalidateSize();
            }, 100);
          }
        });

        // Form Submit
        document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          const p1 = document.getElementById('password').value;
          const p2 = document.getElementById('confirm_password').value;
          const err = document.getElementById('errorMessage');
          const btn = document.getElementById('submitBtn');
          const role = document.getElementById('role').value;

          if (err) err.style.display = 'none';
          if (p1 !== p2) {
            if (err) { err.textContent = 'Passwords do not match'; err.style.display = 'block'; }
            return;
          }

          if (role === 'student' && !document.getElementById('preferred_lat').value) {
            if (err) { err.textContent = 'Please select your preferred location on the map.'; err.style.display = 'block'; }
            return;
          }

          const data = {
            full_name: document.getElementById('full_name').value,
            email: document.getElementById('email').value,
            password: p1,
            role: role,
            phone: document.getElementById('phone').value || null,
          };

          if (role === 'student') {
            data.university = document.getElementById('university').value;
            data.preferred_lat = document.getElementById('preferred_lat').value;
            data.preferred_lng = document.getElementById('preferred_lng').value;
            data.preferred_address = document.getElementById('preferred_address').value;
            data.gender = document.getElementById('gender').value;
          }

          if (btn) {
            btn.disabled = true;
            const span = btn.querySelector('span');
            if (span) span.textContent = 'Creating account...';
          }

          try {
            const res = await window.UNIDAR_API.Auth.register(data);
            if (res.user.role === 'admin') window.location.href = '/admin';
            else if (res.user.role === 'student') window.location.href = '/subscription';
            else if (res.user.role === 'owner') window.location.href = '/owner-listings';
            else window.location.href = '/user-dashboard';
          } catch (e) {
            if (err) { err.textContent = e.message || 'Error occurred'; err.style.display = 'block'; }
            if (btn) {
              btn.disabled = false;
              const span = btn.querySelector('span');
              if (span) span.textContent = 'Create Account';
            }
          }
        });
      ` }} />
    </>
  );
}

/**
 * UNIDAR – User Dashboard (Student)
 */
import Head from 'next/head';
import Script from 'next/script';

export default function UserDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - UNIDAR</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <span style={{ color: 'var(--color-brand)' }}>UNI</span>DAR
          </a>
          <div className="nav-links">
            <a href="/listings" className="nav-link">Listings</a>
            <a href="/roommates" className="nav-link">Roommates</a>
            <a href="/messages" className="nav-link">Messages</a>
            <a href="/verification" className="nav-link">Verification</a>
            <a href="/subscription" className="nav-link">Premium</a>
          </div>
          <div className="flex items-center gap-md">
            <button id="logoutBtn" className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      <main className="section page-transition">
        <div className="container">
          <div className="dashboard-container">
            <aside className="profile-side-card stagger-1">
              <div className="profile-content">
                <div className="profile-avatar-pro" id="avatarInitials">U</div>
                <h2 id="userName" className="title-bento mb-xs" style={{ fontSize: '1.5rem', fontWeight: 800 }}>User</h2>
                <p id="userEmail" className="text-bento-muted mb-xl">user@email.com</p>

                <div className="flex-column gap-md">
                  <div className="flex justify-between items-center p-md bg-surface-50 rounded-xl">
                    <span className="text-tiny uppercase font-bold text-bento-muted">Statut</span>
                    <span className="stat-badge">Actif</span>
                  </div>
                  <div className="flex justify-between items-center p-md bg-surface-50 rounded-xl">
                    <span className="text-tiny uppercase font-bold text-bento-muted">Subscription</span>
                    <span className="font-bold color-brand" id="subscriptionStatusCard">—</span>
                  </div>
                  <div className="flex justify-between items-center p-md bg-surface-50 rounded-xl">
                    <span className="text-tiny uppercase font-bold text-bento-muted">Favoris</span>
                    <span className="font-bold color-brand" id="statSavedCard">0</span>
                  </div>
                  <div className="flex justify-between items-center p-md bg-surface-50 rounded-xl">
                    <span className="text-tiny uppercase font-bold text-bento-muted">Contrats</span>
                    <span className="font-bold color-brand" id="statContractsCard">0</span>
                  </div>
                </div>
              </div>
            </aside>

            <div className="bento-grid">
              {/* Banner Container */}
              <div id="bannerContainer" style={{ gridColumn: 'span 6' }}></div>

              <section className="bento-tile tile-hero stagger-1">
                <h1 id="welcomeTitle" className="mb-sm" style={{ fontSize: '2.8rem', letterSpacing: '-1.5px', color: 'white' }}>Welcome Back!</h1>
                <p id="welcomeSub" style={{ color: 'white', opacity: 0.9, fontSize: '1.1rem', maxWidth: '500px' }}>
                  Managing your university life just got a "pro" upgrade.
                </p>
              </section>

              <section className="bento-tile tile-map stagger-2">
                 <div className="p-lg flex justify-between items-center glass" style={{ position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10, borderRadius: 100 }}>
                    <h3 className="text-bento-muted font-bold m-0">Neighborhood Watch</h3>
                    <div className="stat-badge" id="mapCounter">0 nearby</div>
                 </div>
                 <div id="dashboardMap" style={{ height: '100%', minHeight: 250, borderRadius: 'inherit' }}></div>
              </section>

              <section className="bento-tile tile-contracts stagger-3">
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="title-bento m-0" style={{ fontSize: '1.4rem' }}>📄 Contracts</h3>
                  <button className="btn btn-secondary btn-sm" id="refreshContracts" style={{ borderRadius: 50 }}>Refresh</button>
                </div>
                <div id="contractsContainer" className="flex-column gap-sm">
                  <p className="text-muted">Loading contracts…</p>
                </div>
              </section>

              <section className="bento-tile tile-messages stagger-4">
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="title-bento m-0" style={{ fontSize: '1.4rem' }}>💬 Messages</h3>
                  <a href="/messages" className="stat-badge" style={{ textDecoration: 'none' }}>Inbox</a>
                </div>
                <div id="messagesList" className="flex-column gap-md" style={{ overflowY: 'auto' }}>
                  <p className="text-muted">Loading messages…</p>
                </div>
              </section>

              <section className="bento-tile tile-saved stagger-5">
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="title-bento m-0" style={{ fontSize: '1.6rem' }}>✨ Saved for Later</h3>
                  <a href="/listings" className="btn btn-primary btn-sm" style={{ borderRadius: 50 }}>Browse More</a>
                </div>
                <div id="savedContainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                  <p className="text-muted">Loading saved listings…</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        strategy="afterInteractive"
      />

      <Script id="dashboard-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        let dashboardMap = null;
        let dashboardMarkers = [];

        function getDistanceKm(lat1, lon1, lat2, lon2) {
          const R = 6371;
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c;
        }

        function formatCurrencyTND(v) {
          const n = Number(v);
          if (!Number.isFinite(n)) return String(v ?? '');
          return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' TND';
        }

        function formatDateShort(value) {
          if (!value) return '';
          const d = new Date(value);
          if (Number.isNaN(d.getTime())) return '';
          return d.toLocaleDateString();
        }

        async function loadNeighborhoodWatchMap(currentUser) {
          const mapEl = document.getElementById('dashboardMap');
          const counterEl = document.getElementById('mapCounter');
          if (!mapEl) return;

          // Leaflet not ready yet? retry once
          if (!window.L || !window.L.map) {
            setTimeout(() => loadNeighborhoodWatchMap(currentUser), 150);
            return;
          }

          // Determine center
          let centerLat = 36.8065;
          let centerLng = 10.1815;
          if (currentUser?.preferred_lat && currentUser?.preferred_lng) {
            centerLat = parseFloat(currentUser.preferred_lat);
            centerLng = parseFloat(currentUser.preferred_lng);
          }

          // Create or reset map instance
          if (!dashboardMap) {
            dashboardMap = L.map('dashboardMap', { zoomControl: true }).setView([centerLat, centerLng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap'
            }).addTo(dashboardMap);
          } else {
            dashboardMap.setView([centerLat, centerLng], 13);
            dashboardMarkers.forEach(m => { try { dashboardMap.removeLayer(m); } catch (e) {} });
            dashboardMarkers = [];
          }

          // Ensure correct sizing inside bento tile
          setTimeout(() => { try { dashboardMap.invalidateSize(); } catch (e) {} }, 200);

          // Mark user's preferred location
          if (currentUser?.preferred_lat && currentUser?.preferred_lng) {
            const userMarker = L.marker([centerLat, centerLng], {
              icon: L.divIcon({
                className: 'user-marker',
                html: '<div style="background: var(--color-brand); width: 24px; height:24px; border-radius:50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })
            }).addTo(dashboardMap).bindPopup('<strong>Your Preferred Location</strong><br>' + (currentUser.preferred_address || ''));
            dashboardMarkers.push(userMarker);
          }

          // Load listings and show nearby markers
          try {
            const api = window.UNIDAR_API;
            const res = await api.Listings.getAll({});
            const listings = res.listings || [];
            const nearby = listings.filter(l => l && l.latitude && l.longitude && getDistanceKm(centerLat, centerLng, Number(l.latitude), Number(l.longitude)) <= 10);
            if (counterEl) counterEl.textContent = String(nearby.length) + ' nearby';

            nearby.forEach(l => {
              const marker = L.marker([Number(l.latitude), Number(l.longitude)]).addTo(dashboardMap);
              marker.bindPopup(
                '<strong>' + (l.title || 'Listing') + '</strong><br>' +
                formatCurrencyTND(l.price) + '/mo<br>' +
                '<a href="/listings/' + l.id + '">View Details</a>'
              );
              dashboardMarkers.push(marker);
            });
          } catch (e) {
            console.error('Error loading dashboard map listings:', e);
            if (counterEl) counterEl.textContent = '0 nearby';
          }
        }

        async function init() {
          try {
            const api = window.UNIDAR_API;
            if (!api) return;
            const auth = await api.Auth.check();
            if (!auth || !auth.authenticated) { window.location.href = '/login'; return; }
            if (auth.user.role !== 'student') {
              window.location.href = auth.user.role === 'admin' ? '/admin' : '/owner-listings';
              return;
            }
            const u = auth.user;
            const firstName = u.full_name ? u.full_name.split(' ')[0] : 'User';
            const initials = u.full_name ? u.full_name.split(' ').map(n=>n[0]).join('').toUpperCase().substring(0,2) : 'U';
            
            if (document.getElementById('welcomeTitle')) document.getElementById('welcomeTitle').textContent = 'Welcome back, ' + firstName + '!';
            if (document.getElementById('userName')) document.getElementById('userName').textContent = u.full_name;
            if (document.getElementById('userEmail')) document.getElementById('userEmail').textContent = u.email || 'Étudiant';
            if (document.getElementById('avatarInitials')) document.getElementById('avatarInitials').textContent = initials;

            // Banners (Priority)
            const bannerCont = document.getElementById('bannerContainer');
            if (bannerCont) {
              bannerCont.innerHTML = '';
              let anyBanner = false;
              const showVerification = u.verification_status !== 'approved';
              const showSubscription = u.subscription_status !== 'active';

              if (showVerification) {
                anyBanner = true;
                showVerificationBanner(u.verification_status);
              }
              if (showSubscription) {
                anyBanner = true;
                showSubscriptionBanner(u.subscription_status, u.subscription_expires_at);
              }

              // Hide empty grid item so welcome tile returns to the top
              bannerCont.style.display = anyBanner ? 'block' : 'none';
            }

            // Sidebar subscription status (active + termination date)
            const subscriptionCard = document.getElementById('subscriptionStatusCard');
            if (subscriptionCard) {
              const exp = u.subscription_expires_at || u.subscription_expiry || '';
              if (u.subscription_status === 'active') {
                subscriptionCard.textContent = exp ? ('Active · until ' + formatDateShort(exp)) : 'Active';
              } else if (u.subscription_status === 'expired') {
                subscriptionCard.textContent = exp ? ('Expired · ' + formatDateShort(exp)) : 'Expired';
              } else {
                subscriptionCard.textContent = 'No active Pro';
              }
            }

            // Contracts
            try {
              const cRes = await api.Contracts.getUserContracts();
              const contracts = cRes.contracts || [];
              if (document.getElementById('statContractsCard')) document.getElementById('statContractsCard').textContent = contracts.length;
              const cCont = document.getElementById('contractsContainer');
              if (cCont) {
                cCont.innerHTML = contracts.length ? contracts.map(c => {
                  return '<div class="glass" style="border-radius:12px;padding:12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center">' +
                    '<div>' +
                      '<strong style="color:#1e293b">' + (c.listing_title || 'Listing') + '</strong>' +
                      '<p class="text-muted text-small">' + (c.status || '') + ' • ' + (c.start_date || '') + '</p>' +
                    '</div>' +
                    '<a href="/api/contracts/download?contract_id=' + c.id + '" target="_blank" class="btn btn-secondary btn-sm">Doc</a>' +
                  '</div>';
                }).join('') : '<p class="text-muted">No contracts yet.</p>';
              }
            } catch (e) { console.error('Error loading contracts:', e); }

            // Saved listings
            try {
              const sRes = await api.SavedListings.getAll();
              const savedList = sRes.listings || [];
              if (document.getElementById('statSavedCard')) document.getElementById('statSavedCard').textContent = savedList.length;
              const sCont = document.getElementById('savedContainer');
              if (sCont) {
                sCont.innerHTML = savedList.length ? savedList.map(l => {
                  const thumb = l.thumbnail || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200';
                  return '<div class="premium-card" style="padding:12px;display:flex;flex-direction:column;gap:8px">' +
                    '<div style="height:80px;background:#f1f5f9;border-radius:8px;overflow:hidden">' +
                       '<img src="' + thumb + '" style="width:100%;height:100%;object-fit:cover" />' +
                    '</div>' +
                    '<strong class="text-truncate" style="color:#1e293b">' + l.title + '</strong>' +
                    '<div class="flex justify-between items-center">' +
                      '<span class="color-brand font-bold text-small">' + l.price + ' TND</span>' +
                      '<button onclick="unsaveListing(' + l.id + ')" class="btn btn-secondary btn-sm" style="padding:2px 8px;font-size:0.7rem">✕</button>' +
                    '</div>' +
                  '</div>';
                }).join('') : '<p class="text-muted">No saved listings yet.</p>';
              }
            } catch (e) { console.error('Error loading saved listings:', e); }

            // Messages
            try {
              const mRes = await api.Conversations.getAll();
              const convs = mRes.conversations || [];
              const mList = document.getElementById('messagesList');
              if (mList) {
                mList.innerHTML = convs.length ? convs.slice(0,3).map(conv => {
                  const initial = conv.other_user_name ? conv.other_user_name.charAt(0).toUpperCase() : 'U';
                  return '<div class="glass" style="padding:8px;border-radius:12px;display:flex;gap:12px;align-items:center;cursor:pointer" onclick="window.location.href=\\'/messages?id=' + conv.id + '\\'">' +
                    '<div style="width:32px;height:32px;border-radius:50%;background:#dcfce7;display:flex;align-items:center;justify-content:center;color:#10b981;font-weight:700;font-size:0.8rem">' +
                      initial +
                    '</div>' +
                    '<div style="flex:1;min-width:0">' +
                      '<div class="flex justify-between"><strong class="text-small text-truncate">' + (conv.other_user_name || 'User') + '</strong></div>' +
                      '<p class="text-muted text-tiny text-truncate m-0">' + (conv.last_message || '') + '</p>' +
                    '</div>' +
                  '</div>';
                }).join('') : '<p class="text-muted">No messages yet.</p>';
              }
            } catch (e) { console.error('Error loading messages:', e); }

            // Neighborhood Watch map (student)
            if (u && u.role === 'student') {
              loadNeighborhoodWatchMap(u);
            }

          } catch (err) { console.error('Critical Dashboard Error:', err); }
        }

        function showVerificationBanner(status) {
          const cont = document.getElementById('bannerContainer');
          if (!cont) return;
          let icon = '⚠️', bgColor = 'linear-gradient(135deg, #fffbeb, #fef3c7)', borderColor = '#f59e0b', textColor = '#92400e';
          let msg = '<strong>Account Not Verified</strong><br>Please submit your ID to access all features.';
          let btnText = 'Verify Now';
          if (status === 'pending') {
             icon = '🕐'; bgColor = 'linear-gradient(135deg, #eff6ff, #dbeafe)'; borderColor = '#3b82f6'; textColor = '#1e40af';
             msg = '<strong>Verification Pending</strong><br>Your documents are being reviewed by our team.';
             btnText = 'Check Status';
          } else if (status === 'rejected') {
             icon = '❌'; bgColor = 'linear-gradient(135deg, #fef2f2, #fee2e2)'; borderColor = '#ef4444'; textColor = '#991b1b';
             msg = '<strong>Verification Rejected</strong><br>Please resubmit your documents.';
             btnText = 'Resubmit';
          }
          const div = document.createElement('div');
          div.className = 'glass';
          div.style.cssText = 'grid-column:span 6;padding:20px;border-radius:16px;border:1px solid ' + borderColor + ';background:' + bgColor + ';color:' + textColor + ';display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:12px';
          div.innerHTML = '<div style="display:flex;align-items:center;gap:20px">' +
              '<div style="font-size:2rem">' + icon + '</div>' +
              '<div><p style="margin:0;line-height:1.4">' + msg + '</p></div>' +
            '</div>' +
            '<button onclick="window.location.href=\\'/verification\\'" class="btn btn-primary" style="background:' + borderColor + ';border:none;white-space:nowrap;padding:10px 20px">' + btnText + ' →</button>';
          cont.appendChild(div);
        }

        function showSubscriptionBanner(status, expiresAt) {
          const cont = document.getElementById('bannerContainer');
          if (!cont) return;
          let title = 'Subscription Required';
          let body = '25 TND/month for full access.';
          if (status === 'expired') {
            const dateText = expiresAt ? formatDateShort(expiresAt) : '—';
            title = 'Subscription Expired';
            body = 'Your premium access ended on ' + dateText + '. Renew to keep full features.';
          }
          const div = document.createElement('div');
          div.className = 'glass';
          div.style.cssText = 'grid-column:span 6;padding:20px;border-radius:16px;border:1px solid #10b981;background:linear-gradient(135deg, #ecfdf5, #d1fae5);color:#065f46;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:12px';
          div.innerHTML = '<div style="display:flex;align-items:center;gap:20px">' +
              '<div style="font-size:2rem">💳</div>' +
              '<div><p style="margin:0;line-height:1.4"><strong>' + title + '</strong><br>' + body + '</p></div>' +
            '</div>' +
            '<button onclick="window.location.href=\\'/subscription\\'" class="btn btn-primary" style="background:#10b981;border:none;white-space:nowrap;padding:10px 20px">Subscribe Now →</button>';
          cont.appendChild(div);
        }

        window.unsaveListing = async (id) => {
          try { await window.UNIDAR_API.SavedListings.remove(id); init(); } catch (e) {}
        };

        document.getElementById('refreshContracts')?.addEventListener('click', init);
        document.getElementById('logoutBtn')?.addEventListener('click', async () => {
          await window.UNIDAR_API.Auth.logout();
          localStorage.removeItem('unidar_auth_user');
          sessionStorage.clear();
          window.location.href = '/login';
        });

        init();
      ` }} />
    </>
  );
}

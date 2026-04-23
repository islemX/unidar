/**
 * UNIDAR â€“ User Dashboard (Student)
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
            <img src="/logo-nav.svg" alt="UNIDAR" style={{height:'44px',width:'auto',display:'block'}} />
          </a>
          <div className="nav-links">
            <a href="/listings" className="nav-link" data-i18n="nav_listings">Listings</a>
            <a href="/roommates" className="nav-link" data-i18n="nav_roommates">Roommates</a>
            <a href="/messages" className="nav-link" data-i18n="nav_messages">Messages</a>
            <a href="/verification" className="nav-link">Verification</a>
            <a href="/subscription" className="nav-link">Premium</a>
          </div>
          <div className="flex items-center gap-md">
            <button id="logoutBtn" className="btn btn-secondary btn-sm" data-i18n="nav_logout">Logout</button>
          </div>
        </div>
      </nav>

      <main className="section page-transition">
        <div className="container">
          <div className="dashboard-container">
            <aside className="profile-side-card stagger-1" style={{ overflow:'hidden' }}>
              <div className="profile-content" style={{ width:'100%', boxSizing:'border-box', overflow:'hidden' }}>
                <div className="profile-avatar-pro" id="avatarInitials">U</div>
                <h2 id="userName" className="title-bento mb-xs" style={{ fontSize: '1.5rem', fontWeight: 800 }}>User</h2>
                <p id="userEmail" className="text-bento-muted mb-xl">user@email.com</p>

                <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%', overflow:'hidden' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', background:'var(--color-surface-50,#f8fafc)', borderRadius:12, gap:8, overflow:'hidden' }}>
                    <span style={{ flexShrink:0, fontSize:'0.65rem', textTransform:'uppercase', fontWeight:700, color:'var(--color-text-muted,#94a3b8)', letterSpacing:'0.05em' }} data-i18n="dash_status">Status</span>
                    <span className="stat-badge" style={{ flexShrink:0 }} data-i18n="dash_active">Active</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', background:'var(--color-surface-50,#f8fafc)', borderRadius:12, gap:8, overflow:'hidden' }}>
                    <span style={{ flexShrink:0, fontSize:'0.65rem', textTransform:'uppercase', fontWeight:700, color:'var(--color-text-muted,#94a3b8)', letterSpacing:'0.05em' }} data-i18n="dash_subscription">Sub</span>
                    <span style={{ fontWeight:700, color:'var(--color-brand)', fontSize:'0.75rem', textAlign:'right', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', minWidth:0, maxWidth:'65%' }} id="subscriptionStatusCard">â€”</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', background:'var(--color-surface-50,#f8fafc)', borderRadius:12, gap:8, overflow:'hidden' }}>
                    <span style={{ flexShrink:0, fontSize:'0.65rem', textTransform:'uppercase', fontWeight:700, color:'var(--color-text-muted,#94a3b8)', letterSpacing:'0.05em' }} data-i18n="dash_favorites">Favorites</span>
                    <span className="stat-badge" style={{ flexShrink:0 }} id="statSavedCard">0</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', background:'var(--color-surface-50,#f8fafc)', borderRadius:12, gap:8, overflow:'hidden' }}>
                    <span style={{ flexShrink:0, fontSize:'0.65rem', textTransform:'uppercase', fontWeight:700, color:'var(--color-text-muted,#94a3b8)', letterSpacing:'0.05em' }} data-i18n="dash_contracts_label">Contracts</span>
                    <span className="stat-badge" style={{ flexShrink:0 }} id="statContractsCard">0</span>
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
                  Managing your university life just got a &ldquo;pro&rdquo; upgrade.
                </p>
              </section>

              <section className="bento-tile tile-map stagger-2">
                 <div className="p-lg flex justify-between items-center glass" style={{ position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10, borderRadius: 100 }}>
                    <h3 className="text-bento-muted font-bold m-0" data-i18n="dash_neighborhood">Neighborhood Watch</h3>
                    <div className="stat-badge" id="mapCounter">0</div>
                 </div>
                 <div id="dashboardMap" style={{ height: '100%', minHeight: 250, borderRadius: 'inherit' }}></div>
              </section>

              <section className="bento-tile tile-contracts stagger-3" style={{ overflow:'hidden' }}>
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="title-bento m-0" style={{ fontSize: '1.4rem' }} data-i18n="dash_contracts_title">ðŸ“„ Contracts</h3>
                  <button className="btn btn-secondary btn-sm" id="refreshContracts" style={{ borderRadius: 50, flexShrink:0 }} data-i18n="dash_refresh">Refresh</button>
                </div>
                <div id="contractsContainer" className="flex-column gap-sm" style={{ overflow:'hidden', width:'100%' }}>
                  <p className="text-muted" data-i18n="dash_loading_contracts">Loading contractsâ€¦</p>
                </div>
              </section>

              <section className="bento-tile tile-messages stagger-4">
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="title-bento m-0" style={{ fontSize: '1.4rem' }} data-i18n="dash_messages_title">ðŸ’¬ Messages</h3>
                  <a href="/messages" className="stat-badge" style={{ textDecoration: 'none' }} data-i18n="dash_inbox">Inbox</a>
                </div>
                <div id="messagesList" className="flex-column gap-md" style={{ overflowY: 'auto' }}>
                  <p className="text-muted" data-i18n="dash_loading_messages">Loading messagesâ€¦</p>
                </div>
              </section>

              <section className="bento-tile tile-saved stagger-5">
                <div className="flex justify-between items-center mb-lg">
                  <h3 className="title-bento m-0" style={{ fontSize: '1.6rem' }} data-i18n="dash_saved_title">âœ¨ Saved for Later</h3>
                  <a href="/listings" className="btn btn-primary btn-sm" style={{ borderRadius: 50 }} data-i18n="dash_browse_more">Browse More</a>
                </div>
                <div id="savedContainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
                  <p className="text-muted" data-i18n="dash_loading_saved">Loading saved listingsâ€¦</p>
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

      <Script src="/js/contracts.js?v=7" strategy="afterInteractive" />

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
            }).addTo(dashboardMap).bindPopup('<strong>' + _t('dash_preferred_location') + '</strong><br>' + (currentUser.preferred_address || ''));
            dashboardMarkers.push(userMarker);
          }

          // Load listings and show nearby markers
          try {
            const api = window.UNIDAR_API;
            const res = await api.Listings.getAll({});
            const listings = res.listings || [];
            const nearby = listings.filter(l => l && l.latitude && l.longitude && getDistanceKm(centerLat, centerLng, Number(l.latitude), Number(l.longitude)) <= 10);
            if (counterEl) counterEl.textContent = String(nearby.length) + ' ' + _t('dash_nearby');

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
            if (counterEl) counterEl.textContent = '0 ' + _t('dash_nearby');
          }
        }

        const _t = k => window.UNIDAR_I18N?.t(k) || k;

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
            if (document.getElementById('userEmail')) document.getElementById('userEmail').textContent = u.email || '';
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
                subscriptionCard.textContent = exp ? (_t('dash_sub_active_prefix') + formatDateShort(exp)) : _t('dash_active');
              } else if (u.subscription_status === 'expired') {
                subscriptionCard.textContent = exp ? (_t('dash_sub_expired_prefix') + formatDateShort(exp)) : _t('dash_sub_expired_prefix').trim();
              } else {
                subscriptionCard.textContent = _t('dash_sub_none');
              }
            }

            // Auto-expire old contracts silently
            api.Contracts.checkExpired().catch(() => {});

            // Contracts
            try {
              const cRes = await api.Contracts.getUserContracts();
              const contracts = cRes.contracts || [];
              if (document.getElementById('statContractsCard')) document.getElementById('statContractsCard').textContent = contracts.length;
              const cCont = document.getElementById('contractsContainer');
              if (cCont) {
                if (!contracts.length) {
                  cCont.innerHTML = '<p class="text-muted">' + _t('dash_no_contracts') + '</p>';
                } else {
                  cCont.innerHTML = contracts.map(c => {
                    const statusColor = {
                      draft: '#64748b', pending: '#f59e0b', pending_signature: '#f59e0b',
                      signed_by_student: '#3b82f6', signed_by_both: '#10b981',
                      active: '#10b981', paid: '#10b981', completed: '#6366f1',
                      terminated: '#ef4444', expired: '#94a3b8', cancelled: '#94a3b8'
                    }[c.status] || '#64748b';

                    // Pay Now button: show when student signed but payment not done yet
                    const needsPay = c.status === 'signed_by_student';
                    // Cancel button: show for non-terminal statuses
                    const canCancel = !['terminated','expired','cancelled','rejected','completed'].includes(c.status);

                    return '<div class="glass" style="border-radius:14px;padding:12px;margin-bottom:8px;overflow:hidden;width:100%;box-sizing:border-box">' +
                      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;min-width:0">' +
                        '<div style="flex:1;min-width:0;overflow:hidden">' +
                          '<strong style="color:#1e293b;display:block;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (c.listing_title || 'Listing') + '</strong>' +
                          '<p class="text-muted text-small m-0" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' +
                            '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + statusColor + ';margin-right:4px;vertical-align:middle;flex-shrink:0"></span>' +
                            (c.status || '') + ' Â· ' + (c.start_date ? c.start_date.slice(0,10) : '') +
                            (c.end_date ? ' â†’ ' + c.end_date.slice(0,10) : '') +
                          '</p>' +
                          (c.monthly_rent ? '<p class="text-small m-0 mt-xs" style="color:var(--color-brand);font-weight:700">' + Number(c.monthly_rent).toLocaleString() + ' TND/mo</p>' : '') +
                        '</div>' +
                        '<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;align-items:flex-end">' +
                          '<a href="/api/contracts/download?contract_id=' + c.id + '" target="_blank" class="btn btn-secondary btn-sm" style="white-space:nowrap">ðŸ“„ Doc</a>' +
                          (needsPay ? '<button onclick="payContract(' + c.listing_id + ',' + c.id + ')" class="btn btn-primary btn-sm" style="background:#10b981;border-color:#10b981;white-space:nowrap">' + _t('dash_pay_now') + '</button>' : '') +
                          (canCancel ? '<button onclick="cancelContract(' + c.id + ')" class="btn btn-sm" style="background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;white-space:nowrap">' + _t('dash_cancel_contract') + '</button>' : '') +
                        '</div>' +
                      '</div>' +
                    '</div>';
                  }).join('');
                }
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
                      '<button onclick="unsaveListing(' + l.id + ')" class="btn btn-secondary btn-sm" style="padding:2px 8px;font-size:0.7rem">âœ•</button>' +
                    '</div>' +
                  '</div>';
                }).join('') : '<p class="text-muted">' + _t('dash_no_saved') + '</p>';
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
                }).join('') : '<p class="text-muted">' + _t('dash_no_messages') + '</p>';
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
          let icon = 'âš ï¸', bgColor = 'linear-gradient(135deg, #fffbeb, #fef3c7)', borderColor = '#f59e0b', textColor = '#92400e';
          let title = _t('dash_verify_title');
          let body = _t('dash_verify_body');
          let btnText = _t('dash_verify_btn');
          if (status === 'pending') {
             icon = 'ðŸ•'; bgColor = 'linear-gradient(135deg, #eff6ff, #dbeafe)'; borderColor = '#3b82f6'; textColor = '#1e40af';
             title = _t('dash_pending_title');
             body = _t('dash_pending_body');
             btnText = _t('dash_pending_btn');
          } else if (status === 'rejected') {
             icon = 'âŒ'; bgColor = 'linear-gradient(135deg, #fef2f2, #fee2e2)'; borderColor = '#ef4444'; textColor = '#991b1b';
             title = _t('dash_rejected_title');
             body = _t('dash_rejected_body');
             btnText = _t('dash_rejected_btn');
          }
          const div = document.createElement('div');
          div.className = 'glass';
          div.style.cssText = 'grid-column:span 6;padding:20px;border-radius:16px;border:1px solid ' + borderColor + ';background:' + bgColor + ';color:' + textColor + ';display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:12px';
          div.innerHTML = '<div style="display:flex;align-items:center;gap:20px">' +
              '<div style="font-size:2rem">' + icon + '</div>' +
              '<div><p style="margin:0;line-height:1.4"><strong>' + title + '</strong><br>' + body + '</p></div>' +
            '</div>' +
            '<button onclick="window.location.href=\\'/verification\\'" class="btn btn-primary" style="background:' + borderColor + ';border:none;white-space:nowrap;padding:10px 20px">' + btnText + ' â†’</button>';
          cont.appendChild(div);
        }

        function showSubscriptionBanner(status, expiresAt) {
          const cont = document.getElementById('bannerContainer');
          if (!cont) return;
          let title = _t('dash_sub_required_title');
          let body = _t('dash_sub_required_body');
          if (status === 'expired') {
            const dateText = expiresAt ? formatDateShort(expiresAt) : 'â€”';
            title = _t('dash_sub_expired_title');
            body = _t('dash_sub_expired_body_prefix') + dateText + _t('dash_sub_expired_body_suffix');
          }
          const div = document.createElement('div');
          div.className = 'glass';
          div.style.cssText = 'grid-column:span 6;padding:20px;border-radius:16px;border:1px solid #10b981;background:linear-gradient(135deg, #ecfdf5, #d1fae5);color:#065f46;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:12px';
          div.innerHTML = '<div style="display:flex;align-items:center;gap:20px">' +
              '<div style="font-size:2rem">ðŸ’³</div>' +
              '<div><p style="margin:0;line-height:1.4"><strong>' + title + '</strong><br>' + body + '</p></div>' +
            '</div>' +
            '<button onclick="window.location.href=\\'/subscription\\'" class="btn btn-primary" style="background:#10b981;border:none;white-space:nowrap;padding:10px 20px">' + _t('dash_subscribe_now') + '</button>';
          cont.appendChild(div);
        }

        window.unsaveListing = async (id) => {
          try { await window.UNIDAR_API.SavedListings.remove(id); init(); } catch (e) {}
        };

        window.payContract = (listingId, contractId) => {
          if (window.PaymentManager && window.PaymentManager.showPaymentModal) {
            window.PaymentManager.showPaymentModal(listingId, contractId);
          } else {
            // fallback: direct payment if contracts.js not loaded yet
            if (!confirm('Proceed with payment for this contract?')) return;
            window.UNIDAR_API.Contracts.processPayment(contractId)
              .then(() => { alert('âœ… Payment successful! Contract is now active.'); init(); })
              .catch(e => alert('Payment failed: ' + (e.message || 'Unknown error')));
          }
        };

        window.cancelContract = async (contractId) => {
          const reason = prompt('Reason for cancellation (optional):') ?? '';
          if (reason === null) return; // user hit Cancel on prompt
          try {
            const api = window.UNIDAR_API;
            await api.Contracts.requestTermination(contractId, reason);
            alert('âœ… Cancellation request submitted. The owner will be notified.');
            init();
          } catch (e) {
            alert('Error: ' + (e.message || 'Unknown error'));
          }
        };

        // Let contracts.js call init() after payment success
        window.loadUserContracts = init;

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

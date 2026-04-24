/**
 * UNIDAR � Listing Detail Page
 */
import Head from 'next/head';
import Script from 'next/script';

export default function ListingDetailPage() {
  return (
    <>
      <Head><title>Listing Detail - UNIDAR</title></Head>
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo" aria-label="UNIDAR"><img src="/logo-nav.svg" alt="UNIDAR" style={{height:'44px',width:'auto',display:'block'}} /></a>
          <div className="nav-links">
            <a href="/listings" className="nav-link">? Back to Listings</a>
            <div id="navAuthArea"></div>
          </div>
        </div>
      </nav>

      <main className="section">
        <div id="listingContent" className="container">
          <div style={{textAlign:'center',padding:'80px 0'}}>
            <div className="loading-spinner" style={{margin:'0 auto 20px'}}></div>
            <p data-i18n="loading">Loading immersive experience...</p>
          </div>
        </div>
      </main>

      {/* Lightbox Overlay */}
      <div id="lightboxOverlay" className="lightbox-overlay" onclick="closeLightbox()">
        <span className="lightbox-close">?</span>
        <img id="lightboxImage" className="lightbox-image" src="" onclick="event.stopPropagation()" />
      </div>

      {/* Report Modal */}
      <div id="reportModal" className="modal" style={{display:'none',position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.6)',alignItems:'center',justifyContent:'center'}}>
        <div className="card" style={{maxWidth:400,width:'90%',padding:'var(--space-xl)'}}>
          <h3 data-i18n="report_listing">Report Listing</h3>
          <div className="form-group">
            <label className="form-label">Reason</label>
            <select id="reportReason" className="form-input">
              <option value="misleading">Misleading Information</option>
              <option value="unavailable">Property Unavailable</option>
              <option value="scam">Potential Scam</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Additional Notes</label>
            <textarea id="reportDetails" className="form-input" style={{height:100}}></textarea>
          </div>
          <div style={{display:'flex',gap:'12px',marginTop:'var(--space-lg)'}}>
            <button onclick="document.getElementById('reportModal').style.display='none'" className="btn btn-secondary" style={{flex:1}}>Cancel</button>
            <button id="submitReportBtn" className="btn btn-primary" style={{flex:1}}>Submit</button>
          </div>
        </div>
      </div>

      {/* Contract modal handled by contracts.js */}
      <div id="contractSetupModal" className="modal" style={{display:'none'}}></div>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />
      <Script src="/js/contracts.js?v=7" strategy="lazyOnload" />
      <Script src="/js/map-utils.js" strategy="lazyOnload" />
      <Script src="/js/listing-map-init.js" strategy="lazyOnload" />
      <Script id="detail-logic" strategy="afterInteractive">{`
        const listingId = window.location.pathname.split('/').pop();
        let currentUser = null;
        let authData = null;
        let currentListing = null;
        let isSaved = false;
        let currentImgIndex = 0;

        // Fallbacks in case utils.js hasn't finished loading yet
        if (!window.resolveImageUrl) {
          window.resolveImageUrl = function(p) {
            if (!p) return '/placeholder.jpg';
            if (typeof p === 'string' && p.startsWith('http')) return p;
            if (typeof p === 'string' && p.startsWith('data:')) return p;
            if (typeof p === 'string' && p.startsWith('hounitn/')) return 'https://storage.googleapis.com/' + p;
            if (typeof p === 'string') return p.startsWith('/') ? p : '/' + p;
            return '/placeholder.jpg';
          };
        }
        if (!window.formatDate) {
          window.formatDate = function(d) {
            if (!d) return 'N/A';
            return new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
          };
        }

        async function loadDetail() {
          try {
            const api = window.UNIDAR_API;
            if (!api) return;
            const authRes = await api.Auth.check().catch(() => ({ authenticated: false }));
            
            if (!authRes || !authRes.authenticated) {
              window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
              return;
            }

            const [listingRes, savedRes] = await Promise.all([
              window.UNIDAR_API.Listings.getById(listingId),
              window.UNIDAR_API.SavedListings.getAll().catch(() => ({ listings: [], saved_listings: [] }))
            ]);
            
            authData = authRes;
            currentUser = authRes.user;
            currentListing = listingRes.listing;
            window.currentListing = currentListing; // used by listing-map-init.js

            const savedList = savedRes.listings || savedRes.saved_listings || [];
            isSaved = savedList.some(x => (x.id || x.listing_id) == listingId);

            renderHeaderAuth(authRes);
            renderContent();
          } catch (err) {
            document.getElementById('listingContent').innerHTML = '<div class="alert alert-error">Failed to load listing details.</div>';
          }
        }

        function renderHeaderAuth(auth) {
          const area = document.getElementById('navAuthArea');
          if (!area) return; // common.js navbar replaced this element
          if (auth.authenticated) {
            const dash = auth.user.role === 'admin' ? '/admin' : auth.user.role === 'owner' ? '/owner-listings' : '/user-dashboard';
            area.innerHTML = '<a href="' + dash + '" class="nav-link">Dashboard</a>';
          } else {
            area.innerHTML = '<a href="/login" class="btn btn-primary btn-sm">Login</a>';
          }
        }

        function renderContent() {
          const _t = k => window.UNIDAR_I18N?.t(k) || k;
          const l = currentListing;
          const imgs = (l.images || []).map(i => window.resolveImageUrl(i.image_path || i));
          if (!imgs.length) imgs.push('/placeholder.jpg');
          const mainImg = imgs[0];
          currentImgIndex = 0;

          const isStudent = currentUser && currentUser.role === 'student';
          const isValidated = currentUser?.verification_status === 'approved';
          const isPremium = currentUser?.subscription_status === 'active';
          // Owners are never blocked by student access gates
          const hasFullAccess = !isStudent || (isValidated && isPremium);
          const canContract = currentUser && isStudent && currentUser.id !== l.owner_id;
          const canMessageOwner = currentUser && currentUser.id !== l.owner_id;
          const remaining = Math.max(0, (l.beds_count || l.capacity || 1) - (l.occupant_count || 0));

          document.getElementById('listingContent').innerHTML = \`
            <div class="listing-layout fade-in-up">
              <div class="listing-main">
                <div class="gallery-pro mb-xl">
                  <div class="main-image-container" onclick="window.openLightbox(0)">
                    <img src="\${mainImg}" id="mainDisplayImage" class="main-image-pro" onerror="this.src='/placeholder.jpg'">
                    \${imgs.length > 1 ? \`
                      <div class="gallery-controls">
                        <button class="gallery-btn" onclick="event.stopPropagation(); window.navigateGallery(-1)">?</button>
                        <button class="gallery-btn" onclick="event.stopPropagation(); window.navigateGallery(1)">?</button>
                      </div>
                      <div class="gallery-badge" style="position:absolute;top:20px;right:20px;background:rgba(0,0,0,0.5);color:white;padding:5px 12px;border-radius:20px;backdrop-filter:blur(10px);font-size:0.8rem;font-weight:600;z-index:102;">
                        <span id="galleryCounter">1</span> / \${imgs.length} \${_t('detail_photos_count')}
                      </div>
                    \` : ''}
                  </div>
                  \${imgs.length > 1 ? \`
                    <div class="thumbnails-strip">
                      \${imgs.map((img, idx) => \`<img src="\${img}" class="thumb-pro \${idx === 0 ? 'active' : ''}" onclick="window.changeGalleryImage('\${img}', \${idx}, this)" onerror="this.src='/placeholder.jpg'">\`).join('')}
                    </div>
                  \` : ''}
                </div>

                <div class="card premium-card mb-xl" style="padding:var(--space-xl)">
                  <div class="flex gap-md mb-md">
                    <span class="badge" style="background:var(--color-brand-50);color:var(--color-brand-700)">\${l.property_type || 'Property'}</span>
                    <span class="badge">\${l.status || 'Active'}</span>
                  </div>
                  <h1 class="title-pro mb-sm">\${l.title}</h1>
                  <p class="text-muted" style="font-size:1.1rem">?? \${l.address || 'Tunisia'}</p>
                  
                  <div style="margin-top:var(--space-xl);padding-top:var(--space-xl);border-top:1px solid var(--color-surface-100)">
                    <h3>\${_t('detail_about_prop')}</h3>
                    <p id="descriptionText" class="description-content">\${l.description || _t('card_no_description')}</p>
                    <button id="readMoreBtn" class="read-more-btn" onclick="window.toggleDescription()">
                      <span>\${_t('detail_show_more')}</span> <span>?</span>
                    </button>
                  </div>

                  <div style="margin-top:var(--space-xl);padding-top:var(--space-xl);border-top:1px solid var(--color-surface-100)">
                    <h3>\${_t('detail_amenities_features')}</h3>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-top:16px">
                      <div class="amenity-card"><span>???</span> <div><small>\${_t('detail_bedrooms')}</small><b>\${l.bedrooms || 1}</b></div></div>
                      <div class="amenity-card"><span>??</span> <div><small>\${_t('detail_bathrooms')}</small><b>\${l.bathrooms || 1}</b></div></div>
                      <div class="amenity-card"><span>??</span> <div><small>\${_t('detail_surface')}</small><b>\${l.size || '?'} \${_t('sqm')}</b></div></div>
                      <div class="amenity-card"><span>??</span> <div><small>\${_t('detail_capacity')}</small><b>\${l.capacity || 1} \${_t('detail_guests')}</b></div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sidebar-premium">
                <div class="card premium-card" style="padding:var(--space-xl);position:sticky;top:100px">
                  <div style="font-size:2.5rem;font-weight:800;color:var(--color-surface-900)">\${l.price} <small style="font-size:1rem;color:var(--color-text-muted)">\${_t('detail_tnd_mo')}</small></div>
                  
                  <div style="background:var(--color-surface-50);padding:16px;border-radius:var(--radius-xl);margin:16px 0;display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    <div style="text-align:center">
                      <div style="font-size:1.2rem;font-weight:700;color:var(--color-brand)">\${remaining}</div>
                      <div style="font-size:0.6rem;text-transform:uppercase" class="text-muted">\${_t('detail_places_left_label')}</div>
                    </div>
                    <div style="text-align:center;border-left:1px solid var(--color-surface-200)">
                      <div style="font-size:1.2rem;font-weight:700">\${l.floor || 0}</div>
                      <div style="font-size:0.6rem;text-transform:uppercase" class="text-muted">\${_t('detail_floor_label')}</div>
                    </div>
                  </div>

                  <div style="display:flex;flex-direction:column;gap:12px">
                    \${!currentUser ? \`<a href="/login" class="btn btn-primary" style="width:100%;text-align:center;padding:16px">\${_t('detail_login_reserve')}</a>\` : ''}
                    \${canMessageOwner && hasFullAccess ? \`<button onclick="window.messageOwner()" class="btn btn-primary hover-lift" style="width:100%;padding:16px;font-weight:700">?? \${_t('detail_contact_owner')}</button>\` : ''}
                    \${canContract && hasFullAccess ? \`<button onclick="window.startContract()" class="btn btn-primary" style="width:100%;padding:16px;font-weight:700">?? \${_t('detail_request_contract')}</button>\` : ''}
                    \${(canMessageOwner || canContract) && !hasFullAccess ? \`
                      <div style="border:1.5px dashed rgba(99,102,241,.35);border-radius:14px;padding:18px 16px;text-align:center;background:linear-gradient(135deg,rgba(99,102,241,.05),rgba(168,85,247,.05))">
                        <div style="font-size:1.6rem;margin-bottom:8px">??</div>
                        <div style="font-weight:700;font-size:.9rem;color:#1e293b;margin-bottom:6px">
                          \${!isValidated ? _t('access_locked_verify_title') : _t('access_locked_premium_title')}
                        </div>
                        <p style="font-size:.75rem;color:#64748b;margin:0 0 14px;line-height:1.5">
                          \${!isValidated ? _t('access_locked_verify_desc') : _t('access_locked_premium_desc')}
                        </p>
                        <a href="/\${!isValidated ? 'verification' : 'subscription'}" class="btn btn-primary" style="width:100%;font-size:.82rem;padding:12px">
                          \${!isValidated ? '?? ' + _t('access_btn_verify') : '? ' + _t('access_btn_premium')}
                        </a>
                      </div>
                    \` : ''}
                    
                    <div style="display:flex;gap:8px">
                      <button onclick="window.toggleSaveListing()" class="btn btn-secondary" style="flex:1">\${isSaved ? '? ' + _t('detail_saved') : '? ' + _t('detail_save_listing')}</button>
                      <button onclick="window.shareListing()" class="btn btn-secondary">??</button>
                    </div>

                    <button onclick="document.getElementById('reportModal').style.display='flex'" style="background:none;border:none;color:var(--color-error);font-size:0.75rem;text-decoration:underline;cursor:pointer;margin-top:8px">\${_t('detail_report_listing')}</button>
                  </div>

                  <div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--color-surface-100)">
                    <p style="font-size:0.85rem">\${_t('detail_owned_by')} <b>\${l.owner_name}</b> \${l.owner_verified === 'approved' ? '?' : ''}</p>
                    <p class="text-muted" style="font-size:0.75rem;margin-top:4px">\${_t('detail_member_since')} \${window.formatDate(l.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            \${l.roommates && l.roommates.length ? \`
              <div class="card premium-card mt-2xl fade-in-up" style="padding:var(--space-xl);margin-top:var(--space-2xl)">
                <h3 class="mb-lg">?? \${_t('detail_future_roommates')} (\${l.roommates.length})</h3>
                <div class="grid grid-3 gap-md" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
                  \${l.roommates.map(rm => \`
                    <div class="p-md" style="background:var(--color-surface-50);border-radius:var(--radius-xl);border:1px solid var(--color-surface-100);padding:12px">
                      <div class="flex justify-between items-center" style="display:flex;justify-content:space-between;align-items:center;gap:12px">
                        <div>
                          <div style="font-weight:700">\${rm.full_name || 'Student'}</div>
                          <div class="text-tiny text-muted uppercase tracking-wider">\${_t('student')}</div>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="window.messageRoommate(\${rm.student_id})" style="padding:6px 12px;font-size:0.75rem">?? \${_t('roommates_message_btn')}</button>
                      </div>
                    </div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            <div class="card premium-card mt-2xl fade-in-up" style="padding:var(--space-xl);margin-top:var(--space-2xl)" id="mapSection">
              <h3 class="mb-md">?? \${_t('detail_location_directions')}</h3>
              <p class="text-muted mb-lg" style="font-size:0.95rem">\${_t('detail_directions_desc')}</p>
              <div class="faculty-selector-container mb-lg" style="background:var(--color-surface-50);padding:var(--space-lg);border-radius:var(--radius-xl);border:1px solid var(--color-surface-100);margin-bottom:16px">
                <div class="grid grid-2 gap-md items-end mb-md" style="display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end">
                  <div class="form-group mb-0" style="margin:0">
                    <label class="form-label" style="font-weight:600">?? \${_t('detail_choose_university')}</label>
                    <select id="facultySelector" class="form-input" style="cursor:pointer">
                      <option value="">\${_t('detail_select_uni')}</option>
                    </select>
                  </div>
                  <button id="getDirectionsBtn" class="btn btn-primary hover-lift" style="height:46px" disabled>
                    <span id="transportEmoji">??</span> \${_t('detail_get_directions')}
                  </button>
                </div>
                <div class="flex justify-between items-center" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
                  <div class="map-controls-premium" style="display:flex;gap:8px">
                    <button class="map-mode-btn active" id="modeDriving" onclick="window.setTravelMode('driving')">?? \${_t('detail_driving')}</button>
                    <button class="map-mode-btn" id="modeWalking" onclick="window.setTravelMode('walking')">?? \${_t('detail_walking')}</button>
                  </div>
                  <button class="compass-btn" id="compassBtn" onclick="window.toggleCompass()" title="Animate route pointer">
                    <span class="compass-emoji" style="font-size:1.4rem">??</span>
                    <span class="compass-label">\${_t('detail_compass_start')}</span>
                  </button>
                </div>
              </div>
              <div id="listingMap" style="height:500px;border-radius:var(--radius-xl);overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);border:1px solid var(--color-surface-100)"></div>
            </div>
          \`;

          // Show "Read more" only when needed
          setTimeout(() => {
            const desc = document.getElementById('descriptionText');
            const btn = document.getElementById('readMoreBtn');
            if (desc && btn && desc.scrollHeight > 150) btn.style.display = 'flex';
          }, 300);

          // Init map (if scripts loaded)
          setTimeout(() => {
            try {
              if (typeof initializeListingMap === 'function') initializeListingMap();
            } catch (e) {}
          }, 600);
        }

        window.toggleDescription = () => {
          const container = document.getElementById('descriptionText');
          const btn = document.getElementById('readMoreBtn');
          if (!container || !btn) return;
          const expanded = container.classList.toggle('expanded');
          const _t2 = k => window.UNIDAR_I18N?.t(k) || k;
          const parts = btn.querySelectorAll('span');
          if (parts && parts.length >= 2) {
            parts[0].textContent = expanded ? _t2('detail_show_less') : _t2('detail_show_more');
            parts[1].textContent = expanded ? '?' : '?';
          }
        };

        window.changeGalleryImage = (src, idx, el) => {
          document.getElementById('mainDisplayImage').src = src;
          currentImgIndex = idx || 0;
          const counter = document.getElementById('galleryCounter');
          if (counter) counter.textContent = (currentImgIndex + 1);
          document.querySelectorAll('.thumb-pro').forEach(t => t.classList.remove('active'));
          el.classList.add('active');
        };

        window.navigateGallery = (direction) => {
          const l = currentListing;
          const imgs = (l.images || []).map(i => window.resolveImageUrl(i.image_path || i));
          if (!imgs.length) return;
          currentImgIndex = (currentImgIndex + direction + imgs.length) % imgs.length;
          const nextSrc = imgs[currentImgIndex];
          const thumbs = document.querySelectorAll('.thumb-pro');
          const el = thumbs && thumbs[currentImgIndex] ? thumbs[currentImgIndex] : null;
          document.getElementById('mainDisplayImage').style.opacity = '0';
          setTimeout(() => {
            document.getElementById('mainDisplayImage').src = nextSrc;
            document.getElementById('mainDisplayImage').style.opacity = '1';
            const counter = document.getElementById('galleryCounter');
            if (counter) counter.textContent = (currentImgIndex + 1);
            if (el) {
              document.querySelectorAll('.thumb-pro').forEach(t => t.classList.remove('active'));
              el.classList.add('active');
              el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
          }, 250);
        };

        window.openLightbox = (idx) => {
          const src = document.getElementById('mainDisplayImage').src;
          document.getElementById('lightboxImage').src = src;
          document.getElementById('lightboxOverlay').classList.add('active');
        };

        window.closeLightbox = () => {
          document.getElementById('lightboxOverlay').classList.remove('active');
        };

        window.messageOwner = () => {
          if (!currentListing || !currentListing.owner_id) return;
          window.dispatchEvent(new CustomEvent('openChat', { detail: { userId: currentListing.owner_id, listingId: currentListing.id } }));
          if (window.chatWidget) window.chatWidget.toggle(true);
        };

        window.messageRoommate = (studentId) => {
          if (!studentId || !currentListing) return;
          window.dispatchEvent(new CustomEvent('openChat', { detail: { userId: studentId, listingId: currentListing.id } }));
          if (window.chatWidget) window.chatWidget.toggle(true);
        };

        window.toggleSaveListing = async () => {
          if (!currentUser) return window.location.href = '/login';
          try {
            if (isSaved) {
              await window.UNIDAR_API.SavedListings.unsave(listingId);
              isSaved = false;
            } else {
              await window.UNIDAR_API.SavedListings.save(listingId);
              isSaved = true;
            }
            renderContent();
          } catch (e) { alert('Action failed'); }
        };

        window.shareListing = () => {
          if (navigator.share) {
            navigator.share({ title: currentListing.title, url: window.location.href });
          } else {
            prompt('Copy link to share:', window.location.href);
          }
        };

        window.startContract = () => {
          if (typeof ContractManager !== 'undefined' && ContractManager.showContractSetupModal) {
            ContractManager.showContractSetupModal(listingId);
          } else {
            alert('Contract system not ready. Please refresh.');
          }
        };

        window.travelMode = 'driving';
        window.setTravelMode = (mode) => {
          const _t3 = k => window.UNIDAR_I18N?.t(k) || k;
          window.travelMode = mode;
          document.querySelectorAll('.map-mode-btn').forEach(btn => btn.classList.remove('active'));
          const target = document.getElementById(mode === 'walking' ? 'modeWalking' : 'modeDriving');
          if (target) {
            target.classList.add('active');
            target.textContent = (mode === 'walking' ? '?? ' : '?? ') + _t3(mode === 'walking' ? 'detail_walking' : 'detail_driving');
          }
          const emoji = mode === 'walking' ? '??' : '??';
          const transportEmoji = document.getElementById('transportEmoji');
          if (transportEmoji) transportEmoji.textContent = emoji;

          if (window.currentRouteData && window.MapUtils) {
            const { fromLat, fromLng, toLat, toLng, facultyName } = window.currentRouteData;
            window.MapUtils.calculateRoute(fromLat, fromLng, toLat, toLng, facultyName, mode);
          }
        };

        window.toggleCompass = () => {
          const btn = document.getElementById('compassBtn');
          const label = btn ? btn.querySelector('.compass-label') : null;
          const isActive = btn ? btn.classList.toggle('active') : false;
          const _tc = k => window.UNIDAR_I18N?.t(k) || k;
          if (label) label.textContent = isActive ? _tc('detail_compass_stop') : _tc('detail_compass_start');
          if (window.MapUtils) window.MapUtils.setCompassActive(!!isActive);
        };

        document.getElementById('submitReportBtn').addEventListener('click', async () => {
          const reason = document.getElementById('reportReason').value;
          const notes  = document.getElementById('reportDetails').value;
          try {
            await window.UNIDAR_API.Reports.create({
              report_type: 'listing',
              reported_listing_id: parseInt(listingId, 10),
              reason,
              description: notes || ''
            });
            alert('Report submitted. Thank you.');
            document.getElementById('reportModal').style.display = 'none';
          } catch (e) { alert('Submission failed'); }
        });

        loadDetail();
      `}</Script>
    </>
  );
}

export async function getServerSideProps(context) {
  // Just pass the id so we can use it if needed
  return { props: {} };
}

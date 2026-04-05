/**
 * UNIDAR – Listings Browse Page
 * Reuses existing listings.html logic/CSS fully
 */
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function ListingsPage() {
  return (
    <>
      <Head><title>Browse Listings - UNIDAR</title></Head>

      <nav className="navbar glass" id="navbar">
        <div className="nav-container">
          <a href="/" className="nav-logo"><span style={{color:'var(--color-brand)'}}>UNI</span>DAR</a>
          <div className="nav-links">
            <a href="/listings" className="nav-link active auth-only" style={{ display: 'none' }} data-i18n="nav_listings">Listings</a>
            <a href="/roommates" className="nav-link auth-only" style={{ display: 'none' }} data-i18n="nav_roommates">Roommates</a>
            <a href="/messages" className="nav-link" data-i18n="nav_messages">Messages</a>
            <div id="navAuthArea"></div>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <header className="section-header-pro fade-in-up">
            <span className="section-tag" data-i18n="listings_marketplace">Marketplace</span>
            <h1 className="title-pro" data-i18n="listings_title">Find Your Perfect Home</h1>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'var(--space-lg)',flexWrap:'wrap',gap:'16px'}}>
              <p className="text-muted" style={{maxWidth:500}}>
                Browse all listings freely. To contact owners, sign contracts or make payments you need to be <strong>verified</strong> and have an active <strong>Premium</strong> plan.
              </p>
              <button id="toggleView" className="btn btn-secondary hover-lift" style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span id="viewIcon">🗺️</span> <span id="viewText" data-i18n="listings_map_view">Map View</span>
              </button>
            </div>
          </header>
          <div id="statusBanner" style={{marginTop:'16px'}}></div>

          {/* Filters */}
          <div
            className="filter-panel-pro fade-in-up stagger-1"
            style={{
              marginTop: '16px',
              // Force PHP-like layout even if CSS variables differ slightly
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <div
              className="grid grid-4 gap-lg"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-lg)'
              }}
            >
              <div className="form-group mb-0">
                <label className="form-label" data-i18n="filter_min_price">Min Price (TND)</label>
                <input type="number" id="filterMinPrice" className="form-input" placeholder="e.g. 400" />
              </div>
              <div className="form-group mb-0">
                <label className="form-label" data-i18n="filter_max_price">Max Price (TND)</label>
                <input type="number" id="filterMaxPrice" className="form-input" placeholder="e.g. 1200" />
              </div>
              <div className="form-group mb-0">
                <label className="form-label" data-i18n="filter_bedrooms">Bedrooms</label>
                <select id="filterBedrooms" className="form-input">
                  <option value="" data-i18n="filter_any_bedrooms">Any</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label" data-i18n="filter_property_type">Type</label>
                <select id="filterType" className="form-input">
                  <option value="" data-i18n="filter_any_type">Any Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="room">Shared Room</option>
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Gender Preference</label>
                <select id="filterGender" className="form-input">
                  <option value="">Any Gender</option>
                  <option value="male">Male Only</option>
                  <option value="female">Female Only</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 'var(--space-xl)',
                gap: 'var(--space-lg)'
              }}
            >
              <button id="applyFilters" className="btn btn-primary hover-lift" data-i18n="btn_apply_filters" style={{minWidth: 200}}>Apply Filters</button>
              <button id="resetFilters" className="btn btn-secondary hover-lift" title="Reset">🔄</button>
            </div>
          </div>

          {/* List View */}
          <div id="listView">
            <div id="listingsGrid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'var(--space-xl)'}}>
              <div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px 0'}}>
                <div className="loading-spinner" style={{margin:'0 auto 16px'}}></div>
                <p data-i18n="loading_marketplace">Loading Marketplace...</p>
              </div>
            </div>
          </div>

          {/* Map View */}
          <div id="mapView" style={{display: 'none'}}>
            <div id="map" style={{height:'calc(100vh - 300px)',minHeight:500,borderRadius:'var(--radius-2xl)',boxShadow:'var(--shadow-lg)',border:'1px solid var(--color-border)'}}></div>
          </div>
        </div>
      </main>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />
      <Script id="listings-logic" strategy="afterInteractive">{`
        let allListings = [];
        let savedIds = [];
        let map = null;
        let markers = [];

        function renderListingCard(l, index) {
          const isSaved = savedIds.includes(l.id);
          const img = window.resolveImageUrl(l.thumbnail || (l.images?.[0]?.image_path));
          const totalPlaces = parseInt(l.beds_count || l.capacity || 1);
          const remaining = Math.max(0, totalPlaces - (l.occupant_count || 0));
          const isFull = remaining === 0;

          return \`<article class="card premium-card fade-in-up stagger-\${(index % 5) + 1}" style="cursor:pointer" onclick="window.location.href='/listings/\${l.id}'">
            <div style="position:relative;height:240px;overflow:hidden">
              <button class="btn \${isSaved ? 'btn-primary' : 'btn-secondary'}" 
                      style="position:absolute;top:12px;right:12px;z-index:10;padding:0;border-radius:50%;width:36px;height:36px;border:none;box-shadow:var(--shadow-md)"
                      onclick="toggleSaveListing(\${l.id}, event)">
                \${isSaved ? '✓' : '♡'}
              </button>
              <img src="\${img}" class="card-image" style="width:100%;height:100%;object-fit:cover;\${isFull ? 'filter:grayscale(0.5)' : ''}" onerror="this.src='/placeholder.jpg'">
              \${isFull ? '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:5"><span class="badge" style="background:var(--color-error);color:white">FULL</span></div>' : ''}
              <div style="position:absolute;bottom:12px;left:12px;z-index:10;display:flex;gap:4px">
                <span class="badge" style="background:rgba(255,255,255,0.9);backdrop-filter:blur(4px);color:var(--color-text-primary)">\${l.property_type || 'Property'}</span>
                \${l.gender_preference && l.gender_preference !== 'any' ? \`<span class="badge" style="background:rgba(255,255,255,0.9);backdrop-filter:blur(4px);color:var(--color-text-primary)">\${l.gender_preference === 'male' ? '♂️' : '♀️'} Only</span>\` : ''}
              </div>
            </div>
            <div class="card-body" style="padding:var(--space-lg)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                <h3 style="margin:0;font-size:1.1rem;flex:1">\${l.title}</h3>
                <div style="font-weight:700;color:var(--color-brand);font-size:1.2rem;white-space:nowrap">\${l.price} <small style="font-size:0.7rem">TND/mo</small></div>
              </div>
              <p class="text-muted" style="font-size:0.85rem;margin:4px 0">📍 \${l.address || l.location || 'Tunisia'}</p>
              <div style="display:flex;gap:12px;padding:8px 0;border-top:1px solid var(--color-surface-50);margin-top:12px">
                <span style="font-size:0.8rem;font-weight:600">🛏️ \${l.bedrooms || 1} Bed</span>
                <span style="font-size:0.8rem;font-weight:600">👤 \${remaining} Places</span>
                \${l.size ? \`<span style="font-size:0.8rem;font-weight:600">📐 \${l.size}m²</span>\` : ''}
              </div>
              <button class="btn btn-secondary" style="width:100%;margin-top:12px;font-size:0.8rem">Discover Details</button>
            </div>
          </article>\`;
        }

        async function loadListings(params = {}) {
          const grid = document.getElementById('listingsGrid');
          try {
            const [savedRes, listingsRes] = await Promise.all([
              window.UNIDAR_API.SavedListings.getAll().catch(() => ({ listings: [], saved_listings: [] })),
              window.UNIDAR_API.Listings.getAll(params)
            ]);
            const savedList = savedRes.listings || savedRes.saved_listings || [];
            savedIds = savedList.map(l => l.id || l.listing_id).filter(Boolean);
            allListings = listingsRes.listings || [];
            if (!allListings.length) {
              grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 0" class="card premium-card">🏠 <h3>No listings found</h3><p class="text-muted">Adjust your filters and try again</p></div>';
              return;
            }
            grid.innerHTML = allListings.map((l, i) => renderListingCard(l, i)).join('');
            if (map) renderMarkers();
          } catch (err) {
            console.error('Listings Load Error:', err);
            grid.innerHTML = '<div class="alert alert-error">Failed to load listings: ' + (err.message || 'Unknown error') + '</div>';
          }
        }

        async function toggleSaveListing(id, e) {
          e.stopPropagation();
          const btn = e.currentTarget;
          btn.disabled = true;
          try {
            const isSaved = savedIds.includes(id);
            if (isSaved) {
              await window.UNIDAR_API.SavedListings.unsave(id);
              savedIds = savedIds.filter(sid => sid !== id);
              btn.innerHTML = '♡';
              btn.className = 'btn btn-secondary';
            } else {
              await window.UNIDAR_API.SavedListings.save(id);
              savedIds.push(id);
              btn.innerHTML = '✓';
              btn.className = 'btn btn-primary';
            }
          } catch (err) { alert('Action failed'); }
          btn.disabled = false;
        }
        window.toggleSaveListing = toggleSaveListing;

        function initMap() {
          if (map) return;
          map = L.map('map').setView([36.8065, 10.1815], 12);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
          renderMarkers();
        }

        function renderMarkers() {
          markers.forEach(m => map.removeLayer(m));
          markers = allListings.filter(l => l.latitude && l.longitude).map(l => {
            return L.marker([l.latitude, l.longitude])
              .addTo(map)
              .bindPopup(\`<b>\${l.title}</b><br>\${l.price} TND<br><a href="/listings/\${l.id}">View Details</a>\`);
          });
        }

        document.getElementById('toggleView').addEventListener('click', () => {
          const list = document.getElementById('listView');
          const mv = document.getElementById('mapView');
          const text = document.getElementById('viewText');
          const icon = document.getElementById('viewIcon');
          if (list.style.display === 'none') {
            list.style.display = 'block'; mv.style.display = 'none';
            text.textContent = 'Map View'; icon.textContent = '🗺️';
          } else {
            list.style.display = 'none'; mv.style.display = 'block';
            text.textContent = 'List View'; icon.textContent = '📋';
            setTimeout(() => { initMap(); map.invalidateSize(); }, 100);
          }
        });

        document.getElementById('applyFilters').addEventListener('click', () => {
          const params = {};
          const minPrice = document.getElementById('filterMinPrice').value;
          const maxPrice = document.getElementById('filterMaxPrice').value;
          const bedrooms = document.getElementById('filterBedrooms').value;
          const propertyType = document.getElementById('filterType').value;
          const gender = document.getElementById('filterGender').value;

          // Match PHP version + backend API expected keys
          if (minPrice) params.min_price = minPrice;
          if (maxPrice) params.max_price = maxPrice;
          if (bedrooms) params.bedrooms = bedrooms;
          if (propertyType) params.property_type = propertyType === 'room' ? 'shared_room' : propertyType;
          if (gender) params.gender_preference = gender;
          loadListings(params);
        });

        document.getElementById('resetFilters').addEventListener('click', () => {
          ['filterMinPrice','filterMaxPrice','filterBedrooms','filterType','filterGender'].forEach(id => document.getElementById(id).value = '');
          loadListings();
        });

        async function initListings() {
          const api = window.UNIDAR_API;
          if (!api) return;
          const auth = await api.Auth.check().catch(() => ({ authenticated: false }));
          if (!auth || !auth.authenticated) {
            window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
            return;
          }
          document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'block');

          const u = auth.user || {};
          const isStudent = u.role === 'student';
          const isValidated = u.verification_status === 'approved';
          const isPremium = u.subscription_status === 'active';

          if (isStudent && (!isValidated || !isPremium)) {
            const banner = document.getElementById('statusBanner');
            if (banner) {
              const nextStep = !isValidated ? 'verification' : 'subscription';
              const nextLabel = !isValidated ? '🎓 Get Verified' : '⭐ Upgrade to Premium';
              const nextDesc = !isValidated
                ? 'Upload your student ID to get verified, then upgrade to Premium.'
                : 'You&rsquo;re verified! Upgrade to Premium to contact owners, sign contracts and pay.';
              const stepBadge = !isValidated
                ? '<span style="background:#dbeafe;color:#1d4ed8;border-radius:20px;padding:2px 10px;font-size:.7rem;font-weight:700;margin-right:6px">Unverified</span>'
                : '<span style="background:#fef3c7;color:#92400e;border-radius:20px;padding:2px 10px;font-size:.7rem;font-weight:700;margin-right:6px">No Premium</span>';
              banner.innerHTML = \`
                <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(99,102,241,.07),rgba(168,85,247,.07));border:1.5px solid rgba(99,102,241,.2);border-radius:16px;padding:14px 18px">
                  <div style="font-size:1.5rem">🔒</div>
                  <div style="flex:1;min-width:220px">
                    <div style="font-weight:700;font-size:.9rem;color:#1e293b;margin-bottom:3px">
                      \${stepBadge}Restricted Actions
                    </div>
                    <div style="font-size:.78rem;color:#64748b">\${nextDesc}</div>
                  </div>
                  <a href="/\${nextStep}" class="btn btn-primary" style="font-size:.82rem;white-space:nowrap;flex-shrink:0">\${nextLabel}</a>
                </div>
              \`;
            }
          }

          loadListings();
        }

        initListings();
      `}</Script>
    </>
  );
}

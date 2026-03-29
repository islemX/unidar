(function() {
    const api = window.UNIDAR_API;
    if (!api) {
        console.error('UNIDAR API not found');
        return;
    }

    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    };

    const resolveDocUrl = (p) => {
        if (!p) return '#';
        // DB might store Windows paths with backslashes; normalize to URL-friendly form
        const path = String(p).replaceAll('\\', '/');
        if (path.startsWith('http') || path.startsWith('/')) return path;
        return '/' + path;
    };

    window.closeDocModal = () => { 
        const m = document.getElementById('docViewerModal'); 
        if (m) m.style.display = 'none'; 
    };

    window.viewDocs = (studentIdFile, nationalIdFile) => {
        const modal = document.getElementById('docViewerModal');
        const content = document.getElementById('docViewerContent');
        if (!modal || !content) return;

        const renderDoc = (label, filePath) => {
            if (!filePath) return '<div style="border:2px dashed #e2e8f0;border-radius:12px;padding:24px;text-align:center;color:#94a3b8"><p>No document</p></div>';
            const url = resolveDocUrl(filePath);
            const isPdf = String(filePath).toLowerCase().endsWith('.pdf');
            if (isPdf) {
                return '<div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">' +
                    '<div style="background:#f8fafc;padding:10px 12px;font-weight:700;border-bottom:1px solid #e2e8f0">' + label + '</div>' +
                    '<div style="padding:18px;text-align:center">' +
                        '<div style="font-size:48px;margin-bottom:8px">📄</div>' +
                        '<a class="btn btn-primary" target="_blank" href="' + url + '" style="text-decoration:none">Open PDF ↗</a>' +
                    '</div></div>';
            }
            return '<div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">' +
                '<div style="background:#f8fafc;padding:10px 12px;font-weight:700;border-bottom:1px solid #e2e8f0">' + label + '</div>' +
                '<div style="padding:10px"><img src="' + url + '" style="width:100%;border-radius:10px" /></div>' +
                '<div style="padding:10px;text-align:center"><a class="btn btn-secondary btn-sm" target="_blank" href="' + url + '" style="text-decoration:none">Open full size ↗</a></div>' +
            '</div>';
        };
        content.innerHTML = renderDoc('🪪 Student ID', studentIdFile) + renderDoc('🪪 National ID', nationalIdFile);
        modal.style.display = 'flex';
    };

    window.showDocPreview = (btn) => {
        if (!btn) return;
        const s = btn.dataset.student || '';
        const n = btn.dataset.national || '';
        const studentUrl = s ? decodeURIComponent(s) : '';
        const nationalUrl = n ? decodeURIComponent(n) : '';
        window.viewDocs(studentUrl, nationalUrl);
    };

    async function loadStats() {
        try {
            const s = await api.Admin.getStats();
            document.getElementById('totalUsers').textContent = s.total_users || 0;
            document.getElementById('totalListings').textContent = s.active_listings || 0;
            document.getElementById('pendingVerifications').textContent = s.pending_verifications || 0;
            document.getElementById('totalReports').textContent = s.open_reports || 0;
            document.getElementById('totalSubscriptions').textContent = s.active_subscriptions || 0;
            document.getElementById('totalContracts').textContent = s.total_contracts || 0;
        } catch (e) { console.error('Stats error', e); }
    }

    async function loadSubscriptions() {
        try {
            const status = document.getElementById('subsStatusFilter')?.value || '';
            const data = await api.Admin.getSubscriptions(status);
            const list = data.subscriptions || [];
            const tbody = document.getElementById('subsTableBody');
            if (!tbody) return;
            if (!list.length) {
                tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No subscriptions found</td></tr>';
                return;
            }
            const badgeFor = (st) => st === 'active' ? 'badge-success' : (st === 'cancelled' ? 'badge-error' : 'badge-warning');
            tbody.innerHTML = list.map(s => `
                <tr>
                    <td><strong>${escapeHtml(s.user_name || 'N/A')}</strong><br><small class="text-muted">${escapeHtml(s.user_email || '')}</small></td>
                    <td>${escapeHtml(s.plan || s.subscription_type || 'Pro')}</td>
                    <td><span class="badge ${badgeFor(s.status)}">${escapeHtml(s.status || '')}</span></td>
                    <td>${s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}</td>
                    <td>${s.expires_at ? new Date(s.expires_at).toLocaleDateString() : '—'}</td>
                    <td style="text-align:right;font-weight:800">${(s.amount ?? s.price ?? 25)} TND</td>
                </tr>
            `).join('');
        } catch (e) { console.error('Subscriptions error', e); }
    }

    async function loadVerifications() {
        try {
            const data = await api.Admin.getVerifications('pending');
            const list = data.verifications || [];
            const tbody = document.getElementById('verificationsTableBody');
            if (!tbody) return;
            if (!list.length) {
                tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No pending verifications</td></tr>';
                return;
            }
            tbody.innerHTML = list.map(v => `
                <tr>
                    <td>${escapeHtml(v.full_name || 'N/A')}</td>
                    <td>${escapeHtml(v.email || 'N/A')}</td>
                    <td>${escapeHtml(v.university || 'N/A')}</td>
                    <td>${v.submitted_at ? new Date(v.submitted_at).toLocaleString() : '—'}</td>
                    <td>
                        <div style="display:flex;flex-direction:column;gap:6px">
                            ${v.student_id_file ? `<a class="btn btn-secondary btn-sm" target="_blank" href="${resolveDocUrl(v.student_id_file)}" style="text-decoration:none">🪪 Student ID</a>` : '<span class="badge badge-warning">Missing</span>'}
                            ${v.national_id_file ? `<a class="btn btn-secondary btn-sm" target="_blank" href="${resolveDocUrl(v.national_id_file)}" style="text-decoration:none">🪪 National ID</a>` : '<span class="badge badge-warning">Missing</span>'}
                            ${(v.student_id_file || v.national_id_file) ? (() => {
                                const sUrl = resolveDocUrl(v.student_id_file || '');
                                const nUrl = resolveDocUrl(v.national_id_file || '');
                                return '<button class="btn btn-primary btn-sm" onclick="window.showDocPreview(this)" data-student="' + encodeURIComponent(sUrl) + '" data-national="' + encodeURIComponent(nUrl) + '">👁 Preview</button>';
                            })() : ''}
                        </div>
                    </td>
                    <td><span class="badge badge-warning">Pending</span></td>
                    <td style="text-align:center">
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm" onclick="reviewVerif(${v.id}, 'approve')">Approve</button>
                            <button class="btn btn-danger btn-sm" onclick="reviewVerif(${v.id}, 'reject')">Reject</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) { console.error('Verif error', e); }
    }

    async function loadUsers() {
        try {
            const search = document.getElementById('userSearch')?.value || '';
            const role = document.getElementById('roleFilter')?.value || '';
            const status = document.getElementById('statusFilter')?.value || '';
            const data = await api.Admin.getUsers({ search, role, status });
            const list = data.users || [];
            const badge = document.getElementById('userCount');
            if (badge) badge.textContent = list.length;
            const tbody = document.getElementById('usersTableBody');
            if (!tbody) return;
            if (!list.length) {
                tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No users found</td></tr>';
                return;
            }
            tbody.innerHTML = list.map(u => `
                <tr>
                    <td>${escapeHtml(u.full_name || 'N/A')}</td>
                    <td>${escapeHtml(u.email || 'N/A')}</td>
                    <td><span class="badge badge-info">${escapeHtml(u.role || '')}</span></td>
                    <td><span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}">${escapeHtml(u.status || '')}</span></td>
                    <td style="text-align:center">
                        <div class="action-buttons">
                            ${u.status !== 'banned' ? `<button class="btn btn-danger btn-sm" onclick="toggleBan(${u.id}, 'banned')">Ban</button>` : `<button class="btn btn-secondary btn-sm" onclick="toggleBan(${u.id}, 'active')">Unban</button>`}
                            <button class="btn btn-danger btn-sm" style="background:#991b1b" onclick="deleteUser(${u.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) { console.error('Users error', e); }
    }

    async function loadReports() {
        try {
            const data = await api.Admin.getReports('open');
            const list = data.reports || [];
            const tbody = document.getElementById('reportsTableBody');
            if (!tbody) return;
            if (!list.length) {
                tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No open reports</td></tr>';
                return;
            }
            tbody.innerHTML = list.slice(0, 20).map(r => `
                <tr>
                    <td><strong>${escapeHtml(r.reporter_name || 'N/A')}</strong><br><small class="text-muted">${escapeHtml(r.reporter_email || '')}</small></td>
                    <td><span class="badge badge-info">${escapeHtml(r.report_type || 'report')}</span></td>
                    <td>${escapeHtml((r.reason || '').replaceAll('_',' '))}</td>
                    <td><div class="text-truncate" style="max-width:260px" title="${escapeHtml(r.description||'')}">${escapeHtml(r.description||'')}</div></td>
                    <td>${r.created_at ? new Date(r.created_at).toLocaleString() : '—'}</td>
                    <td style="text-align:center">
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm" onclick="resolveReport(${r.id}, 'resolve')">Resolve</button>
                            <button class="btn btn-secondary btn-sm" onclick="resolveReport(${r.id}, 'dismiss')">Dismiss</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) { console.error('Reports error', e); }
    }

    async function loadTerminations() {
        try {
            const data = await api.Admin.getTerminationRequests();
            const list = data.requests || [];
            const tbody = document.getElementById('termsTableBody');
            if (!tbody) return;
            if (!list.length) {
                tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No pending termination requests</td></tr>';
                return;
            }
            tbody.innerHTML = list.map(t => {
                const isAdminOwned = t.owner_role === 'admin';
                const rowStyle = isAdminOwned ? 'background:linear-gradient(90deg,#fffbeb,#fef9ee);' : '';
                const adminBadge = isAdminOwned
                    ? '<span class="badge badge-warning" style="margin-left:6px;font-size:0.65rem">ADMIN LISTING</span>'
                    : '';
                // For fallback rows (no formal termination_requests entry), id is null — use contract_id for the action
                const actionId = t.id || ('c:' + t.contract_id);
                return `<tr style="${rowStyle}">
                    <td>${t.contract_id}<br><small style="color:#94a3b8">#${t.id || 'fallback'}</small></td>
                    <td>${escapeHtml(t.listing_title || 'N/A')}${adminBadge}</td>
                    <td>${escapeHtml(t.owner_name || 'N/A')}</td>
                    <td>${escapeHtml(t.requester_name || 'N/A')}</td>
                    <td><div class="text-truncate" style="max-width:200px" title="${escapeHtml(t.reason||'')}">${escapeHtml(t.reason||'—')}</div></td>
                    <td>${t.created_at ? new Date(t.created_at).toLocaleDateString() : '—'}</td>
                    <td style="text-align:center">
                        <div class="action-buttons">
                            <button class="btn btn-primary btn-sm" onclick="reviewTerm('${actionId}', 'approve')">✓ Approve</button>
                            <button class="btn btn-danger btn-sm" onclick="reviewTerm('${actionId}', 'reject')">✕ Reject</button>
                        </div>
                    </td>
                </tr>`;
            }).join('');
        } catch (e) { console.error('Terminations error', e); }
    }

    window.reviewVerif = async (id, action) => {
        let reason = action === 'reject' ? prompt('Enter rejection reason:') : null;
        if (action === 'reject' && reason === null) return;
        try {
            await api.Verifications.review(id, { action, rejection_reason: reason });
            loadStats(); loadVerifications();
        } catch (e) { alert('Action failed'); }
    };

    window.toggleBan = async (id, newStatus) => {
        if (!confirm(`Are you sure you want to ${newStatus === 'banned' ? 'BAN' : 'UNBAN'} this user?`)) return;
        try {
            await api.Admin.updateUserStatus(id, newStatus, 'Updated by admin');
            loadUsers();
            loadStats();
        } catch (e) { alert('Action failed'); }
    };

    window.deleteUser = async (id) => {
        if (!confirm('PERMANENTLY delete this user? (soft delete / ban)')) return;
        try {
            await api.Admin.deleteUser(id);
            loadUsers();
            loadStats();
        } catch (e) { alert('Delete failed'); }
    };

    window.resolveReport = async (id, action) => {
        let notes = prompt('Resolution notes (optional):');
        if (notes === null) return;
        try {
            await api.Admin.resolveReport(id, action, notes);
            loadReports(); loadStats();
        } catch (e) { alert('Action failed'); }
    };

    window.reviewTerm = async (id, action) => {
        if (!confirm(`Are you sure you want to ${action} this termination request?`)) return;
        try {
            // Fallback rows use 'c:contractId' format — handle them via terminate/reject directly
            if (String(id).startsWith('c:')) {
                const contractId = String(id).replace('c:', '');
                if (action === 'approve') {
                    await api.Contracts.terminate(contractId, 'Approved by admin');
                } else {
                    // Reject: reset contract status back to active
                    await fetch('/api/contracts/update-status', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ contract_id: contractId, status: 'active' })
                    });
                }
            } else {
                await api.Admin.reviewTermination(id, action);
            }
            loadTerminations(); loadStats();
        } catch (e) { alert('Action failed: ' + (e.message || e)); }
    };

    window.loadAllAdminData = () => { 
        loadStats(); loadVerifications(); loadUsers(); loadReports(); loadTerminations(); loadSubscriptions(); loadAdminContracts();
    };

    window.loadAdminContracts = async function() {
        try {
            const data = await api.Admin.getContracts();
            const list = data.contracts || [];
            const wrap = document.getElementById('contractsList');
            if (!wrap) return;
            if (!list.length) { wrap.innerHTML = '<div class="empty-state">No contracts</div>'; return; }
            wrap.innerHTML = list.slice(0, 50).map(c => {
                const url = '/api/contracts/download?contract_id=' + c.id;
                const status = c.status || 'pending';
                return '<div class="card" style="padding:16px;border-left:4px solid #8b5cf6">' +
                    '<div style="font-weight:800">#' + c.id + '</div>' +
                    '<div class="text-muted" style="font-size:0.85rem;margin-top:4px">' + (c.listing_title || 'Listing') + '</div>' +
                    '<div style="font-size:0.8rem;margin-top:6px"><span class="badge badge-info">' + status + '</span></div>' +
                    '<div style="display:flex;gap:8px;margin-top:12px">' +
                        '<button class="btn btn-secondary btn-sm" onclick="openContract(' + c.listing_id + ',' + c.id + ',\'' + url + '\',\'' + status + '\')">👁 View</button>' +
                    '</div>' +
                '</div>';
            }).join('');
        } catch (e) { console.error('Contracts error', e); }
    };

    window.openContract = (listingId, contractId, url, status) => {
        if (window.ContractManager && window.ContractManager.showContractModal) {
            window.ContractManager.showContractModal(listingId || 0, url, null, contractId, 'admin', status);
        } else {
            window.open(url, '_blank');
        }
    };

    async function init() {
        try {
            const auth = await api.Auth.check();
            if (!auth.authenticated || auth.user.role !== 'admin') { 
                window.location.href = '/login'; 
                return; 
            }
            
            // Attach event listeners
            document.getElementById('userSearch')?.addEventListener('input', (e) => {
                clearTimeout(window.searchTimeout);
                window.searchTimeout = setTimeout(() => loadUsers(), 300);
            });
            document.getElementById('applyUserFilters')?.addEventListener('click', () => loadUsers());
            document.getElementById('refreshTermsBtn')?.addEventListener('click', () => loadTerminations());
            document.getElementById('refreshContractsBtn')?.addEventListener('click', () => window.loadAdminContracts());
            document.getElementById('refreshBtn')?.addEventListener('click', () => window.loadAllAdminData());
            document.getElementById('refreshSubsBtn')?.addEventListener('click', () => loadSubscriptions());
            document.getElementById('subsStatusFilter')?.addEventListener('change', () => loadSubscriptions());
            document.getElementById('logoutBtn')?.addEventListener('click', async () => { 
                await api.Auth.logout(); 
                window.location.href = '/login'; 
            });

            window.loadAllAdminData();
        } catch (e) {
            console.error('Init error', e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/**
 * UNIDAR API Utility
 * Centralized API communication functions
 */

/// Dynamically determine the base URL
const API_BASE_URL = '/api';

async function apiCall(endpoint, options = {}) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const url = `${API_BASE_URL}/${cleanEndpoint}`;

    const defaultOptions = {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    };

    const config = { ...defaultOptions, ...options };

    if (config.body instanceof FormData) {
        delete config.headers['Content-Type'];
    } else if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ─── Authentication API ────────────────────────────────────────────────────
const AuthAPI = {
    async register(userData) {
        return apiCall('auth/register', { method: 'POST', body: userData });
    },
    async login(email, password) {
        return apiCall('auth/login', { method: 'POST', body: { email, password } });
    },
    async logout() {
        return apiCall('auth/logout');
    },
    async checkAuth() {
        return apiCall('auth/check', { method: 'GET', cache: 'no-store' });
    },
    async check() {
        return this.checkAuth();
    }
};

// ─── Listings API ──────────────────────────────────────────────────────────
const ListingsAPI = {
    async getAll(filters = {}) {
        const params = new URLSearchParams(filters);
        return apiCall(`listings?${params.toString()}`);
    },
    async getById(id) {
        return apiCall(`listings/${id}`);
    },
    async create(listingData) {
        return apiCall('listings', { method: 'POST', body: listingData });
    },
    async update(id, listingData) {
        return apiCall(`listings/${id}`, { method: 'PUT', body: listingData });
    },
    async delete(id) {
        return apiCall(`listings/${id}`, { method: 'DELETE' });
    },
};

// ─── Verifications API ─────────────────────────────────────────────────────
const VerificationsAPI = {
    async getMyVerification() {
        return apiCall('verifications');
    },
    // Alias used by verification.js page
    async getMine() {
        return apiCall('verifications');
    },
    async submitVerification(formData) {
        return apiCall('verifications', { method: 'POST', body: formData });
    },
    // Alias used by verification.js page
    async submit(formData) {
        return this.submitVerification(formData);
    },
    // Used by admin dashboard to approve/reject verifications
    async review(id, data) {
        return apiCall(`verifications?id=${id}`, { method: 'PUT', body: data });
    },
    // Alias for legacy compatibility
    async getAll(status = 'pending') {
        return apiCall(`verifications?status=${status}`);
    }
};

// ─── Messages / Conversations API ─────────────────────────────────────────
const MessagesAPI = {
    async getConversations() {
        return apiCall('conversations');
    },
    // Alias used by messages.js page
    async getAll() {
        return this.getConversations();
    },
    async getConversation(id) {
        return apiCall(`messages?conversation_id=${id}`);
    },
    // Alias used by messages.js page
    async getMessages(conversationId) {
        return apiCall(`messages?conversation_id=${conversationId}`);
    },
    async getUnreadCount() {
        return apiCall('messages?action=unread_count');
    },
    async createConversation(recipientId, listingId = null) {
        return apiCall('conversations', {
            method: 'POST',
            // Compatibility: backend expects other_user_id; some clients use recipient_id
            body: {
                other_user_id: recipientId,
                recipient_id: recipientId,
                listing_id: listingId
            }
        });
    },
    async sendMessage(conversationId, message) {
        return apiCall('messages', {
            method: 'POST',
            body: { conversation_id: conversationId, message }
        });
    },
    // Alias used by messages.js page – accepts object { conversation_id, message }
    async send(data) {
        return apiCall('messages', {
            method: 'POST',
            body: data
        });
    },
    async markAsRead(conversationId) {
        return apiCall('messages', {
            method: 'PUT',
            body: { conversation_id: conversationId }
        });
    },
    async blockUser(userId) {
        return apiCall('messages?action=block', {
            method: 'POST',
            body: { user_id: userId }
        });
    },
    async toggleArchive(conversationId, archive = true) {
        return apiCall('conversations?action=archive', {
            method: 'POST',
            body: { conversation_id: conversationId, archive }
        });
    },
    async deleteConversation(conversationId) {
        return apiCall('conversations?action=delete', {
            method: 'POST',
            body: { conversation_id: conversationId }
        });
    },
    // Alias for compatibility
    async create(recipientId, listingId = null) {
        return this.createConversation(recipientId, listingId);
    }
};

// ─── Roommates API ─────────────────────────────────────────────────────────
const RoommatesAPI = {
    async getPreferences() {
        return apiCall('roommates');
    },
    async savePreferences(preferences) {
        return apiCall('roommates', { method: 'POST', body: preferences });
    },
    async getMatches() {
        return apiCall('roommates?matches=true');
    },
};

// ─── Reports API ───────────────────────────────────────────────────────────
const ReportsAPI = {
    async create(reportData) {
        return apiCall('reports', { method: 'POST', body: reportData });
    },
    async getMyReports() {
        return apiCall('reports');
    },
};

// ─── Admin API ─────────────────────────────────────────────────────────────
const AdminAPI = {
    async getStats() {
        const res = await apiCall('admin?action=stats');
        // Next admin API returns { stats: {...} }
        return res.stats || res;
    },
    async getUsers(params = {}) {
        // Support both styles:
        // - getUsers({ search, role, status })
        // - getUsers(search, role, status)  (legacy)
        let normalized = {};
        if (typeof params === 'string') {
            normalized = { search: params, role: arguments[1] || '', status: arguments[2] || '' };
        } else {
            normalized = (typeof params === 'object' && params) ? params : {};
        }
        const { search = '', role = '', status = '' } = normalized;
        const qs = new URLSearchParams();
        qs.set('action', 'users');
        if (search) qs.set('search', search);
        if (role)   qs.set('role', role);
        if (status) qs.set('status', status);
        return apiCall(`admin?${qs.toString()}`);
    },
    async getVerifications(status = 'pending') {
        const qs = new URLSearchParams();
        qs.set('action', 'verifications');
        if (status) qs.set('status', status);
        return apiCall(`admin?${qs.toString()}`);
    },
    async getListings() {
        return apiCall('admin?action=listings');
    },
    async getContracts() {
        return apiCall('admin?action=contracts');
    },
    async getSubscriptions(status = '') {
        const qs = new URLSearchParams();
        qs.set('action', 'subscriptions');
        if (status) qs.set('status', status);
        return apiCall(`admin?${qs.toString()}`);
    },
    async getReports(status = 'open') {
        const qs = new URLSearchParams();
        qs.set('action', 'reports');
        if (status) qs.set('status', status);
        return apiCall(`admin?${qs.toString()}`);
    },
    async getPayments(period = 'all') {
        const qs = new URLSearchParams();
        if (period) qs.set('period', period);
        return apiCall(`admin/payments?${qs.toString()}`);
    },
    async getPaymentStats(period = 'all') {
        return apiCall(`admin-payments.php?action=statistics&period=${period}`);
    },
    async updateUserStatus(userId, status, notes = '') {
        // Next admin API uses POST actions for ban/unban
        if (status === 'banned') {
            return apiCall('admin?action=ban-user', { method: 'POST', body: { user_id: userId, reason: notes || '' } });
        }
        if (status === 'active') {
            return apiCall('admin?action=unban-user', { method: 'POST', body: { user_id: userId } });
        }
        // Fallback: treat unknown status as ban to be safe
        return apiCall('admin?action=ban-user', { method: 'POST', body: { user_id: userId, reason: notes || '' } });
    },
    async banUser(data) {
        return this.updateUserStatus(data.user_id, 'banned', data.reason || '');
    },
    async unbanUser(data) {
        return this.updateUserStatus(data.user_id, 'active', data.reason || '');
    },
    async resolveReport(id, action, notes = '') {
        // Use admin endpoint (Next API) for consistency
        return apiCall('admin?action=resolve-report', {
            method: 'POST',
            body: { report_id: id, resolution: `${action}${notes ? `: ${notes}` : ''}` }
        });
    },
    async deleteUser(id) {
        return apiCall(`admin?action=delete-user&id=${id}`, { method: 'DELETE' });
    },
    async getTerminationRequests() {
        return apiCall('contracts/get-termination-requests');
    },
    async reviewTermination(requestId, action) {
        const endpoint = action === 'approve' ? 'approve-termination' : 'reject-termination';
        return apiCall(`contracts/${endpoint}`, {
            method: 'POST',
            body: { request_id: requestId }
        });
    }
};

// ─── Contracts API ─────────────────────────────────────────────────────────
const ContractsAPI = {
    async getUserContracts() {
        return apiCall('contracts/user-contracts');
    },
    async getStatus(id) {
        return apiCall(`contracts/status?contract_id=${id}`);
    },
    async generate(data) {
        return apiCall('contracts/generate', { method: 'POST', body: data });
    },
    async sign(id, signature) {
        return apiCall('contracts/sign', { method: 'POST', body: { contract_id: id, signature } });
    },
    download(id) {
        return `/api/contracts/download?contract_id=${id}`;
    },
    async requestTermination(id, reason) {
        return apiCall('contracts/request-termination', { method: 'POST', body: { contract_id: id, reason } });
    },
    async getTerminationRequests() {
        return apiCall('contracts/get-termination-requests');
    },
    async approveTermination(requestId) {
        return apiCall('contracts/approve-termination', { method: 'POST', body: { request_id: requestId } });
    },
    async rejectTermination(requestId) {
        return apiCall('contracts/reject-termination', { method: 'POST', body: { request_id: requestId } });
    },
};

// ─── Saved Listings API ────────────────────────────────────────────────────
const SavedListingsAPI = {
    async getAll() {
        return apiCall('saved-listings');
    },
    async save(listingId) {
        return apiCall('saved-listings', { method: 'POST', body: { listing_id: listingId } });
    },
    async unsave(listingId) {
        return apiCall(`saved-listings?id=${listingId}`, { method: 'DELETE' });
    },
    async remove(listingId) {
        return this.unsave(listingId);
    }
};

// ─── Subscriptions API ─────────────────────────────────────────────────────
const SubscriptionsAPI = {
    async getStatus() {
        return apiCall('subscriptions');
    },
    // Alias used by subscription.js page
    async getMine() {
        return this.getStatus();
    },
    async subscribe(plan, paymentData = {}) {
        return apiCall('subscriptions', {
            method: 'POST',
            body: { plan, ...paymentData }
        });
    },
    // Alias used by subscription.js page
    async create(data) {
        const { plan, ...rest } = data;
        return this.subscribe(plan, rest);
    },
    async getAll() {
        return apiCall('subscriptions?all=1');
    },
};

// ─── Export ────────────────────────────────────────────────────────────────
window.UNIDAR_API = {
    Auth:         AuthAPI,
    Listings:     ListingsAPI,
    Verifications: VerificationsAPI,
    Messages:     MessagesAPI,
    Conversations: MessagesAPI,   // Alias for compatibility
    Roommates:    RoommatesAPI,
    Contracts:    ContractsAPI,
    SavedListings:SavedListingsAPI,
    Subscriptions:SubscriptionsAPI,
    Reports:      ReportsAPI,
    Admin:        AdminAPI,
};
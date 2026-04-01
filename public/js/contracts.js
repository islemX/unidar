// Contract and Payment Management System for UNIDAR

// Get base API URL dynamically (same logic as api.js)
const getContractApiBase = () => {
    // Try to use API_BASE_URL from api.js if available
    if (typeof API_BASE_URL !== 'undefined') {
        return API_BASE_URL;
    }

    // Otherwise, try to use getAPIBaseURL function if defined (from utils.js)
    if (typeof getAPIBaseURL === 'function') {
        try {
            return getAPIBaseURL();
        } catch (e) {
            console.warn('Error calling global getAPIBaseURL:', e);
        }
    }

    // Detect base path from current script location
    const scriptTag = document.currentScript || document.querySelector('script[src*="contracts.js"]');
    const scriptPath = scriptTag ? scriptTag.src : window.location.pathname;
    const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/js/') || scriptPath.lastIndexOf('/'));

    if (basePath && basePath !== '/') {
        return basePath + '/backend/api';
    }

    // Fallback: try to detect from window location
    const pathParts = window.location.pathname.split('/');
    const unidarIndex = pathParts.indexOf('unidar');
    if (unidarIndex !== -1) {
        return '/' + pathParts.slice(1, unidarIndex + 1).join('/') + '/backend/api';
    }

    // Final fallback
    return '/backend/api';
};

// Contract Management Functions
const ContractManager = {
    async generateContract(listingId, startDate, duration) {
        try {
            showLoadingModal('Préparation du contrat...');

            // Prefer Next/React API when available (unidarreact/public/js/api.js)
            if (window.UNIDAR_API && window.UNIDAR_API.Contracts && typeof window.UNIDAR_API.Contracts.generate === 'function') {
                const result = await window.UNIDAR_API.Contracts.generate({
                    listing_id: listingId,
                    start_date: startDate,
                    duration: duration
                });

                if (!result || !result.success) {
                    hideLoadingModal();
                    showErrorModal((result && (result.error || result.message)) || 'Erreur lors de la génération du contrat');
                    return null;
                }

                hideLoadingModal();

                const contractId = result.contract_id || result.contract?.id;
                const content = result.content || result.contract?.content || null;
                const status = result.contract?.status || 'pending';

                const downloadUrl = (result.contract_url && result.contract_url.startsWith('http'))
                    ? result.contract_url
                    : `/api/contracts/download?contract_id=${contractId}`;

                ContractManager.showContractModal(listingId, downloadUrl, content, contractId, 'student', status);
                return result;
            }

            // Fallback to legacy PHP endpoint (non-Next deployments)
            const apiBase = getContractApiBase();
            const apiUrl = `${apiBase}/contracts.php?action=generate`;
            console.log('Calling legacy API:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ listing_id: listingId, start_date: startDate, duration: duration }),
                credentials: 'include'
            });

            const responseText = await response.text();
            let legacy;
            try { legacy = JSON.parse(responseText); } catch (e) { legacy = null; }

            if (!legacy) {
                hideLoadingModal();
                showErrorModal('Erreur du serveur : Réponse invalide. Veuillez contacter l\'administrateur.');
                return null;
            }

            hideLoadingModal();
            if (legacy.success) {
                const downloadUrl = legacy.contract_url && legacy.contract_url.startsWith('http')
                    ? legacy.contract_url
                    : `${apiBase}/contracts.php?action=download&contract_id=${legacy.contract_id}`;
                ContractManager.showContractModal(listingId, downloadUrl, legacy.content, legacy.contract_id, 'student', legacy.status || 'pending');
                return legacy;
            }

            showErrorModal(legacy.error || 'Erreur lors de la génération du contrat');
            return null;
        } catch (error) {
            hideLoadingModal();
            console.error('Contract generation error:', error);
            showErrorModal(error?.message || 'Erreur de connexion au serveur');
            return null;
        }
    },

    showContractSetupModal(listingId) {
        console.log('[ContractSetupModal] Opening for listing:', listingId);
        console.log('[ContractSetupModal] ContractManager available:', typeof this !== 'undefined');

        // Close any existing modals first
        this.closeAllModals();

        // Small delay to ensure cleanup is complete
        setTimeout(() => {
            const modal = document.createElement('div');
            modal.id = 'contract-setup-modal';
            modal.className = 'modal-overlay';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 10000; backdrop-filter: blur(5px);';

            // Calculate default start month (next month)
            const today = new Date();
            const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            const defaultMonth = nextMonth.toISOString().slice(0, 7); // YYYY-MM

            modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; position: relative; z-index: 10001;">
                <div class="modal-header">
                    <h3>Paramètres du Contrat</h3>
                    <button class="modal-close" id="closeSetupModal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
                </div>
                
                <div class="modal-body">
                    <p class="text-muted mb-md">Veuillez définir la durée et la date de début de votre location.</p>
                    
                    <form id="contractSetupForm">
                        <div class="form-group mb-md">
                            <label class="form-label" for="startMonth">Mois de début</label>
                            <input type="month" id="startMonth" class="form-input" value="${defaultMonth}" required>
                            <p class="text-small text-muted mt-xs">La location commencera le 1er du mois sélectionné.</p>
                        </div>
                        
                        <div class="form-group mb-xl">
                            <label class="form-label" for="duration">Durée (Mois)</label>
                            <select id="duration" class="form-input" required>
                                ${Array.from({ length: 12 }, (_, i) => i + 1).map(n =>
                `<option value="${n}" ${n === 9 ? 'selected' : ''}>${n} mois</option>`
            ).join('')}
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            Générer le Contrat
                        </button>
                    </form>
                </div>
            </div>
        `;

            document.body.appendChild(modal);
            console.log('[ContractSetupModal] Modal appended to body');

            // Close on overlay click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });

            // Close button - use setTimeout to ensure DOM is ready
            setTimeout(() => {
                const closeBtn = document.getElementById('closeSetupModal');
                if (closeBtn) {
                    closeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.closeAllModals();
                    });
                    console.log('[ContractSetupModal] Close button handler attached');
                } else {
                    console.error('[ContractSetupModal] Close button not found!');
                }

                // Form submission
                const form = document.getElementById('contractSetupForm');
                if (form) {
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const startMonth = document.getElementById('startMonth').value;
                        const duration = document.getElementById('duration').value;

                        if (!startMonth || !duration) {
                            showErrorModal('Veuillez remplir tous les champs.');
                            return;
                        }

                        // Start date is always the 1st of the selected month
                        const startDate = `${startMonth}-01`;

                        this.closeAllModals();
                        await this.generateContract(listingId, startDate, duration);
                    });
                    console.log('[ContractSetupModal] Form handler attached');
                } else {
                    console.error('[ContractSetupModal] Form not found!');
                }
            }, 100);
        }, 50);
    },

    showContractModal(listingId, contractUrl, contractContent, contractId, userRole = 'student', status = null) {
        console.log(`[ContractModal] Attempting to open. ID: ${contractId}, Status: ${status}, Role: ${userRole}`);

        try {
            // Force cleanup of any existing overlays to prevent "sticky" blurs
            // Use skipLogging to avoid console spam
            this.closeAllModals(true);

            const modal = document.createElement('div');
            modal.id = 'unidar-contract-modal';
            modal.className = 'unidar-contract-overlay';
            // Force inline styles to ensure visibility
            modal.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background: rgba(15, 23, 42, 0.75) !important; backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; display: flex !important; align-items: center !important; justify-content: center !important; z-index: 200000 !important; padding: 20px !important; pointer-events: auto !important; visibility: visible !important; opacity: 1 !important;';

            // Check signature/payment status
            const isStudent = userRole === 'student';
            const isOwner = userRole === 'owner';
            const isSigned = ['signed_by_student', 'signed_by_owner', 'pending_payment', 'paid', 'active', 'completed'].includes(status);
            const isPaid = ['paid', 'active', 'completed'].includes(status);

            // Signature/Payment Box
            let actionBoxHTML = '';
            if (isStudent && !isSigned) {
                actionBoxHTML = `
                    <div style="margin-top: 20px; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; background: #fff;">
                        <h4 style="margin: 0 0 10px 0; color: #4f46e5;">✍️ Signature Numérique</h4>
                        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 15px;">Signez ci-dessous pour valider votre contrat.</p>
                        <div id="student-signature-pad" style="height: 150px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 15px;"></div>
                        <button id="btn-sign-contract" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: bold;">Valider la Signature</button>
                    </div>
                `;
            } else if (isStudent && isSigned && !isPaid) {
                actionBoxHTML = `
                    <div style="margin-top: 20px; border: 2px solid #4f46e5; padding: 20px; border-radius: 16px; background: rgba(79, 70, 229, 0.05); text-align: center;">
                        <h4 style="margin: 0 0 10px 0;">✅ Contrat Signé</h4>
                        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 20px;">Dernière étape : Réglez les frais pour activer la location.</p>
                        <button class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: bold;" onclick="PaymentManager.showPaymentModal(${listingId}, ${contractId})">
                            💳 Aller au Paiement
                        </button>
                    </div>
                `;
            } else if (isOwner) {
                actionBoxHTML = `
                    <div style="margin-top: 20px; padding: 15px; border-radius: 12px; background: #f8fafc; text-align: center; border: 1px solid #e2e8f0;">
                        <p style="font-size: 0.75rem; font-weight: bold; color: #64748b; text-transform: uppercase;">Statut du Paiement</p>
                        <div style="margin-top: 10px; font-weight: bold; color: ${isPaid ? '#10b981' : '#f59e0b'};">
                            ${isPaid ? '✅ Payé & Actif' : '⏳ Attente Paiement Étudiant'}
                        </div>
                    </div>
                `;
            }

            modal.innerHTML = `
                <div class="unidar-contract-content">
                    <div class="unidar-contract-header">
                        <h2 style="margin: 0; font-size: 1.5rem; font-weight: 800; color: var(--color-surface-900);">📄 Visualisation du Contrat</h2>
                        <button onclick="ContractManager.closeModal()" style="border: none; background: none; font-size: 2.2rem; line-height: 1; cursor: pointer; color: #94a3b8; transition: color 0.2s;">&times;</button>
                    </div>
                    
                    <div class="unidar-contract-body">
                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 20px; padding: 30px; margin-bottom: 24px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                            <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
                                <div style="font-size: 3rem; background: white; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">📑</div>
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.25rem; font-weight: 700;">Document Officiel</h4>
                                    <p style="font-size: 0.95rem; color: #64748b; margin: 0;">Identifiant de contrat: <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #475569;">#${contractId}</code></p>
                                    <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">Généré le ${new Date().toLocaleDateString()} par UNIDAR</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <a href="${contractUrl}" target="_blank" class="btn btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; font-weight: 800; border-radius: 12px; text-decoration: none; background: var(--color-brand); color: white; transition: all 0.3s ease;">
                                    <span>👁️ Voir le Contrat PDF Complet</span>
                                </a>
                                <p style="text-align: center; font-size: 0.75rem; color: #94a3b8;">Le document s'ouvrira dans un nouvel onglet pour signature physique ou impression si nécessaire.</p>
                            </div>
                        </div>
                        
                        <div style="border-top: 1px dashed #e2e8f0; margin: 30px 0;"></div>

                        ${actionBoxHTML}
                        
                        <div style="height: 20px;"></div>
                    </div>

                    <div class="unidar-contract-footer">
                        <button class="btn btn-secondary" onclick="ContractManager.closeModal()" style="padding: 10px 32px; font-weight: 700; border-radius: 12px; margin-right: 8px;">Fermer</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            console.log('[ContractModal] Modal successfully injected');
            console.log('[ContractModal] Modal element:', modal);
            console.log('[ContractModal] Modal computed style display:', window.getComputedStyle(modal).display);
            console.log('[ContractModal] Modal computed style visibility:', window.getComputedStyle(modal).visibility);
            console.log('[ContractModal] Modal computed style opacity:', window.getComputedStyle(modal).opacity);
            console.log('[ContractModal] Modal computed style z-index:', window.getComputedStyle(modal).zIndex);

            // Force a reflow to ensure styles are applied
            void modal.offsetHeight;

            // Double-check modal is still in DOM after a brief moment
            setTimeout(() => {
                const checkModal = document.getElementById('unidar-contract-modal');
                if (checkModal) {
                    console.log('[ContractModal] Modal still in DOM after 100ms');
                } else {
                    console.error('[ContractModal] Modal was removed from DOM!');
                }
            }, 100);

            // Close on overlay click - but only after a small delay to prevent immediate removal
            let modalJustCreated = true;
            setTimeout(() => {
                modalJustCreated = false;
            }, 500);

            modal.addEventListener('click', (e) => {
                // Prevent closing if modal was just created
                if (modalJustCreated) {
                    console.log('[ContractModal] Ignoring click - modal just created');
                    return;
                }
                if (e.target === modal) {
                    console.log('[ContractModal] Overlay clicked, closing modal');
                    this.closeAllModals();
                }
            });

            // Prevent closing when clicking content
            const content = modal.querySelector('.unidar-contract-content');
            if (content) {
                content.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('[ContractModal] Content clicked, preventing close');
                });
            } else {
                console.warn('[ContractModal] Content element not found!');
            }

            // Setup Signature Pad if needed
            const padEl = document.getElementById('student-signature-pad');
            if (padEl) {
                setTimeout(() => {
                    try {
                        if (typeof UnidarSignaturePad === 'undefined') throw new Error('UnidarSignaturePad script missing');
                        const pad = new UnidarSignaturePad('student-signature-pad', { backgroundColor: '#ffffff' });
                        document.getElementById('btn-sign-contract').onclick = async () => {
                            if (pad.isEmpty()) return alert('Veuillez signer.');
                            showLoadingModal('Signature...');
                            try {
                                let res;
                                if (window.UNIDAR_API && window.UNIDAR_API.Contracts && typeof window.UNIDAR_API.Contracts.sign === 'function') {
                                    res = await window.UNIDAR_API.Contracts.sign(contractId, pad.toDataURL());
                                } else {
                                    const apiBase = getContractApiBase();
                                    const resp = await fetch(`${apiBase}/contracts.php?action=sign`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ contract_id: contractId, signature: pad.toDataURL() }),
                                        credentials: 'include'
                                    });
                                    res = await resp.json();
                                }
                                
                                if (res.success) {
                                    hideLoadingModal();
                                    alert('✅ Contrat signé avec succès !');
                                    ContractManager.closeModal();
                                    
                                    // Redirect to payment modal immediately
                                    if (typeof PaymentManager !== 'undefined' && PaymentManager.showPaymentModal) {
                                        console.log('[ContractModal] Redirecting to payment modal for listing:', listingId, 'contract:', contractId);
                                        PaymentManager.showPaymentModal(listingId, contractId);
                                    } else {
                                        console.warn('[ContractModal] PaymentManager not found, reloading page');
                                        window.location.reload();
                                    }
                                } else {
                                    hideLoadingModal();
                                    alert('❌ Erreur: ' + (res.error || 'Erreur inconnue'));
                                }
                            } catch (e) {
                                hideLoadingModal();
                                alert('❌ Erreur de connexion: ' + e.message);
                            }
                        };
                    } catch (e) { console.error('[ContractModal] SigPad error:', e); }
                }, 400);
            }

        } catch (e) {
            console.error('[ContractModal] Error opening modal:', e);
            alert('Erreur lors de l\'ouverture: ' + e.message);
        }
    },

    async signContract(contractId, signatureData) {
        if (window.UNIDAR_API && window.UNIDAR_API.Contracts && typeof window.UNIDAR_API.Contracts.sign === 'function') {
            const result = await window.UNIDAR_API.Contracts.sign(contractId, signatureData);
            if (!result.success) throw new Error(result.error || 'Erreur lors de la signature');
            return result;
        }

        const apiBase = getContractApiBase();
        const response = await fetch(`${apiBase}/contracts.php?action=sign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contract_id: contractId, signature: signatureData }),
            credentials: 'include'
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Erreur lors de la signature');
        return result;
    },

    async uploadContractFile(contractId, file, studentName) {
        const formData = new FormData();
        formData.append('contract_file', file);
        formData.append('contract_id', contractId);
        formData.append('student_name', studentName);
        const apiBase = getContractApiBase();
        const response = await fetch(`${apiBase}/contracts.php?action=upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.error || 'Upload failed');
        return result;
    },

    closeModal() {
        console.log('[ContractModal] Closing');
        this.closeAllModals();
    },

    closeAllModals(skipLogging = false) {
        // Close loading modal first
        hideLoadingModal();

        // Close contract view modal
        const contractModal = document.getElementById('unidar-contract-modal');
        if (contractModal) {
            contractModal.remove();
            if (!skipLogging) console.log('[ContractModal] Removed unidar-contract-modal');
        }

        // Close setup modal
        const setupModal = document.getElementById('contract-setup-modal');
        if (setupModal) {
            setupModal.remove();
            if (!skipLogging) console.log('[ContractModal] Removed contract-setup-modal');
        }

        // Cleanup any remaining overlays (but be careful not to remove the one we just created)
        document.querySelectorAll('.unidar-contract-overlay, .modal-overlay.contract-modal-main').forEach(el => {
            // Don't remove if it's the modal we just created
            if (el.id !== 'unidar-contract-modal' && el.id !== 'contract-setup-modal' && el.id !== 'loading-modal') {
                el.remove();
                if (!skipLogging) console.log('[ContractModal] Removed overlay:', el.className);
            }
        });

        // Also remove any modal-overlay that might be a contract modal
        document.querySelectorAll('.modal-overlay').forEach(el => {
            if ((el.id === 'contract-setup-modal' || el.querySelector('#contractSetupForm')) && el.id !== 'contract-setup-modal' && el.id !== 'loading-modal') {
                el.remove();
                if (!skipLogging) console.log('[ContractModal] Removed contract setup overlay');
            }
        });
    },

    async terminateContract(contractId, reason = '') {
        try {
            showLoadingModal('Résiliation du contrat...');
            const apiBase = getContractApiBase();
            const response = await fetch(`${apiBase}/contracts.php?action=terminate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contract_id: contractId, reason: reason }),
                credentials: 'include'
            });
            const result = await response.json();
            hideLoadingModal();

            if (result.success) {
                showSuccessModal('Contrat résilié avec succès. Le logement est maintenant disponible.');
                if (window.loadUserContracts) window.loadUserContracts();
                // Reload page to update listing availability
                setTimeout(() => {
                    if (window.location.pathname.includes('listing-detail')) {
                        window.location.reload();
                    }
                }, 1500);
                return result;
            } else {
                showErrorModal(result.error || 'Erreur lors de la résiliation');
                return null;
            }
        } catch (error) {
            hideLoadingModal();
            console.error('Termination error:', error);
            showErrorModal('Erreur de connexion au serveur');
            return null;
        }
    },

    async requestTermination(contractId, reason = '') {
        try {
            showLoadingModal('Envoi de la demande de résiliation...');
            const apiBase = getContractApiBase();
            const response = await fetch(`${apiBase}/contracts.php?action=request-termination`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contract_id: contractId, reason: reason }),
                credentials: 'include'
            });
            const result = await response.json();
            hideLoadingModal();

            if (result.success) {
                showSuccessModal('Demande de résiliation envoyée au propriétaire. En attente d\'approbation.');
                if (window.loadUserContracts) window.loadUserContracts();
                return result;
            } else {
                showErrorModal(result.error || 'Erreur lors de la demande');
                return null;
            }
        } catch (error) {
            hideLoadingModal();
            console.error('Termination request error:', error);
            showErrorModal('Erreur de connexion au serveur');
            return null;
        }
    },

    async checkExpiredContracts() {
        try {
            const apiBase = getContractApiBase();
            const response = await fetch(`${apiBase}/contracts.php?action=check-expired`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error checking expired contracts:', error);
            return { success: false, error: error.message };
        }
    }
};

// Expose ContractManager globally
window.ContractManager = ContractManager;

// Also create global wrapper functions for inline onclick handlers
window.showContractSetupModal = function (listingId) {
    console.log('[Global] showContractSetupModal called with listingId:', listingId);
    if (typeof ContractManager !== 'undefined' && ContractManager.showContractSetupModal) {
        ContractManager.showContractSetupModal(listingId);
    } else {
        console.error('[Global] ContractManager not available!');
        alert('Erreur: ContractManager non disponible. Veuillez recharger la page.');
    }
};

// Debug: Log when ContractManager is loaded
console.log('[ContractManager] Loaded and available on window.ContractManager:', typeof window.ContractManager !== 'undefined');

// Card Validation Utilities
const CardValidator = {
    // Luhn algorithm for card number validation
    luhnCheck(cardNumber) {
        const digits = cardNumber.replace(/\D/g, '');
        if (digits.length < 13 || digits.length > 19) return false;

        let sum = 0;
        let isEven = false;

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i], 10);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    },

    // Format card number with spaces
    formatCardNumber(value) {
        const v = value.replace(/\D/g, '').substring(0, 16);
        const parts = [];
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4));
        }
        return parts.join(' ');
    },

    // Detect card brand from number (e-Dinar before Mastercard since both start with 5)
    getCardBrand(cardNumber) {
        const num = cardNumber.replace(/\D/g, '');
        if (/^5359/.test(num))            return { brand: 'e-Dinar' };   // La Poste Tunisienne
        if (/^4/.test(num))               return { brand: 'Visa' };
        if (/^5[1-5]|^2[2-7]/.test(num)) return { brand: 'Mastercard' };
        if (/^3[47]/.test(num))           return { brand: 'Amex' };
        if (/^6(?:011|5)/.test(num))      return { brand: 'Discover' };
        return { brand: '' };
    },

    // Format expiry date
    formatExpiry(value) {
        const v = value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2);
        }
        return v;
    },

    // Validate expiry date
    isValidExpiry(expiry) {
        const match = expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
        if (!match) return false;

        const month = parseInt(match[1], 10);
        const year = parseInt('20' + match[2], 10);
        const now = new Date();
        const expDate = new Date(year, month);

        return expDate > now;
    }
};
window.CardValidator = CardValidator;

// Card brand themes — gradient, logo SVG, accent colour
const CARD_BRANDS = {
    'e-Dinar': {
        // Multicolour gradient echoing the real e-Dinar Jeune card's vibrant cube design + La Poste yellow
        gradient: 'linear-gradient(135deg,#3b0764 0%,#6d28d9 25%,#be185d 55%,#d97706 85%,#b45309 100%)',
        logo: '<svg width="70" height="22" viewBox="0 0 70 22"><text x="0" y="16" fill="#fbbf24" font-size="13" font-weight="900" font-family="Arial,sans-serif" font-style="italic">e-</text><text x="16" y="16" fill="#fbbf24" font-size="13" font-weight="900" font-family="Arial,sans-serif" font-style="italic">&#x110;</text><text x="26" y="16" fill="white" font-size="13" font-weight="900" font-family="Arial,sans-serif" font-style="italic">inar</text></svg>',
        label: 'e-Dinar',
    },
    'Visa': {
        gradient: 'linear-gradient(135deg,#0a1628 0%,#1e3a8a 60%,#1d4ed8 100%)',
        logo: '<svg width="52" height="18" viewBox="0 0 52 18"><text x="1" y="15" fill="white" font-size="17" font-style="italic" font-weight="900" font-family="Arial,sans-serif">VISA</text></svg>',
        label: 'Visa',
    },
    'Mastercard': {
        gradient: 'linear-gradient(135deg,#1a0505 0%,#450a0a 60%,#7f1d1d 100%)',
        logo: '<svg width="44" height="28" viewBox="0 0 44 28"><circle cx="15" cy="14" r="13" fill="#eb001b"/><circle cx="29" cy="14" r="13" fill="#f79e1b"/><path d="M22 3.4a13 13 0 0 1 0 21.2A13 13 0 0 1 22 3.4z" fill="#ff5f00"/></svg>',
        label: 'Mastercard',
    },
    'Amex': {
        gradient: 'linear-gradient(135deg,#0c1a2e 0%,#1d3461 60%,#1e40af 100%)',
        logo: '<svg width="50" height="20" viewBox="0 0 50 20"><text x="1" y="15" fill="white" font-size="12" font-weight="900" font-family="Arial,sans-serif" letter-spacing="2">AMEX</text></svg>',
        label: 'American Express',
    },
    'Discover': {
        gradient: 'linear-gradient(135deg,#1c0a00 0%,#431407 60%,#7c2d12 100%)',
        logo: '<svg width="60" height="20" viewBox="0 0 60 20"><text x="1" y="15" fill="white" font-size="11" font-weight="900" font-family="Arial,sans-serif" letter-spacing="0.5">DISCOVER</text></svg>',
        label: 'Discover',
    },
    '': {
        gradient: 'linear-gradient(135deg,#1e293b 0%,#0f172a 100%)',
        logo: '',
        label: '',
    },
};

// Payment Management Functions
const PaymentManager = {
    async calculatePaymentAmounts(listingId) {
        try {
            const apiBase = getContractApiBase();
            const response = await fetch(`/api/contracts/calculate-payment?listing_id=${listingId}`, {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                return result;
            } else {
                showErrorModal(result.error || 'Erreur lors du calcul du paiement');
                return null;
            }
        } catch (error) {
            console.error('Payment calculation error:', error);
            showErrorModal('Erreur de connexion au serveur');
            return null;
        }
    },

    showPaymentModal(listingId, contractId) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(2,6,23,0.88);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;padding:16px';
        modal.innerHTML = `
            <div class="pm-shell" style="background:#fff;border-radius:24px;width:100%;max-width:840px;overflow:hidden;box-shadow:0 50px 100px -20px rgba(0,0,0,0.7)">
                <!-- Header -->
                <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px;background:linear-gradient(135deg,#0f172a,#1e1b4b);color:white">
                    <div>
                        <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);padding:3px 10px;border-radius:100px;font-size:0.7rem;font-weight:700;letter-spacing:0.5px;margin-bottom:4px">🔒 Sécurisé par UNIDAR Pay</div>
                        <h2 style="margin:0;font-size:1.25rem;font-weight:800;letter-spacing:-0.5px">Paiement Sécurisé</h2>
                    </div>
                    <button class="pm-close" onclick="PaymentManager.closeModal(this)" style="background:rgba(255,255,255,0.1);border:none;border-radius:50%;width:34px;height:34px;color:white;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center">✕</button>
                </div>
                <!-- Body -->
                <div style="display:grid;grid-template-columns:1fr 1fr">
                    <!-- LEFT: Card + Summary -->
                    <div style="background:#f8fafc;padding:26px;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;gap:18px">
                        <!-- 3D Card -->
                        <div class="pm-card-scene" style="width:100%;aspect-ratio:1.586">
                            <div class="pm-card" id="pm-card">
                                <!-- Front -->
                                <div class="pm-card-front" id="pm-card-face" style="background:linear-gradient(135deg,#1e293b,#0f172a);padding:20px 22px;display:flex;flex-direction:column">
                                    <div style="display:flex;align-items:center;margin-bottom:14px;gap:10px">
                                        <!-- EMV Chip -->
                                        <svg width="42" height="32" viewBox="0 0 42 32" style="flex-shrink:0">
                                            <rect width="42" height="32" rx="5" fill="#fbbf24"/>
                                            <rect x="3" y="3" width="36" height="26" rx="3" fill="#d97706"/>
                                            <rect x="7" y="11" width="28" height="10" rx="2" fill="#fbbf24"/>
                                            <line x1="21" y1="3" x2="21" y2="29" stroke="#b45309" stroke-width="1.5"/>
                                            <line x1="3" y1="16" x2="39" y2="16" stroke="#b45309" stroke-width="1.5"/>
                                            <line x1="7" y1="11" x2="7" y2="21" stroke="#b45309" stroke-width="1"/>
                                            <line x1="35" y1="11" x2="35" y2="21" stroke="#b45309" stroke-width="1"/>
                                        </svg>
                                        <!-- Contactless -->
                                        <svg width="22" height="22" viewBox="0 0 22 22" style="opacity:0.55;flex-shrink:0">
                                            <circle cx="6" cy="11" r="2.2" fill="white"/>
                                            <path d="M9.5,6.5 a6.5,6.5 0 0,1 0,9" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                                            <path d="M12.5,4 a10,10 0 0,1 0,14" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
                                            <path d="M15.5,1.5 a13.5,13.5 0 0,1 0,19" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
                                        </svg>
                                    </div>
                                    <div id="pm-cf-number" style="font-family:'Courier New',monospace;font-size:clamp(0.9rem,2.2vw,1.15rem);letter-spacing:0.2em;text-shadow:0 2px 6px rgba(0,0,0,0.4);margin-bottom:14px;flex:1;display:flex;align-items:flex-end;color:white">•••• •••• •••• ••••</div>
                                    <div style="display:flex;align-items:flex-end;gap:16px">
                                        <div style="flex:1;min-width:0">
                                            <div style="font-size:0.55rem;text-transform:uppercase;letter-spacing:0.1em;opacity:0.5;margin-bottom:3px;color:white">Titulaire</div>
                                            <div id="pm-cf-name" style="font-size:0.8rem;font-weight:600;text-transform:uppercase;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:white">NOM PRENOM</div>
                                        </div>
                                        <div>
                                            <div style="font-size:0.55rem;text-transform:uppercase;letter-spacing:0.1em;opacity:0.5;margin-bottom:3px;color:white">Expire</div>
                                            <div id="pm-cf-expiry" style="font-size:0.8rem;font-weight:600;white-space:nowrap;color:white">MM/YY</div>
                                        </div>
                                        <div id="pm-cf-brand" style="margin-left:auto;flex-shrink:0;display:flex;align-items:center"></div>
                                    </div>
                                    <div class="pm-card-shine"></div>
                                </div>
                                <!-- Back -->
                                <div class="pm-card-back" id="pm-card-back" style="background:linear-gradient(135deg,#1e293b,#0f172a)">
                                    <div style="width:100%;height:44px;background:#111;margin-top:26px"></div>
                                    <div style="display:flex;align-items:center;gap:10px;margin:12px 22px 0">
                                        <div style="flex:1;height:34px;background:repeating-linear-gradient(90deg,#f1f5f9,#f1f5f9 10px,#e2e8f0 10px,#e2e8f0 12px);border-radius:2px"></div>
                                        <div id="pm-cb-cvv" style="background:white;color:#0f172a;font-style:italic;font-weight:700;font-size:0.95rem;letter-spacing:3px;padding:6px 12px;border-radius:4px;min-width:46px;text-align:center">•••</div>
                                    </div>
                                    <div style="font-size:0.58rem;opacity:0.35;text-align:center;padding:10px 22px;line-height:1.4;color:white">Ne communiquez jamais votre code CVV à quiconque</div>
                                    <div id="pm-cb-brand" style="position:absolute;bottom:14px;right:18px"></div>
                                    <div class="pm-card-shine"></div>
                                </div>
                            </div>
                        </div>
                        <!-- Summary -->
                        <div style="background:white;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px">
                            <div style="font-size:0.68rem;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#94a3b8;margin-bottom:12px">Récapitulatif</div>
                            <div style="display:flex;justify-content:space-between;font-size:0.875rem;color:#475569;margin-bottom:7px"><span>Loyer mensuel</span><span id="monthlyRent" style="font-weight:700">--</span></div>
                            <div style="display:flex;justify-content:space-between;font-size:0.875rem;color:#475569;margin-bottom:7px"><span>Commission (5%)</span><span id="commissionAmount" style="font-weight:700">--</span></div>
                            <div style="height:1px;background:#e2e8f0;margin:8px 0"></div>
                            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:0.95rem;color:#0f172a"><span>Total à payer</span><span id="totalAmount" style="color:#6366f1;font-size:1.05rem">--</span></div>
                        </div>
                    </div>
                    <!-- RIGHT: Form -->
                    <div style="padding:26px;display:flex;flex-direction:column;gap:14px">
                        <!-- Tabs -->
                        <div style="display:flex;gap:6px;background:#f1f5f9;border-radius:12px;padding:4px">
                            <button id="tab-card" onclick="PaymentManager.switchTab('card')" style="flex:1;padding:9px 10px;border:none;border-radius:9px;background:white;color:#0f172a;font-size:0.85rem;font-weight:700;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.1);transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                                Carte Bancaire
                            </button>
                            <button id="tab-transfer" onclick="PaymentManager.switchTab('transfer')" style="flex:1;padding:9px 10px;border:none;border-radius:9px;background:transparent;color:#64748b;font-size:0.85rem;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:6px">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M16 3v4M8 3v4M2 11h20"/></svg>
                                Virement
                            </button>
                        </div>
                        <!-- Form area (hid during processing) -->
                        <div id="paymentMethodsContainer" style="display:flex;flex-direction:column;gap:12px;flex:1">
                            <div id="card-form">
                                <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px">
                                    <label style="font-size:0.68rem;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;color:#64748b">Nom sur la Carte</label>
                                    <input type="text" id="cc-name" placeholder="NOM COMPLET" autocomplete="cc-name"
                                        style="padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:11px;font-size:0.95rem;color:#0f172a;background:#f8fafc;outline:none;font-family:inherit;width:100%;box-sizing:border-box;transition:border-color 0.2s,box-shadow 0.2s"
                                        onfocus="this.style.borderColor='#6366f1';this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)';this.style.background='white'"
                                        onblur="this.style.borderColor='#e2e8f0';this.style.boxShadow='none';this.style.background='#f8fafc'">
                                </div>
                                <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px">
                                    <label style="font-size:0.68rem;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;color:#64748b">Numéro de Carte</label>
                                    <div style="position:relative">
                                        <input type="text" id="cc-number" placeholder="0000  0000  0000  0000" maxlength="22" autocomplete="cc-number" inputmode="numeric"
                                            style="padding:11px 90px 11px 14px;border:1.5px solid #e2e8f0;border-radius:11px;font-size:0.95rem;color:#0f172a;background:#f8fafc;outline:none;font-family:'Courier New',monospace;width:100%;box-sizing:border-box;transition:border-color 0.2s,box-shadow 0.2s"
                                            onfocus="this.style.borderColor='#6366f1';this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)';this.style.background='white'"
                                            onblur="this.style.borderColor='';this.style.boxShadow='none';this.style.background='#f8fafc'">
                                        <div id="pm-brand-badge" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:4px;pointer-events:none"></div>
                                    </div>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                                    <div style="display:flex;flex-direction:column;gap:5px">
                                        <label style="font-size:0.68rem;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;color:#64748b">Expiration</label>
                                        <input type="text" id="cc-expiry" placeholder="MM / YY" maxlength="7" autocomplete="cc-exp" inputmode="numeric"
                                            style="padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:11px;font-size:0.95rem;color:#0f172a;background:#f8fafc;outline:none;font-family:inherit;width:100%;box-sizing:border-box;text-align:center;transition:border-color 0.2s,box-shadow 0.2s"
                                            onfocus="this.style.borderColor='#6366f1';this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)';this.style.background='white'"
                                            onblur="this.style.borderColor='';this.style.boxShadow='none';this.style.background='#f8fafc'">
                                    </div>
                                    <div style="display:flex;flex-direction:column;gap:5px">
                                        <label style="font-size:0.68rem;font-weight:800;letter-spacing:0.8px;text-transform:uppercase;color:#64748b">CVC <span title="3 chiffres au dos de votre carte" style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#e2e8f0;color:#64748b;font-size:0.65rem;font-weight:800;cursor:help;vertical-align:middle;margin-left:2px">?</span></label>
                                        <input type="text" id="cc-cvv" placeholder="•••" maxlength="4" autocomplete="cc-csc" inputmode="numeric"
                                            style="padding:11px 14px;border:1.5px solid #e2e8f0;border-radius:11px;font-size:0.95rem;color:#0f172a;background:#f8fafc;outline:none;font-family:inherit;width:100%;box-sizing:border-box;text-align:center;transition:border-color 0.2s,box-shadow 0.2s"
                                            onfocus="this.style.borderColor='#6366f1';this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.1)';this.style.background='white'"
                                            onblur="this.style.borderColor='';this.style.boxShadow='none';this.style.background='#f8fafc'">
                                    </div>
                                </div>
                            </div>
                            <div id="transfer-info" style="display:none">
                                <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:14px;padding:16px">
                                    <div style="display:flex;gap:10px;align-items:flex-start;font-size:0.875rem;margin-bottom:10px"><span style="color:#16a34a;font-weight:700;min-width:70px">IBAN</span><span style="color:#166534;word-break:break-all">TN59 2040 0400 0831 2345 6789</span></div>
                                    <div style="display:flex;gap:10px;align-items:flex-start;font-size:0.875rem;margin-bottom:10px"><span style="color:#16a34a;font-weight:700;min-width:70px">Banque</span><span style="color:#166534">BIAT — Banque Internationale Arabe de Tunisie</span></div>
                                    <div style="display:flex;gap:10px;align-items:center;font-size:0.875rem"><span style="color:#16a34a;font-weight:700;min-width:70px">Référence</span><span style="color:#6366f1;font-weight:700;font-family:monospace">CONTRAT-${contractId}</span></div>
                                </div>
                            </div>
                        </div>
                        <!-- Processing -->
                        <div id="payment-processing" style="display:none;text-align:center;padding:20px 0">
                            <div class="pm-processing-icon">⚡</div>
                            <p id="processing-text" style="font-weight:700;color:#0f172a;margin:0 0 4px">Traitement...</p>
                            <p id="processing-substep" style="font-size:0.78rem;color:#94a3b8;margin:0 0 12px"></p>
                            <div style="width:100%;height:6px;background:#e2e8f0;border-radius:100px;overflow:hidden">
                                <div id="payment-progress" style="height:100%;background:linear-gradient(90deg,#6366f1,#a78bfa);border-radius:100px;width:0;transition:width 0.5s ease"></div>
                            </div>
                        </div>
                        <!-- CTA -->
                        <button id="btn-confirm-payment" onclick="PaymentManager.processPayment(${contractId})"
                            style="width:100%;padding:14px;border:none;border-radius:12px;cursor:pointer;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-size:1rem;font-weight:800;box-shadow:0 4px 20px rgba(99,102,241,0.4);transition:transform 0.15s,box-shadow 0.15s;margin-top:auto"
                            onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 28px rgba(99,102,241,0.55)'"
                            onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 20px rgba(99,102,241,0.4)'">
                            🔐 Payer Maintenant
                        </button>
                        <div style="text-align:center;font-size:0.7rem;color:#94a3b8;font-weight:600;display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap">
                            <span>🛡️ SSL / TLS 1.3</span>
                            <span>🔒 Aucune donnée stockée</span>
                            <span>✓ 3D Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        PaymentManager.initCardInputs();
        PaymentManager.loadPaymentDetails(listingId);
    },

    initCardInputs() {
        const ccName   = document.getElementById('cc-name');
        const ccNumber = document.getElementById('cc-number');
        const ccExpiry = document.getElementById('cc-expiry');
        const ccCvv    = document.getElementById('cc-cvv');

        const setEl = (id, html, prop = 'textContent') => {
            const el = document.getElementById(id);
            if (el) { if (prop === 'innerHTML') el.innerHTML = html; else el[prop] = html; }
        };

        // Mini logos for the input badge strip
        const INPUT_LOGOS = {
            'Visa':       '<svg width="34" height="12" viewBox="0 0 34 12"><text x="0" y="10" fill="#1a1f71" font-size="12" font-style="italic" font-weight="900" font-family="Arial,sans-serif">VISA</text></svg>',
            'Mastercard': '<svg width="26" height="18" viewBox="0 0 26 18"><circle cx="9" cy="9" r="8.5" fill="#eb001b"/><circle cx="17" cy="9" r="8.5" fill="#f79e1b"/><path d="M13 2.2a8.5 8.5 0 0 1 0 13.6A8.5 8.5 0 0 1 13 2.2z" fill="#ff5f00"/></svg>',
            'e-Dinar':    '<span style="font-size:0.58rem;font-weight:900;letter-spacing:0.5px;color:#92400e;background:linear-gradient(90deg,#fef3c7,#fde68a);padding:2px 6px;border-radius:3px;border:1px solid #f59e0b">e-Dinar</span>',
        };

        const applyBrand = (raw) => {
            const info = CardValidator.getCardBrand(raw);
            const theme = CARD_BRANDS[info.brand] || CARD_BRANDS[''];
            // Card faces gradient
            const face = document.getElementById('pm-card-face');
            const back = document.getElementById('pm-card-back');
            if (face) face.style.background = theme.gradient;
            if (back) back.style.background = theme.gradient;
            // Brand logo on front & back of card
            setEl('pm-cf-brand', theme.logo, 'innerHTML');
            setEl('pm-cb-brand', theme.logo, 'innerHTML');
            // Badge strip: show Visa / MC / eDinar — dim non-matching when detected
            const badge = document.getElementById('pm-brand-badge');
            if (badge) {
                const detected = info.brand;
                badge.innerHTML = ['Visa', 'Mastercard', 'e-Dinar'].map(b => {
                    const op = !detected ? '0.45' : detected === b ? '1' : '0.18';
                    return '<span style="display:inline-flex;align-items:center;opacity:' + op + ';transition:opacity 0.25s">' + INPUT_LOGOS[b] + '</span>';
                }).join('');
            }
        };

        if (ccName) {
            ccName.addEventListener('input', e => {
                setEl('pm-cf-name', e.target.value.toUpperCase() || 'NOM PRENOM');
            });
        }

        if (ccNumber) {
            ccNumber.addEventListener('input', e => {
                // Format: groups of 4 separated by 2 spaces
                const digits = e.target.value.replace(/\D/g, '').substring(0, 16);
                const parts = digits.match(/.{1,4}/g) || [];
                e.target.value = parts.join('  ');

                // Masked preview on card (show last group unmasked)
                const masked = parts.length
                    ? parts.map((p, i) => i < parts.length - 1 ? p.replace(/\d/g, '•') : p).join('  ')
                    : '•••• •••• •••• ••••';
                // Pad to 19 chars (4+2+4+2+4+2+4 = 22 with double spaces, simplify)
                setEl('pm-cf-number', masked || '•••• •••• •••• ••••');

                applyBrand(e.target.value);

                // Luhn validation feedback
                const d = digits;
                if (d.length >= 13) {
                    e.target.style.borderColor = CardValidator.luhnCheck(d) ? '#10b981' : '#ef4444';
                } else {
                    e.target.style.borderColor = '#e2e8f0';
                }
            });
        }

        if (ccExpiry) {
            ccExpiry.addEventListener('input', e => {
                const v = e.target.value.replace(/\D/g, '').substring(0, 4);
                e.target.value = v.length >= 3 ? v.substring(0, 2) + ' / ' + v.substring(2) : v;
                setEl('pm-cf-expiry', e.target.value || 'MM/YY');
                if (e.target.value.length === 7) {
                    const clean = e.target.value.replace(/\s/g, '').replace('/', '/');
                    e.target.style.borderColor = CardValidator.isValidExpiry(clean) ? '#10b981' : '#ef4444';
                } else {
                    e.target.style.borderColor = '#e2e8f0';
                }
            });
        }

        if (ccCvv) {
            ccCvv.addEventListener('input', e => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
                setEl('pm-cb-cvv', e.target.value.replace(/\d/g, '•') || '•••');
            });
            ccCvv.addEventListener('focus', () => {
                const card = document.getElementById('pm-card');
                if (card) card.classList.add('pm-flipped');
            });
            ccCvv.addEventListener('blur', () => {
                const card = document.getElementById('pm-card');
                if (card) card.classList.remove('pm-flipped');
            });
        }

        // Init brand display
        applyBrand('');
    },

    async loadPaymentDetails(listingId) {
        const result = await PaymentManager.calculatePaymentAmounts(listingId);
        if (result) {
            const rent = result.monthly_rent ?? result.rent ?? 0;
            const fee  = result.platform_fee ?? result.commission ?? 0;
            const total = result.total_due ?? result.total ?? (rent + fee);
            document.getElementById('monthlyRent').textContent = formatCurrency(rent);
            document.getElementById('commissionAmount').textContent = formatCurrency(fee);
            document.getElementById('totalAmount').textContent = formatCurrency(total);
        }
    },

    currentMethod: 'card',

    switchTab(method) {
        this.currentMethod = method;
        document.getElementById('card-form').style.display      = method === 'card'     ? 'block' : 'none';
        document.getElementById('transfer-info').style.display  = method === 'transfer' ? 'block' : 'none';
        const tabCard     = document.getElementById('tab-card');
        const tabTransfer = document.getElementById('tab-transfer');
        if (tabCard) {
            tabCard.style.background  = method === 'card' ? 'white'        : 'transparent';
            tabCard.style.color       = method === 'card' ? '#0f172a'       : '#64748b';
            tabCard.style.boxShadow   = method === 'card' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none';
        }
        if (tabTransfer) {
            tabTransfer.style.background = method === 'transfer' ? 'white'        : 'transparent';
            tabTransfer.style.color      = method === 'transfer' ? '#0f172a'       : '#64748b';
            tabTransfer.style.boxShadow  = method === 'transfer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none';
        }
    },

    async processPayment(contractId) {
        if (this.currentMethod === 'card') {
            const cc = document.getElementById('cc-number').value;
            const exp = document.getElementById('cc-expiry').value;
            const cvv = document.getElementById('cc-cvv').value;
            const name = document.getElementById('cc-name').value;

            if (!cc || !exp || !cvv || !name) {
                showErrorModal('Veuillez remplir tous les champs de la carte.');
                return;
            }

            // Validate card number with Luhn
            const cardDigits = cc.replace(/\D/g, '');
            if (cardDigits.length < 13) {
                showErrorModal('Veuillez entrer un numéro de carte complet.');
                return;
            }

            if (!CardValidator.luhnCheck(cardDigits)) {
                showErrorModal('Le numéro de carte est invalide. Veuillez vérifier.');
                return;
            }

            if (!CardValidator.isValidExpiry(exp)) {
                showErrorModal('La date d\'expiration est invalide ou dépassée.');
                return;
            }
        } else {
            // Virement logic - simply close and show success info
            showSuccessModal('Demande de virement enregistrée. Votre contrat sera activé dès réception des fonds.');
            PaymentManager.closeModal();
            loadUserContracts();
            return;
        }

        // Realistic processing steps
        const steps = [
            { text: 'Identification de la banque...', progress: 15 },
            { text: 'Chiffrement de la transaction...', progress: 35 },
            { text: 'Attente d\'autorisation bancaire...', progress: 60 },
            { text: 'Validation du contrat...', progress: 85 },
            { text: 'Paiement autorisé !', progress: 100 }
        ];

        document.getElementById('paymentMethodsContainer').style.display = 'none';
        document.getElementById('btn-confirm-payment').style.display = 'none';
        document.getElementById('payment-processing').style.display = 'block';

        // Run multi-step simulation
        try {
            const progress = document.getElementById('payment-progress');
            const text = document.getElementById('processing-text');
            const substep = document.getElementById('processing-substep');

            for (const step of steps) {
                if (text) text.textContent = step.text;
                if (progress) progress.style.width = step.progress + '%';

                // Add sub-step detail for realism
                if (substep) {
                    if (step.progress === 15) substep.textContent = 'Connexion sécurisée TLS 1.3...';
                    if (step.progress === 35) substep.textContent = 'Cryptage AES-256...';
                    if (step.progress === 60) substep.textContent = 'Vérification 3D Secure...';
                    if (step.progress === 85) substep.textContent = 'Enregistrement de l\'acte...';
                }

                await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
            }

            const response = await fetch(`/api/contracts/process-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contract_id: contractId,
                    payment_method: this.currentMethod
                }),
                credentials: 'include'
            });

            const result = await response.json();

            if (result.success) {
                // Final Success Animation in the same modal
                const container = document.getElementById('payment-processing');
                if (container) {
                    container.innerHTML = `
                        <div class="success-check">✓</div>
                        <h3 class="mb-sm">Paiement Réussi !</h3>
                        <p class="text-muted">Votre contrat est maintenant actif.</p>
                        <div style="margin-top: 20px;">
                             <p class="text-tiny text-muted">Transaction: ${result.transaction_id || 'TRX-SUCCESS'}</p>
                        </div>
                    `;
                }

                setTimeout(() => {
                    PaymentManager.closeModal();
                    loadUserContracts();
                    showSuccessModal('Félicitations ! Votre paiement a été traité et votre contrat est désormais actif.');
                }, 2500);
            } else {
                showErrorModal(result.error || 'Échec du paiement');
                document.getElementById('paymentMethodsContainer').style.display = 'block';
                document.getElementById('btn-confirm-payment').style.display = 'block';
                document.getElementById('payment-processing').style.display = 'none';
            }
        } catch (error) {
            console.error('Payment error:', error);
            showErrorModal('Erreur de connexion lors du paiement');
            if (document.getElementById('paymentMethodsContainer')) {
                document.getElementById('paymentMethodsContainer').style.display = 'block';
                document.getElementById('btn-confirm-payment').style.display = 'block';
                document.getElementById('payment-processing').style.display = 'none';
            }
        }
    },

    showPaymentSuccess(paymentResult) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay success-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px; text-align: center;">
                <div class="modal-body">
                    <div style="font-size: 4rem; margin-bottom: var(--space-md);">✅</div>
                    <h3>Paiement Réussi!</h3>
                    <p>Votre contrat a été signé et le paiement a été traité avec succès.</p>
                    <p><strong>Transaction ID:</strong> ${paymentResult.transaction_id}</p>
                    <p><strong>Montant:</strong> ${formatCurrency(paymentResult.amount)}</p>
                    <button class="btn btn-primary" onclick="window.location.href='user-dashboard.html'" style="margin-top: var(--space-md);">
                        Voir mes contrats
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    },

    closeModal(btn) {
        console.log('[PaymentModal] Closing modal');
        if (btn) {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.remove();
                return;
            }
        }
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }
};
window.PaymentManager = PaymentManager;

// Helper functions
function showLoadingModal(message = 'Chargement...') {
    // Remove any existing loading modals first
    hideLoadingModal();

    const modal = document.createElement('div');
    modal.id = 'loading-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 300px; text-align: center;">
            <div class="modal-body">
                <div style="font-size: 2rem; margin-bottom: var(--space-md);">⏳</div>
                <p>${message}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    console.log('[LoadingModal] Loading modal shown:', message);
}

function hideLoadingModal() {
    // Remove by ID first (most reliable)
    const loadingModal = document.getElementById('loading-modal');
    if (loadingModal) {
        loadingModal.remove();
        console.log('[LoadingModal] Removed loading modal by ID');
        return;
    }

    // Fallback: find by content
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        const hasLoadingContent = modal.querySelector('div[style*="⏳"]') ||
            modal.textContent.includes('Préparation') ||
            modal.textContent.includes('Chargement') ||
            modal.textContent.includes('Signature');
        if (hasLoadingContent && !modal.id) {
            modal.remove();
            console.log('[LoadingModal] Removed loading modal by content');
        }
    });
}

function showErrorModal(message) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3>Erreur</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p style="color: var(--color-error);">${message}</p>
                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()" style="margin-top: var(--space-md);">
                    OK
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showSuccessModal(message) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; text-align: center;">
            <div class="modal-body">
                <div style="font-size: 4rem; margin-bottom: var(--space-md);">✅</div>
                <h3>Succès!</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()" style="margin-top: var(--space-md);">
                    OK
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-TN', {
        style: 'currency',
        currency: 'TND'
    }).format(amount);
}

// Global functions for onclick handlers
window.showLoadingModal = showLoadingModal;
window.hideLoadingModal = hideLoadingModal;
window.showErrorModal = showErrorModal;
window.showSuccessModal = showSuccessModal;
window.formatCurrency = formatCurrency;

// User Dashboard Functions
async function loadUserContracts() {
    const container = document.getElementById('contractsList');
    if (!container) return;

    // Register action listener exactly once via event delegation
    if (!container.dataset.listener) {
        container.addEventListener('click', (e) => {
            // Find the button by traversing up the DOM tree
            let btn = e.target.closest('[data-contract-action]');

            // If closest didn't work, try finding the button in parent elements
            if (!btn) {
                let element = e.target;
                while (element && element !== container) {
                    if (element.hasAttribute && element.hasAttribute('data-contract-action')) {
                        btn = element;
                        break;
                    }
                    element = element.parentElement;
                }
            }

            if (btn) {
                console.log(`[ContractAction] Delegated click: ${btn.dataset.contractAction} for ${btn.dataset.contractId}`);
                e.preventDefault();
                e.stopPropagation();

                const action = btn.dataset.contractAction;
                const listingId = btn.dataset.listingId || btn.getAttribute('data-listing-id');
                const contractId = btn.dataset.contractId || btn.getAttribute('data-contract-id');
                const url = btn.dataset.url || btn.getAttribute('data-url');
                const role = btn.dataset.role || btn.getAttribute('data-role') || 'student';
                const status = btn.dataset.status || btn.getAttribute('data-status');

                console.log(`[ContractAction] Action: ${action}, ContractID: ${contractId}, ListingID: ${listingId}, URL: ${url}, Role: ${role}, Status: ${status}`);

                if (action === 'view') {
                    if (!contractId || !url) {
                        console.error('[ContractAction] Missing required data for view action', { contractId, url, listingId });
                        showErrorModal('Erreur: Données du contrat manquantes');
                        return;
                    }

                    try {
                        ContractManager.showContractModal(
                            listingId || 0,
                            url,
                            null,
                            contractId,
                            role,
                            status
                        );
                    } catch (error) {
                        console.error('[ContractAction] Error showing contract modal:', error);
                        showErrorModal('Erreur lors de l\'ouverture du contrat: ' + error.message);
                    }
                } else if (action === 'pay') {
                    if (!contractId || !listingId) {
                        console.error('[ContractAction] Missing required data for pay action', { contractId, listingId });
                        showErrorModal('Erreur: Données du paiement manquantes');
                        return;
                    }

                    try {
                        PaymentManager.showPaymentModal(listingId, contractId);
                    } catch (error) {
                        console.error('[ContractAction] Error showing payment modal:', error);
                        showErrorModal('Erreur lors de l\'ouverture du paiement: ' + error.message);
                    }
                }
            }
        }, true); // Use capture phase for better reliability
        container.dataset.listener = 'true';
        console.log('[ContractAction] Event listener registered on container with capture phase');
    } else {
        console.log('[ContractAction] Event listener already registered, skipping');
    }

    try {
        container.innerHTML = `
            <div class="text-center text-muted p-xl">
                <div class="badge-dot" style="width: 20px; height: 20px; margin: 0 auto 10px;"></div>
                <p>Chargement des contrats...</p>
            </div>
        `;

        const apiBase = getContractApiBase();
        const response = await fetch(`${apiBase}/contracts.php?action=user-contracts`, {
            method: 'GET',
            credentials: 'include'
        });

        const result = await response.json();

        if (!result.success || !result.contracts) {
            container.innerHTML = '<div class="empty-state card p-xl text-center"><p class="text-muted">Erreur lors du chargement des contrats.</p></div>';
            return;
        }

        const userRole = result.role || 'student';

        // FILTERING LOGIC
        // Students should only see signed or active contracts (hide drafts)
        // Admin shows only active contracts (paid/active/completed)
        const filteredContracts = result.contracts.filter(c => {
            if (userRole === 'student') {
                // Return only signed, paid or active contracts
                return ['active', 'paid', 'completed', 'signed_by_student', 'signed_by_owner', 'pending_payment'].includes(c.status);
            }
            // Admin and Owner: show ONLY active contracts (exclude drafts, pending, terminated, expired)
            return ['active', 'paid', 'completed'].includes(c.status);
        });

        if (filteredContracts.length === 0) {
            container.innerHTML = `
                <div class="empty-state card p-xl text-center" style="grid-column: 1/-1;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
                    <p class="text-muted">Aucun contrat signé pour le moment.</p>
                    ${userRole === 'student' ? '<p class="text-small">Générez un contrat depuis une annonce pour commencer.</p>' : ''}
                </div>
            `;
            return;
        }

        container.innerHTML = filteredContracts.map((contract, index) => {
            const delay = (index % 6) * 0.1;
            const statusBadge = getStatusBadge(contract.status);
            const date = new Date(contract.created_at).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Construct Download/View URL
            const downloadUrl = contract.contract_url || `${apiBase}/contracts.php?action=download&contract_id=${contract.id}`;

            // Build actions based on status and role
            let actions = '';

            if (userRole === 'admin') {
                // Admin: Simple direct download/view in new tab (bypasses modal as requested)
                actions += `
                    <a href="${downloadUrl}" target="_blank" class="btn btn-secondary btn-sm" style="flex: 1; text-align: center; text-decoration: none; padding-top: 8px;">
                        📄 Télécharger
                    </a>
                `;
            } else {
                // Student/Owner: Show modal with tailored options
                // Use both data attributes AND store data globally for onclick fallback
                const contractId = contract.id;
                const listingId = contract.listing_id || 0;
                const contractStatus = contract.status || '';

                // Store contract data globally for the onclick handler (safer than inline)
                if (!window._contractData) window._contractData = {};
                window._contractData[contractId] = {
                    listingId: listingId,
                    url: downloadUrl,
                    role: userRole,
                    status: contractStatus
                };

                actions += `
                    <button type="button" class="btn btn-secondary btn-sm contract-view-btn" style="flex: 1; cursor: pointer; pointer-events: auto;" 
                        data-contract-action="view"
                        data-contract-id="${contractId}"
                        data-listing-id="${listingId}"
                        data-url="${downloadUrl.replace(/"/g, '&quot;')}"
                        data-role="${userRole}"
                        data-status="${contractStatus}">
                        👁️ Voir
                    </button>
                `;

                // Extra "Payer" button for students if needed
                if (userRole === 'student' && ['signed_by_student', 'signed_by_owner', 'pending_payment'].includes(contract.status) && !['paid', 'active', 'completed'].includes(contract.status)) {
                    actions += `
                        <button type="button" class="btn btn-primary btn-sm contract-pay-btn" style="flex: 1; cursor: pointer;" 
                            data-contract-action="pay"
                            data-contract-id="${contractId}"
                            data-listing-id="${listingId}"
                            onclick="if(typeof PaymentManager !== 'undefined') { PaymentManager.showPaymentModal('${listingId}', '${contractId}'); } else { console.error('PaymentManager not available'); }">
                            💳 Payer
                        </button>
                    `;
                }

                // Terminate button for owners on active contracts
                if (userRole === 'owner' && ['paid', 'active', 'completed', 'signed_by_both'].includes(contract.status)) {
                    actions += `
                        <button type="button" class="btn btn-error btn-sm contract-terminate-btn" style="flex: 1; cursor: pointer; background: #dc3545; color: white; border: none;" 
                            data-contract-id="${contractId}"
                            onclick="if(confirm('Êtes-vous sûr de vouloir résilier ce contrat ? Le logement redeviendra disponible.')) { ContractManager.terminateContract('${contractId}'); }">
                            🚫 Résilier
                        </button>
                    `;
                }

                // Request termination button for students on active contracts
                if (userRole === 'student' && ['paid', 'active', 'completed', 'signed_by_both'].includes(contract.status)) {
                    actions += `
                        <button type="button" class="btn btn-warning btn-sm contract-request-terminate-btn" style="flex: 1; cursor: pointer; background: #ffc107; color: #000; border: none;" 
                            data-contract-id="${contractId}"
                            onclick="if(confirm('Voulez-vous demander la résiliation de ce contrat au propriétaire ?')) { ContractManager.requestTermination('${contractId}'); }">
                            📝 Demander Résiliation
                        </button>
                    `;
                }
            }

            // Determine party display based on role
            let partyName = contract.other_party_name || 'Partie Adverse';
            let partyRole = userRole === 'owner' ? 'Étudiant' : 'Propriétaire';

            if (userRole === 'admin') {
                partyName = `${contract.student_name || 'N/A'}`;
                partyRole = `Proprio: ${contract.owner_name || 'N/A'}`;
            }

            return `
            <article class="p-md bg-white rounded-xl hover-lift border-surface-100 border-solid border-1 fade-in-up" 
                 style="animation-delay: ${delay}s; transition: all 0.3s ease; border: 1px solid var(--color-surface-100); margin-bottom: var(--space-sm);">
                <div class="flex justify-between items-start mb-xs">
                    <div class="flex-column">
                         <h4 class="m-0" style="font-size: 0.95rem; font-weight: 800; color: var(--color-surface-900);">#${contract.id} - ${partyName}</h4>
                         <span class="text-tiny text-muted uppercase font-bold tracking-wider" style="font-size: 0.65rem;">${partyRole}</span>
                    </div>
                    ${statusBadge}
                </div>
                <div class="flex justify-between items-center mt-sm pt-sm" style="border-top: 1px solid var(--color-surface-50);">
                    <div class="flex-column">
                        <span class="text-tiny font-bold color-brand" style="font-size: 0.7rem;">${date}</span>
                    </div>
                    <div class="flex gap-xs">
                        ${actions}
                    </div>
                </div>
            </article>
            `;
        }).join('');

        // Verify ContractManager is available
        if (typeof ContractManager === 'undefined') {
            console.error('[ContractButton] ContractManager is not defined! Make sure contracts.js is loaded.');
            container.innerHTML += '<div class="alert alert-error">Erreur: ContractManager non disponible. Veuillez recharger la page.</div>';
        }

        // Attach direct event listeners immediately after setting innerHTML
        // This ensures buttons work even if event delegation has issues
        requestAnimationFrame(() => {
            const viewButtons = container.querySelectorAll('.contract-view-btn, [data-contract-action="view"]');
            const payButtons = container.querySelectorAll('.contract-pay-btn, [data-contract-action="pay"]');

            console.log(`[ContractButton] Found ${viewButtons.length} view buttons and ${payButtons.length} pay buttons`);
            console.log('[ContractButton] ContractManager available:', typeof ContractManager !== 'undefined');
            console.log('[ContractButton] PaymentManager available:', typeof PaymentManager !== 'undefined');

            viewButtons.forEach((btn, index) => {
                // Remove any existing onclick to avoid conflicts
                btn.removeAttribute('onclick');

                // Define click handler function
                const clickHandler = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[ContractButton] View button clicked directly', this);
                    console.log('[ContractButton] Button element:', this);
                    console.log('[ContractButton] Event:', e);

                    const listingId = this.dataset.listingId || this.getAttribute('data-listing-id') || 0;
                    const contractId = this.dataset.contractId || this.getAttribute('data-contract-id');
                    const url = this.dataset.url || this.getAttribute('data-url');
                    const role = this.dataset.role || this.getAttribute('data-role') || 'student';
                    const status = this.dataset.status || this.getAttribute('data-status');

                    console.log('[ContractButton] View button data:', { contractId, listingId, url, role, status });

                    if (typeof ContractManager === 'undefined') {
                        console.error('[ContractButton] ContractManager is not defined!');
                        alert('Erreur: ContractManager non disponible. Veuillez recharger la page.');
                        return;
                    }

                    if (contractId && url) {
                        try {
                            ContractManager.showContractModal(listingId, url, null, contractId, role, status);
                        } catch (error) {
                            console.error('[ContractButton] Error in showContractModal:', error);
                            alert('Erreur lors de l\'ouverture: ' + error.message);
                        }
                    } else {
                        console.error('[ContractButton] Missing data attributes', { contractId, url });
                        if (typeof showErrorModal !== 'undefined') {
                            showErrorModal('Erreur: Données du contrat manquantes');
                        } else {
                            alert('Erreur: Données du contrat manquantes');
                        }
                    }
                };

                // Add listener with both capture and bubble phases
                btn.addEventListener('click', clickHandler, true);
                btn.addEventListener('click', clickHandler, false);

                // Also add mousedown as backup
                btn.addEventListener('mousedown', function (e) {
                    e.preventDefault();
                    clickHandler.call(this, e);
                });

                console.log(`[ContractButton] Attached handlers to view button ${index + 1}`);
            });

            payButtons.forEach((btn) => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('[ContractButton] Pay button clicked directly', this);

                    const listingId = this.dataset.listingId || this.getAttribute('data-listing-id');
                    const contractId = this.dataset.contractId || this.getAttribute('data-contract-id');

                    console.log('[ContractButton] Pay button data:', { contractId, listingId });

                    if (typeof PaymentManager === 'undefined') {
                        console.error('[ContractButton] PaymentManager is not defined!');
                        alert('Erreur: PaymentManager non disponible. Veuillez recharger la page.');
                        return;
                    }

                    if (contractId && listingId) {
                        try {
                            PaymentManager.showPaymentModal(listingId, contractId);
                        } catch (error) {
                            console.error('[ContractButton] Error in showPaymentModal:', error);
                            alert('Erreur lors de l\'ouverture: ' + error.message);
                        }
                    } else {
                        console.error('[ContractButton] Missing data attributes', { contractId, listingId });
                        if (typeof showErrorModal !== 'undefined') {
                            showErrorModal('Erreur: Données du paiement manquantes');
                        } else {
                            alert('Erreur: Données du paiement manquantes');
                        }
                    }
                }, true); // Use capture phase
            });
        });

    } catch (error) {
        console.error('Error loading contracts:', error);
        container.innerHTML = '<div class="alert alert-error">Erreur lors du chargement des contrats.</div>';
    }
}

function getStatusBadge(status) {
    let color = 'info';
    let label = status;

    switch (status) {
        case 'generated':
        case 'draft':
            color = 'warning';
            label = 'Brouillon';
            break;
        case 'signed_by_student':
            color = 'info';
            label = 'Signé (Etud.)';
            break;
        case 'signed_by_owner':
            color = 'info';
            label = 'Signé (Propria.)';
            break;
        case 'pending_payment':
            color = 'brand';
            label = 'À Payer';
            break;
        case 'paid':
        case 'active':
        case 'completed':
            color = 'success';
            label = 'Actif';
            break;
        case 'terminated':
        case 'expired':
            color = 'white';
            label = 'Terminé';
            break;
        case 'signed':
            color = 'info';
            label = 'Signé';
            break;
        default:
            label = status.replace(/_/g, ' ');
    }

    return `<span class="badge badge-${color}" style="text-transform: capitalize;">${label}</span>`;
}

window.loadUserContracts = loadUserContracts;
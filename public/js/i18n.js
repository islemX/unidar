/**
 * UNIDAR Internationalization (i18n) Module
 * Supports English (default), French, and Arabic languages
 */

const UNIDAR_I18N = {
    // Current language
    currentLang: 'en',

    // Available languages with metadata
    languages: {
        en: { name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
        fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
        ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' }
    },

    // Translation strings
    translations: {
        en: {
            // Navbar
            nav_home: 'Home',
            nav_listings: 'Listings',
            nav_roommates: 'Roommates',
            nav_dashboard: 'Dashboard',
            nav_messages: 'Messages',
            nav_my_properties: 'My Properties',
            nav_login: 'Login',
            nav_signup: 'Sign Up',
            nav_logout: 'Logout',

            // Home Page
            home_hero_badge: 'Trusted by Students Across Tunisia',
            home_hero_title: 'Find Your Perfect Student Housing',
            home_hero_subtitle: 'The premier platform for Tunisian university students. Discover verified listings, find compatible roommates, and secure safe housing near your campus—all in one place.',
            home_hero_explore: 'Explore Listings',
            home_hero_roommates: 'Find Roommates',
            home_hero_stat_listings: 'Verified Listings',
            home_hero_stat_students: 'Active Students',
            home_hero_stat_unis: 'Universities Covered',

            // Home - Why UNIDAR (Features)
            home_why_tag: 'Why UNIDAR',
            home_why_title: 'Everything You Need for Student Living',
            home_why_subtitle: "We've built the most comprehensive platform to solve every housing challenge students face in Tunisia.",
            home_feat1_title: 'Verified Student Community',
            home_feat1_desc: "Every user is verified with their student ID, ensuring you're always connecting with real, trusted university students and legitimate property owners.",
            home_feat2_title: 'Campus-Based Search',
            home_feat2_desc: "Find housing near your exact campus with our interactive map. Filter by distance, neighborhood, and commute time to find the perfect location.",
            home_feat3_title: 'Smart Roommate Matching',
            home_feat3_desc: "Our intelligent algorithm analyzes lifestyle preferences, sleep schedules, study habits, and more to match you with compatible roommates.",
            home_feat4_title: 'Secure Messaging',
            home_feat4_desc: "Communicate directly with property owners and potential roommates through our built-in messaging system—safe, private, and always accessible.",
            home_feat5_title: 'Detailed Listings',
            home_feat5_desc: "Every listing includes comprehensive details: high-quality photos, amenities, pricing breakdown, house rules, and authentic student reviews.",
            home_feat6_title: 'Real-Time Updates',
            home_feat6_desc: "Get instant notifications when new listings match your criteria or when property owners respond to your inquiries. Never miss an opportunity.",

            // Home - For Students
            home_students_title: 'Built for Students, By Students',
            home_students_subtitle: 'We understand the unique challenges of finding student housing in Tunisia. Browse freely, get verified, and unlock full access with Premium.',
            home_students_benefit1: 'Browse all listings for free — no upgrade needed',
            home_students_benefit2: 'Get verified with your student ID card',
            home_students_benefit3: 'Go Premium to contact owners, sign digital contracts & pay securely',
            home_students_benefit4: 'Read authentic reviews from fellow students',
            home_students_cta: 'Start Your Search',
            home_visual_match: 'Perfect Match Found!',
            home_visual_compatibility: '98% compatibility score',
            home_visual_new_listing: 'New Listing Near Campus',
            home_hero_subtitle_small: 'Hand-picked housing options for your comfort.',
            home_visual_amenities_preview: '2 bed • 5 min walk',
            home_visual_verified: 'Student Verified',
            home_visual_uni: 'University of Tunis',

            // Home - For Owners
            home_owners_title: 'Reach Thousands of Verified Students',
            home_owners_subtitle: "List your property on UNIDAR and connect with a targeted audience of verified university students actively searching for housing.",
            home_owners_benefit1: 'Free listing creation with unlimited photos',
            home_owners_benefit2: 'Direct messaging with verified students',
            home_owners_benefit3: 'Manage bookings and inquiries in one dashboard',
            home_owners_benefit4: 'Build trust with student reviews and ratings',
            home_owners_cta: 'List Your Property',
            home_stat_occupancy: 'Occupancy Rate',
            home_stat_response: 'Avg. Response Time',
            home_stat_satisfaction: 'Owner Satisfaction',
            home_stat_started: 'To Get Started',

            // Home - How It Works
            home_how_tag: 'How It Works',
            home_how_title: 'Get Started in 3 Simple Steps',
            home_how_subtitle: "Finding your perfect student housing has never been easier. Here's how UNIDAR simplifies your search.",
            home_step1_title: 'Create Your Profile',
            home_step1_desc: "Sign up as a student or property owner. Verify your identity and set your preferences to get personalized recommendations.",
            home_step2_title: 'Browse & Match',
            home_step2_desc: "Explore verified listings near your campus or use our smart matching to find compatible roommates based on your lifestyle.",
            home_step3_title: 'Connect & Move In',
            home_step3_desc: "Message property owners directly, schedule viewings, and secure your perfect home—all through our safe platform.",

            // Home - Trust
            home_trust_tag: 'Trust & Safety',
            home_trust_title: 'Your Security is Our Priority',
            home_trust_subtitle: "We've implemented multiple layers of verification and security to ensure every interaction on UNIDAR is safe and trustworthy.",
            home_trust_badge1: 'Student ID Verified',
            home_trust_badge2: 'Secure Messaging',
            home_trust_badge3: 'Verified Listings',
            home_trust_badge4: 'Admin Moderated',
            home_trust_badge5: 'Authentic Reviews',

            // Home - Final CTA
            home_cta_title: 'Ready to Find Your Perfect Home?',
            home_cta_subtitle: "Join thousands of Tunisian students who have already found their ideal housing through UNIDAR. Start your search today—it's free!",
            home_cta_btn: 'Get Started for Free',

            // Footer
            footer_brand_desc: "The premier student housing platform in Tunisia. Helping university students find verified housing and compatible roommates since 2026.",
            footer_platform: 'Platform',
            footer_for_owners: 'For Owners',
            footer_support: 'Support',
            footer_browse: 'Browse Listings',
            footer_find_roommates: 'Find Roommates',
            footer_list_property: 'List Property',
            footer_manage: 'Manage Listings',
            footer_help: 'Help Center',
            footer_contact: 'Contact Us',
            footer_report: 'Report Issue',
            footer_copyright: "© 2026 UNIDAR. All rights reserved. Made with ❤️ for Tunisian students.",

            // Common actions
            btn_save: 'Save',
            btn_cancel: 'Cancel',
            btn_submit: 'Submit',
            btn_edit: 'Edit',
            btn_delete: 'Delete',
            btn_view_details: 'Details',
            btn_send_message: 'Send Message',
            btn_apply_filters: 'Apply Filters',
            btn_browse_all: 'Browse All',
            btn_find_more: 'Find More',

            // Listings page
            listings_title: 'Find Your Perfect Home',
            listings_marketplace: 'Marketplace',
            listings_map_view: 'Map View',
            listings_list_view: 'List View',
            filter_min_price: 'Min Price (TND)',
            filter_max_price: 'Max Price (TND)',
            filter_bedrooms: 'Bedrooms',
            filter_any_bedrooms: 'Any Bedrooms',
            filter_property_type: 'Property Type',
            filter_any_type: 'Any Type',
            filter_apartment: 'Apartment',
            filter_house: 'House',
            filter_studio: 'Studio',
            filter_shared_room: 'Shared Room',
            listings_no_results: 'No Listings Found',
            listings_adjust_filters: 'Try adjusting your filters',
            listings_per_month: '/mo',

            // Roommates page
            roommates_title: 'Find Roommates',
            roommates_compatibility: 'Compatibility',
            roommates_preferences: 'Preferences',
            roommates_no_matches: 'No Matches Yet',
            roommates_set_preferences: 'Set your preferences to find compatible roommates',
            roommates_message_btn: 'Message',
            roommates_verified: 'Verified',
            btn_set_preferences: 'Set Preferences',
            pref_budget: 'Budget',
            pref_budget_min: 'Budget Min',
            pref_budget_max: 'Budget Max',
            pref_cleanliness: 'Cleanliness',
            pref_cleanliness_level: 'Cleanliness Level',
            pref_no_preference: 'No preference',
            pref_very_clean: 'Very Clean',
            pref_clean: 'Clean',
            pref_moderate: 'Moderate',
            pref_relaxed: 'Relaxed',
            pref_smoking: 'Smoking',
            pref_smoking_preference: 'Smoking Preference',
            pref_non_smoker: 'Non-Smoker',
            pref_smoker: 'Smoker',
            pref_sleep: 'Sleep',
            pref_sleep_schedule: 'Sleep Schedule',
            pref_early_riser: 'Early Riser',
            pref_normal: 'Normal',
            pref_night_owl: 'Night Owl',
            pref_save_refresh: 'Save & Refresh Results',

            // Dashboard
            dashboard_title: 'Dashboard',
            dashboard_welcome: 'Welcome back',
            dashboard_portal: 'Portal',
            dashboard_saved: 'Saved',
            dashboard_matches: 'Matches',
            dashboard_unread: 'Unread',
            dashboard_nearby: 'Nearby',
            dashboard_edit_profile: 'Edit Profile',
            dashboard_saved_listings: 'Saved for Later',
            dashboard_neighborhood: 'Neighborhood Watch',
            dashboard_nearby_listings: 'Listings within 10km of your area',
            dashboard_matchmaking: 'Matchmaking',
            dashboard_conversations: 'Conversations',
            dashboard_inbox: 'Inbox',

            // Login/Register
            login_page_title: 'Login - UNIDAR',
            login_title: 'Sign In',
            login_welcome: 'Welcome Back',
            login_access: 'Access your UNIDAR account',
            login_email: 'Email Address',
            login_password: 'Password',
            login_forgot: 'Forgot password?',
            login_signin: 'Sign In',
            login_no_account: "Don't have an account?",
            login_create: 'Create Account',
            login_email_placeholder: 'student@university.edu',
            login_password_placeholder: '••••••••',
            login_signing_in: 'Signing in...',

            register_title: 'Create Account',
            register_welcome: 'Join US',
            register_join: 'Join UNIDAR',
            register_start: 'Start your journey with UNIDAR',
            register_fullname: 'Full Name',
            register_fullname_placeholder: 'John Doe',
            register_email: 'Email Address',
            register_email_placeholder: 'student@university.edu',
            register_email_hint: 'University email helps with trust and verification.',
            register_password: 'Password',
            register_password_placeholder: 'Min. 8 characters',
            register_confirm: 'Confirm Password',
            register_confirm_placeholder: 'Re-enter password',
            register_phone: 'Phone Number (Optional)',
            register_phone_placeholder: '+216 ...',
            register_role: 'I am a',
            register_role_select: 'Select...',
            register_student: 'Student',
            register_owner: 'Property Owner',
            register_university: 'University Name',
            register_university_placeholder: 'e.g. ESPRIT, INSAT, MSB...',
            register_map_radius: 'Search Radius (Preferred Area)',
            register_map_hint: 'Click on the map to mark your study area.',
            register_selected_location: 'Selected:',
            register_agree: 'I agree to the Terms of Service',
            register_create: 'Create Account',
            register_creating_account: 'Creating account...',
            register_have_account: 'Already have an account?',
            register_signin: 'Sign In',

            // Listing detail
            detail_back: 'Back to Listings',
            detail_bedrooms: 'Bedrooms',
            detail_bathrooms: 'Bathrooms',
            detail_size: 'Size',
            detail_type: 'Type',
            detail_description: 'Description',
            detail_amenities: 'Amenities',
            detail_location: 'Location',
            detail_contact_owner: 'Contact Owner',
            detail_save_listing: 'Save Listing',
            detail_saved: 'Saved',

            // Owner listings
            owner_my_properties: 'My Properties',
            owner_add_property: 'Add Property',
            owner_no_properties: 'No properties yet',
            owner_create_first: 'Create your first listing',
            owner_total_properties: 'Total Properties',
            owner_active_listings: 'Active Listings',
            owner_total_inquiries: 'Total Inquiries',
            owner_rented_properties: 'Rented Properties',
            owner_management: 'Management',
            owner_existing_properties: 'Existing Properties',
            owner_refresh_list: 'Refresh List',
            owner_add_new_property: 'Add New Property',
            owner_title_label: 'Title',
            owner_description_label: 'Description',
            owner_address_label: 'Address',
            owner_price_label: 'Price per month (TND)',
            owner_type_label: 'Property Type',
            owner_bedrooms_label: 'Bedrooms',
            owner_bathrooms_label: 'Bathrooms',
            owner_available_label: 'Available From',
            owner_loading_properties: 'Loading your properties...',
            owner_property_portfolio: 'Property Portfolio',
            owner_portfolio_desc: 'The geographic distribution of your properties',

            // Verification
            verification_title: 'Student Verification',
            verification_upload: 'Upload your student ID',
            verification_pending: 'Verification Pending',
            verification_approved: 'Verified Student',

            // Footer
            footer_tagline: 'Safe Student Housing',
            footer_rights: 'All rights reserved',

            // Chat Widget
            chat_messages: 'Messages',
            chat_active: 'Active',
            chat_archived: 'Archived',
            chat_no_messages: 'No messages.',
            chat_type_message: 'Type a message...',
            chat_send: 'Send',
            chat_archive: 'Archive',
            chat_unarchive: 'Unarchive',
            chat_delete: 'Delete',
            chat_block: 'Block User',
            chat_report: 'Report',
            chat_loading: 'Loading conversations...',

            // Listing Cards & Detail
            card_bedrooms: 'Bedrooms',
            card_bathrooms: 'Bathrooms',
            card_bath: 'Bath',
            card_per_month: '/mo',
            card_details: 'Details',
            card_no_listings: 'No Listings Found',
            card_adjust_filters: 'Try adjusting your filters',
            card_save: 'Save To Favorites',
            card_saved: 'Saved',
            card_contact: 'Contact Owner',
            card_about: 'About this place',
            card_available: 'Available',
            card_available_from: 'Available From',
            card_location: 'Location',
            card_share: 'Share',
            card_report: 'Report a problem with this listing',
            card_per_month_full: '/ month',
            card_no_description: 'No description provided.',
            card_generate_contract: 'Generate Contract',

            // Misc
            loading: 'Loading...',
            error_occurred: 'An error occurred',
            verified: 'Verified',
            student: 'Student',

            // Dynamic Listings Content
            bedrooms_short: 'Bed',
            bedrooms_abbr: 'Ch.',
            places: 'Places',
            places_left: 'place(s) left',
            full_badge: 'FULL 👥',
            discover_offer: 'Discover this offer →',
            view_details_arrow: 'View Details →',
            loading_marketplace: 'Loading Marketplace...',
            failed_load: 'Failed to load listings. Please try again.',
            role_student: 'Student',

            // View Toggle
            map_view: 'Map View',
            list_view: 'List View',

            // Filter Placeholders
            placeholder_min_price: 'e.g. 400',
            placeholder_max_price: 'e.g. 1200',

            // Footer Links
            footer_about: 'About',
            footer_help_link: 'Help',
            footer_privacy: 'Privacy',
            footer_terms: 'Terms',

            // Common UI
            explore_listings_text: 'Browse all listings freely. Verify your student ID and upgrade to Premium to contact owners, sign contracts and pay.',
            per_month: '/mo',
            month_abbr: '/mo',
            sqm: 'm²',

            // Bedroom Options
            bedroom_1: '1 Bedroom',
            bedroom_2: '2 Bedrooms',
            bedroom_3: '3 Bedrooms',
            bedroom_4: '4+ Bedrooms',

            // Map Popup
            view_details_link: 'View Details',

            // Tier access component (home page)
            home_students_tag: 'For Students',
            tier_how_access: 'HOW ACCESS WORKS',
            tier_browse_title: 'Browse & Explore',
            tier_browse_desc: 'View all listings & details — no upgrade needed',
            tier_badge_free: 'FREE ✓',
            tier_verify_title: 'Student Verified',
            tier_verify_desc: 'Upload your student ID card to confirm enrollment',
            tier_badge_step2: 'STEP 2 →',
            tier_premium_title: 'Premium Unlocked',
            tier_premium_desc: 'Contact owners · Sign contracts · Pay securely',
            tier_premium_actions_label: 'Premium-only Actions',
            tier_action_contact: 'Contact',
            tier_action_contact_sub: 'Owner',
            tier_action_contract: 'Contract',
            tier_action_contract_sub: 'Digital',
            tier_action_pay: 'Pay',
            tier_action_pay_sub: 'Secure',

            // Access banners & locked state
            access_restricted_title: 'Restricted Actions',
            access_unverified_badge: 'Unverified',
            access_no_premium_badge: 'No Premium',
            access_verify_cta_desc: 'Upload your student ID to get verified, then upgrade to Premium.',
            access_premium_cta_desc: "You're verified! Upgrade to Premium to contact owners, sign contracts and pay.",
            access_btn_verify: 'Get Verified',
            access_btn_premium: 'Upgrade to Premium',
            access_locked_verify_title: 'Verification Required',
            access_locked_premium_title: 'Premium Required',
            access_locked_verify_desc: 'Get verified as a student first, then upgrade to Premium to contact owners, sign contracts and pay securely.',
            access_locked_premium_desc: "You're verified! Upgrade to Premium (25 TND/yr) to contact this owner, generate contracts and make payments.",

            // Gender filter
            filter_gender_pref: 'Gender Preference',
            filter_any_gender: 'Any Gender',
            filter_male_only: 'Male Only',
            filter_female_only: 'Female Only',

            // Listing detail — missing keys
            detail_about_prop: 'About this property',
            detail_amenities_features: 'Amenities & Features',
            detail_show_more: 'Show more',
            detail_show_less: 'Show less',
            detail_surface: 'Surface',
            detail_capacity: 'Capacity',
            detail_guests: 'Guests',
            detail_tnd_mo: 'TND/mo',
            detail_places_left_label: 'Places Left',
            detail_floor_label: 'Floor',
            detail_request_contract: 'Request Contract',
            detail_login_reserve: 'Login to Reserve',
            detail_report_listing: 'Report this listing',
            detail_owned_by: 'Owned by',
            detail_member_since: 'Member since',
            detail_photos_count: 'Photo(s)',
            detail_future_roommates: 'Future roommates',
            detail_location_directions: 'Location & Directions',
            detail_directions_desc: 'Calculate your route from any university in Tunisia',
            detail_choose_university: 'Choose your university',
            detail_select_uni: '-- Select a university --',
            detail_get_directions: 'Get directions',
            detail_driving: 'Driving',
            detail_walking: 'Walking',
            detail_compass_start: 'Start',
            detail_compass_stop: 'Stop',
            detail_discover_details: 'Discover Details',

            // User Dashboard
            dash_status: 'Status',
            dash_active: 'Active',
            dash_subscription: 'Subscription',
            dash_favorites: 'Favorites',
            dash_contracts_label: 'Contracts',
            dash_neighborhood: 'Neighborhood Watch',
            dash_nearby: 'nearby',
            dash_preferred_location: 'Your Preferred Location',
            dash_contracts_title: '📄 Contracts',
            dash_refresh: 'Refresh',
            dash_messages_title: '💬 Messages',
            dash_inbox: 'Inbox',
            dash_saved_title: '✨ Saved for Later',
            dash_browse_more: 'Browse More',
            dash_loading_contracts: 'Loading contracts…',
            dash_no_contracts: 'No contracts yet.',
            dash_pay_now: '💳 Pay Now',
            dash_cancel_contract: '✕ Cancel',
            dash_loading_saved: 'Loading saved listings…',
            dash_no_saved: 'No saved listings yet.',
            dash_loading_messages: 'Loading messages…',
            dash_no_messages: 'No messages yet.',
            dash_sub_active_prefix: 'Active · until ',
            dash_sub_expired_prefix: 'Expired · ',
            dash_sub_none: 'No active Pro',
            dash_verify_title: 'Account Not Verified',
            dash_verify_body: 'Please submit your student ID to access all features.',
            dash_verify_btn: 'Verify Now',
            dash_pending_title: 'Verification Pending',
            dash_pending_body: 'Your documents are being reviewed by our team.',
            dash_pending_btn: 'Check Status',
            dash_rejected_title: 'Verification Rejected',
            dash_rejected_body: 'Please resubmit your documents.',
            dash_rejected_btn: 'Resubmit',
            dash_sub_required_title: 'Subscription Required',
            dash_sub_required_body: '25 TND/year for full access.',
            dash_sub_expired_title: 'Subscription Expired',
            dash_sub_expired_body_prefix: 'Your yearly access ended on ',
            dash_sub_expired_body_suffix: '. Renew for 25 TND/year.',
            dash_subscribe_now: 'Subscribe Now →',

            // Roommate Page
            roommate_hero_badge: '✨ Smart Matching',
            roommate_hero_title: 'Find Your Ideal Roommate',
            roommate_hero_subtitle: "Don't settle for just anyone. Our algorithm matches you with students who share your lifestyle and habits.",
            roommate_open_prefs: '⚙️ Update My Preferences',
            roommate_prefs_title: 'Preferences',
            roommate_prefs_subtitle: "Tell us who you're looking for",
            roommate_overlay_title: 'Finding Matches',
            roommate_overlay_sub: 'Analyzing compatibility scores...',
            roommate_save_matches: 'Save & Find Matches',
            roommate_no_matches: 'No Matches Yet',
            roommate_no_matches_sub: 'Try broadening your preferences.',
            roommate_message: '💬 Message',
            roommate_loading: 'Finding compatibility matches...',
            pref_monthly_budget: 'Monthly Budget (TND)',
            pref_cleanliness: 'Cleanliness',
            pref_sleep: 'Sleep Schedule',
            pref_gender: 'Gender Preference',
            pref_smoking: 'Smoking',
            pref_noise: 'Noise Tolerance',
            pref_guests: 'Guests Policy',
            pref_pets: 'Pets',
            pref_age_range: 'Age Range',
            pref_age_min_placeholder: 'Min age',
            pref_age_max_placeholder: 'Max age',
            pref_relaxed: 'Relaxed',
            pref_moderate: 'Moderate',
            pref_clean: 'Clean',
            pref_very_clean: 'Very Clean',
            pref_early_riser: 'Early Riser',
            pref_normal: 'Normal',
            pref_night_owl: 'Night Owl',
            pref_male: 'Male',
            pref_female: 'Female',
            pref_no_preference: 'No Preference',
            pref_smoker: 'Yes',
            pref_non_smoker: 'No',
            pref_any: 'Any',
            pref_quiet: 'Quiet',
            pref_social: 'Social',
            pref_no_guests: 'No Guests',
            pref_occasional: 'Occasional',
            pref_no_pets: 'No Pets',
            pref_pets_ok: 'Pets OK',

            // Owner Dashboard
            owner_my_listings: 'My Listings',
            owner_manage_props: 'Manage your properties',
            owner_add_listing: '+ Add Listing',
            owner_active_contracts: 'Active Contracts',
            owner_no_listings: 'No listings yet. Create your first one!',
            owner_no_contracts: 'No active contracts.',
            owner_create_listing: 'Create New Listing',
            owner_field_title: 'Title',
            owner_field_address: 'Address',
            owner_field_price: 'Price (TND/month)',
            owner_field_bedrooms: 'Bedrooms',
            owner_field_bathrooms: 'Bathrooms',
            owner_field_capacity: 'Capacity (persons)',
            owner_field_type: 'Property Type',
            owner_field_gender: 'Gender Preference',
            owner_field_desc: 'Description',
            owner_field_images: 'Listing Images',
            owner_images_hint: 'You can select multiple images',
            owner_create_btn: 'Create Listing',
            owner_view_btn: 'View',
            owner_delete_btn: 'Delete',
            owner_terminate_btn: '🚫 Terminate',
            owner_cancel_requested: '⚠️ Student requested cancellation',
            owner_remove_confirm: 'Remove this listing?',
            owner_terminate_reason: 'Reason for termination (optional):',
            owner_created_ok: 'Listing created!',
            owner_terminated_ok: '✅ Contract terminated. The listing is now available again.',
            owner_loading: 'Loading listings…',

            // Contract Modal
            contract_setup_title: 'Contract Settings',
            contract_setup_desc: 'Please set the duration and start date of your rental.',
            contract_start_month_label: 'Start Month',
            contract_start_hint: 'Rental will begin on the 1st of the selected month.',
            contract_duration_label: 'Duration (Months)',
            contract_month_unit: 'month(s)',
            contract_generate_btn: 'Generate Contract',
            contract_fill_all: 'Please fill in all fields.',
            contract_loading: 'Preparing contract...',
            contract_view_title: '📄 Contract View',
            contract_official_doc: 'Official Document',
            contract_id_label: 'Contract ID:',
            contract_generated_on: 'Generated on',
            contract_view_pdf: '👁️ View Full PDF Contract',
            contract_opens_tab: 'The document will open in a new tab for signature or printing if needed.',
            contract_sign_title: '✍️ Digital Signature',
            contract_sign_desc: 'Sign below to validate your contract.',
            contract_sign_btn: 'Validate Signature',
            contract_signed_title: '✅ Contract Signed',
            contract_signed_desc: 'Last step: Pay the fee to activate your rental.',
            contract_go_payment: '💳 Go to Payment',
            contract_payment_status: 'Payment Status',
            contract_paid_active: '✅ Paid & Active',
            contract_awaiting_pay: '⏳ Awaiting Student Payment',
            contract_close: 'Close',

            // Payment Modal
            pay_secured_by: '🔒 Secured by UNIDAR Pay',
            pay_title: 'Secure Payment',
            pay_tab_card: 'Bank Card',
            pay_tab_transfer: 'Transfer',
            pay_card_holder_label: 'Card Holder',
            pay_card_expires_label: 'Expires',
            pay_holder_name: 'Name on Card',
            pay_card_number: 'Card Number',
            pay_expiration: 'Expiration',
            pay_cvc: 'CVC',
            pay_cvc_tooltip: '3 digits on the back of your card',
            pay_summary: 'Summary',
            pay_monthly_rent: 'Monthly rent',
            pay_commission: 'Commission (5%)',
            pay_total: 'Total to pay',
            pay_processing: 'Processing...',
            pay_step_bank: 'Identifying bank...',
            pay_step_encrypt: 'Encrypting transaction...',
            pay_step_auth: 'Awaiting bank authorization...',
            pay_step_validate: 'Validating contract...',
            pay_step_done: 'Payment authorized!',
            pay_substep_tls: 'Secure TLS 1.3 connection...',
            pay_substep_aes: 'AES-256 encryption...',
            pay_substep_3ds: '3D Secure verification...',
            pay_substep_record: 'Recording the deed...',
            pay_btn: '🔐 Pay Now',
            pay_no_store: '🔒 No data stored',
            pay_success_title: 'Payment Successful!',
            pay_success_body: 'Your contract is now active.',
            pay_transfer_ok: 'Transfer request registered. Your contract will be activated upon receipt of funds.',
            pay_congrats: 'Congratulations! Your payment has been processed and your contract is now active.',
            pay_err_fill_card: 'Please fill in all card fields.',
            pay_err_card_number: 'Please enter a complete card number.',
            pay_err_invalid_card: 'The card number is invalid. Please verify.',
            pay_err_expiry: 'The expiration date is invalid or expired.',
            pay_err_connection: 'Connection error during payment',
            modal_error_title: 'Error',
            modal_success_title: 'Success!',
            modal_ok: 'OK',
            status_draft: 'Draft',
            status_signed_student: 'Signed (Stud.)',
            status_signed_owner: 'Signed (Owner)',
            status_pending_pay: 'To Pay',
            status_active_label: 'Active',
            status_terminated: 'Terminated',
            status_signed: 'Signed'
        },

        fr: {
            // Navbar
            nav_home: 'Accueil',
            nav_listings: 'Annonces',
            nav_roommates: 'Colocataires',
            nav_dashboard: 'Tableau de bord',
            nav_messages: 'Messages',
            nav_my_properties: 'Mes Propriétés',
            nav_login: 'Connexion',
            nav_signup: 'Inscription',
            nav_logout: 'Déconnexion',

            // Home Page
            home_hero_badge: 'Approuvé par des étudiants à travers toute la Tunisie',
            home_hero_title: 'Trouvez votre logement étudiant idéal',
            home_hero_subtitle: 'La première plateforme pour les étudiants universitaires tunisiens. Découvrez des annonces vérifiées, trouvez des colocataires compatibles et sécurisez un logement sûr près de votre campus.',
            home_hero_explore: 'Explorer les annonces',
            home_hero_roommates: 'Trouver des colocataires',
            home_hero_stat_listings: 'Annonces vérifiées',
            home_hero_stat_students: 'Étudiants actifs',
            home_hero_stat_unis: 'Universités couvertes',

            // Home - Why UNIDAR (Features)
            home_why_tag: 'Pourquoi UNIDAR',
            home_why_title: 'Tout ce dont vous avez besoin pour la vie étudiante',
            home_why_subtitle: "Nous avons construit la plateforme la plus complète pour résoudre tous les défis de logement auxquels les étudiants sont confrontés en Tunisie.",
            home_feat1_title: 'Communauté étudiante vérifiée',
            home_feat1_desc: "Chaque utilisateur est vérifié avec sa carte d'étudiant, ce qui garantit que vous êtes toujours en contact avec de vrais étudiants universitaires de confiance et des propriétaires légitimes.",
            home_feat2_title: 'Recherche par campus',
            home_feat2_desc: "Trouvez un logement près de votre campus exact grâce à notre carte interactive. Filtrez par distance, quartier et temps de trajet pour trouver l'emplacement idéal.",
            home_feat3_title: 'Mise en relation intelligente',
            home_feat3_desc: "Notre algorithme intelligent analyse les préférences de style de vie, les horaires de sommeil, les habitudes d'étude et plus encore pour vous mettre en relation avec des colocataires compatibles.",
            home_feat4_title: 'Messagerie sécurisée',
            home_feat4_desc: "Communiquez directement avec les propriétaires et les colocataires potentiels via notre système de messagerie intégré — sûr, privé et toujours accessible.",
            home_feat5_title: 'Annonces détaillées',
            home_feat5_desc: "Chaque annonce comprend des détails complets : photos de haute qualité, équipements, ventilation des prix, règles de la maison et avis d'étudiants authentiques.",
            home_feat6_title: 'Mises à jour en temps réel',
            home_feat6_desc: "Recevez des notifications instantanées lorsque de nouvelles annonces correspondent à vos critères ou lorsque les propriétaires répondent à vos demandes. Ne manquez jamais une opportunité.",

            // Home - For Students
            home_students_title: 'Conçu pour les étudiants, par des étudiants',
            home_students_subtitle: "Nous comprenons les défis uniques de la recherche de logement étudiant en Tunisie. Parcourez librement, obtenez la vérification et débloquez l'accès complet avec Premium.",
            home_students_benefit1: 'Parcourez toutes les annonces gratuitement — sans mise à niveau',
            home_students_benefit2: "Obtenez la vérification avec votre carte d'étudiant",
            home_students_benefit3: 'Passez Premium pour contacter les propriétaires, signer des contrats et payer en toute sécurité',
            home_students_benefit4: 'Lisez des avis authentiques d\'autres étudiants',
            home_students_cta: 'Commencer votre recherche',
            home_visual_match: 'Correspondance parfaite trouvée !',
            home_visual_compatibility: 'Score de compatibilité de 98%',
            home_visual_new_listing: 'Nouveau logement près du campus',
            home_hero_subtitle_small: 'Des options de logement triées sur le volet pour votre confort.',
            home_visual_amenities_preview: '2 chambres • 5 min à pied',
            home_visual_verified: 'Étudiant vérifié',
            home_visual_uni: 'Université de Tunis',

            // Home - For Owners
            home_owners_title: 'Atteignez des milliers d\'étudiants vérifiés',
            home_owners_subtitle: "Inscrivez votre propriété sur UNIDAR et connectez-vous avec un public ciblé d'étudiants universitaires vérifiés qui recherchent activement un logement.",
            home_owners_benefit1: 'Création d\'annonce gratuite avec photos illimitées',
            home_owners_benefit2: 'Messagerie directe avec des étudiants vérifiés',
            home_owners_benefit3: 'Gérez les réservations et les demandes dans un seul tableau de bord',
            home_owners_benefit4: 'Instaurez la confiance grâce aux avis et notes des étudiants',
            home_owners_cta: 'Inscrire votre propriété',
            home_stat_occupancy: 'Taux d\'occupation',
            home_stat_response: 'Délai de réponse moyen',
            home_stat_satisfaction: 'Satisfaction des propriétaires',
            home_stat_started: 'Pour commencer',

            // Home - How It Works
            home_how_tag: 'Comment ça marche',
            home_how_title: 'Commencez en 3 étapes simples',
            home_how_subtitle: "Trouver votre logement étudiant idéal n'a jamais été aussi facile. Voici comment UNIDAR simplifie votre recherche.",
            home_step1_title: 'Créez votre profil',
            home_step1_desc: "Inscrivez-vous en tant qu'étudiant ou propriétaire. Vérifiez votre identité et définissez vos préférences pour obtenir des recommandations personnalisées.",
            home_step2_title: 'Parcourez et faites correspondre',
            home_step2_desc: "Explorez les annonces vérifiées près de votre campus ou utilisez notre mise en relation intelligente pour trouver des colocataires compatibles en fonction de votre style de vie.",
            home_step3_title: 'Connectez-vous et emménagez',
            home_step3_desc: "Envoyez des messages directs aux propriétaires, planifiez des visites et sécurisez votre maison idéale — le tout via notre plateforme sécurisée.",

            // Home - Trust
            home_trust_tag: 'Confiance et sécurité',
            home_trust_title: 'Votre sécurité est notre priorité',
            home_trust_subtitle: "Nous avons mis en place plusieurs couches de vérification et de sécurité pour garantir que chaque interaction sur UNIDAR est sûre et digne de confiance.",
            home_trust_badge1: 'ID étudiant vérifié',
            home_trust_badge2: 'Messagerie sécurisée',
            home_trust_badge3: 'Annonces vérifiées',
            home_trust_badge4: 'Modéré par l\'administrateur',
            home_trust_badge5: 'Avis authentiques',

            // Home - Final CTA
            home_cta_title: 'Prêt à trouver votre logement idéal ?',
            home_cta_subtitle: "Rejoignez des milliers d'étudiants tunisiens qui ont déjà trouvé leur logement idéal grâce à UNIDAR. Commencez votre recherche aujourd'hui — c'est gratuit !",
            home_cta_btn: 'Commencer gratuitement',

            // Footer
            footer_brand_desc: "La première plateforme de logement étudiant en Tunisie. Aider les étudiants universitaires à trouver un logement vérifié et des colocataires compatibles depuis 2026.",
            footer_platform: 'Plateforme',
            footer_for_owners: 'Pour les propriétaires',
            footer_support: 'Support',
            footer_browse: 'Parcourir les annonces',
            footer_find_roommates: 'Trouver des colocataires',
            footer_list_property: 'Inscrire une propriété',
            footer_manage: 'Gérer les annonces',
            footer_help: 'Centre d\'aide',
            footer_contact: 'Nous contacter',
            footer_report: 'Signaler un problème',
            footer_copyright: "© 2026 UNIDAR. Tous droits réservés. Fait avec ❤️ pour les étudiants tunisiens.",

            // Common actions
            btn_save: 'Enregistrer',
            btn_cancel: 'Annuler',
            btn_submit: 'Soumettre',
            btn_edit: 'Modifier',
            btn_delete: 'Supprimer',
            btn_view_details: 'Détails',
            btn_send_message: 'Envoyer un message',
            btn_apply_filters: 'Appliquer les filtres',
            btn_browse_all: 'Voir tout',
            btn_find_more: 'Trouver plus',

            // Listings page
            listings_title: 'Trouvez Votre Logement Idéal',
            listings_marketplace: 'Marché',
            listings_map_view: 'Vue carte',
            listings_list_view: 'Vue liste',
            filter_min_price: 'Prix min (TND)',
            filter_max_price: 'Prix max (TND)',
            filter_bedrooms: 'Chambres',
            filter_any_bedrooms: 'Toutes chambres',
            filter_property_type: 'Type de bien',
            filter_any_type: 'Tous types',
            filter_apartment: 'Appartement',
            filter_house: 'Maison',
            filter_studio: 'Studio',
            filter_shared_room: 'Chambre partagée',
            listings_no_results: 'Aucune annonce trouvée',
            listings_adjust_filters: 'Essayez d\'ajuster vos filtres',
            listings_per_month: '/mois',

            // Roommates page
            roommates_title: 'Trouver des Colocataires',
            roommates_compatibility: 'Compatibilité',
            roommates_preferences: 'Préférences',
            roommates_no_matches: 'Pas encore de correspondances',
            roommates_set_preferences: 'Définissez vos préférences pour trouver des colocataires compatibles',
            roommates_message_btn: 'Message',
            roommates_verified: 'Vérifié',
            btn_set_preferences: 'Définir les préférences',
            pref_budget: 'Budget',
            pref_budget_min: 'Budget min',
            pref_budget_max: 'Budget max',
            pref_cleanliness: 'Propreté',
            pref_cleanliness_level: 'Niveau de propreté',
            pref_no_preference: 'Pas de préférence',
            pref_very_clean: 'Très propre',
            pref_clean: 'Propre',
            pref_moderate: 'Modéré',
            pref_relaxed: 'Détendu',
            pref_smoking: 'Fumeur',
            pref_smoking_preference: 'Préférence fumeur',
            pref_non_smoker: 'Non-fumeur',
            pref_smoker: 'Fumeur',
            pref_sleep: 'Sommeil',
            pref_sleep_schedule: 'Horaire de sommeil',
            pref_early_riser: 'Lève-tôt',
            pref_normal: 'Normal',
            pref_night_owl: 'Couche-tard',
            pref_save_refresh: 'Enregistrer et actualiser',

            // Dashboard
            dashboard_title: 'Tableau de bord',
            dashboard_welcome: 'Bienvenue',
            dashboard_portal: 'Portail',
            dashboard_saved: 'Favoris',
            dashboard_matches: 'Correspondances',
            dashboard_unread: 'Non lus',
            dashboard_nearby: 'À proximité',
            dashboard_edit_profile: 'Modifier le profil',
            dashboard_saved_listings: 'Enregistrés pour plus tard',
            dashboard_neighborhood: 'Surveillance du quartier',
            dashboard_nearby_listings: 'Annonces dans un rayon de 10km',
            dashboard_matchmaking: 'Correspondances',
            dashboard_conversations: 'Conversations',
            dashboard_inbox: 'Boîte de réception',

            // Login/Register
            login_page_title: 'Connexion - UNIDAR',
            login_title: 'Connexion',
            login_welcome: 'Bon retour',
            login_access: 'Accédez à votre compte UNIDAR',
            login_email: 'Adresse e-mail',
            login_password: 'Mot de passe',
            login_forgot: 'Mot de passe oublié?',
            login_signin: 'Se connecter',
            login_no_account: 'Pas encore de compte?',
            login_create: 'Créer un compte',
            login_email_placeholder: 'etudiant@universite.tn',
            login_password_placeholder: '••••••••',
            login_signing_in: 'Connexion en cours...',

            register_title: 'Créer un compte',
            register_welcome: 'Rejoignez-nous',
            register_join: 'Rejoindre UNIDAR',
            register_start: 'Commencez votre voyage avec UNIDAR',
            register_fullname: 'Nom complet',
            register_fullname_placeholder: 'Jean Dupont',
            register_email: 'Adresse e-mail',
            register_email_placeholder: 'etudiant@universite.tn',
            register_email_hint: 'L\'e-mail universitaire renforce la confiance et facilite la vérification.',
            register_password: 'Mot de passe',
            register_password_placeholder: 'Min. 8 caractères',
            register_confirm: 'Confirmer le mot de passe',
            register_confirm_placeholder: 'Saisissez à nouveau le mot de passe',
            register_phone: 'Numéro de téléphone (Optionnel)',
            register_phone_placeholder: '+216 ...',
            register_role: 'Je suis un(e)',
            register_role_select: 'Sélectionner...',
            register_student: 'Étudiant',
            register_owner: 'Propriétaire',
            register_university: 'Nom de l\'université',
            register_university_placeholder: 'ex. ESPRIT, INSAT, MSB...',
            register_map_radius: 'Rayon de recherche (Zone préférée)',
            register_map_hint: 'Cliquez sur la carte pour marquer votre zone d\'étude.',
            register_selected_location: 'Sélectionné:',
            register_agree: 'J\'accepte les conditions d\'utilisation',
            register_create: 'Créer un compte',
            register_creating_account: 'Création du compte...',
            register_have_account: 'Vous avez déjà un compte?',
            register_signin: 'Se connecter',

            // Listing detail
            detail_back: 'Retour aux annonces',
            detail_bedrooms: 'Chambres',
            detail_bathrooms: 'Salles de bain',
            detail_size: 'Surface',
            detail_type: 'Type',
            detail_description: 'Description',
            detail_amenities: 'Équipements',
            detail_location: 'Emplacement',
            detail_contact_owner: 'Contacter le propriétaire',
            detail_save_listing: 'Sauvegarder',
            detail_saved: 'Sauvegardé',

            // Owner listings
            owner_my_properties: 'Mes Propriétés',
            owner_add_property: 'Ajouter une propriété',
            owner_no_properties: 'Pas encore de propriétés',
            owner_create_first: 'Créez votre première annonce',
            owner_total_properties: 'Propriétés totales',
            owner_active_listings: 'Annonces actives',
            owner_total_inquiries: 'Demandes totales',
            owner_rented_properties: 'Propriétés louées',
            owner_management: 'Gestion',
            owner_existing_properties: 'Propriétés existantes',
            owner_refresh_list: 'Actualiser la liste',
            owner_add_new_property: 'Ajouter une nouvelle propriété',
            owner_title_label: 'Titre',
            owner_description_label: 'Description',
            owner_address_label: 'Adresse',
            owner_price_label: 'Prix par mois (TND)',
            owner_type_label: 'Type de bien',
            owner_bedrooms_label: 'Chambres',
            owner_bathrooms_label: 'Salles de bain',
            owner_available_label: 'Disponible à partir de',
            owner_loading_properties: 'Chargement de vos propriétés...',
            owner_property_portfolio: 'Portefeuille immobilier',
            owner_portfolio_desc: 'La répartition géographique de vos propriétés',

            // Verification
            verification_title: 'Vérification étudiant',
            verification_upload: 'Téléchargez votre carte d\'étudiant',
            verification_pending: 'Vérification en attente',
            verification_approved: 'Étudiant vérifié',

            // Footer
            footer_tagline: 'Logement étudiant sécurisé',
            footer_rights: 'Tous droits réservés',

            // Chat Widget
            chat_messages: 'Messages',
            chat_active: 'Actifs',
            chat_archived: 'Archivés',
            chat_no_messages: 'Aucun message.',
            chat_type_message: 'Écrire un message...',
            chat_send: 'Envoyer',
            chat_archive: 'Archiver',
            chat_unarchive: 'Désarchiver',
            chat_delete: 'Supprimer',
            chat_block: 'Bloquer l\'utilisateur',
            chat_report: 'Signaler',
            chat_loading: 'Chargement des conversations...',

            // Listing Cards & Detail
            card_bedrooms: 'Chambres',
            card_bathrooms: 'Salles de bain',
            card_bath: 'Bain',
            card_per_month: '/mois',
            card_details: 'Détails',
            card_no_listings: 'Aucune annonce trouvée',
            card_adjust_filters: 'Essayez d\'ajuster vos filtres',
            card_save: 'Sauvegarder',
            card_saved: 'Sauvegardé',
            card_contact: 'Contacter le propriétaire',
            card_about: 'À propos de ce logement',
            card_available: 'Disponible',
            card_available_from: 'Disponible à partir de',
            card_location: 'Emplacement',
            card_share: 'Partager',
            card_report: 'Signaler un problème avec cette annonce',
            card_per_month_full: '/ mois',
            card_no_description: 'Aucune description fournie.',
            card_generate_contract: 'Générer le Contrat',

            // Misc
            loading: 'Chargement...',
            error_occurred: 'Une erreur s\'est produite',
            verified: 'Vérifié',
            student: 'Étudiant',

            // Dynamic Listings Content
            bedrooms_short: 'Lit',
            bedrooms_abbr: 'Ch.',
            places: 'Places',
            places_left: 'place(s) restante(s)',
            full_badge: 'COMPLET 👥',
            discover_offer: 'Découvrez cette offre →',
            view_details_arrow: 'Voir les détails →',
            loading_marketplace: 'Chargement du marché...',
            failed_load: 'Échec du chargement des annonces. Veuillez réessayer.',
            role_student: 'Étudiant',

            // View Toggle
            map_view: 'Vue carte',
            list_view: 'Vue liste',

            // Filter Placeholders
            placeholder_min_price: 'ex. 400',
            placeholder_max_price: 'ex. 1200',

            // Footer Links
            footer_about: 'À propos',
            footer_help_link: 'Aide',
            footer_privacy: 'Confidentialité',
            footer_terms: 'Conditions',

            // Common UI
            explore_listings_text: "Parcourez toutes les annonces librement. Vérifiez votre carte d'étudiant et passez Premium pour contacter les propriétaires, signer des contrats et payer.",
            per_month: '/mois',
            month_abbr: '/mois',
            sqm: 'm²',

            // Bedroom Options
            bedroom_1: '1 Chambre',
            bedroom_2: '2 Chambres',
            bedroom_3: '3 Chambres',
            bedroom_4: '4+ Chambres',

            // Map Popup
            view_details_link: 'Voir les détails',

            // Tier access component (home page)
            home_students_tag: 'Pour les étudiants',
            tier_how_access: "COMMENT L'ACCÈS FONCTIONNE",
            tier_browse_title: 'Parcourir & Explorer',
            tier_browse_desc: 'Voir toutes les annonces & détails — sans mise à niveau',
            tier_badge_free: 'GRATUIT ✓',
            tier_verify_title: 'Étudiant vérifié',
            tier_verify_desc: "Téléchargez votre carte d'étudiant pour confirmer votre inscription",
            tier_badge_step2: 'ÉTAPE 2 →',
            tier_premium_title: 'Premium débloqué',
            tier_premium_desc: 'Contacter les propriétaires · Signer des contrats · Payer',
            tier_premium_actions_label: 'Actions Premium uniquement',
            tier_action_contact: 'Contact',
            tier_action_contact_sub: 'Propriétaire',
            tier_action_contract: 'Contrat',
            tier_action_contract_sub: 'Numérique',
            tier_action_pay: 'Payer',
            tier_action_pay_sub: 'Sécurisé',

            // Access banners & locked state
            access_restricted_title: 'Actions restreintes',
            access_unverified_badge: 'Non vérifié',
            access_no_premium_badge: 'Sans Premium',
            access_verify_cta_desc: "Téléchargez votre carte d'étudiant pour être vérifié, puis passez Premium.",
            access_premium_cta_desc: 'Vous êtes vérifié ! Passez Premium pour contacter les propriétaires, signer des contrats et payer.',
            access_btn_verify: 'Obtenir la vérification',
            access_btn_premium: 'Passer Premium',
            access_locked_verify_title: 'Vérification requise',
            access_locked_premium_title: 'Premium requis',
            access_locked_verify_desc: "Faites d'abord vérifier votre statut d'étudiant, puis passez Premium pour contacter les propriétaires, signer des contrats et payer en toute sécurité.",
            access_locked_premium_desc: 'Vous êtes vérifié ! Passez Premium (25 TND/an) pour contacter ce propriétaire, générer des contrats et effectuer des paiements.',

            // Gender filter
            filter_gender_pref: 'Préférence de genre',
            filter_any_gender: 'Tous genres',
            filter_male_only: 'Hommes uniquement',
            filter_female_only: 'Femmes uniquement',

            // Listing detail — missing keys
            detail_about_prop: 'À propos de ce logement',
            detail_amenities_features: 'Équipements & Caractéristiques',
            detail_show_more: 'Voir plus',
            detail_show_less: 'Voir moins',
            detail_surface: 'Surface',
            detail_capacity: 'Capacité',
            detail_guests: 'Occupants',
            detail_tnd_mo: 'TND/mois',
            detail_places_left_label: 'Places restantes',
            detail_floor_label: 'Étage',
            detail_request_contract: 'Demander un contrat',
            detail_login_reserve: 'Se connecter pour réserver',
            detail_report_listing: 'Signaler cette annonce',
            detail_owned_by: 'Propriété de',
            detail_member_since: 'Membre depuis',
            detail_photos_count: 'Photo(s)',
            detail_future_roommates: 'Futurs colocataires',
            detail_location_directions: 'Localisation & Itinéraires',
            detail_directions_desc: "Calculez votre itinéraire depuis n'importe quelle université en Tunisie",
            detail_choose_university: 'Choisir votre université',
            detail_select_uni: '-- Sélectionner une université --',
            detail_get_directions: 'Obtenir un itinéraire',
            detail_driving: 'En voiture',
            detail_walking: 'À pied',
            detail_compass_start: 'Démarrer',
            detail_compass_stop: 'Arrêter',
            detail_discover_details: 'Découvrir les détails',

            // User Dashboard
            dash_status: 'Statut',
            dash_active: 'Actif',
            dash_subscription: 'Abonnement',
            dash_favorites: 'Favoris',
            dash_contracts_label: 'Contrats',
            dash_neighborhood: 'Quartier proche',
            dash_nearby: 'à proximité',
            dash_preferred_location: 'Votre adresse préférée',
            dash_contracts_title: '📄 Contrats',
            dash_refresh: 'Actualiser',
            dash_messages_title: '💬 Messages',
            dash_inbox: 'Boîte',
            dash_saved_title: '✨ Enregistrés',
            dash_browse_more: 'Parcourir',
            dash_loading_contracts: 'Chargement des contrats…',
            dash_no_contracts: 'Aucun contrat pour le moment.',
            dash_pay_now: '💳 Payer',
            dash_cancel_contract: '✕ Annuler',
            dash_loading_saved: 'Chargement des favoris…',
            dash_no_saved: 'Aucun logement enregistré.',
            dash_loading_messages: 'Chargement des messages…',
            dash_no_messages: 'Aucun message pour le moment.',
            dash_sub_active_prefix: "Actif · jusqu'au ",
            dash_sub_expired_prefix: 'Expiré · ',
            dash_sub_none: "Pas d'abonnement actif",
            dash_verify_title: 'Compte non vérifié',
            dash_verify_body: "Veuillez soumettre votre carte d'étudiant pour accéder à toutes les fonctionnalités.",
            dash_verify_btn: 'Vérifier maintenant',
            dash_pending_title: 'Vérification en attente',
            dash_pending_body: 'Vos documents sont en cours d\'examen par notre équipe.',
            dash_pending_btn: 'Voir le statut',
            dash_rejected_title: 'Vérification rejetée',
            dash_rejected_body: 'Veuillez soumettre à nouveau vos documents.',
            dash_rejected_btn: 'Soumettre à nouveau',
            dash_sub_required_title: 'Abonnement requis',
            dash_sub_required_body: '25 TND/an pour un accès complet.',
            dash_sub_expired_title: 'Abonnement expiré',
            dash_sub_expired_body_prefix: 'Votre accès annuel a expiré le ',
            dash_sub_expired_body_suffix: '. Renouvelez pour 25 TND/an.',
            dash_subscribe_now: "S'abonner →",

            // Roommate Page
            roommate_hero_badge: '✨ Correspondances intelligentes',
            roommate_hero_title: 'Trouvez votre colocataire idéal',
            roommate_hero_subtitle: "Ne vous contentez pas de n'importe qui. Notre algorithme vous met en relation avec des étudiants partageant votre style de vie.",
            roommate_open_prefs: '⚙️ Mettre à jour mes préférences',
            roommate_prefs_title: 'Préférences',
            roommate_prefs_subtitle: 'Dites-nous qui vous cherchez',
            roommate_overlay_title: 'Recherche de correspondances',
            roommate_overlay_sub: 'Analyse des scores de compatibilité...',
            roommate_save_matches: 'Enregistrer & trouver des correspondances',
            roommate_no_matches: 'Aucune correspondance',
            roommate_no_matches_sub: "Essayez d'élargir vos préférences.",
            roommate_message: '💬 Message',
            roommate_loading: 'Recherche de correspondances...',
            pref_monthly_budget: 'Budget mensuel (TND)',
            pref_cleanliness: 'Propreté',
            pref_sleep: 'Horaires de sommeil',
            pref_gender: 'Préférence de genre',
            pref_smoking: 'Tabagisme',
            pref_noise: 'Tolérance au bruit',
            pref_guests: 'Politique des invités',
            pref_pets: 'Animaux',
            pref_age_range: "Tranche d'âge",
            pref_age_min_placeholder: 'Âge min',
            pref_age_max_placeholder: 'Âge max',
            pref_relaxed: 'Décontracté',
            pref_moderate: 'Modéré',
            pref_clean: 'Propre',
            pref_very_clean: 'Très propre',
            pref_early_riser: 'Lève-tôt',
            pref_normal: 'Normal',
            pref_night_owl: 'Couche-tard',
            pref_male: 'Homme',
            pref_female: 'Femme',
            pref_no_preference: 'Sans préférence',
            pref_smoker: 'Oui',
            pref_non_smoker: 'Non',
            pref_any: 'Indifférent',
            pref_quiet: 'Calme',
            pref_social: 'Sociable',
            pref_no_guests: "Pas d'invités",
            pref_occasional: 'Occasionnel',
            pref_no_pets: 'Sans animaux',
            pref_pets_ok: 'Animaux OK',

            // Owner Dashboard
            owner_my_listings: 'Mes annonces',
            owner_manage_props: 'Gérez vos propriétés',
            owner_add_listing: '+ Ajouter une annonce',
            owner_active_contracts: 'Contrats actifs',
            owner_no_listings: 'Aucune annonce. Créez votre première !',
            owner_no_contracts: 'Aucun contrat actif.',
            owner_create_listing: 'Créer une annonce',
            owner_field_title: 'Titre',
            owner_field_address: 'Adresse',
            owner_field_price: 'Prix (TND/mois)',
            owner_field_bedrooms: 'Chambres',
            owner_field_bathrooms: 'Salles de bain',
            owner_field_capacity: 'Capacité (personnes)',
            owner_field_type: 'Type de bien',
            owner_field_gender: 'Préférence de genre',
            owner_field_desc: 'Description',
            owner_field_images: 'Photos du logement',
            owner_images_hint: 'Vous pouvez sélectionner plusieurs images',
            owner_create_btn: "Créer l'annonce",
            owner_view_btn: 'Voir',
            owner_delete_btn: 'Supprimer',
            owner_terminate_btn: '🚫 Résilier',
            owner_cancel_requested: "⚠️ L'étudiant a demandé l'annulation",
            owner_remove_confirm: 'Supprimer cette annonce ?',
            owner_terminate_reason: 'Motif de résiliation (facultatif) :',
            owner_created_ok: 'Annonce créée !',
            owner_terminated_ok: '✅ Contrat résilié. Le logement est à nouveau disponible.',
            owner_loading: 'Chargement des annonces…',

            // Contract Modal
            contract_setup_title: 'Paramètres du contrat',
            contract_setup_desc: 'Veuillez définir la durée et la date de début de votre location.',
            contract_start_month_label: 'Mois de début',
            contract_start_hint: 'La location commencera le 1er du mois sélectionné.',
            contract_duration_label: 'Durée (mois)',
            contract_month_unit: 'mois',
            contract_generate_btn: 'Générer le contrat',
            contract_fill_all: 'Veuillez remplir tous les champs.',
            contract_loading: 'Préparation du contrat...',
            contract_view_title: '📄 Visualisation du contrat',
            contract_official_doc: 'Document officiel',
            contract_id_label: 'Identifiant de contrat :',
            contract_generated_on: 'Généré le',
            contract_view_pdf: '👁️ Voir le contrat PDF complet',
            contract_opens_tab: "Le document s'ouvrira dans un nouvel onglet pour signature physique ou impression si nécessaire.",
            contract_sign_title: '✍️ Signature numérique',
            contract_sign_desc: 'Signez ci-dessous pour valider votre contrat.',
            contract_sign_btn: 'Valider la signature',
            contract_signed_title: '✅ Contrat signé',
            contract_signed_desc: 'Dernière étape : Réglez les frais pour activer la location.',
            contract_go_payment: '💳 Aller au paiement',
            contract_payment_status: 'Statut du paiement',
            contract_paid_active: '✅ Payé & actif',
            contract_awaiting_pay: '⏳ En attente du paiement étudiant',
            contract_close: 'Fermer',

            // Payment Modal
            pay_secured_by: '🔒 Sécurisé par UNIDAR Pay',
            pay_title: 'Paiement sécurisé',
            pay_tab_card: 'Carte bancaire',
            pay_tab_transfer: 'Virement',
            pay_card_holder_label: 'Titulaire',
            pay_card_expires_label: 'Expire',
            pay_holder_name: 'Nom sur la carte',
            pay_card_number: 'Numéro de carte',
            pay_expiration: 'Expiration',
            pay_cvc: 'CVC',
            pay_cvc_tooltip: '3 chiffres au dos de votre carte',
            pay_summary: 'Récapitulatif',
            pay_monthly_rent: 'Loyer mensuel',
            pay_commission: 'Commission (5%)',
            pay_total: 'Total à payer',
            pay_processing: 'Traitement...',
            pay_step_bank: 'Identification de la banque...',
            pay_step_encrypt: 'Chiffrement de la transaction...',
            pay_step_auth: "Attente d'autorisation bancaire...",
            pay_step_validate: 'Validation du contrat...',
            pay_step_done: 'Paiement autorisé !',
            pay_substep_tls: 'Connexion sécurisée TLS 1.3...',
            pay_substep_aes: 'Cryptage AES-256...',
            pay_substep_3ds: 'Vérification 3D Secure...',
            pay_substep_record: "Enregistrement de l'acte...",
            pay_btn: '🔐 Payer maintenant',
            pay_no_store: '🔒 Aucune donnée stockée',
            pay_success_title: 'Paiement réussi !',
            pay_success_body: 'Votre contrat est maintenant actif.',
            pay_transfer_ok: 'Demande de virement enregistrée. Votre contrat sera activé dès réception des fonds.',
            pay_congrats: 'Félicitations ! Votre paiement a été traité et votre contrat est désormais actif.',
            pay_err_fill_card: 'Veuillez remplir tous les champs de la carte.',
            pay_err_card_number: 'Veuillez entrer un numéro de carte complet.',
            pay_err_invalid_card: 'Le numéro de carte est invalide. Veuillez vérifier.',
            pay_err_expiry: "La date d'expiration est invalide ou dépassée.",
            pay_err_connection: 'Erreur de connexion lors du paiement',
            modal_error_title: 'Erreur',
            modal_success_title: 'Succès !',
            modal_ok: 'OK',
            status_draft: 'Brouillon',
            status_signed_student: 'Signé (Étud.)',
            status_signed_owner: 'Signé (Proprio.)',
            status_pending_pay: 'À payer',
            status_active_label: 'Actif',
            status_terminated: 'Terminé',
            status_signed: 'Signé'
        },

        ar: {
            // Navbar
            nav_home: 'الرئيسية',
            nav_listings: 'الإعلانات',
            nav_roommates: 'زملاء السكن',
            nav_dashboard: 'لوحة التحكم',
            nav_messages: 'الرسائل',
            nav_my_properties: 'عقاراتي',
            nav_login: 'تسجيل الدخول',
            nav_signup: 'إنشاء حساب',
            nav_logout: 'تسجيل الخروج',

            // Home Page
            home_hero_badge: 'موثوق به من قبل الطلاب في جميع أنحاء تونس',
            home_hero_title: 'ابحث عن سكنك الطلابي المثالي',
            home_hero_subtitle: 'المنصة الأولى لطلاب الجامعات التونسية. اكتشف إعلانات موثقة، ابحث عن زملاء سكن متوافقين، واحصل على سكن آمن بالقرب من حرمك الجامعي - كل ذلك في مكان واحد.',
            home_hero_explore: 'استكشاف الإعلانات',
            home_hero_roommates: 'البحث عن زملاء سكن',
            home_hero_stat_listings: 'إعلانات موثقة',
            home_hero_stat_students: 'طلاب نشطون',
            home_hero_stat_unis: 'جامعة مغطاة',

            // Home - Why UNIDAR (Features)
            home_why_tag: 'لماذا UNIDAR',
            home_why_title: 'كل ما تحتاجه للحياة الطلابية',
            home_why_subtitle: 'لقد قمنا ببناء المنصة الأكثر شمولاً لحل كل تحديات السكن التي يواجهها الطلاب في تونس.',
            home_feat1_title: 'مجتمع طلابي موثق',
            home_feat1_desc: 'يتم التحقق من كل مستخدم من خلال بطاقة الطالب الخاصة به، مما يضمن تواصلك دائماً مع طلاب جامعيين حقيقيين وموثوقين وأصحاب عقارات شرعيين.',
            home_feat2_title: 'البحث بناءً على الحرم الجامعي',
            home_feat2_desc: 'ابحث عن سكن بالقرب من حرمك الجامعي بالضبط باستخدام خريطتنا التفاعلية. فلتبر حسب المسافة والحي ووقت التنقل للعثور على الموقع المثالي.',
            home_feat3_title: 'مطابقة ذكية لزملاء السكن',
            home_feat3_desc: 'يقوم خوارزمنا الذكي بتحليل تفضيلات نمط الحياة وجداول النوم وعادات الدراسة وغيرها لمطابقتك مع زملاء سكن متوافقين.',
            home_feat4_title: 'رسائل آمنة',
            home_feat4_desc: 'تواصل مباشرة مع أصحاب العقارات وزملاء السكن المحتملين من خلال نظام الرسائل المدمج لدينا - آمن وخاص ومتاح دائماً.',
            home_feat5_title: 'إعلانات مفصلة',
            home_feat5_desc: 'يتضمن كل إعلان تفاصيل شاملة: صور عالية الجودة، المرافق، تفاصيل الأسعار، قواعد المنزل، ومراجعات طلابية حقيقية.',
            home_feat6_title: 'تحديثات في الوقت الفعلي',
            home_feat6_desc: 'احصل على إشعارات فورية عندما تتطابق إعلانات جديدة مع معاييرك أو عندما يستجيب أصحاب العقارات لاستفساراتك. لا تفوت أي فرصة أبداً.',

            // Home - For Students
            home_students_title: 'بني للطلاب، بواسطة الطلاب',
            home_students_subtitle: 'نحن نتفهم التحديات الفريدة للبحث عن سكن طلابي في تونس. تصفح بحرية، واحصل على التوثيق، وافتح وصولاً كاملاً مع Premium.',
            home_students_benefit1: 'تصفح جميع الإعلانات مجاناً — بدون ترقية',
            home_students_benefit2: 'احصل على التوثيق ببطاقة طالبك',
            home_students_benefit3: 'انتقل إلى Premium للتواصل مع المالكين وتوقيع العقود الرقمية والدفع بأمان',
            home_students_benefit4: 'اقرأ مراجعات حقيقية من زملائك الطلاب',
            home_students_cta: 'ابدأ بحثك',
            home_visual_match: 'تم العثور على المطابقة المثالية!',
            home_visual_compatibility: 'درجة توافق 98%',
            home_visual_new_listing: 'إعلان جديد بالقرب من الحرم الجامعي',
            home_hero_subtitle_small: 'Handpicked housing options for your comfort.',
            home_visual_amenities_preview: '2 beds • 5 min walk',
            home_visual_verified: 'طالب موثق',
            home_visual_uni: 'جامعة تونس',

            // Home - For Owners
            home_owners_title: 'الوصول إلى آلاف الطلاب الموثقين',
            home_owners_subtitle: 'أدرج عقارك على UNIDAR وتواصل مع جمهور مستهدف من طلاب الجامعات الموثقين الذين يبحثون بنشاط عن سكن.',
            home_owners_benefit1: 'إنشاء إعلانات مجانية مع صور غير محدودة',
            home_owners_benefit2: 'رسائل مباشرة مع طلاب موثقين',
            home_owners_benefit3: 'إدارة الحجوزات والاستفسارات في لوحة تحكم واحدة',
            home_owners_benefit4: 'بناء الثقة من خلال مراجعات الطلاب وتقييماتهم',
            home_owners_cta: 'أدرج عقارك',
            home_stat_occupancy: 'معدل الإشغال',
            home_stat_response: 'متوسط وقت الاستجابة',
            home_stat_satisfaction: 'رضا المالك',
            home_stat_started: 'للبدء',

            // Home - How It Works
            home_how_tag: 'كيف يعمل',
            home_how_title: 'ابدأ في 3 خطوات بسيطة',
            home_how_subtitle: 'لم يكن العثور على سكنك الطلابي المثالي أسهل من أي وقت مضى. إليك كيف يبسط UNIDAR بحثك.',
            home_step1_title: 'أنشئ ملفك الشخصي',
            home_step1_desc: 'سجل كطالب أو صاحب عقار. تحقق من هويتك وحدد تفضيلاتك للحصول على توصيات مخصصة.',
            home_step2_title: 'تصفح وطابق',
            home_step2_desc: 'استكشف الإعلانات الموثقة بالقرب من حرمك الجامعي أو استخدم مطابقتنا الذكية للعثور على زملاء سكن متوافقين بناءً على نمط حياتك.',
            home_step3_title: 'تواصل وانتقل',
            home_step3_desc: 'راسل أصحاب العقارات مباشرة، وحدد مواعيد للمعاينة، وأمن منزلك المثالي - كل ذلك من خلال منصتنا الآمنة.',

            // Home - Trust
            home_trust_tag: 'الثقة والأمان',
            home_trust_title: 'أمنك هو أولويتنا',
            home_trust_subtitle: 'لقد قمنا بوضع طبقات متعددة من التحقق والأمان لضمان أن يكون كل تفاعل على UNIDAR آمناً وموثوقاً.',
            home_trust_badge1: 'تم التحقق من هوية الطالب',
            home_trust_badge2: 'رسائل آمنة',
            home_trust_badge3: 'إعلانات موثقة',
            home_trust_badge4: 'مراقب من قبل الإدارة',
            home_trust_badge5: 'مراجعات حقيقية',

            // Home - Final CTA
            home_cta_title: 'جاهز للعثور على منزلك المثالي؟',
            home_cta_subtitle: 'انضم إلى آلاف الطلاب التونسيين الذين وجدوا بالفعل سكنهم المثالي من خلال UNIDAR. ابدأ بحثك اليوم - إنه مجاني!',
            home_cta_btn: 'ابدأ مجاناً',

            // Footer
            footer_brand_desc: "المنصة الأولى للسكن الطلابي في تونس. مساعدة طلاب الجامعات في العثور على سكن موثوق وزملاء سكن متوافقين منذ عام 2026.",
            footer_platform: 'المنصة',
            footer_for_owners: 'للملاك',
            footer_support: 'الدعم',
            footer_browse: 'تصفح الإعلانات',
            footer_find_roommates: 'البحث عن زملاء سكن',
            footer_list_property: 'إدراج عقار',
            footer_manage: 'إدارة الإعلانات',
            footer_help: 'مركز المساعدة',
            footer_contact: 'اتصل بنا',
            footer_report: 'الإبلاغ عن مشكلة',
            footer_copyright: "© 2026 UNIDAR. جميع الحقوق محفوظة. صنع بـ ❤️ للطلاب التونسيين.",

            // Common actions
            btn_save: 'حفظ',
            btn_cancel: 'إلغاء',
            btn_submit: 'إرسال',
            btn_edit: 'تعديل',
            btn_delete: 'حذف',
            btn_view_details: 'التفاصيل',
            btn_send_message: 'إرسال رسالة',
            btn_apply_filters: 'تطبيق الفلاتر',
            btn_browse_all: 'عرض الكل',
            btn_find_more: 'المزيد',

            // Listings page
            listings_title: 'ابحث عن منزلك المثالي',
            listings_marketplace: 'السوق',
            listings_map_view: 'عرض الخريطة',
            listings_list_view: 'عرض القائمة',
            filter_min_price: 'السعر الأدنى (دينار)',
            filter_max_price: 'السعر الأقصى (دينار)',
            filter_bedrooms: 'غرف النوم',
            filter_any_bedrooms: 'جميع الغرف',
            filter_property_type: 'نوع العقار',
            filter_any_type: 'جميع الأنواع',
            filter_apartment: 'شقة',
            filter_house: 'منزل',
            filter_studio: 'ستوديو',
            filter_shared_room: 'غرفة مشتركة',
            listings_no_results: 'لا توجد إعلانات',
            listings_adjust_filters: 'حاول تعديل الفلاتر',
            listings_per_month: '/شهر',

            // Roommates page
            roommates_title: 'البحث عن زملاء سكن',
            roommates_compatibility: 'التوافق',
            roommates_preferences: 'التفضيلات',
            roommates_no_matches: 'لا توجد تطابقات بعد',
            roommates_set_preferences: 'حدد تفضيلاتك للعثور على زملاء سكن متوافقين',
            roommates_message_btn: 'مراسلة',
            roommates_verified: 'موثق',
            card_generate_contract: 'إنشاء عقد',
            btn_set_preferences: 'تحديد التفضيلات',
            pref_budget: 'الميزانية',
            pref_budget_min: 'الحد الأدنى للميزانية',
            pref_budget_max: 'الحد الأقصى للميزانية',
            pref_cleanliness: 'النظافة',
            pref_cleanliness_level: 'مستوى النظافة',
            pref_no_preference: 'لا تفضيل',
            pref_very_clean: 'نظيف جداً',
            pref_clean: 'نظيف',
            pref_moderate: 'متوسط',
            pref_relaxed: 'مريح',
            pref_smoking: 'التدخين',
            pref_smoking_preference: 'تفضيل التدخين',
            pref_non_smoker: 'غير مدخن',
            pref_smoker: 'مدخن',
            pref_sleep: 'النوم',
            pref_sleep_schedule: 'جدول النوم',
            pref_early_riser: 'يستيقظ باكراً',
            pref_normal: 'عادي',
            pref_night_owl: 'بومة الليل',
            pref_save_refresh: 'حفظ وتحديث النتائج',

            // Dashboard
            dashboard_title: 'لوحة التحكم',
            dashboard_welcome: 'مرحباً بعودتك',
            dashboard_portal: 'البوابة',
            dashboard_saved: 'المحفوظات',
            dashboard_matches: 'التطابقات',
            dashboard_unread: 'غير مقروء',
            dashboard_nearby: 'قريب',
            dashboard_edit_profile: 'تعديل الملف',
            dashboard_saved_listings: 'المحفوظة للاحقاً',
            dashboard_neighborhood: 'مراقبة الحي',
            dashboard_nearby_listings: 'إعلانات في نطاق 10 كم',
            dashboard_matchmaking: 'التطابقات',
            dashboard_conversations: 'المحادثات',
            dashboard_inbox: 'صندوق الوارد',

            // Login/Register
            login_page_title: 'تسجيل الدخول - UNIDAR',
            login_title: 'تسجيل الدخول',
            login_welcome: 'مرحباً بعودتك',
            login_access: 'الوصول إلى حسابك في UNIDAR',
            login_email: 'البريد الإلكتروني',
            login_password: 'كلمة المرور',
            login_forgot: 'نسيت كلمة المرور؟',
            login_signin: 'تسجيل الدخول',
            login_no_account: 'ليس لديك حساب؟',
            login_create: 'إنشاء حساب',
            login_email_placeholder: 'student@university.edu',
            login_password_placeholder: '••••••••',
            login_signing_in: 'جاري تسجيل الدخول...',

            register_title: 'إنشاء حساب',
            register_welcome: 'انضم إلينا',
            register_join: 'انضم إلى UNIDAR',
            register_start: 'ابدأ رحلتك مع UNIDAR',
            register_fullname: 'الاسم الكامل',
            register_fullname_placeholder: 'فلان الفلاني',
            register_email: 'البريد الإلكتروني',
            register_email_placeholder: 'student@university.edu',
            register_email_hint: 'البريد الإلكتروني الجامعي يساعد في الثقة والتحقق.',
            register_password: 'كلمة المرور',
            register_password_placeholder: '8 أحرف على الأقل',
            register_confirm: 'تأكيد كلمة المرور',
            register_confirm_placeholder: 'أعد إدخال كلمة المرور',
            register_phone: 'رقم الهاتف (اختياري)',
            register_phone_placeholder: '+216 ...',
            register_role: 'أنا',
            register_role_select: 'اختر...',
            register_student: 'طالب',
            register_owner: 'مالك عقار',
            register_university: 'اسم الجامعة',
            register_university_placeholder: 'مثلاً: ESPRIT ، INSAT ، MSB...',
            register_map_radius: 'نطاق البحث (المنطقة المفضلة)',
            register_map_hint: 'انقر على الخريطة لتحديد منطقة دراستك.',
            register_selected_location: 'المختار:',
            register_agree: 'أوافق على شروط الخدمة',
            register_create: 'إنشاء حساب',
            register_creating_account: 'جاري إنشاء الحساب...',
            register_have_account: 'لديك حساب بالفعل؟',
            register_signin: 'تسجيل الدخول',

            // Listing detail
            detail_back: 'العودة للإعلانات',
            detail_bedrooms: 'غرف النوم',
            detail_bathrooms: 'الحمامات',
            detail_size: 'المساحة',
            detail_type: 'النوع',
            detail_description: 'الوصف',
            detail_amenities: 'المرافق',
            detail_location: 'الموقع',
            detail_contact_owner: 'تواصل مع المالك',
            detail_save_listing: 'حفظ الإعلان',
            detail_saved: 'محفوظ',

            // Owner listings
            owner_my_properties: 'عقاراتي',
            owner_add_property: 'إضافة عقار',
            owner_no_properties: 'لا توجد عقارات بعد',
            owner_create_first: 'أنشئ إعلانك الأول',
            owner_total_properties: 'إجمالي العقارات',
            owner_active_listings: 'الإعلانات النشطة',
            owner_total_inquiries: 'إجمالي الاستفسارات',
            owner_rented_properties: 'عقارات مؤجرة',
            owner_management: 'الإدارة',
            owner_existing_properties: 'العقارات الموجودة',
            owner_refresh_list: 'تحديث القائمة',
            owner_add_new_property: 'إضافة عقار جديد',
            owner_title_label: 'العنوان',
            owner_description_label: 'الوصف',
            owner_address_label: 'العنوان بالتفصيل',
            owner_price_label: 'السعر شهرياً (دينار)',
            owner_type_label: 'نوع العقار',
            owner_bedrooms_label: 'غرف النوم',
            owner_bathrooms_label: 'الحمامات',
            owner_available_label: 'متاح من',
            owner_loading_properties: 'جاري تحميل عقاراتك...',

            // Verification
            verification_title: 'التحقق من الطالب',
            verification_upload: 'ارفع بطاقة الطالب',
            verification_pending: 'التحقق قيد الانتظار',
            verification_approved: 'طالب موثق',

            // Footer
            footer_tagline: 'سكن طلابي آمن',
            footer_rights: 'جميع الحقوق محفوظة',

            // Chat Widget
            chat_messages: 'الرسائل',
            chat_active: 'النشطة',
            chat_archived: 'المؤرشفة',
            chat_no_messages: 'لا توجد رسائل.',
            chat_type_message: 'اكتب رسالة...',
            chat_send: 'إرسال',
            chat_archive: 'أرشفة',
            chat_unarchive: 'إلغاء الأرشفة',
            chat_delete: 'حذف',
            chat_block: 'حظر المستخدم',
            chat_report: 'إبلاغ',
            chat_loading: 'جاري تحميل المحادثات...',

            // Listing Cards & Detail
            card_bedrooms: 'غرف نوم',
            card_bathrooms: 'حمامات',
            card_bath: 'حمام',
            card_per_month: '/شهر',
            card_details: 'التفاصيل',
            card_no_listings: 'لا توجد إعلانات',
            card_adjust_filters: 'حاول تعديل الفلاتر',
            card_save: 'حفظ في المفضلة',
            card_saved: 'محفوظ',
            card_contact: 'تواصل مع المالك',
            card_about: 'عن هذا المكان',
            card_available: 'متاح',
            card_available_from: 'متاح من',
            card_location: 'الموقع',
            card_share: 'مشاركة',
            card_report: 'الإبلاغ عن مشكلة في هذا الإعلان',
            card_per_month_full: '/ شهر',
            card_no_description: 'لا يوجد وصف.',

            // Misc
            owner_property_portfolio: 'محفظة العقارات',
            owner_portfolio_desc: 'التوزيع الجغرافي لعقاراتك',
            loading: 'جاري التحميل...',
            error_occurred: 'حدث خطأ',
            verified: 'موثق',
            student: 'طالب',

            // Dynamic Listings Content
            bedrooms_short: 'سرير',
            bedrooms_abbr: 'غ.ن.',
            places: 'أماكن',
            places_left: 'مكان (أماكن) متبقي',
            full_badge: 'ممتلئ 👥',
            discover_offer: 'اكتشف هذا العرض ←',
            view_details_arrow: 'عرض التفاصيل ←',
            loading_marketplace: 'جاري تحميل السوق...',
            failed_load: 'فشل تحميل الإعلانات. يرجى المحاولة مرة أخرى.',
            role_student: 'طالب',

            // View Toggle
            map_view: 'عرض الخريطة',
            list_view: 'عرض القائمة',

            // Filter Placeholders
            placeholder_min_price: 'مثلاً 400',
            placeholder_max_price: 'مثلاً 1200',

            // Footer Links
            footer_about: 'عن',
            footer_help_link: 'مساعدة',
            footer_privacy: 'الخصوصية',
            footer_terms: 'الشروط',

            // Common UI
            explore_listings_text: 'تصفح جميع الإعلانات بحرية. تحقق من بطاقة طالبك وقم بالترقية إلى Premium للتواصل مع المالكين وتوقيع العقود والدفع.',
            per_month: '/شهر',
            month_abbr: '/شهر',
            sqm: 'م²',

            // Bedroom Options
            bedroom_1: 'غرفة نوم واحدة',
            bedroom_2: 'غرفتا نوم',
            bedroom_3: '3 غرف نوم',
            bedroom_4: '4+ غرف نوم',

            // Map Popup
            view_details_link: 'عرض التفاصيل',

            // Tier access component (home page)
            home_students_tag: 'للطلاب',
            tier_how_access: 'كيف يعمل الوصول',
            tier_browse_title: 'تصفح واستكشف',
            tier_browse_desc: 'اطلع على جميع الإعلانات والتفاصيل — بدون ترقية',
            tier_badge_free: 'مجاني ✓',
            tier_verify_title: 'طالب موثق',
            tier_verify_desc: 'حمّل بطاقة طالبك لتأكيد التسجيل',
            tier_badge_step2: 'الخطوة 2 ←',
            tier_premium_title: 'Premium مفعّل',
            tier_premium_desc: 'تواصل مع المالكين · وقّع العقود · ادفع بأمان',
            tier_premium_actions_label: 'إجراءات حصرية للـ Premium',
            tier_action_contact: 'تواصل',
            tier_action_contact_sub: 'المالك',
            tier_action_contract: 'عقد',
            tier_action_contract_sub: 'رقمي',
            tier_action_pay: 'دفع',
            tier_action_pay_sub: 'آمن',

            // Access banners & locked state
            access_restricted_title: 'إجراءات مقيدة',
            access_unverified_badge: 'غير موثق',
            access_no_premium_badge: 'بدون Premium',
            access_verify_cta_desc: 'حمّل بطاقة طالبك للتحقق، ثم قم بالترقية إلى Premium.',
            access_premium_cta_desc: 'أنت موثق! قم بالترقية إلى Premium للتواصل مع المالكين وتوقيع العقود والدفع.',
            access_btn_verify: 'احصل على التوثيق',
            access_btn_premium: 'الترقية إلى Premium',
            access_locked_verify_title: 'التوثيق مطلوب',
            access_locked_premium_title: 'Premium مطلوب',
            access_locked_verify_desc: 'احصل على توثيق حسابك كطالب أولاً، ثم قم بالترقية إلى Premium للتواصل مع المالكين وتوقيع العقود والدفع بأمان.',
            access_locked_premium_desc: 'أنت موثق! قم بالترقية إلى Premium (25 د.ت / سنة) للتواصل مع هذا المالك وإنشاء العقود وإجراء المدفوعات.',

            // Gender filter
            filter_gender_pref: 'تفضيل الجنس',
            filter_any_gender: 'أي جنس',
            filter_male_only: 'للذكور فقط',
            filter_female_only: 'للإناث فقط',

            // Listing detail — missing keys
            detail_about_prop: 'حول هذا العقار',
            detail_amenities_features: 'المرافق والميزات',
            detail_show_more: 'عرض المزيد',
            detail_show_less: 'عرض أقل',
            detail_surface: 'المساحة',
            detail_capacity: 'السعة',
            detail_guests: 'أشخاص',
            detail_tnd_mo: 'د.ت/شهر',
            detail_places_left_label: 'الأماكن المتبقية',
            detail_floor_label: 'الطابق',
            detail_request_contract: 'طلب عقد',
            detail_login_reserve: 'سجّل الدخول للحجز',
            detail_report_listing: 'الإبلاغ عن هذا الإعلان',
            detail_owned_by: 'مملوك من قِبل',
            detail_member_since: 'عضو منذ',
            detail_photos_count: 'صورة',
            detail_future_roommates: 'زملاء السكن المستقبليون',
            detail_location_directions: 'الموقع والاتجاهات',
            detail_directions_desc: 'احسب مسارك من أي جامعة في تونس',
            detail_choose_university: 'اختر جامعتك',
            detail_select_uni: '-- اختر جامعة --',
            detail_get_directions: 'احصل على الاتجاهات',
            detail_driving: 'بالسيارة',
            detail_walking: 'سيراً',
            detail_compass_start: 'ابدأ',
            detail_compass_stop: 'أوقف',
            detail_discover_details: 'اكتشف التفاصيل',

            // User Dashboard
            dash_status: 'الحالة',
            dash_active: 'نشط',
            dash_subscription: 'الاشتراك',
            dash_favorites: 'المفضلة',
            dash_contracts_label: 'العقود',
            dash_neighborhood: 'الحي القريب',
            dash_nearby: 'قريب',
            dash_preferred_location: 'موقعك المفضل',
            dash_contracts_title: '📄 العقود',
            dash_refresh: 'تحديث',
            dash_messages_title: '💬 الرسائل',
            dash_inbox: 'الوارد',
            dash_saved_title: '✨ محفوظ للاحقاً',
            dash_browse_more: 'تصفح المزيد',
            dash_loading_contracts: 'جارٍ تحميل العقود…',
            dash_no_contracts: 'لا توجد عقود بعد.',
            dash_pay_now: '💳 ادفع الآن',
            dash_cancel_contract: '✕ إلغاء',
            dash_loading_saved: 'جارٍ تحميل المفضلة…',
            dash_no_saved: 'لا توجد إعلانات محفوظة.',
            dash_loading_messages: 'جارٍ تحميل الرسائل…',
            dash_no_messages: 'لا توجد رسائل بعد.',
            dash_sub_active_prefix: 'نشط · حتى ',
            dash_sub_expired_prefix: 'منتهٍ · ',
            dash_sub_none: 'لا يوجد اشتراك نشط',
            dash_verify_title: 'الحساب غير موثق',
            dash_verify_body: 'يرجى تقديم بطاقة طالبك للوصول إلى جميع الميزات.',
            dash_verify_btn: 'توثيق الآن',
            dash_pending_title: 'التوثيق قيد الانتظار',
            dash_pending_body: 'وثائقك قيد المراجعة من قِبَل فريقنا.',
            dash_pending_btn: 'تحقق من الحالة',
            dash_rejected_title: 'تم رفض التوثيق',
            dash_rejected_body: 'يرجى إعادة تقديم وثائقك.',
            dash_rejected_btn: 'أعد التقديم',
            dash_sub_required_title: 'الاشتراك مطلوب',
            dash_sub_required_body: '25 د.ت / سنة للوصول الكامل.',
            dash_sub_expired_title: 'انتهى الاشتراك',
            dash_sub_expired_body_prefix: 'انتهى وصولك السنوي في ',
            dash_sub_expired_body_suffix: '. جدد مقابل 25 د.ت/سنة.',
            dash_subscribe_now: 'اشترك الآن →',

            // Roommate Page
            roommate_hero_badge: '✨ مطابقة ذكية',
            roommate_hero_title: 'ابحث عن شريك السكن المثالي',
            roommate_hero_subtitle: 'لا تستسلم لأي شخص. خوارزميتنا تطابقك مع طلاب يشاركونك نمط حياتك وعاداتك.',
            roommate_open_prefs: '⚙️ تحديث تفضيلاتي',
            roommate_prefs_title: 'التفضيلات',
            roommate_prefs_subtitle: 'أخبرنا عمّن تبحث',
            roommate_overlay_title: 'البحث عن تطابقات',
            roommate_overlay_sub: 'جارٍ تحليل درجات التوافق...',
            roommate_save_matches: 'حفظ والبحث عن تطابقات',
            roommate_no_matches: 'لا توجد تطابقات بعد',
            roommate_no_matches_sub: 'حاول توسيع تفضيلاتك.',
            roommate_message: '💬 رسالة',
            roommate_loading: 'جارٍ البحث عن تطابقات...',
            pref_monthly_budget: 'الميزانية الشهرية (د.ت)',
            pref_cleanliness: 'النظافة',
            pref_sleep: 'جدول النوم',
            pref_gender: 'تفضيل الجنس',
            pref_smoking: 'التدخين',
            pref_noise: 'تحمل الضوضاء',
            pref_guests: 'سياسة الضيوف',
            pref_pets: 'الحيوانات الأليفة',
            pref_age_range: 'الفئة العمرية',
            pref_age_min_placeholder: 'الحد الأدنى للعمر',
            pref_age_max_placeholder: 'الحد الأقصى للعمر',
            pref_relaxed: 'مرتاح',
            pref_moderate: 'معتدل',
            pref_clean: 'نظيف',
            pref_very_clean: 'نظيف جداً',
            pref_early_riser: 'يستيقظ مبكراً',
            pref_normal: 'عادي',
            pref_night_owl: 'سهراني',
            pref_male: 'ذكر',
            pref_female: 'أنثى',
            pref_no_preference: 'لا تفضيل',
            pref_smoker: 'نعم',
            pref_non_smoker: 'لا',
            pref_any: 'أي',
            pref_quiet: 'هادئ',
            pref_social: 'اجتماعي',
            pref_no_guests: 'بدون ضيوف',
            pref_occasional: 'أحياناً',
            pref_no_pets: 'بدون حيوانات',
            pref_pets_ok: 'الحيوانات مسموح',

            // Owner Dashboard
            owner_my_listings: 'إعلاناتي',
            owner_manage_props: 'إدارة عقاراتك',
            owner_add_listing: '+ إضافة إعلان',
            owner_active_contracts: 'العقود النشطة',
            owner_no_listings: 'لا إعلانات بعد. أضف أولها!',
            owner_no_contracts: 'لا توجد عقود نشطة.',
            owner_create_listing: 'إنشاء إعلان جديد',
            owner_field_title: 'العنوان',
            owner_field_address: 'العنوان التفصيلي',
            owner_field_price: 'السعر (د.ت/شهر)',
            owner_field_bedrooms: 'غرف النوم',
            owner_field_bathrooms: 'الحمامات',
            owner_field_capacity: 'الطاقة الاستيعابية (أشخاص)',
            owner_field_type: 'نوع العقار',
            owner_field_gender: 'تفضيل الجنس',
            owner_field_desc: 'الوصف',
            owner_field_images: 'صور الإعلان',
            owner_images_hint: 'يمكنك اختيار عدة صور',
            owner_create_btn: 'إنشاء الإعلان',
            owner_view_btn: 'عرض',
            owner_delete_btn: 'حذف',
            owner_terminate_btn: '🚫 إنهاء',
            owner_cancel_requested: '⚠️ طلب الطالب الإلغاء',
            owner_remove_confirm: 'حذف هذا الإعلان؟',
            owner_terminate_reason: 'سبب الإنهاء (اختياري):',
            owner_created_ok: 'تم إنشاء الإعلان!',
            owner_terminated_ok: '✅ تم إنهاء العقد. الإعلان متاح مرة أخرى.',
            owner_loading: 'جارٍ تحميل الإعلانات…',

            // Contract Modal
            contract_setup_title: 'إعدادات العقد',
            contract_setup_desc: 'يرجى تحديد المدة وتاريخ بدء الإيجار.',
            contract_start_month_label: 'شهر البداية',
            contract_start_hint: 'سيبدأ الإيجار في اليوم الأول من الشهر المحدد.',
            contract_duration_label: 'المدة (بالأشهر)',
            contract_month_unit: 'شهر',
            contract_generate_btn: 'توليد العقد',
            contract_fill_all: 'يرجى ملء جميع الحقول.',
            contract_loading: 'جارٍ إعداد العقد...',
            contract_view_title: '📄 عرض العقد',
            contract_official_doc: 'وثيقة رسمية',
            contract_id_label: 'معرّف العقد:',
            contract_generated_on: 'تم الإنشاء في',
            contract_view_pdf: '👁️ عرض ملف PDF الكامل للعقد',
            contract_opens_tab: 'سيُفتح المستند في تبويب جديد للتوقيع الفيزيائي أو الطباعة إذا لزم الأمر.',
            contract_sign_title: '✍️ التوقيع الرقمي',
            contract_sign_desc: 'وقّع أدناه للتحقق من عقدك.',
            contract_sign_btn: 'التحقق من التوقيع',
            contract_signed_title: '✅ تم توقيع العقد',
            contract_signed_desc: 'الخطوة الأخيرة: ادفع الرسوم لتفعيل الإيجار.',
            contract_go_payment: '💳 الذهاب إلى الدفع',
            contract_payment_status: 'حالة الدفع',
            contract_paid_active: '✅ مدفوع ونشط',
            contract_awaiting_pay: '⏳ في انتظار دفع الطالب',
            contract_close: 'إغلاق',

            // Payment Modal
            pay_secured_by: '🔒 مؤمَّن بواسطة UNIDAR Pay',
            pay_title: 'دفع آمن',
            pay_tab_card: 'بطاقة بنكية',
            pay_tab_transfer: 'تحويل بنكي',
            pay_card_holder_label: 'حامل البطاقة',
            pay_card_expires_label: 'انتهاء الصلاحية',
            pay_holder_name: 'الاسم على البطاقة',
            pay_card_number: 'رقم البطاقة',
            pay_expiration: 'تاريخ الانتهاء',
            pay_cvc: 'CVC',
            pay_cvc_tooltip: '3 أرقام على ظهر بطاقتك',
            pay_summary: 'الملخص',
            pay_monthly_rent: 'الإيجار الشهري',
            pay_commission: 'العمولة (5%)',
            pay_total: 'المبلغ الإجمالي',
            pay_processing: 'جارٍ المعالجة...',
            pay_step_bank: 'التعرف على البنك...',
            pay_step_encrypt: 'تشفير المعاملة...',
            pay_step_auth: 'في انتظار موافقة البنك...',
            pay_step_validate: 'التحقق من العقد...',
            pay_step_done: 'تم ترخيص الدفع!',
            pay_substep_tls: 'اتصال TLS 1.3 آمن...',
            pay_substep_aes: 'تشفير AES-256...',
            pay_substep_3ds: 'التحقق 3D Secure...',
            pay_substep_record: 'تسجيل الوثيقة...',
            pay_btn: '🔐 ادفع الآن',
            pay_no_store: '🔒 لا يتم تخزين البيانات',
            pay_success_title: 'تم الدفع بنجاح!',
            pay_success_body: 'عقدك نشط الآن.',
            pay_transfer_ok: 'تم تسجيل طلب التحويل. سيُفعَّل عقدك عند استلام الأموال.',
            pay_congrats: 'تهانينا! تمت معالجة دفعتك وعقدك نشط الآن.',
            pay_err_fill_card: 'يرجى ملء جميع حقول البطاقة.',
            pay_err_card_number: 'يرجى إدخال رقم بطاقة كامل.',
            pay_err_invalid_card: 'رقم البطاقة غير صالح. يرجى التحقق.',
            pay_err_expiry: 'تاريخ الانتهاء غير صالح أو منتهٍ.',
            pay_err_connection: 'خطأ في الاتصال أثناء الدفع',
            modal_error_title: 'خطأ',
            modal_success_title: 'نجاح!',
            modal_ok: 'موافق',
            status_draft: 'مسودة',
            status_signed_student: 'موقّع (طالب)',
            status_signed_owner: 'موقّع (مالك)',
            status_pending_pay: 'للدفع',
            status_active_label: 'نشط',
            status_terminated: 'منتهٍ',
            status_signed: 'موقّع'
        }
    },

    /**
     * Initialize the language system
     */
    init: function () {
        // Get saved language or default to English
        var savedLang = localStorage.getItem('unidar_language');
        this.currentLang = savedLang && this.languages[savedLang] ? savedLang : 'en';
        this.applyLanguage();
    },

    /**
     * Get translation for a key
     */
    t: function (key) {
        var translations = this.translations[this.currentLang];
        if (translations && translations[key]) {
            return translations[key];
        }
        // Fallback to English
        if (this.translations.en && this.translations.en[key]) {
            return this.translations.en[key];
        }
        // Return key if no translation found
        return key;
    },

    /**
     * Set the current language
     */
    setLanguage: function (lang) {
        if (!this.languages[lang]) {
            console.warn('Language not supported:', lang);
            return;
        }
        this.currentLang = lang;
        localStorage.setItem('unidar_language', lang);
        this.applyLanguage();
    },

    /**
     * Get the current language code
     */
    getLanguage: function () {
        return this.currentLang;
    },

    /**
     * Apply language to the page
     */
    applyLanguage: function () {
        var lang = this.currentLang;
        var langInfo = this.languages[lang];

        // Set document direction and lang attribute
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', langInfo.dir);

        // Translate all elements with data-i18n attribute
        this.translatePage();

        // Update language switcher display if exists
        this.updateSwitcherDisplay();
    },

    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage: function () {
        var self = this;
        var elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var translation = self.t(key);

            // Check if it's an input placeholder
            if (el.hasAttribute('placeholder') && el.getAttribute('data-i18n-placeholder')) {
                el.placeholder = self.t(el.getAttribute('data-i18n-placeholder'));
            }

            // Check for data-i18n-title
            if (el.hasAttribute('data-i18n-title')) {
                el.title = self.t(el.getAttribute('data-i18n-title'));
            }

            // Set text content (but not for inputs)
            if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                el.textContent = translation;
            }
        });

        // Handle placeholder translations separately
        var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = self.t(key);
        });
    },

    /**
     * Update the language switcher display
     */
    updateSwitcherDisplay: function () {
        var langInfo = this.languages[this.currentLang];
        var switchers = document.querySelectorAll('.lang-switcher-current');

        switchers.forEach(function (el) {
            el.textContent = langInfo.flag + ' ' + langInfo.nativeName.substring(0, 2).toUpperCase();
        });
    },

    /**
     * Create language switcher HTML
     */
    createSwitcherHTML: function () {
        var self = this;
        var currentLangInfo = this.languages[this.currentLang];

        var html = '<div class="lang-switcher">' +
            '<button class="lang-switcher-btn" type="button" aria-label="Change language">' +
            '<span class="lang-switcher-current">' + currentLangInfo.flag + ' ' + currentLangInfo.nativeName.substring(0, 2).toUpperCase() + '</span>' +
            '<span class="lang-switcher-arrow">▼</span>' +
            '</button>' +
            '<div class="lang-dropdown">';

        Object.keys(this.languages).forEach(function (code) {
            var lang = self.languages[code];
            var activeClass = code === self.currentLang ? ' lang-option-active' : '';
            html += '<button class="lang-option' + activeClass + '" data-lang="' + code + '" type="button">' +
                '<span class="lang-flag">' + lang.flag + '</span>' +
                '<span class="lang-name">' + lang.nativeName + '</span>' +
                '</button>';
        });

        html += '</div></div>';

        return html;
    },

    /**
     * Inject language switcher into navbar
     */
    injectSwitcher: function (containerSelector) {
        var self = this;
        var containers = document.querySelectorAll(containerSelector || '.nav-container');

        containers.forEach(function (container) {
            // Check if switcher already exists
            if (container.querySelector('.lang-switcher')) return;

            // Find the right place to inject (before logout button or at the end)
            var actionsDiv = container.querySelector('div[style*="display: flex"]') ||
                container.querySelector('.header-actions');

            if (actionsDiv) {
                var switcherHTML = self.createSwitcherHTML();
                actionsDiv.insertAdjacentHTML('afterbegin', switcherHTML);
            } else {
                // Append to container if no actions div found
                var switcherHTML = self.createSwitcherHTML();
                container.insertAdjacentHTML('beforeend', '<div style="display: flex; align-items: center; gap: var(--space-md);">' + switcherHTML + '</div>');
            }

            // Attach event listeners
            self.attachSwitcherEvents(container);
        });
    },

    /**
     * Attach event listeners to language switcher
     */
    attachSwitcherEvents: function (container) {
        var self = this;
        var switcher = container.querySelector('.lang-switcher');
        if (!switcher) return;

        var btn = switcher.querySelector('.lang-switcher-btn');
        var dropdown = switcher.querySelector('.lang-dropdown');

        // Toggle dropdown on button click
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            switcher.classList.toggle('open');
        });

        // Handle language selection
        var options = dropdown.querySelectorAll('.lang-option');
        options.forEach(function (option) {
            option.addEventListener('click', function (e) {
                e.stopPropagation();
                var lang = this.getAttribute('data-lang');
                self.setLanguage(lang);
                switcher.classList.remove('open');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function () {
            switcher.classList.remove('open');
        });
    }
};

// Make it globally accessible
window.UNIDAR_I18N = UNIDAR_I18N;

// Initializer removed for Next.js - handled in _app.js useEffect


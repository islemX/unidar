# UNIDAR

UNIDAR is a student-housing platform that connects university students with property owners and potential roommates. Built with Next.js (Pages Router) and MySQL, it covers the full rental lifecycle — from browsing listings and finding roommates to chatting, signing contracts, and managing subscriptions.

## Languages

- **English** (default)
- **French** — Français
- **Arabic** — العربية (with RTL support)

Translations live in [public/js/i18n.js](public/js/i18n.js) and apply across the UI.

## Tech Stack

- **Framework:** Next.js 13 (Pages Router), React 18
- **Database:** MySQL (via `mysql2`) — works with local XAMPP or hosted (e.g. TiDB Cloud) with SSL
- **Auth:** JWT (`jsonwebtoken`) + HTTP-only cookies, `bcryptjs` for password hashing
- **File uploads:** `formidable` + Vercel Blob storage
- **Deployment:** Vercel

## Functionalities

### For Students
- Register / login with role selection (student, owner, admin)
- Browse and filter property [listings](pages/listings)
- Find [roommates](pages/roommates.js) with compatibility filters
- [Messages](pages/messages.js) — real-time chat with owners and roommates
- Save favorite listings
- Sign digital rental [contracts](pages/api/contracts)
- Submit [verification](pages/verification.js) documents (student status)
- Report problematic listings or users
- Manage [subscription](pages/subscription.js) plans

### For Owners
- Post and manage their own [properties](pages/owner-listings.js)
- Receive inquiries and chat with applicants
- Issue and track rental contracts
- View their [dashboard](pages/user-dashboard.js)

### For Admins
- [Admin dashboard](pages/admin/index.js) with full oversight
- Review and approve/reject verifications
- Manage [payments](pages/admin/payments.js) and subscriptions
- Handle user reports

## User Flow

1. **Sign up** as student or owner → email/password stored with bcrypt hash.
2. **Verification (students)** → upload student ID/documents → admin reviews.
3. **Browse** listings or roommates, filter by faculty, budget, location.
4. **Contact** — open a conversation, negotiate via in-app messaging.
5. **Contract** — owner issues a digital contract; student signs it online.
6. **Subscribe** — premium plans unlock extra visibility / features.
7. **Admin** moderates verifications, payments, and reports throughout.

## Project Structure

```
pages/            # Routes (React pages + API under /api)
  api/            # Auth, listings, roommates, messages, contracts,
                  # subscriptions, verifications, reports, admin, ...
lib/              # db.js (MySQL pool), auth.js (JWT), storage.js (blob)
public/js/i18n.js # EN/FR/AR translations
styles/           # Global CSS
```

## How to Run

### 1. Prerequisites
- Node.js ≥ 16
- MySQL (local via XAMPP, or a remote instance)

### 2. Clone
```bash
git clone https://github.com/islemX/unidar.git
cd unidar
```

### 3. Install
```bash
npm install
```

### 4. Environment variables
Create a `.env.local` file in the project root:

```env
# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=unidar
DB_USER=root
DB_PASS=
DB_SSL=false            # set to true for hosted DBs (e.g. TiDB Cloud)

# Auth
JWT_SECRET=replace-with-a-long-random-string

# Vercel Blob (file uploads)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 5. Database
Import the UNIDAR schema into your MySQL instance (tables for `users`, `listings`, `roommates`, `conversations`, `messages`, `contracts`, `subscriptions`, `verifications`, `reports`, `faculties`, …). With XAMPP, use phpMyAdmin at `http://localhost/phpmyadmin`.

### 6. Develop
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 7. Production build
```bash
npm run build
npm start
```

## Deployment

The app is configured for **Vercel** — push to GitHub, import the repo on Vercel, and set the environment variables above in the project settings. `vercel.json` is already included.

## License

Private project — all rights reserved.

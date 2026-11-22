# Existing Firebase Project Audit — School-Owned Project

**Confirmed project ID:** `rb-memorial-education-centre`  
**Policy:** Continue with this existing project. Do not create a replacement project, delete resources, change billing, publish rules, or import student data as part of this audit.

## What is known
The repository's current `firebase-config.example.js` contains placeholders only. The project ID supplied by the school is now known, but the web app's remaining Firebase configuration values and the actual console configuration have not been inspected. A project ID alone is not enough to connect the frontend.

## Read-only console audit checklist

Sign in to Firebase Console with the school-authorized Google account and open the project whose ID is exactly `rb-memorial-education-centre`.

### A. Project identity and app registration
- Project Settings → General: confirm Project ID exactly matches.
- Your apps: check whether a Web App already exists; record its display name and app ID.
- Do not create a duplicate Web App if one already exists.
- If no Web App exists, ask the school project owner to approve adding one.

### B. Authentication
- Authentication → Get started / Users: check whether Authentication is initialized and whether existing users must be preserved.
- Authentication → Sign-in method: record enabled providers (especially Phone and Email/Password).
- Authentication → Settings: review authorized domains and SMS region policy where available.
- Do not disable providers, delete users, or send test SMS without approval.
- For OTP-first, decide whether the school intends phone-number OTP. If so, plan reCAPTCHA verification, authorized domains, SMS region restrictions, resend throttling, abuse controls, account recovery, and test phone numbers.

### C. Firestore
- Firestore Database: record whether a database exists, its location/region, and current mode.
- Rules: copy/review current deployed rules before any change.
- Indexes: record existing composite indexes.
- Usage: inspect reads, writes, storage, and quota/error trends.
- Do not overwrite existing rules or collections during this audit.

### D. Storage, functions, hosting and billing
- Storage: check whether a bucket exists, its region and current rules.
- Functions / Cloud Run: record deployed services and runtime regions if present.
- Hosting / App Hosting: record existing sites and domains.
- Usage and billing: identify billing plan, budget alerts, linked billing account status, and any existing paid services.
- Do not upgrade/downgrade billing or deploy resources without explicit school approval.

## Safe information to share for technical configuration
Share only:
- Confirmed project ID.
- Whether a Web App exists (yes/no).
- The Web App's Firebase config fields: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`. These are client configuration values; still share them only through an approved school channel.
- Whether Phone and/or Email/Password providers are enabled.
- Whether Firestore exists and its region.
- Whether Storage exists.
- Whether billing is Spark or Blaze (no billing account number).

Never share:
- Google account password or OTP.
- Service-account JSON/private key.
- Admin SDK credentials, refresh tokens, access tokens, or payment gateway secrets.
- Real student/parent personal data or screenshots containing it.

## Exit criteria
The project audit is complete only when the owner confirms project identity and existing resources have been inventoried. Only then should a separate implementation change be proposed, tested in a non-production environment or emulator, reviewed, and approved before deployment.

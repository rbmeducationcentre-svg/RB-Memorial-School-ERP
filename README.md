# R.B. Memorial Education Centre — School ERP

Bilingual (Hindi/English) school-management ERP for academic session 2026–27.

## School profile
- School: R.B. Memorial Education Centre
- Principal: Mr. B. L. Sharma
- Roles: Admin, Teacher, Parent
- Scale target: 700+ students; planning target around 1,000 concurrent users
- Branding: Navy blue and gold
- Delivery goal: Android-friendly web app / PWA first, then Android APK

## Current status
This repository contains a frontend demonstration only. Dashboard figures are illustrative and there is no live database or authentication.

## Run and install
Open `index.html` in a modern browser for a local preview. The repository now includes a Progressive Web App (PWA) manifest, school icon, and offline app shell. Once hosted over HTTPS, Android Chrome can install it from the browser menu using **Install app** or **Add to Home screen**.

## Fastest preview deployment (GitHub Pages)
1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then Save.
5. Wait for GitHub Pages to publish the site. Open the generated HTTPS address on Android Chrome and choose **Install app**.

GitHub Pages hosting publishes the demo only; it does not activate Firebase or make student records persistent.

## Security
Do not enter real student information into this demo. Do not commit student records, passwords, Firebase service-account keys, or private credentials. Production use requires secure authentication, server-enforced role permissions, database security rules, backups, audit logging, and privacy review.

## Planned modules
1. Admin, Teacher, Parent portals
2. Student profiles, classes and sections
3. Daily attendance
4. Fees and receipts
5. Homework and exams
6. Notices and parent communication
7. Reports, exports, audit trail and backups

## Roadmap
- Phase 1: responsive bilingual prototype and workflow review
- Phase 2: authentication and role-based access
- Phase 3: student, attendance, fee and academic modules
- Phase 4: testing, backups, security hardening and Android packaging

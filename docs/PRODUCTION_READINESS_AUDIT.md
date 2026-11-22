# Production Readiness Audit & Implementation Roadmap

**Project:** R.B. Memorial Education Centre School ERP  
**Academic session:** 2026–27  
**Target:** 700+ student records; design and load-test for up to 1,000 concurrent users  
**Status:** Planning/audit document only. This document does not activate Firebase, deploy rules, or authorize production data entry.

## 1. Verified repository status

The current repository README explicitly describes the application as a frontend demonstration with illustrative dashboard figures and no live database or authentication.

Verified files:
- `index.html`: standalone dashboard prototype; build marker `dashboard-rebuild-20261119-6`.
- `firebase-auth.js`: Firebase Authentication integration using Email/Password and custom claims `role`; accepted roles are `admin`, `teacher`, and `parent`.
- `firestore.rules`: initial role-based rules for `students`, `attendance`, `fees`, `notices`, and `users`.
- `firebase-config.example.js`: placeholder configuration; it is not a live project configuration.
- `FIREBASE_SETUP.md`: setup guidance for a new Firebase project and Email/Password sign-in.

No `package.json` was found at the repository root. The current demo is therefore not yet a verified React build pipeline or a production Android application.

## 2. Decisions already established by school requirements

- Continue with the existing school-owned Firebase project; audit it before making changes.
- OTP-first authentication is the intended login experience. The checked-in code currently does not implement it.
- Roles: Admin, Teacher, Parent.
- Parent access must be limited to their linked child/children.
- Teacher access must be limited to assigned class/section(s).
- Online fee payment is required at launch.
- Hindi and English interface.
- Web and Android delivery.
- Never place real student/parent data, service-account keys, passwords, or private credentials in GitHub.

## 3. Immediate blockers (must be resolved before production)

1. Confirm the Firebase project ID and school-controlled owner/admin access.
2. Inspect existing Authentication providers, Firestore database/region, Storage, billing plan, quotas, indexes, backup configuration, and current data before changing anything.
3. Obtain the Firebase Web App configuration from the authorized school administrator. Keep service-account credentials server-side only.
4. Decide OTP channel and recovery policy. Phone OTP requires verified phone numbers, abuse controls, resend throttling, and a safe account recovery process.
5. Define the canonical student, parent-link, class/section, attendance, fee, payment, exam, and notice data contracts before tightening rules or importing records.
6. Select and configure the payment provider account in the school's legal name; verify payment server-side using signed webhooks before marking a fee paid.

## 4. Proposed implementation sequence

### Phase A — Audit and foundations
- Audit the existing Firebase project without deleting or overwriting anything.
- Establish development, staging, and production environments.
- Add a reproducible build/test pipeline and environment configuration.
- Define Firestore schema, indexes, data validation, and migration/import format.
- Create test accounts for each role using synthetic data only.

### Phase B — Authentication and authorization
- Implement the approved OTP-first flow.
- Assign custom claims only from a trusted server/Admin SDK environment.
- Add session expiry, logout, rate limits, abuse protection, and admin recovery.
- Test positive and negative access cases for every role in the Firebase Emulator.

### Phase C — Core school records
- Student admission/profile and class/section mapping.
- Parent-to-student linking with an admin-controlled verification process.
- Teacher accounts and class assignments.
- Attendance with duplicate prevention and correction history.
- Fee heads, invoices, concessions, receipts, dues, and reconciliation.

### Phase D — Academic and communication modules
- Homework/classwork, exams, marks, report cards.
- Notices and parent communication.
- Bilingual labels and accessible mobile layouts.
- Export/print workflows and audit trail.

### Phase E — Payments, operations, and release
- Server-created payment orders; server-verified signed webhooks.
- Idempotency and duplicate-payment protection; refunds and reconciliation workflow.
- Automated backups and a tested restore drill.
- Monitoring, error reporting, retention policy, privacy review, and admin audit logs.
- Load tests at staged levels (100, 250, 500, then 1,000 concurrent users) with measured latency and error rates.
- Pilot with synthetic/test records, management sign-off, then controlled production migration.
- Package and sign the Android app only after web workflows and security tests pass.

## 5. Security review notes on current rules

The existing rules are a useful starting skeleton, not production approval. In particular:
- Attendance writes currently rely mainly on the submitted `classId`; they do not yet prove that the referenced student belongs to that class or that the supplied `parentUid` matches the student's linked parent.
- Parent and teacher queries must be designed to satisfy Firestore rules; rules are not post-query filters.
- Fee reads are parent-scoped, but payment status must never be trusted from a client write.
- User provisioning and custom claims must remain server-controlled.
- Add field allow-lists, type/range validation, immutable ownership fields, and tests for unauthorized reads/writes after the canonical schema is approved.

Do not deploy replacement rules until the schema and emulator tests are complete; a poorly staged rules change can lock out legitimate school users or expose records.

## 6. Acceptance gates

A phase is complete only when:
- Code is committed and build/test results are recorded.
- Role-based positive and negative tests pass.
- No production secrets or real student data are committed.
- Backup and restore have been demonstrated where applicable.
- Management has approved the relevant workflow.
- Production readiness is stated honestly; a UI demo is not a live ERP.

## 7. Current honest status

**Prototype:** available.  
**Live Firebase connection:** not verified / not configured in this repository.  
**OTP-first login:** not implemented in the checked-in auth module.  
**Production student database:** not ready.  
**Online payments:** not implemented/verified.  
**Android production APK:** not verified.  
**1,000-user capacity:** target only; not load-tested.

This roadmap is an implementation control document. It does not claim that any of the above capabilities have been delivered.

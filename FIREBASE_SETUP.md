# Firebase setup — R.B. Memorial School ERP

## Important status
This commit prepares the security rules and authentication integration files. It does **not** connect a live Firebase project yet. The dashboard remains a demo. Do not enter real student or family data until the school-owned Firebase project is configured, tested, and approved.

## 1. Create the school Firebase project
1. Sign in to Firebase Console using a school-controlled Google account.
2. Create a project named for R.B. Memorial Education Centre.
3. Add a Web App to the project and copy its web configuration.
4. Enable **Authentication → Sign-in method → Email/Password**.
5. Create a **Cloud Firestore** database in production mode.

## 2. Add the web configuration
1. Copy `firebase-config.example.js` to `firebase-config.js`.
2. Replace the placeholder values with the Web App configuration from Firebase Console.
3. Do not add service-account JSON, Admin SDK private keys, passwords, or access tokens to this repository.
4. The Firebase Web API key is a client identifier, not an authorization control. Firestore rules are the security boundary.

## 3. Publish Firestore rules
Review `firestore.rules` and publish it from Firebase Console → Firestore Database → Rules.
The rules expect trusted Firebase custom claims:
- `role`: `admin`, `teacher`, or `parent`
- `classIds`: list of class identifiers for teachers
Student documents should contain `classId` and (for parent access) `parentUid`. Attendance documents should contain `classId` and `parentUid`. Fee documents should contain `parentUid`.

## 4. Create users safely
Do not build open public registration for school accounts. Create accounts from Firebase Console or a trusted server/Admin SDK process. Assign custom claims only from a trusted server environment:
- Admin: `{ role: "admin" }`
- Teacher: `{ role: "teacher", classIds: ["CLASS_6_A"] }`
- Parent: `{ role: "parent" }`

Never assign custom claims from browser JavaScript or trust a role stored in a user-editable Firestore document. Keep the Admin SDK service-account key outside GitHub and outside the browser.

## 5. Auth integration module
`firebase-auth.js` contains email/password login, session observation and logout. It imports `firebase-config.js`, which must be created from the example file. It rejects users without an approved custom role.

## 6. Before real use
- Test each role with separate test accounts.
- Verify parents can read only their own child's records.
- Verify teachers can read only assigned class records.
- Verify teachers and parents cannot edit student profiles or fee records.
- Test rules in the Firebase Emulator / Rules Playground.
- Enable MFA for privileged administrator accounts where available.
- Configure backups, audit logging, data retention, consent and recovery procedures.
- Obtain school management approval before migrating real student records.

## Current limitations
No Firebase project ID or app configuration has been supplied, so this repository is not yet connected to a live database. No real login or persistent student storage is active in the current HTML demo.

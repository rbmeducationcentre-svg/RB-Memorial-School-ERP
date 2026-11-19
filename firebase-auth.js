import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// No public sign-up function is intentionally provided.
// Admins must create accounts in Firebase Console or a trusted server.
export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  const token = await credential.user.getIdTokenResult(true);
  const role = token.claims.role;
  if (!["admin", "teacher", "parent"].includes(role)) {
    await signOut(auth);
    throw new Error("This account has no approved school role. Contact the school administrator.");
  }
  return { user: credential.user, role };
}

export function watchSession(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return callback(null);
    try {
      const token = await user.getIdTokenResult();
      const role = token.claims.role;
      if (!["admin", "teacher", "parent"].includes(role)) {
        await signOut(auth);
        return callback(null, new Error("Account role is not configured."));
      }
      callback({ uid: user.uid, email: user.email, role, classIds: token.claims.classIds || [] });
    } catch (error) {
      callback(null, error);
    }
  });
}

export function logout() {
  return signOut(auth);
}
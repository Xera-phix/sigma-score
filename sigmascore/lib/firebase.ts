// Firebase initialization and exports
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnNw55C4jFcbQpo_X8QpOW05upWmfoGgM",
  authDomain: "sigma-score-mvp.firebaseapp.com",
  projectId: "sigma-score-mvp",
  storageBucket: "sigma-score-mvp.firebasestorage.app",
  messagingSenderId: "751368785304",
  appId: "1:751368785304:web:c659cafa46a57307422fed",
  measurementId: "G-MZDDG2Q6V4"
};

// Prevent re-initialization in Next.js hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 
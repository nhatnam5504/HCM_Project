import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration from environment variables
// Trim values to remove any whitespace/newlines (especially from Vercel env vars)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim(),
};
console.log("🔥 ENV CHECK", {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  mode: import.meta.env.MODE,
});
// Initialize Firebase (singleton pattern)
function initializeFirebase() {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    const newApp = initializeApp(firebaseConfig);

    // Analytics only in production
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      getAnalytics(newApp);
    }

    console.log('✅ Firebase initialized successfully');
    return newApp;
  } else {
    return getApps()[0];
  }
}

// Initialize on module load
const app = initializeFirebase();
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' && import.meta.env.PROD ? getAnalytics(app) : undefined;

export { db, analytics };
export default app;

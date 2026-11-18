// Paste your Firebase Web App configuration here (Firebase Console > Project settings).
// This config is public client configuration, NOT a private service-account key.
// Never put service-account JSON, admin passwords, or private tokens in this file.
export const firebaseConfig = {
  apiKey: "PASTE_FIREBASE_WEB_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};
export const firebaseReady = !Object.values(firebaseConfig).some(v => String(v).includes("PASTE_") || String(v).includes("YOUR_"));

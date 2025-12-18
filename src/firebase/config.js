// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Build firebaseConfig from (in order):
// 1) local credentials file `src/firebase/credentials/credentials.js` (ONLY for local dev),
// 2) Vite env variables `import.meta.env.VITE_...`,
// 3) hardcoded fallbacks (convenience for quick dev).

let firebaseConfig = {
  apiKey: import.meta?.env?.VITE_FIREBASE_API_KEY || "AIzaSyATQXjmo0xv7-YOuIkHEddGO-q4CLgGrM8",
  authDomain: import.meta?.env?.VITE_FIREBASE_AUTH_DOMAIN || "vidrieria-d59d3.firebaseapp.com",
  projectId: import.meta?.env?.VITE_FIREBASE_PROJECT_ID || "vidrieria-d59d3",
  storageBucket: import.meta?.env?.VITE_FIREBASE_STORAGE_BUCKET || "vidrieria-d59d3.firebasestorage.app",
  messagingSenderId: import.meta?.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "983598785830",
  appId: import.meta?.env?.VITE_FIREBASE_APP_ID || "1:983598785830:web:bf756e911e407ffdcbcde7",
  measurementId: import.meta?.env?.VITE_FIREBASE_MEASUREMENT_ID || "G-2T9PFQ2WDH"
}

// If a local credentials file exists, prefer its values. This allows developers to
// keep a local-only `src/firebase/credentials/credentials.js` with real keys and
// exclude it via .gitignore.
// Note: Dynamic import with string template to prevent Vite from resolving at build time
if (import.meta.env.DEV) {
  try {
    // Only attempt to load local credentials in development mode
    const credsModule = await import(/* @vite-ignore */ './credentials/credentials.js')
    const local = credsModule.firebaseCredentials || credsModule.default
    if (local && Object.keys(local).length) {
      firebaseConfig = {
        apiKey: local.apiKey || firebaseConfig.apiKey,
        authDomain: local.authDomain || firebaseConfig.authDomain,
        projectId: local.projectId || firebaseConfig.projectId,
        storageBucket: local.storageBucket || firebaseConfig.storageBucket,
        messagingSenderId: local.messagingSenderId || firebaseConfig.messagingSenderId,
        appId: local.appId || firebaseConfig.appId,
        measurementId: local.measurementId || firebaseConfig.measurementId
      }
    }
  } catch (e) {
    // no local credentials found in dev — continue with env/fallback
  }
}
// In production, always use env vars or fallback values

// Initialize Firebase app
const app = initializeApp(firebaseConfig)

// Analytics is only available in browser environments; guard for SSR.
let analytics
try {
  if (typeof window !== 'undefined') analytics = getAnalytics(app)
} catch (e) {
  // analytics may fail in some environments (e.g. testing), ignore silently
}

// Core services exports
const db = getFirestore(app)
const auth = getAuth(app)

export { app, analytics, db, auth }

// Usage example (in other modules):
// import { db } from '../firebase/config'
// import { collection, getDocs } from 'firebase/firestore'
// const productsRef = collection(db, 'products')
// const snapshot = await getDocs(productsRef)
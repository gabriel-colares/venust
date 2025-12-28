// Import the functions you need from the SDKs you need
import {
  type Analytics,
  getAnalytics,
  isSupported,
  logEvent,
} from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase safely (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics safely (Client-side only)
let analytics: Analytics | null = null;
let pendingEvents: Array<{
  name: string;
  params?: Record<string, unknown>;
}> = [];

function flushPendingEvents() {
  if (!analytics) return;
  const queued = pendingEvents;
  pendingEvents = [];
  for (const evt of queued) {
    logEvent(analytics, evt.name, evt.params);
  }
}

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      flushPendingEvents();
    }
  });
}

export { app, analytics };

export function trackFirebaseEvent(
  name: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  if (analytics) {
    logEvent(analytics, name, params);
    return;
  }
  if (pendingEvents.length >= 50) return;
  pendingEvents.push({ name, params });
}

export function trackFirebasePageView(path: string) {
  if (typeof window === "undefined") return;
  trackFirebaseEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Configuration to enable/disable Firebase
// Set to true to use Firebase, false to use localStorage
export const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === "true"

// Check if Firebase config is available
export const FIREBASE_AVAILABLE = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
)

// Determine if we should use Firebase
export const IS_FIREBASE_ENABLED = USE_FIREBASE && FIREBASE_AVAILABLE


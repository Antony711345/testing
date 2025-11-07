/**
 * Utility functions for handling environment variables in Vite/React
 */

export const env = {
  // API Configuration
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:6009',
  ENDPOINT: import.meta.env.VITE_ENDPOINT || 'http://localhost:3000',
  
  // Analytics
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID,
  GTM_ID: import.meta.env.VITE_GTM_ID,
  
  // Firebase
  FIREBASE: {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
  
  // Settings
  PERFORMANCE_MONITORING: import.meta.env.VITE_PERFORMANCE_MONITORING === 'true',
  WEB_VITALS_TRACKING: import.meta.env.VITE_WEB_VITALS_TRACKING === 'true',
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  REDUX_DEVTOOLS: import.meta.env.VITE_REDUX_DEVTOOLS === 'true',
  
  // Other
  IMAGE_DOMAINS: import.meta.env.VITE_IMAGE_DOMAINS?.split(',') || [],
  
  // Development mode check
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: keyof ImportMetaEnv, fallback?: string): string {
  return import.meta.env[key] || fallback || ''
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD
}
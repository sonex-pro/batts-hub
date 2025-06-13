// src/config/supabase-config.js
// This file loads Supabase credentials securely without exposing them in version control

// Try to import local config if available (this file is gitignored)
let localConfig = null;
try {
  localConfig = await import('./supabase-config.local.js').then(module => module.default);
} catch (error) {
  console.warn('No local Supabase config found. Using environment variables or development fallback.');
}

// Priority order for credentials:
// 1. Browser window variables (for production deployment)
// 2. Local config file (for local development)
// 3. Development fallback (ONLY for initial setup - do NOT use real credentials here)

const getConfig = () => {
  // Check for window variables (useful for deployment environments)
  if (typeof window !== 'undefined' && 
      window.SUPABASE_URL && 
      window.SUPABASE_ANON_KEY) {
    return {
      supabaseUrl: window.SUPABASE_URL,
      supabaseAnonKey: window.SUPABASE_ANON_KEY
    };
  }
  
  // Check for local config
  if (localConfig && localConfig.supabaseUrl && localConfig.supabaseAnonKey) {
    return localConfig;
  }

  // Development fallback (do not use real credentials here)
  console.warn('WARNING: Using development fallback credentials. DO NOT use in production!');
  return {
    supabaseUrl: 'https://project.supabase.co', // Placeholder
    supabaseAnonKey: 'public-anon-key-placeholder' // Placeholder
  };
};

const config = getConfig();
export default config;

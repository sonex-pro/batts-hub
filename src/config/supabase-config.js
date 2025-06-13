// src/config/supabase-config.js
// This file loads Supabase credentials securely without exposing them in version control

// Development fallback (do not use real credentials here)
const devFallback = {
  supabaseUrl: 'https://project.supabase.co', // Placeholder
  supabaseAnonKey: 'public-anon-key-placeholder' // Placeholder
};

// Use a function to load the configuration asynchronously
let configPromise = null;

const loadConfig = async () => {
  // Only load once
  if (configPromise) return configPromise;
  
  configPromise = new Promise(async (resolve) => {
    // Check for window variables first (for production deployment)
    if (typeof window !== 'undefined' && 
        window.SUPABASE_URL && 
        window.SUPABASE_ANON_KEY) {
      resolve({
        supabaseUrl: window.SUPABASE_URL,
        supabaseAnonKey: window.SUPABASE_ANON_KEY
      });
      return;
    }
    
    // Try to import local config if available (this file is gitignored)
    try {
      // Use dynamic import for the local config
      const module = await import('./supabase-config.local.js');
      const localConfig = module.default;
      
      if (localConfig && localConfig.supabaseUrl && localConfig.supabaseAnonKey) {
        resolve(localConfig);
        return;
      }
    } catch (error) {
      console.warn('No local Supabase config found. Using environment variables or development fallback.');
    }
    
    // Use development fallback if nothing else is available
    console.warn('WARNING: Using development fallback credentials. DO NOT use in production!');
    resolve(devFallback);
  });
  
  return configPromise;
};

// For synchronous initialization, we need to provide a fallback
// This will be replaced once the async loading completes
let config = devFallback;

// Start loading the real config immediately
loadConfig().then(loadedConfig => {
  config = loadedConfig;
});

export default config;
export { loadConfig }; // Export the loader for components that need to wait for config

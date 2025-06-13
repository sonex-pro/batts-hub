// src/config/supabase-config.js
// This file loads Supabase credentials securely without exposing them in version control

// Development fallback with empty values that will fail safely instead of with DNS errors
const devFallback = {
  supabaseUrl: '', // Empty fallback rather than invalid URL
  supabaseAnonKey: '' // Empty fallback
};

// Use a function to load the configuration asynchronously
let configPromise = null;
let configLoaded = false;
let loadedConfig = devFallback;

const loadConfig = async () => {
  // Only load once
  if (configPromise) return configPromise;
  
  configPromise = new Promise(async (resolve) => {
    // Check for window variables first (for production deployment)
    if (typeof window !== 'undefined' && 
        window.SUPABASE_URL && 
        window.SUPABASE_ANON_KEY) {
      loadedConfig = {
        supabaseUrl: window.SUPABASE_URL,
        supabaseAnonKey: window.SUPABASE_ANON_KEY
      };
      configLoaded = true;
      resolve(loadedConfig);
      return;
    }
    
    // Try to import local config if available (this file is gitignored)
    try {
      // Use dynamic import for the local config
      const module = await import('./supabase-config.local.js');
      const localConfig = module.default;
      
      if (localConfig && localConfig.supabaseUrl && localConfig.supabaseAnonKey) {
        loadedConfig = localConfig;
        configLoaded = true;
        resolve(loadedConfig);
        return;
      }
    } catch (error) {
      console.warn('No local Supabase config found. Using environment variables or development fallback.');
    }
    
    // Use development fallback if nothing else is available
    console.error('ERROR: No valid Supabase configuration found! Application will not work correctly.');
    console.error('Please create a src/config/supabase-config.local.js file based on the template.');
    resolve(devFallback);
  });
  
  return configPromise;
};

// Export the getter function to ensure we always have the latest config
const getConfig = () => loadedConfig;

// Start loading the real config immediately
loadConfig();

export default getConfig;
export { loadConfig, configLoaded }; // Export the loader for components that need to wait for config

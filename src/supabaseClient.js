// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import getConfig, { loadConfig } from './config/supabase-config.js';

// Create a lazy-loaded Supabase client
let _supabaseClient = null;

/**
 * Get a single supabase client instance
 * This ensures we only ever create one client in the application
 */
const getSupabaseClient = async () => {
  // Wait for config to be loaded
  const config = await loadConfig();
  
  // Only create the client once
  if (!_supabaseClient && config.supabaseUrl && config.supabaseAnonKey) {
    _supabaseClient = createClient(config.supabaseUrl, config.supabaseAnonKey);
  }
  
  return _supabaseClient;
};

// Export a convenient method to access the Supabase client
export const supabase = {
  auth: {
    // Proxy auth methods
    signIn: async (...args) => {
      const client = await getSupabaseClient();
      return client.auth.signIn(...args);
    },
    signUp: async (...args) => {
      const client = await getSupabaseClient();
      return client.auth.signUp(...args);
    },
    signOut: async (...args) => {
      const client = await getSupabaseClient();
      return client.auth.signOut(...args);
    },
    // Add other auth methods as needed
  },
  from: (table) => ({
    // Common table operations
    select: async (...args) => {
      const client = await getSupabaseClient();
      return client.from(table).select(...args);
    },
    insert: async (...args) => {
      const client = await getSupabaseClient();
      return client.from(table).insert(...args);
    },
    update: async (...args) => {
      const client = await getSupabaseClient();
      return client.from(table).update(...args);
    },
    delete: async (...args) => {
      const client = await getSupabaseClient();
      return client.from(table).delete(...args);
    },
    // Add other table methods as needed
  }),
  storage: {
    // Storage operations
    from: (bucket) => ({
      upload: async (...args) => {
        const client = await getSupabaseClient();
        return client.storage.from(bucket).upload(...args);
      },
      download: async (...args) => {
        const client = await getSupabaseClient();
        return client.storage.from(bucket).download(...args);
      },
      // Add other storage methods as needed
    }),
  },
  // Raw access to the client (should be avoided if possible)
  _getClient: getSupabaseClient,
};

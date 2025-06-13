// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import supabaseConfig, { loadConfig } from './config/supabase-config.js';

// Create a single supabase client for interacting with the database
export const supabase = createClient(
  supabaseConfig.supabaseUrl,
  supabaseConfig.supabaseAnonKey
);

// When config is loaded, update the Supabase client with the correct credentials
loadConfig().then(config => {
  // If the initial and loaded configs are different, we need to update the client
  if (supabase.supabaseUrl !== config.supabaseUrl || 
      supabase.supabaseKey !== config.supabaseAnonKey) {
    console.log('Updating Supabase client with loaded configuration...');
    Object.assign(supabase, createClient(
      config.supabaseUrl,
      config.supabaseAnonKey
    ));
  }
});

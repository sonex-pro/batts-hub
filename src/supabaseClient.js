// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import supabaseConfig from './config/supabase-config.js';

// Create a single supabase client for interacting with the database
export const supabase = createClient(
  supabaseConfig.supabaseUrl,
  supabaseConfig.supabaseAnonKey
);

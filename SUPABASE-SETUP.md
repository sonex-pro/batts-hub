# Supabase Configuration Setup

This document explains how to properly set up Supabase credentials for this project.

## Initial Setup (Required for Development)

1. Copy the template file to create your local configuration:
   ```
   cp src/config/supabase-config.template.js src/config/supabase-config.local.js
   ```

2. Edit the local configuration file with your actual Supabase credentials:
   ```javascript
   // src/config/supabase-config.local.js
   export default {
     supabaseUrl: 'https://your-project-id.supabase.co',
     supabaseAnonKey: 'your-public-anon-key'
   };
   ```

3. Get your credentials from your [Supabase project settings](https://app.supabase.com/project/_/settings/api)

## Production Deployment

For production deployment, you have two options:

### Option 1: Window Variables (Recommended)

Add these script tags BEFORE your main JavaScript in your HTML:

```html
<script>
  // Define Supabase credentials (replace with your actual values)
  window.SUPABASE_URL = 'https://your-project-id.supabase.co';
  window.SUPABASE_ANON_KEY = 'your-public-anon-key';
</script>
```

### Option 2: Environment Variables with Build System

If using Vite, create a `.env` file with:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Then modify `src/config/supabase-config.js` to use them.

## Security Notes

- The local configuration file (`supabase-config.local.js`) is added to `.gitignore` to prevent exposing credentials
- Only use the anonymous/public API key in browser code, NEVER your service key
- For additional security, set up Row Level Security (RLS) in your Supabase project

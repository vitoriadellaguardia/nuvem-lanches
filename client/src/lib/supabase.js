import { createClient } from '@supabase/supabase-js';

// Essas variáveis vêm do seu .env ou do painel do Netlify
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
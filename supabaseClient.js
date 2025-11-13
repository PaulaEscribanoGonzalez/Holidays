// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// 🔹 Reemplaza con tus claves reales desde https://supabase.com/dashboard/project/wmkpcxdbovfatqrsbfkn/settings/api
const supabaseUrl = "https://wmkpcxdbovfatqrsbfkn.supabase.co";
const supabaseAnonKey = "TeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indta3BjeGRib3ZmYXRxcnNiZmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NzM5MjEsImV4cCI6MjA3NjE0OTkyMX0.qaWEQz7a_dMXLPBiGd61pJkk6cVQHskthoyed4q8hP4"; // ⚠️ No pongas la service key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

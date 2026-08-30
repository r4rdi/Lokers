import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Variabel SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum terpasang di .env!");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
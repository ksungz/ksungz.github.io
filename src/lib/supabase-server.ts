import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars not set");
  }

  return supabaseCreateClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}
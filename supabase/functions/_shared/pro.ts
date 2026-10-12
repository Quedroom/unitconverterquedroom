import { createClient } from "npm:@supabase/supabase-js@2";

export async function isValidProCode(code: unknown): Promise<boolean> {
  if (typeof code !== "string" || !/^[A-Za-z0-9-]{4,64}$/.test(code)) return false;
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data } = await admin.from("pro_codes").select("active, expires_at").eq("code", code.toUpperCase()).maybeSingle();
  if (!data?.active) return false;
  return !data.expires_at || new Date(data.expires_at) > new Date();
}

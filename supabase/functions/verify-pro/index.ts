import { isValidProCode } from "../_shared/pro.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  let code: unknown;
  try { code = (await req.json())?.code; } catch { /* invalid */ }
  const valid = await isValidProCode(code);
  return new Response(JSON.stringify({ valid }), { headers: { ...cors, "Content-Type": "application/json" } });
});

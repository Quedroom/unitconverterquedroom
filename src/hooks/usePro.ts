import { useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";

const KEY = "converthub-pro-code";
export const LIMITS = {
  free: { aiChars: 30000, fileMB: 10 },
  pro: { aiChars: 100000, fileMB: 50 },
};

const listeners = new Set<() => void>();
const read = () => { try { return localStorage.getItem(KEY) || ""; } catch { return ""; } };
const emit = () => listeners.forEach((l) => l());

export async function activatePro(code: string): Promise<boolean> {
  const clean = code.trim().toUpperCase();
  const { data } = await supabase.functions.invoke("verify-pro", { body: { code: clean } });
  if (data?.valid) { localStorage.setItem(KEY, clean); emit(); return true; }
  return false;
}

export function deactivatePro() { localStorage.removeItem(KEY); emit(); }

export function usePro() {
  const code = useSyncExternalStore(
    (l) => { listeners.add(l); window.addEventListener("storage", l); return () => { listeners.delete(l); window.removeEventListener("storage", l); }; },
    read, () => "",
  );
  const isPro = !!code;
  return { isPro, code, limits: isPro ? LIMITS.pro : LIMITS.free };
}

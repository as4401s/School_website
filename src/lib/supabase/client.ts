"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";

let browserClient:
  | ReturnType<typeof createBrowserClient>
  | undefined;

export function createBrowserSupabaseClient() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase is not configured.");
  }

  if (!browserClient) {
    const { url, anonKey } = getSupabaseEnv();

    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}

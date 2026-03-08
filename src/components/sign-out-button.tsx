"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export function SignOutButton() {
  const router = useRouter();
  const { language } = useLanguage();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    if (!hasSupabaseEnv()) {
      router.push("/");
      return;
    }

    setPending(true);

    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      className="btn btn--ghost"
      disabled={pending}
      onClick={handleSignOut}
      type="button"
    >
      {pending
        ? language === "bn"
          ? "সাইন আউট হচ্ছে..."
          : "Signing out..."
        : language === "bn"
          ? "সাইন আউট"
          : "Sign Out"}
    </button>
  );
}

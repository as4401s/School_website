import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export type AdminRole = "super_admin" | "content_admin" | "viewer";

export async function getCurrentSessionUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentRole(): Promise<AdminRole> {
  const user = await getCurrentSessionUser();

  if (!user || !hasSupabaseEnv()) {
    return "viewer";
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role =
    data?.role ||
    user.app_metadata?.role ||
    user.user_metadata?.role ||
    "viewer";

  if (
    role === "super_admin" ||
    role === "content_admin" ||
    role === "viewer"
  ) {
    return role;
  }

  return "viewer";
}

export async function requirePortalUser(next = "/portal") {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return user;
}

export async function requireContentAdmin() {
  const user = await requirePortalUser();
  const role = await getCurrentRole();

  if (role === "viewer") {
    redirect("/login?reason=restricted");
  }

  return { user, role };
}

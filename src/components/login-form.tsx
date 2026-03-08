"use client";

import { FormEvent, useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { getSiteUrl, hasSupabaseEnv } from "@/lib/supabase/env";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isConfigured = hasSupabaseEnv();

  async function handlePasswordSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured) {
      setFeedback(
        language === "bn"
          ? "লগ ইন চালু করতে সংযোগ সম্পূর্ণ করুন।"
          : "Complete the login setup before signing in.",
      );
      return;
    }

    setPending(true);
    setFeedback(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      window.location.assign(nextPath);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : language === "bn"
            ? "পাসওয়ার্ড দিয়ে লগ ইন করা যায়নি।"
            : "Password sign-in failed.",
      );
    } finally {
      setPending(false);
    }
  }

  async function handleMagicLink() {
    if (!isConfigured) {
      setFeedback(
        language === "bn"
          ? "লগ ইন চালু করতে সংযোগ সম্পূর্ণ করুন।"
          : "Complete the login setup before signing in.",
      );
      return;
    }

    setPending(true);
    setFeedback(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });

      if (error) {
        throw error;
      }

      setFeedback(
        language === "bn"
          ? "ম্যাজিক লিংক পাঠানো হয়েছে। এগোতে ইমেল দেখুন।"
          : "Magic link sent. Check your email to continue.",
      );
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : language === "bn"
            ? "ম্যাজিক লিংক পাঠানো যায়নি।"
            : "Magic link failed.",
      );
    } finally {
      setPending(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!isConfigured) {
      setFeedback(
        language === "bn"
          ? "লগ ইন চালু করতে সংযোগ সম্পূর্ণ করুন।"
          : "Complete the login setup before signing in.",
      );
      return;
    }

    setPending(true);
    setFeedback(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : language === "bn"
            ? "গুগল সাইন-ইন করা যায়নি।"
            : "Google sign-in failed.",
      );
      setPending(false);
    }
  }

  return (
    <div className="login-card">
      <div className="login-card__header">
        <p className="eyebrow">{language === "bn" ? "নিরাপদ প্রবেশ" : "Secure Access"}</p>
        <h2>{language === "bn" ? "লগ ইন করুন" : "Log in"}</h2>
        <p>
          {language === "bn"
            ? "ইমেল/পাসওয়ার্ড, ম্যাজিক লিংক অথবা গুগল লগ ইন ব্যবহার করা যেতে পারে।"
            : "Use email/password, magic link, or Google sign-in."}
        </p>
      </div>

      <form className="login-form" onSubmit={handlePasswordSignIn}>
        <label className="field">
          <span>{language === "bn" ? "ইমেল" : "Email"}</span>
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@school.org"
            type="email"
            value={email}
          />
        </label>

        <label className="field">
          <span>{language === "bn" ? "পাসওয়ার্ড" : "Password"}</span>
          <input
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </label>

        <div className="login-form__actions">
          <button className="btn btn--accent" disabled={pending} type="submit">
            {pending
              ? language === "bn"
                ? "লগ ইন হচ্ছে..."
                : "Signing in..."
              : language === "bn"
                ? "পাসওয়ার্ড দিয়ে লগ ইন"
                : "Sign in with password"}
          </button>
          <button
            className="btn btn--ghost"
            disabled={pending || !email}
            onClick={handleMagicLink}
            type="button"
          >
            {language === "bn" ? "ম্যাজিক লিংক পাঠান" : "Send magic link"}
          </button>
          <button
            className="btn btn--ghost"
            disabled={pending}
            onClick={handleGoogleSignIn}
            type="button"
          >
            {language === "bn" ? "গুগল দিয়ে চালিয়ে যান" : "Continue with Google"}
          </button>
        </div>

        <p className="helper-text">
          {language === "bn"
            ? "অনুমোদিত সদস্য ও কর্মীদের জন্য বিদ্যালয় আলাদা প্রবেশাধিকার দিতে পারে।"
            : "The school can provide access for authorised members and staff."}
        </p>

        {feedback ? <p className="status-banner">{feedback}</p> : null}
      </form>
    </div>
  );
}

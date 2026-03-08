"use client";

import { useFormStatus } from "react-dom";

import { LocalizedText } from "@/components/language-provider";
import type { BilingualText } from "@/data/site-content";

type SubmitButtonProps = {
  idleLabel: BilingualText;
  pendingLabel: BilingualText;
};

export function SubmitButton({
  idleLabel,
  pendingLabel,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn--accent" disabled={pending} type="submit">
      <LocalizedText text={pending ? pendingLabel : idleLabel} />
    </button>
  );
}

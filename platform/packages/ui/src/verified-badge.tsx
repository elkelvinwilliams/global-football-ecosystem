type Tier = "document" | "identity" | "full";

// Verification language is precise by design - the UI never inflates trust.
const LABEL: Record<Tier, string> = {
  document: "Document verified",
  identity: "Identity verified",
  full: "GFE Verified",
};

export function VerifiedBadge({ tier = "full" }: { tier?: Tier }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-2.5 py-0.5 text-xs font-semibold text-[var(--gold-500)]"
      role="img"
      aria-label={LABEL[tier]}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {LABEL[tier]}
    </span>
  );
}

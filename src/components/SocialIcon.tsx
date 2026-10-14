import { siFacebook, siGithub, siInstagram } from "simple-icons";
import type { SocialKind } from "@/content";

export function SocialIcon({ kind, size = 18 }: { kind: SocialKind; size?: number }) {
  if (kind === "linkedin") {
    // simple-icons no longer ships LinkedIn's logo; a plain "in" mark stands in.
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="6.5" y="10" width="2.4" height="7.5" />
        <circle cx="7.7" cy="7" r="1.5" />
        <path d="M11 10h2.3v1.1c.5-.8 1.4-1.3 2.6-1.3 2 0 3.1 1.2 3.1 3.6v4.1h-2.4v-3.7c0-1.2-.4-1.9-1.4-1.9s-1.8.7-1.8 1.9v3.7H11z" />
      </svg>
    );
  }
  const icon = { github: siGithub, facebook: siFacebook, instagram: siInstagram }[kind];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

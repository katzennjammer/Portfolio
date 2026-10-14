import {
  siC,
  siCss,
  siExpo,
  siFigma,
  siGit,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siPrisma,
  siReact,
  siSupabase,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import type { skills } from "@/content";

const icons: Record<(typeof skills)[number], SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  React: siReact,
  "React Native": siReact,
  "Next.js": siNextdotjs,
  Expo: siExpo,
  "Tailwind CSS": siTailwindcss,
  "Three.js": siThreedotjs,
  Laravel: siLaravel,
  PHP: siPhp,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Supabase: siSupabase,
  MySQL: siMysql,
  HTML: siHtml5,
  CSS: siCss,
  C: siC,
  Git: siGit,
  Figma: siFigma,
};

/** True when a brand color is too dark to read on a dark surface. */
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 70;
}

/** Brand-colored icon; near-black brands (Next.js, Expo…) use the text color instead. */
export function BrandIcon({ name, size = 26 }: { name: (typeof skills)[number]; size?: number }) {
  const icon = icons[name];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill={isDark(icon.hex) ? "currentColor" : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

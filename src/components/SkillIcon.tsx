import {
  siC,
  siCss,
  siExpo,
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
};

/** Monochrome brand icon that takes the current text color; brand color on hover. */
export function SkillIcon({ name }: { name: (typeof skills)[number] }) {
  const icon = icons[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      aria-hidden="true"
      className="fill-current transition-colors duration-300 group-hover:fill-[var(--brand)]"
      style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
    >
      <path d={icon.path} />
    </svg>
  );
}

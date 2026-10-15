/* eslint-disable @next/next/no-img-element -- small local logos from /public */
import type { ExperienceLogo as Logo } from "@/content";

/** Rounded app-icon style tile for an experience entry. */
export function ExperienceLogo({ logo, label, tilt = 0 }: { logo: Logo; label: string; tilt?: number }) {
  const tile =
    "grid size-16 shrink-0 place-items-center overflow-hidden rounded-[1.35rem] shadow-[0_14px_28px_-12px_rgb(0_0_0/0.45)] ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-0 sm:size-20 sm:rounded-[1.6rem]";

  return (
    <div className={tile} style={{ rotate: `${tilt}deg` }}>
      {logo.kind === "image" ? (
        <img src={logo.src} alt={`${label} logo`} className="size-full object-cover" />
      ) : logo.kind === "sun" ? (
        <div className="grid size-full place-items-center bg-[#140d08]" role="img" aria-label={`${label} logo`}>
          <svg viewBox="0 0 48 48" className="size-[58%]" aria-hidden="true">
            <defs>
              <radialGradient id="sun-core" cx="40%" cy="38%" r="60%">
                <stop offset="0%" stopColor="#ffb36b" />
                <stop offset="60%" stopColor="#f0642b" />
                <stop offset="100%" stopColor="#b83212" />
              </radialGradient>
            </defs>
            <g stroke="#ff7a4d" strokeWidth="3" strokeLinecap="round">
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i * Math.PI) / 4;
                return <line key={i} x1={24 + Math.cos(a) * 15} y1={24 + Math.sin(a) * 15} x2={24 + Math.cos(a) * 21} y2={24 + Math.sin(a) * 21} />;
              })}
            </g>
            <circle cx="24" cy="24" r="10" fill="url(#sun-core)" />
          </svg>
        </div>
      ) : (
        <div className="grid size-full place-items-center bg-gradient-to-br from-[#2f9e5a] to-[#1f6a52]" role="img" aria-label={`${label} logo`}>
          <svg viewBox="0 0 48 48" className="size-[62%]" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" aria-hidden="true">
            {/* two interlocking loops */}
            <path d="M24 24c-3.5-5-6.5-7.5-10-7.5a7.5 7.5 0 0 0 0 15c3.5 0 6.5-2.5 10-7.5z" />
            <path d="M24 24c3.5 5 6.5 7.5 10 7.5a7.5 7.5 0 0 0 0-15c-3.5 0-6.5 2.5-10 7.5z" />
          </svg>
        </div>
      )}
    </div>
  );
}

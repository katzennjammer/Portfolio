"use client";

import { useEffect, useRef } from "react";
import { profile, skills } from "@/content";
import { BrandIcon } from "./SkillIcon";

/** Rings as fractions of the stage: [x radius, y radius, seconds per lap, direction]. */
const RINGS: [number, number, number, 1 | -1][] = [
  [0.25, 0.15, 70, 1],
  [0.37, 0.235, 95, -1],
  [0.49, 0.32, 120, 1],
];
const TILT = (-14 * Math.PI) / 180;

/** How many icons sit on each ring, inner to outer. */
const RING_SIZES = [4, 6, 8];

/** React Native shares React's logo, so it is left out of the orbit. */
const orbitSkills = skills.filter((s) => s !== "React Native");
const perRing = RING_SIZES.map((n, r) => {
  const startAt = RING_SIZES.slice(0, r).reduce((a, b) => a + b, 0);
  return orbitSkills.slice(startAt, startAt + n).map((name) => ({ name }));
});

/**
 * Photo in the middle with skill icons circling it on tilted elliptical
 * rings. Icons behind the photo shrink and fade, which gives the rings depth.
 * Animation pauses off screen and is off entirely with reduced motion.
 */
export function SkillOrbit() {
  const stage = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    const start = performance.now();

    const place = (now: number) => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const t = (now - start) / 1000;
      let k = 0;
      perRing.forEach((ring, r) => {
        const [rx, ry, lap, dir] = RINGS[r];
        ring.forEach((_, j) => {
          const node = items.current[k++];
          if (!node) return;
          // Rings start half a step apart so icons on neighbouring rings do not line up.
          const a = ((j + r * 0.5) / ring.length) * Math.PI * 2 + (reduce ? 0 : (dir * t * Math.PI * 2) / lap);
          const ex = Math.cos(a) * rx * w;
          const ey = Math.sin(a) * ry * w;
          const x = ex * Math.cos(TILT) - ey * Math.sin(TILT);
          const y = ex * Math.sin(TILT) + ey * Math.cos(TILT);
          const depth = (Math.sin(a) + 1) / 2; // 0 = back, 1 = front
          node.style.transform = `translate(${w / 2 + x}px, ${h / 2 + y}px) translate(-50%, -50%) scale(${0.72 + depth * 0.38})`;
          node.style.opacity = String(0.35 + depth * 0.65);
          node.style.zIndex = depth > 0.5 ? "3" : "1";
        });
      });
    };

    const loop = (now: number) => {
      place(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    place(performance.now());
    const onResize = () => place(performance.now());
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  let k = 0;
  return (
    <div ref={stage} className="relative mx-auto aspect-[5/4] w-full max-w-[620px]">
      {/* rings */}
      {RINGS.map(([rx, ry], r) => (
        <div
          key={r}
          className="absolute top-1/2 left-1/2 rounded-[50%] border border-dashed border-line-strong"
          style={{
            width: `${rx * 200}%`,
            height: `${ry * 200 * 1.25}%`,
            transform: `translate(-50%, -50%) rotate(${(TILT * 180) / Math.PI}deg)`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* photo */}
      <div className="absolute top-1/2 left-1/2 z-[2] aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface p-[2.5%] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.45)]">
        {profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- local portrait from /public
          <img src={profile.photo} alt={profile.name} className="size-full rounded-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center rounded-full bg-accent font-serif text-6xl text-on-accent italic">jm</div>
        )}
      </div>

      {/* icons */}
      <ul aria-label="Tools I use">
        {perRing.flat().map((p) => {
          const i = k++;
          return (
            <li
              key={p.name}
              ref={(n) => {
                items.current[i] = n;
              }}
              title={p.name}
              className="absolute top-0 left-0 grid size-[clamp(2.2rem,6.2vw,3.25rem)] place-items-center rounded-2xl bg-surface text-fg shadow-[0_12px_28px_-14px_rgb(0_0_0/0.45)] ring-1 ring-line will-change-transform"
            >
              <BrandIcon name={p.name} size={22} />
              <span className="sr-only">{p.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

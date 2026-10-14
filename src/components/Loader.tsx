"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen intro that counts up while the page loads, then slides away.
 * Shown once per browser session and never with reduced motion. CSS hides it
 * after 4s even if JS never runs.
 */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // THEME_SCRIPT marks <html class="intro-seen"> on repeat visits; CSS hides the loader then.
    if (document.documentElement.classList.contains("intro-seen")) return;
    try {
      sessionStorage.setItem("jmj-intro", "1");
    } catch {}

    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    let value = 0;
    const timer = setInterval(() => {
      // Ease toward 90% while loading, then run to 100% once everything is in.
      value = loaded ? Math.min(100, value + 6) : value + (90 - value) * 0.06;
      setProgress(value);
      if (value >= 100) {
        clearInterval(timer);
        setDone(true);
        setTimeout(() => setGone(true), 800);
      }
    }, 30);

    return () => {
      clearInterval(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`loader fixed inset-0 z-50 flex flex-col justify-between bg-fg p-6 text-bg sm:p-10 ${done ? "is-done" : ""}`}
    >
      <div className="flex justify-between font-mono text-xs tracking-widest uppercase opacity-70">
        <span>Jamaica Mae Jumuad</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
      </div>
      <div>
        <div className="font-serif text-[clamp(5rem,22vw,16rem)] leading-none italic tabular-nums">
          {Math.round(progress)}
          <span className="text-mark">%</span>
        </div>
        <div className="mt-4 h-px w-full bg-bg/20">
          <div className="h-px bg-mark transition-[width] duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

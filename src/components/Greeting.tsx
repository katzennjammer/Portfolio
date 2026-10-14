"use client";

import { useEffect, useState } from "react";
import { greetings } from "@/content";

/** Cycles through "hello" in a few languages. */
export function Greeting() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % greetings.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex overflow-hidden pb-[0.1em] align-bottom" aria-label="Hello">
      <span key={i} className="greet" aria-hidden="true">
        {greetings[i]}
      </span>
    </span>
  );
}

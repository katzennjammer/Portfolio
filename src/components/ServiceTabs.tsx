"use client";

import { useState } from "react";
import { services } from "@/content";

/** Full-width row of service tabs; the selected one shows its details below. */
export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <div>
      <div role="tablist" aria-label="What I do" className="grid grid-cols-2 border-y border-line sm:grid-cols-3 lg:grid-cols-5">
        {services.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              id={`service-tab-${i}`}
              aria-selected={selected}
              aria-controls="service-panel"
              onClick={() => setActive(i)}
              className={`relative cursor-pointer border-line px-4 py-7 text-center text-xl tracking-tight transition-colors max-lg:border-b max-sm:last:col-span-2 sm:text-2xl lg:border-r lg:last:border-r-0 ${
                selected ? "bg-fg text-bg" : "hover:bg-bg-2"
              } ${i % 2 === 0 && i < services.length - 1 ? "max-sm:border-r" : ""} ${i % 3 !== 2 ? "sm:max-lg:border-r" : ""}`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${active}`}
        className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 md:grid-cols-[1.4fr_1fr] md:items-start"
      >
        <p key={s.title} className="greet text-xl leading-relaxed text-fg-2 sm:text-2xl">
          {s.body}
        </p>
        <div className="md:text-right">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {s.tools.map((t) => (
              <span key={t} className="rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Seen in: <span className="text-fg-2">{s.example}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

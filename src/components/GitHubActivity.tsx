"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Cell colors for levels 0–4. The card is dark in both themes, so these are fixed. */
const HEAT = ["rgb(255 255 255 / 0.07)", "#1d5a40", "#26875a", "#38bd77", "#62e8a0"];

/** Groups days into week columns (Sunday first), padding the first week. */
function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  if (days.length) {
    const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
    for (let i = 0; i < pad; i++) week.push(null);
  }
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

function stats(days: Day[]) {
  let longest = 0;
  let run = 0;
  let best: Day | null = null;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (!best || d.count > best.count) best = d;
  }
  const active = days.filter((d) => d.count > 0).length;
  return { longest, best, active, total: days.length };
}

function shortDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** Contribution card for the last year, from a public GitHub contributions API. */
export function GitHubActivity({ user }: { user: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { total: { lastYear: number }; contributions: Day[] }) => {
        setDays(data.contributions);
        setTotal(data.total.lastYear);
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setFailed(true);
      });
    return () => ctrl.abort();
  }, [user]);

  // On narrow screens the chart scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const el = scroller.current;
    if (days && el) el.scrollLeft = el.scrollWidth;
  }, [days]);

  const weeks = useMemo(() => (days ? toWeeks(days) : []), [days]);
  const s = useMemo(() => (days ? stats(days) : null), [days]);
  const loading = !days && !failed;
  const grid = days ? weeks : Array.from({ length: 53 }, () => Array<Day | null>(7).fill(null));

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] bg-[#121513] p-6 text-[#eef1ec] ring-1 ring-white/5 sm:rounded-[2.5rem] sm:p-12 [:root[data-theme=dark]_&]:bg-[#1b2220]"
      style={{ backgroundImage: "radial-gradient(60% 90% at 100% 0%, rgb(56 189 119 / 0.18), transparent 70%)" }}
    >
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="text-[clamp(4.5rem,13vw,9rem)] leading-[0.85] font-bold tracking-[-0.05em] tabular-nums">
            {days ? total.toLocaleString() : failed ? "—" : <span className="animate-pulse text-white/20">000</span>}
          </div>
          <div className="mt-4 text-lg text-white/75 sm:text-xl">contributions in the last year</div>
        </div>

        <dl className="grid w-full grid-cols-3 gap-4 sm:w-auto sm:gap-12">
          {[
            { label: "Best day", value: s?.best ? s.best.count : "—", unit: s?.best ? shortDate(s.best.date) : "" },
            { label: "Longest streak", value: s ? s.longest : "—", unit: "days" },
            { label: "Active days", value: s ? s.active : "—", unit: s ? `of ${s.total}` : "" },
          ].map((x) => (
            <div key={x.label}>
              <dt className="text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase sm:text-xs sm:whitespace-nowrap">{x.label}</dt>
              <dd className="mt-2">
                <span className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">{x.value}</span>{" "}
                <span className="block text-sm text-white/60 sm:inline sm:text-base">{x.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {failed ? (
        <p className="mt-12 text-white/70">
          Couldn&apos;t load the chart right now.{" "}
          <a className="underline underline-offset-4" href={`https://github.com/${user}`}>
            See it on GitHub
          </a>
          .
        </p>
      ) : (
        <div ref={scroller} className="-mx-2 mt-12 overflow-x-auto px-2 pt-2 pb-3 sm:mt-14">
          <div className="min-w-[720px]">
            <div className="mb-3 flex gap-[5px] text-sm text-white/55">
              {grid.map((w, i) => {
                const first = w.find(Boolean) ?? null;
                const d = first ? new Date(first.date + "T00:00:00Z") : null;
                return (
                  <span key={i} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">
                    {d && d.getUTCDate() <= 7 ? MONTHS[d.getUTCMonth()] : ""}
                  </span>
                );
              })}
            </div>
            <div className="flex gap-[5px]" role="img" aria-label={days ? `${total} contributions in the last year` : "Loading contributions"}>
              {grid.map((w, i) => (
                <div key={i} className="flex min-w-0 flex-1 flex-col gap-[5px]">
                  {w.map((d, j) => (
                    <span
                      key={j}
                      title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${shortDate(d.date)}` : undefined}
                      className={`aspect-square w-full rounded-[22%] ${loading ? "animate-pulse" : ""}`}
                      style={{
                        background: d ? HEAT[d.level] : loading ? HEAT[0] : "transparent",
                        boxShadow: d && d.level >= 3 ? `0 0 ${d.level === 4 ? 14 : 8}px ${HEAT[d.level]}99` : undefined,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-white/60">
        <div className="flex items-center gap-1.5">
          Less
          {HEAT.map((c, l) => (
            <span key={l} className="size-3 rounded-[3px]" style={{ background: c }} />
          ))}
          More
        </div>
        <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer" className="hover:text-white">
          @{user}
        </a>
      </div>
    </div>
  );
}

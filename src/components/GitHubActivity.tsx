"use client";

import { useEffect, useMemo, useState } from "react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  // Current streak counts back from today (or yesterday, if today is still empty).
  let current = 0;
  let i = days.length - 1;
  if (i >= 0 && days[i].count === 0) i--;
  for (; i >= 0 && days[i].count > 0; i--) current++;
  const active = days.filter((d) => d.count > 0).length;
  return { longest, current, best, active };
}

/** Contribution heatmap for the last year, from a public GitHub contributions API. */
export function GitHubActivity({ user }: { user: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { total: { lastYear: number }; contributions: Day[] }) => {
        setDays(data.contributions);
        setTotal(data.total.lastYear);
      })
      .catch((e) => {
        if (!ctrl.signal.aborted) setFailed(true);
        return e;
      });
    return () => ctrl.abort();
  }, [user]);

  const weeks = useMemo(() => (days ? toWeeks(days) : []), [days]);
  const s = useMemo(() => (days ? stats(days) : null), [days]);

  if (failed) {
    return (
      <p className="text-muted">
        Couldn&apos;t load activity right now.{" "}
        <a className="underline underline-offset-4" href={`https://github.com/${user}`}>
          See it on GitHub
        </a>
        .
      </p>
    );
  }

  const placeholder = !days;

  return (
    <div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {[
          { label: "Contributions, last year", value: placeholder ? "—" : total.toLocaleString() },
          { label: "Active days", value: placeholder ? "—" : s!.active },
          { label: "Longest streak", value: placeholder ? "—" : `${s!.longest} days` },
          {
            label: "Busiest day",
            value: placeholder || !s!.best ? "—" : `${s!.best.count}`,
          },
        ].map((x) => (
          <div key={x.label} className="bg-surface p-5">
            <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{x.value}</div>
            <div className="mt-1 text-sm text-muted">{x.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface p-5">
        <div className="min-w-[640px]">
          <div className="mb-2 flex gap-[3px] font-mono text-[10px] text-muted">
            {(placeholder ? Array.from({ length: 53 }, () => [null]) : weeks).map((w, i) => {
              const first = w.find(Boolean) as Day | undefined;
              const d = first ? new Date(first.date + "T00:00:00Z") : null;
              const showMonth = d && d.getUTCDate() <= 7;
              return (
                <span key={i} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">
                  {showMonth ? MONTHS[d!.getUTCMonth()] : ""}
                </span>
              );
            })}
          </div>
          <div className="flex gap-[3px]" role="img" aria-label={placeholder ? "Loading contributions" : `${total} contributions in the last year`}>
            {(placeholder ? Array.from({ length: 53 }, () => Array<null>(7).fill(null)) : weeks).map((w, i) => (
              <div key={i} className="flex min-w-0 flex-1 flex-col gap-[3px]">
                {w.map((d, j) => (
                  <span
                    key={j}
                    title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                    className={`aspect-square w-full rounded-[3px] ${placeholder ? "animate-pulse" : ""}`}
                    style={{ background: d ? `var(--heat-${d.level})` : placeholder ? "var(--heat-0)" : "transparent" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted">
          <a href={`https://github.com/${user}`} className="underline-offset-4 hover:underline">
            @{user}
          </a>
          <div className="flex items-center gap-1.5">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className="size-[11px] rounded-[3px]" style={{ background: `var(--heat-${l})` }} />
            ))}
            More
          </div>
        </div>
      </div>
    </div>
  );
}

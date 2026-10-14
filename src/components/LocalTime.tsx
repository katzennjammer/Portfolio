"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
}
const getSecond = () => Math.floor(Date.now() / 1000);
const getServerSecond = () => null;

/** Live clock in the given time zone. Renders a blank placeholder on the server (avoids a hydration mismatch). */
export function LocalTime({ timeZone, withSeconds = false }: { timeZone: string; withSeconds?: boolean }) {
  const second = useSyncExternalStore(subscribe, getSecond, getServerSecond);

  if (second === null) return <span className="tabular-nums opacity-0">00:00</span>;

  const now = new Date(second * 1000);
  return (
    <time className="tabular-nums" dateTime={now.toISOString()}>
      {new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        second: withSeconds ? "2-digit" : undefined,
      }).format(now)}
    </time>
  );
}

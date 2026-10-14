/** Little terminal window listing what's shipped, layered over the hero devices. */
export function ShipCard({ className = "" }: { className?: string }) {
  const rows = [
    { name: "baylo", note: "mobile + api" },
    { name: "sunward", note: "client · web" },
    { name: "suot", note: "web + mobile" },
  ];

  return (
    <div
      className={`rounded-2xl bg-[#121513] p-4 font-mono text-[clamp(9px,1.25vw,12.5px)] leading-relaxed text-[#cfd8d2] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.7)] ring-1 ring-white/10 sm:p-5 ${className}`}
      aria-hidden="true"
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[0.85em] text-white/40">~/jamaica</span>
      </div>
      <div>
        <span className="text-[#7fd6af]">❯</span> npm run ship
      </div>
      {rows.map((r) => (
        <div key={r.name} className="flex gap-2">
          <span className="text-[#7fd6af]">✓</span>
          <span className="text-white">{r.name}</span>
          <span className="ml-auto text-white/40">{r.note}</span>
        </div>
      ))}
      <div className="mt-1">
        <span className="text-[#f2c14e]">→</span> next: <span className="text-white">your project</span>
        <span className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-[#7fd6af]" />
      </div>
    </div>
  );
}

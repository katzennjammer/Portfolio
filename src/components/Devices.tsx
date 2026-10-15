/* eslint-disable @next/next/no-img-element -- static screenshots from /public */

/** Laptop frame with a screenshot on its screen. */
export function Laptop({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[1.1rem] bg-[#1b1d1c] p-[2.2%] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.55)] ring-1 ring-black/10">
        {/* camera notch */}
        <div className="absolute top-0 left-1/2 z-10 h-[3.2%] w-[11%] -translate-x-1/2 rounded-b-lg bg-[#1b1d1c]" />
        <div className="overflow-hidden rounded-[0.45rem] bg-black">
          <img src={src} alt={alt} className="block aspect-[16/10] w-full object-cover object-top" />
        </div>
      </div>
      {/* base */}
      <div className="relative mx-[-5%] h-[0.9rem] rounded-b-[1.2rem] bg-gradient-to-b from-[#d9dbd8] to-[#a9aca8] shadow-[0_18px_30px_-18px_rgb(0_0_0/0.5)]">
        <div className="absolute top-0 left-1/2 h-[45%] w-[16%] -translate-x-1/2 rounded-b-lg bg-black/15" />
      </div>
    </div>
  );
}

/** Phone frame with a screenshot on its screen. Corner radii are percentages so they stay gentle on small phones. */
export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[12%/5.5%] bg-[#1b1d1c] p-[3.5%] shadow-[0_40px_70px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[7%/3.2%] bg-black">
          <img src={src} alt={alt} className="block aspect-[9/19.5] w-full object-cover object-top" />
          <div className="absolute top-[1.2%] left-1/2 h-[2.4%] w-[24%] -translate-x-1/2 rounded-full bg-black" />
        </div>
        {/* side button */}
        <div className="absolute top-[22%] -right-[2.5%] h-[10%] w-[2.5%] rounded-r-md bg-[#2a2d2b]" />
      </div>
    </div>
  );
}

/** Browser window with a screenshot inside. */
export function BrowserWindow({ src, alt, url, className = "" }: { src: string; alt: string; url: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-[#f7f6f2] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)] ring-1 ring-black/10 ${className}`}>
      <div className="flex items-center gap-2 border-b border-black/10 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-black/5 px-3 py-0.5 text-center font-mono text-[10px] text-black/50">{url}</span>
      </div>
      <img src={src} alt={alt} className="block h-auto w-full" />
    </div>
  );
}

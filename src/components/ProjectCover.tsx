import type { Project } from "@/content";
import { BrowserWindow, Phone } from "./Devices";

/**
 * Generated cover art for a project: its name set large over the project's
 * colors. Replaced by a screenshot when the project has an `image`.
 */
export function ProjectCover({ project, index }: { project: Project; index: number }) {
  const [base, hi] = project.palette;

  if (project.image) {
    // Screenshot framed in a phone or browser window over the project's colors.
    return (
      <div
        className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[1.75rem]"
        style={{ background: base, color: hi }}
      >
        <div
          className="absolute -top-[22%] -right-[10%] aspect-square w-[52%] rounded-full opacity-90 transition-transform duration-700 group-hover:-translate-x-4 group-hover:translate-y-3"
          style={{ background: hi }}
          aria-hidden="true"
        />
        <div className="absolute top-6 left-7 font-mono text-xs tracking-widest uppercase opacity-80" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {project.kind}
        </div>
        {project.device === "phone" ? (
          <Phone
            src={project.image}
            alt={`${project.name} app screenshot`}
            className="relative mt-[12%] w-[34%] rotate-[-4deg] transition-transform duration-700 group-hover:rotate-0"
          />
        ) : (
          <BrowserWindow
            src={project.image}
            alt={`${project.name} website screenshot`}
            url={project.name}
            className="relative mt-[10%] w-[84%] transition-transform duration-700 group-hover:-translate-y-2"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] transition-transform duration-700 group-hover:scale-[1.015]"
      style={{ background: base, color: hi }}
      aria-hidden="true"
    >
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${hi}33 1px, transparent 1px), linear-gradient(90deg, ${hi}33 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* shapes */}
      <div
        className="absolute -top-[22%] -right-[10%] aspect-square w-[52%] rounded-full transition-transform duration-700 group-hover:-translate-x-4 group-hover:translate-y-3"
        style={{ background: hi, opacity: 0.9 }}
      />
      <div
        className="absolute top-[24%] left-[34%] aspect-square w-[14%] rotate-12 rounded-[28%] border-2 transition-transform duration-700 group-hover:rotate-45"
        style={{ borderColor: hi }}
      />
      <div className="absolute top-6 left-7 font-mono text-xs tracking-widest uppercase opacity-80">
        {String(index + 1).padStart(2, "0")} / {project.kind}
      </div>
      <div className="absolute right-7 bottom-6 left-7">
        <div className="font-serif text-[clamp(3rem,9vw,6.5rem)] leading-[0.85] italic">{project.name}</div>
        <div className="mt-3 text-sm font-medium opacity-85 sm:text-base">{project.tagline}</div>
      </div>
    </div>
  );
}

import type { Project } from "@/content";
import { BrowserWindow, Phone } from "./Devices";

/**
 * Right-hand panel of a project card: a soft gradient in the project's
 * colors with its screenshot framed as a browser window or phone. Projects
 * without a screenshot get their name set large instead.
 */
export function ProjectCover({ project }: { project: Project }) {
  const [base, hi] = project.palette;

  return (
    <div
      className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]"
      style={{
        background: `radial-gradient(120% 90% at 15% 10%, ${hi} 0%, transparent 55%), radial-gradient(90% 80% at 100% 100%, ${base}cc 0%, transparent 60%), linear-gradient(135deg, ${hi}, ${base}99)`,
      }}
    >
      {project.image ? (
        project.device === "phone" ? (
          <Phone
            src={project.image}
            alt={`${project.name} app screenshot`}
            className="w-[34%] translate-y-[14%] rotate-[-4deg] transition-transform duration-700 group-hover:translate-y-[10%] group-hover:rotate-0"
          />
        ) : (
          <BrowserWindow
            src={project.image}
            alt={`${project.name} website screenshot`}
            url={project.name}
            className="w-[86%] translate-y-[6%] transition-transform duration-700 group-hover:translate-y-[3%]"
          />
        )
      ) : (
        <div className="px-8 text-center" style={{ color: base }} aria-hidden="true">
          <div className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] italic transition-transform duration-700 group-hover:scale-105">
            {project.name}
          </div>
          <div className="mt-4 text-sm font-medium opacity-80 sm:text-base">{project.tagline}</div>
        </div>
      )}
    </div>
  );
}

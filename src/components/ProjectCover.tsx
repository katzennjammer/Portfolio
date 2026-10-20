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
        project.device === "phones" && project.extraImages ? (
          <div className="relative h-full w-full">
            <Phone
              src={project.extraImages[0].src}
              alt={project.extraImages[0].alt}
              className="absolute top-[24%] left-[13%] w-[27%] rotate-[-9deg] transition-transform duration-700 group-hover:-translate-x-2 group-hover:rotate-[-12deg]"
            />
            <Phone
              src={project.extraImages[1].src}
              alt={project.extraImages[1].alt}
              className="absolute top-[24%] right-[13%] w-[27%] rotate-[9deg] transition-transform duration-700 group-hover:translate-x-2 group-hover:rotate-[12deg]"
            />
            <Phone
              src={project.image}
              alt={project.imageAlt ?? `${project.name} screenshot`}
              className="absolute top-[12%] left-1/2 z-[1] w-[31%] -translate-x-1/2 transition-transform duration-700 group-hover:-translate-y-3"
            />
          </div>
        ) : project.device === "browsers" && project.extraImages ? (
          // Main screenshot large at the back, the other two layered over its lower corners.
          <div className="relative h-full w-full">
            <BrowserWindow
              src={project.image}
              alt={`${project.name} screenshot`}
              url={project.name}
              className="absolute top-[7%] left-[5%] w-[70%] transition-transform duration-700 group-hover:-translate-y-1"
            />
            <BrowserWindow
              src={project.extraImages[0].src}
              alt={project.extraImages[0].alt}
              url={project.name}
              className="absolute top-[36%] right-[4%] z-[1] w-[50%] transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            <BrowserWindow
              src={project.extraImages[1].src}
              alt={project.extraImages[1].alt}
              url={project.name}
              className="absolute bottom-[6%] left-[9%] z-[2] w-[40%] transition-transform duration-700 group-hover:-translate-x-1 group-hover:translate-y-1"
            />
          </div>
        ) : project.device === "phone" ? (
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

import { about, building, contact, experience, experienceIntro, githubUser, profile, projects, socials } from "@/content";
import { ContactChat } from "@/components/ContactChat";
import { CopyEmail } from "@/components/CopyEmail";
import { ExperienceLogo } from "@/components/ExperienceLogo";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Laptop, Phone } from "@/components/Devices";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { LocalTime } from "@/components/LocalTime";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { SkillOrbit } from "@/components/SkillOrbit";
import { ServiceTabs } from "@/components/ServiceTabs";
import { ShipCard } from "@/components/ShipCard";
import { SocialIcon } from "@/components/SocialIcon";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-10 text-sm font-medium tracking-[0.2em] text-muted uppercase sm:mb-14">{children}</div>;
}

const chips = {
  sketch: { bg: "#e9a93a", d: "M4 20l4-1 10-10-3-3L5 16zM13.5 6.5l3 3" },
  code: { bg: "#c2502a", d: "M9 8l-4 4 4 4M15 8l4 4-4 4" },
  data: { bg: "#1f6a52", d: "M12 4c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 7v10c0 1.7 3 3 7 3s7-1.3 7-3V7M5 12c0 1.7 3 3 7 3s7-1.3 7-3" },
  phone: { bg: "#3d6fb4", d: "M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3zM11 18h2" },
};

/** Inline icon tile used inside the "What I do" sentence. */
function Chip({ kind }: { kind: keyof typeof chips }) {
  const c = chips[kind];
  const tilt = { sketch: "-rotate-6", code: "rotate-3", data: "-rotate-3", phone: "rotate-6" }[kind];
  return (
    <span
      className={`mx-[0.06em] inline-grid size-[0.9em] place-items-center rounded-[0.26em] align-[-0.12em] text-white shadow-[0_8px_16px_-8px_rgb(0_0_0/0.5)] transition-transform hover:rotate-0 ${tilt}`}
      style={{ background: c.bg }}
      aria-hidden="true"
    >
      <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={c.d} />
      </svg>
    </span>
  );
}

/** Small app-icon style mark for the "Currently building" line. */
function ProjectMark({ icon }: { icon: "leaf" | "sun" }) {
  return icon === "leaf" ? (
    <span className="grid size-[1.6em] place-items-center rounded-[0.45em] bg-[#2f9e5a] text-white shadow-sm">
      <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
        <path d="M5 19l7-7" />
      </svg>
    </span>
  ) : (
    <span className="grid size-[1.6em] place-items-center rounded-[0.45em] bg-[#1b1a16] text-[#f2c14e] shadow-sm">
      <svg width="64%" height="64%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
      </svg>
    </span>
  );
}

/** Line icons for the About facts. */
function FactIcon({ icon }: { icon: (typeof about.facts)[number]["icon"] }) {
  const paths = {
    briefcase: "M4 8h16v11H4zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16",
    screen: "M3.5 5h17v11h-17zM9 20h6M12 16v4",
    pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    send: "M21 3L10 14M21 3l-7 18-4-7-7-4z",
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[icon]} />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Loader />
      <div className="mx-auto max-w-[1480px] px-2 py-2 sm:px-4 sm:py-4">
        <div id="top" className="overflow-clip rounded-[1.75rem] border border-line bg-surface shadow-[0_1px_0_rgb(0_0_0/0.02)] sm:rounded-[2.5rem]">
          <Header />
          <main>
            {/* ───────── Hero ───────── */}
            <section className="relative mx-auto max-w-7xl px-5 pt-8 pb-16 sm:px-10 sm:pt-14 lg:pb-24">
              <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
                <div>
                  <h1 className="rise flex flex-wrap items-center gap-x-5 gap-y-3 text-[clamp(3rem,6.1vw,5.6rem)] leading-[0.95] font-bold tracking-[-0.045em]">
                    <span className="relative inline-block size-[1.15em] shrink-0 rotate-[-4deg] overflow-hidden rounded-[0.32em] bg-accent shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] ring-4 ring-surface">
                      {profile.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element -- local portrait from /public
                        <img src={profile.photo} alt={profile.name} className="size-full object-cover" />
                      ) : (
                        <span className="grid size-full place-items-center font-serif text-[0.6em] font-normal text-on-accent italic">jm</span>
                      )}
                    </span>
                    <span className="whitespace-nowrap">Jamaica</span>
                    <span className="basis-full whitespace-nowrap">
                      Mae Jumuad<span className="text-accent">.</span>
                    </span>
                  </h1>

                  <p
                    className="rise mt-7 max-w-2xl text-[clamp(1.35rem,2.3vw,1.9rem)] leading-snug tracking-tight text-fg-2"
                    style={{ "--delay": "120ms" } as React.CSSProperties}
                  >
                    {profile.headline}
                  </p>

                  <p
                    className="rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[clamp(1.2rem,2vw,1.6rem)] tracking-tight text-muted"
                    style={{ "--delay": "180ms" } as React.CSSProperties}
                  >
                    Currently building
                    {building.map((b, i) => (
                      <span key={b.name} className="inline-flex items-center gap-3">
                        {i > 0 && <span>&amp;</span>}
                        <a href={b.href} className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent">
                          <ProjectMark icon={b.icon} />
                          {b.name}
                        </a>
                      </span>
                    ))}
                  </p>

                  <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--delay": "240ms" } as React.CSSProperties}>
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-2.5 rounded-full bg-fg px-7 py-4 text-lg font-medium text-bg transition-transform hover:-translate-y-0.5"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 20.5l1.6-4.6A8.4 8.4 0 1 1 21 11.5z" />
                      </svg>
                      Let&apos;s talk
                    </a>
                    {profile.cv ? (
                      <a
                        href={profile.cv}
                        download
                        className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-4 text-lg font-medium transition-colors hover:bg-accent-soft"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" />
                        </svg>
                        Download CV
                      </a>
                    ) : (
                      <a
                        href="#work"
                        className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-7 py-4 text-lg font-medium transition-colors hover:bg-accent-soft"
                      >
                        See my work
                        <Arrow />
                      </a>
                    )}
                  </div>

                  <div
                    className="rise mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line-strong pt-8"
                    style={{ "--delay": "300ms" } as React.CSSProperties}
                  >
                    <ul className="flex gap-3">
                      {socials.map((s) => (
                        <li key={s.kind}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={s.label}
                            title={s.label}
                            className="grid size-14 place-items-center rounded-full border border-line-strong transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-fg hover:text-bg"
                          >
                            <SocialIcon kind={s.kind} size={22} />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="text-right">
                      <div className="text-sm text-muted">Based in {profile.location}</div>
                      <div className="mt-1 flex items-baseline justify-end gap-2">
                        <span className="text-4xl font-semibold tracking-tight">
                          <LocalTime timeZone={profile.timeZone} withSeconds hour12={false} />
                        </span>
                        <span className="text-sm text-muted">{profile.timeZoneLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Devices: Sunward on the laptop, Analou Tracker on the phone */}
                <div className="rise relative mx-auto aspect-[10/8.4] w-full max-w-[640px]" style={{ "--delay": "200ms" } as React.CSSProperties}>
                  <Laptop src="/work/sunward.webp" alt="Sunward website" className="absolute top-[4%] left-0 w-[84%]" />
                  <Phone
                    src="/work/fish-today.webp"
                    alt="Analou Tracker today screen"
                    className="float absolute right-0 bottom-[3%] w-[26%]"
                  />
                  <ShipCard className="absolute bottom-[1%] left-[-2%] w-[56%] rotate-[-3deg] sm:left-[-4%]" />
                </div>
              </div>
            </section>

            {/* ───────── What I do ───────── */}
            <section className="pt-24 sm:pt-32">
              <div className="mx-auto max-w-7xl px-5 sm:px-10">
                <SectionLabel>What I do</SectionLabel>
                <Reveal>
                  <h2 className="max-w-6xl text-[clamp(2.1rem,5vw,4.4rem)] leading-[1.18] font-medium tracking-[-0.03em]">
                    I like owning the whole thing. I <Chip kind="sketch" /> sketch the flow, <Chip kind="code" /> write the code,{" "}
                    <Chip kind="data" /> wire up the data and <Chip kind="phone" /> put it in people&apos;s hands. One builder, start to
                    finish. <span className="marker">Apps people actually trust.</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal className="mt-16 sm:mt-20">
                <ServiceTabs />
              </Reveal>
            </section>

            {/* ───────── Work ───────── */}
            <section id="work" className="mx-auto max-w-7xl px-3 pt-24 pb-24 sm:px-6 sm:pt-32 sm:pb-32">
              <div className="px-2 sm:px-4">
                <SectionLabel>Selected work</SectionLabel>
                <Reveal>
                  <h2 className="-mt-4 text-[clamp(2.6rem,6vw,4.75rem)] leading-none font-bold tracking-[-0.04em] sm:-mt-6">Featured projects</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-2 sm:text-xl">
                    Apps I&apos;ve designed, built and shipped, from a barter marketplace to an offline tracker for a fish vendor.
                  </p>
                </Reveal>
              </div>

              <div className="mt-12 space-y-6 sm:mt-16 sm:space-y-8">
                {projects.map((p, i) => (
                  <Reveal
                    as="article"
                    key={p.name}
                    className="group grid gap-8 rounded-[1.75rem] bg-[#121513] p-5 text-[#eef1ec] ring-1 ring-white/5 sm:rounded-[2.5rem] sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:p-9 [:root[data-theme=dark]_&]:bg-[#1b2220]"
                  >
                    <div className="flex flex-col px-2 pt-2 sm:px-4 sm:pt-4">
                      <div className="flex items-center justify-between text-lg text-white/55 tabular-nums">
                        <span>
                          {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </span>
                        <span>{p.year}</span>
                      </div>

                      <div className="mt-10 lg:mt-auto">
                        <div className="font-mono text-xs tracking-widest text-[#7fd6af] uppercase">{p.kind}</div>
                        <h3 className="mt-3 text-[clamp(2.4rem,5vw,4rem)] leading-none font-bold tracking-[-0.04em]">{p.name}</h3>
                        <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">{p.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/85">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3 pb-2 lg:mb-auto">
                        {p.links.length > 0 ? (
                          p.links.map((l, j) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`group/link inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-lg font-medium transition-transform hover:-translate-y-0.5 ${
                                j === 0 ? "bg-white text-[#121513]" : "border border-white/25 text-white hover:bg-white/10"
                              }`}
                            >
                              {l.label}
                              <Arrow className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                          ))
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-white/70">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="5" y="11" width="14" height="9" rx="2" />
                              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                            </svg>
                            Private client work, happy to walk you through it
                          </span>
                        )}
                      </div>
                    </div>

                    <ProjectCover project={p} />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ───────── Experience ───────── */}
            <section id="experience" className="mx-auto max-w-7xl px-5 pb-24 sm:px-10 sm:pb-32">
              <Reveal>
                <h2 className="text-[clamp(2.6rem,6vw,4.75rem)] leading-none font-bold tracking-[-0.04em]">Experience</h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl">{experienceIntro}</p>
              </Reveal>

              <ol className="mt-12 sm:mt-16">
                {experience.map((e, i) => (
                  <Reveal
                    as="li"
                    key={e.org}
                    delay={i * 80}
                    className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-t border-line py-9 last:border-b sm:gap-x-8 sm:py-11 lg:grid-cols-[auto_1fr_auto]"
                  >
                    <ExperienceLogo logo={e.logo} label={e.org} tilt={i % 2 ? 4 : -4} />

                    <div className="min-w-0 self-center">
                      <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xl leading-snug sm:text-2xl">
                        <span className="font-semibold tracking-tight">{e.role}</span>
                        <span className="text-muted">· {e.org}</span>
                        {e.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                            <span className="size-1.5 rounded-full bg-accent" />
                            Now
                          </span>
                        )}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-fg-2 sm:text-lg">{e.body}</p>
                    </div>

                    <div className="col-start-2 lg:col-start-3 lg:self-center lg:text-right">
                      <div className="text-lg font-medium tabular-nums">{e.period}</div>
                      <div className="mt-1 text-muted">{e.meta}</div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>

            {/* ───────── GitHub ───────── */}
            <section className="mx-auto max-w-7xl px-3 py-24 sm:px-6 sm:py-32">
              <Reveal>
                <div className="mb-10 flex flex-wrap items-end justify-between gap-6 px-2 sm:mb-12 sm:px-4">
                  <div>
                    <SectionLabel>On GitHub</SectionLabel>
                    <h2 className="-mt-4 text-[clamp(2.6rem,6vw,4.75rem)] leading-none font-bold tracking-[-0.04em] sm:-mt-6">GitHub activity</h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl">
                      A year of commits across my apps, pulled live from my profile.
                    </p>
                  </div>
                  <a
                    href={`https://github.com/${githubUser}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-4 text-lg font-medium transition-colors hover:bg-fg hover:text-bg"
                  >
                    View GitHub
                    <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                <GitHubActivity user={githubUser} />
              </Reveal>
            </section>

            {/* ───────── About ───────── */}
            <section id="about" className="mx-auto max-w-7xl px-3 pb-24 sm:px-6 sm:pb-32">
              <Reveal className="grid items-center gap-12 overflow-hidden rounded-[1.75rem] border border-line bg-bg-2 px-6 py-12 sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:py-20">
                <div>
                  <SectionLabel>About me</SectionLabel>
                  <h2 className="-mt-4 max-w-xl text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[1.02] font-bold tracking-[-0.04em] sm:-mt-6">
                    {about.heading}
                  </h2>
                  <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-2">{about.bio}</p>

                  <ul className="mt-10 grid max-w-xl gap-x-8 gap-y-6 sm:grid-cols-2">
                    {about.facts.map((f) => (
                      <li key={f.text} className="flex items-start gap-3.5 text-[17px] leading-snug">
                        <span className="mt-0.5 text-muted">
                          <FactIcon icon={f.icon} />
                        </span>
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-11 inline-flex items-center gap-2.5 rounded-full bg-fg px-7 py-4 text-lg font-medium text-bg shadow-[0_14px_30px_-14px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-0.5"
                  >
                    Let&apos;s work together
                    <Arrow />
                  </a>
                </div>

                <SkillOrbit />
              </Reveal>
            </section>

            {/* ───────── Contact ───────── */}
            <section id="contact" className="mx-auto max-w-7xl px-5 pb-20 sm:px-10 sm:pb-28">
              <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                <Reveal>
                  <SectionLabel>Contact</SectionLabel>
                  <h2 className="-mt-2 text-[clamp(3.4rem,8vw,7rem)] leading-[0.92] font-bold tracking-[-0.05em]">
                    Let&apos;s build
                    <br />
                    something
                    <br />
                    good<span className="text-accent">.</span>
                  </h2>
                  <p className="mt-7 max-w-md text-lg leading-relaxed text-fg-2 sm:text-xl">{contact.subtitle}</p>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex max-w-full items-center rounded-full bg-fg px-7 py-4 text-lg font-medium break-all text-bg shadow-[0_14px_30px_-14px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-0.5"
                    >
                      {profile.email}
                    </a>
                    <CopyEmail email={profile.email} />
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <ContactChat />
                </Reveal>
              </div>
            </section>

            <footer className="mx-auto max-w-7xl px-5 sm:px-10">
              <div className="flex flex-wrap items-center justify-between gap-5 border-t border-line py-8 text-muted sm:py-10">
                <span>
                  © {new Date().getFullYear()} {profile.name}
                </span>
                <ul className="flex gap-3">
                  {socials.map((s) => (
                    <li key={s.kind}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className="grid size-12 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:bg-fg hover:text-bg"
                      >
                        <SocialIcon kind={s.kind} size={20} />
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                  Back to top
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}

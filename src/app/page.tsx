import { about, experience, githubUser, inquiries, profile, projects, services, skills, socials } from "@/content";
import { CopyEmail } from "@/components/CopyEmail";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Greeting } from "@/components/Greeting";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { LocalTime } from "@/components/LocalTime";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { SkillIcon } from "@/components/SkillIcon";
import { SocialIcon } from "@/components/SocialIcon";

const stack = ["TypeScript", "React Native", "Next.js", "Expo", "Laravel", "PostgreSQL", "Supabase", "Prisma", "Tailwind", "Three.js", "MySQL", "PHP"];

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-xs tracking-widest text-muted uppercase sm:mb-14">
      <span className="text-accent">{n}</span>
      <span className="h-px w-10 bg-line-strong" />
      <span>{children}</span>
    </div>
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
      <Header />

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8 sm:pt-36 lg:pb-24">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {profile.status && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5">
                <span className="relative flex size-2">
                  <span className="ping absolute inline-flex size-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {profile.status}
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full px-1.5 py-1.5 text-muted">
              {profile.location} · <LocalTime timeZone={profile.timeZone} />
            </span>
          </div>

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1fr_340px]">
            <div>
              <p className="rise font-serif text-3xl text-accent italic sm:text-4xl">
                <Greeting />, I&apos;m
              </p>
              <h1 className="mt-2 text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.88] font-bold tracking-[-0.045em]">
                <span className="rise block" style={{ "--delay": "80ms" } as React.CSSProperties}>
                  Jamaica Mae
                </span>
                <span className="rise block" style={{ "--delay": "160ms" } as React.CSSProperties}>
                  Jumuad<span className="text-accent">.</span>
                </span>
              </h1>
              <p
                className="rise mt-8 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl"
                style={{ "--delay": "260ms" } as React.CSSProperties}
              >
                A <span className="marker">{profile.role.toLowerCase()}</span> from Cebu. {profile.intro}
              </p>
              <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--delay": "340ms" } as React.CSSProperties}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-medium text-bg transition-transform hover:-translate-y-0.5"
                >
                  Let&apos;s talk
                  <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-medium transition-colors hover:bg-accent-soft"
                >
                  See my work
                </a>
                {profile.cv && (
                  <a
                    href={profile.cv}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-medium transition-colors hover:bg-accent-soft"
                  >
                    Download CV
                  </a>
                )}
              </div>
            </div>

            {/* Portrait card */}
            <div className="rise relative mx-auto w-full max-w-[280px] sm:max-w-[340px]" style={{ "--delay": "200ms" } as React.CSSProperties}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-accent text-on-accent shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local portrait from /public
                  <img src={profile.photo} alt={profile.name} className="size-full object-cover" />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage: "radial-gradient(currentColor 1px, transparent 1.4px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-serif text-[9rem] leading-none italic">jm</span>
                    </div>
                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between font-mono text-[11px] tracking-widest uppercase opacity-80">
                      <span>Developer</span>
                      <span>Cebu, PH</span>
                    </div>
                  </>
                )}
              </div>
              <span
                className="float absolute -top-4 -left-5 rotate-[-8deg] rounded-full bg-mark px-4 py-2 text-sm font-semibold text-[#16150f] shadow-md"
                style={{ "--r": "-8deg" } as React.CSSProperties}
              >
                BSIT · UCLM
              </span>
              <span
                className="float absolute -right-4 bottom-16 rotate-[6deg] rounded-2xl border border-line bg-surface px-4 py-3 text-sm shadow-md [animation-delay:1.2s]"
                style={{ "--r": "6deg" } as React.CSSProperties}
              >
                <span className="block font-mono text-[10px] tracking-widest text-muted uppercase">Now building</span>
                <span className="font-semibold">Baylo 🌿</span>
              </span>
            </div>
          </div>
        </section>

        {/* ───────── Stack strip ───────── */}
        <div className="marquee-wrap overflow-hidden border-y border-line bg-bg-2 py-5" aria-label="Tools I use">
          <div className="marquee flex w-max gap-10 pr-10 font-serif text-3xl whitespace-nowrap italic sm:text-4xl">
            {[...stack, ...stack].map((s, i) => (
              <span key={i} className="flex items-center gap-10" aria-hidden={i >= stack.length}>
                {s}
                <span className="text-accent not-italic">✳</span>
              </span>
            ))}
          </div>
        </div>

        {/* ───────── What I do ───────── */}
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionLabel n="01">What I do</SectionLabel>
          <Reveal>
            <h2 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              From the first sketch to the database underneath,{" "}
              <span className="font-serif font-normal text-accent italic">end to end.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="group bg-surface p-7 transition-colors hover:bg-bg-2 sm:p-9">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <p className="mt-3 max-w-sm leading-relaxed text-fg-2">{s.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Work ───────── */}
        <section id="work" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <SectionLabel n="02">Selected work</SectionLabel>
          <div className="space-y-24 sm:space-y-32">
            {projects.map((p, i) => (
              <Reveal as="article" key={p.name} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                  <ProjectCover project={p} index={i} />
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.kind}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{p.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-fg-2">{p.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-fg-2">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.links.length > 0 ? (
                    <div className="mt-7 flex flex-wrap gap-5">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group/link inline-flex items-center gap-1.5 border-b border-fg pb-0.5 font-medium"
                        >
                          {l.label}
                          <Arrow className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-7 text-sm text-muted">Private client work. Happy to walk you through it.</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── Experience ───────── */}
        <section id="experience" className="border-t border-line bg-bg-2">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
            <SectionLabel n="03">Experience</SectionLabel>
            <ol>
              {experience.map((e, i) => (
                <Reveal
                  as="li"
                  key={e.org}
                  delay={i * 80}
                  className="group grid gap-3 border-t border-line-strong py-9 last:border-b sm:grid-cols-[140px_1fr_1.2fr] sm:gap-8"
                >
                  <div className="font-mono text-sm text-muted">{e.period}</div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">{e.role}</h3>
                    <div className="mt-1 text-fg-2">
                      {e.org} <span className="text-muted">· {e.type}</span>
                    </div>
                  </div>
                  <p className="leading-relaxed text-fg-2">{e.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── GitHub ───────── */}
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionLabel n="04">On GitHub</SectionLabel>
          <Reveal>
            <h2 className="mb-10 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
              Shipping, <span className="font-serif font-normal text-accent italic">one commit at a time.</span>
            </h2>
            <GitHubActivity user={githubUser} />
          </Reveal>
        </section>

        {/* ───────── About ───────── */}
        <section id="about" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <SectionLabel n="05">About me</SectionLabel>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <p className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">{about.paragraphs[0]}</p>
              {about.paragraphs.slice(1).map((p) => (
                <p key={p} className="mt-6 text-lg leading-relaxed text-fg-2">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <dl className="divide-y divide-line rounded-3xl border border-line bg-surface">
                {about.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="text-right font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <h3 className="mb-6 font-mono text-xs tracking-widest text-muted uppercase">Tools & languages</h3>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-9">
              {skills.map((s) => (
                <li
                  key={s}
                  className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface p-3 text-center text-fg-2 transition-[transform,border-color] hover:-translate-y-1 hover:border-line-strong"
                >
                  <SkillIcon name={s} />
                  <span className="text-xs font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ───────── Contact ───────── */}
        <section id="contact" className="bg-fg text-bg">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
            <div className="mb-10 flex items-center gap-4 font-mono text-xs tracking-widest uppercase opacity-60 sm:mb-14">
              <span>06</span>
              <span className="h-px w-10 bg-current" />
              <span>Contact</span>
            </div>
            <Reveal>
              <h2 className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.04em]">
                Let&apos;s build
                <br />
                <span className="font-serif font-normal text-mark italic">something good.</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <a
                  href={`mailto:${profile.email}`}
                  className="block text-2xl font-semibold tracking-tight break-all underline decoration-bg/30 decoration-2 underline-offset-8 transition-colors hover:decoration-mark sm:text-4xl"
                >
                  {profile.email}
                </a>
                <div className="mt-6 [&_button]:border-bg/30 [&_button:hover]:bg-bg [&_button:hover]:text-fg">
                  <CopyEmail email={profile.email} />
                </div>

                <h3 className="mt-12 mb-4 text-sm opacity-60">Or start with one of these:</h3>
                <div className="flex flex-wrap gap-2.5">
                  {inquiries.map((q) => (
                    <a
                      key={q.label}
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(q.subject)}&body=${encodeURIComponent(q.body)}`}
                      className="rounded-full border border-bg/25 px-4 py-2.5 text-sm font-medium transition-colors hover:border-mark hover:bg-mark hover:text-[#16150f]"
                    >
                      {q.label}
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="rounded-3xl border border-bg/15 p-7">
                  <div className="font-mono text-xs tracking-widest uppercase opacity-60">Local time</div>
                  <div className="mt-2 text-4xl font-semibold tracking-tight">
                    <LocalTime timeZone={profile.timeZone} withSeconds />
                  </div>
                  <div className="mt-1 text-sm opacity-60">
                    {profile.location} · {profile.timeZoneLabel}
                  </div>
                  <div className="mt-8 font-mono text-xs tracking-widest uppercase opacity-60">Elsewhere</div>
                  <ul className="mt-3 space-y-1">
                    {socials.map((s) => (
                      <li key={s.kind}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between border-b border-bg/15 py-3 transition-colors hover:text-mark"
                        >
                          <span className="flex items-center gap-3">
                            <SocialIcon kind={s.kind} />
                            {s.label}
                          </span>
                          <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          <footer className="border-t border-bg/15">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm opacity-70 sm:px-8">
              <span>
                © {new Date().getFullYear()} {profile.name}
              </span>
              <a href="#top" className="inline-flex items-center gap-2 hover:text-mark">
                Back to top
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </a>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}

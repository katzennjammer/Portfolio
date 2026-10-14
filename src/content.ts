/**
 * Everything the site says lives in this file. Edit the text here and the
 * page updates; no component needs to change.
 */

export const profile = {
  name: "Jamaica Mae Jumuad",
  firstName: "Jamaica",
  role: "Designer & full-stack developer",
  location: "Cebu, Philippines",
  timeZone: "Asia/Manila",
  timeZoneLabel: "GMT+8",
  email: "jmjumuad2@gmail.com",
  /** Shown as a pill in the hero. Set to null to hide it. */
  status: "Open to work",
  /** Square photo next to your name (public/me.webp). Set to null to show a monogram instead. */
  photo: "/me.webp" as string | null,
  /** Larger photo in the About section. */
  photoLarge: "/me-full.webp" as string | null,
  /** Put your CV at public/cv.pdf and set this to "/cv.pdf" to show a download button. */
  cv: null as string | null,
  intro:
    "I build web and mobile apps for communities, the kind where strangers need a good reason to trust each other.",
  /** The big line under your name. */
  headline: "Designer and full-stack developer building web and mobile apps that real communities use, from the first sketch to the database.",
};

/** "Currently building …" line in the hero. */
export const building: { name: string; icon: "leaf" | "sun"; href: string }[] = [
  { name: "Baylo", icon: "leaf", href: "#work" },
  { name: "Sunward", icon: "sun", href: "#work" },
];

export const greetings = [
  "Hello",
  "Kumusta",
  "Maayong adlaw",
  "Hola",
  "Bonjour",
  "Konnichiwa",
  "Annyeong",
  "Ciao",
];

export type SocialKind = "github" | "linkedin" | "facebook" | "instagram";

export const socials: { kind: SocialKind; label: string; href: string }[] = [
  { kind: "github", label: "GitHub", href: "https://github.com/katzennjammer" },
  { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/jamaica-j-982777248/" },
  { kind: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61580421610398" },
  { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/_wonderjam17/" },
];

/** GitHub username for the contribution chart. */
export const githubUser = "katzennjammer";

/** Tabs under the "What I do" statement. */
export const services = [
  {
    title: "Web",
    body: "Fast, accessible sites and dashboards, from landing pages to full products with accounts, search and admin tools.",
    tools: ["Next.js", "React", "Laravel", "Tailwind"],
    example: "Sunward, Medicare",
  },
  {
    title: "Mobile",
    body: "Android and iOS apps from one codebase, with maps, cameras, real-time chat, video calls and offline-friendly data.",
    tools: ["React Native", "Expo", "TypeScript"],
    example: "Baylo, Suot",
  },
  {
    title: "UI/UX Design",
    body: "Flows, wireframes and polished screens in Figma, then built exactly as designed, because I design the screens I build.",
    tools: ["Figma", "Design systems", "Prototyping"],
    example: "Baylo's login and home feed redesign",
  },
  {
    title: "Backend & APIs",
    body: "APIs, databases and the rules that keep them honest: auth, ID verification, audit trails and ledgers that always add up.",
    tools: ["PostgreSQL", "Prisma", "Supabase", "MySQL"],
    example: "Baylo API, Sunward accounts",
  },
  {
    title: "Motion & 3D",
    body: "Interfaces that feel alive, with light and dark themes, careful motion and the occasional interactive 3D scene.",
    tools: ["Tailwind", "Three.js", "R3F", "CSS"],
    example: "Sunward's 3D views",
  },
  {
    title: "AI Features",
    body: "Practical AI inside real apps, like reading a listing photo or suggesting a fair price, with a person always confirming the result.",
    tools: ["Claude API", "Gemini API"],
    example: "Baylo photo tagging, Suot pricing",
  },
];

export type Shot = { src: string; alt: string };

export type Project = {
  name: string;
  year: string;
  kind: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  links: { label: string; href: string }[];
  /** Colors for the project's cover art: [base, highlight]. */
  palette: [string, string];
  /** Screenshot in public/work/. Without one the project gets generated cover art. */
  image?: string;
  /**
   * Frame the screenshot sits in. "phones" fans out three phones and
   * "browsers" stacks three windows, using `extraImages` for the two behind.
   */
  device?: "phone" | "phones" | "browser" | "browsers";
  /** For "phones" / "browsers": the two screenshots shown behind the main one. */
  extraImages?: [Shot, Shot];
};

export const projects: Project[] = [
  {
    name: "Baylo",
    year: "2026",
    kind: "Capstone · Mobile + Web",
    tagline: "Barter, not buy.",
    description:
      "A barter marketplace for Lapu-Lapu and Mandaue City where people trade what they no longer use for what they need. There's no money anywhere in the app.",
    highlights: [
      "Unequal trades settle with Pasa Leaves or a Deferred Points Agreement, an in-app IOU",
      "ID verification, 22 public Safe-Zone meetup hubs and two-sided confirmation codes",
      "Claude reads listing photos to suggest a category and condition",
    ],
    tags: ["Expo", "React Native", "Next.js", "Prisma", "PostgreSQL", "Claude API"],
    links: [
      { label: "View app code", href: "https://github.com/katzennjammer/baylo-app" },
      { label: "API code", href: "https://github.com/katzennjammer/baylo-api" },
    ],
    palette: ["#2f6b4f", "#cfe8a9"],
    image: "/work/baylo.webp",
    device: "phones",
    extraImages: [
      { src: "/work/baylo-hubs.webp", alt: "Baylo safe meetup hubs map" },
      { src: "/work/baylo-trades.webp", alt: "Baylo trades in progress" },
    ],
  },
  {
    name: "Sunward",
    year: "2026",
    kind: "Client project · Web",
    tagline: "Hard questions, honest answers.",
    description:
      "A search-first site where people answer hard questions and see where everyone stands. Anyone can read every topic, and accounts keep the numbers honest.",
    highlights: [
      "Topic pages with agreement meters, claim labels and a daily guessing game",
      "Interactive 3D views built with React Three Fiber",
      "Supabase accounts, with one answer and one agree per person enforced by the database",
    ],
    tags: ["Next.js", "TypeScript", "React Three Fiber", "Supabase", "Tailwind"],
    links: [],
    palette: ["#c2502a", "#ffd2a6"],
    image: "/work/sunward.webp",
    device: "browser",
  },
  {
    name: "Suot",
    year: "2026",
    kind: "Web + Mobile",
    tagline: "Style passed on.",
    description:
      "A peer-to-peer clothing-swap marketplace for the Philippines, on the web and on mobile. People trade pre-loved clothes with Pasa-Points instead of money, giving them a second life.",
    highlights: [
      "Real-time chat with swap-offer cards and peer-to-peer video calls over WebRTC",
      "Meetup map and distance-sorted catalog built on OpenStreetMap",
      "AI price suggestions from the Gemini API",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "WebRTC"],
    links: [
      { label: "View web code", href: "https://github.com/katzennjammer/Suot" },
      { label: "View app code", href: "https://github.com/katzennjammer/SuotMobile" },
    ],
    palette: ["#4a635d", "#f1c7d6"],
    image: "/work/suot.webp",
    device: "browser",
  },
  {
    name: "Medicare",
    year: "2026",
    kind: "Web · Kiosk",
    tagline: "Your health, served faster.",
    description:
      "A kiosk-based pharmacy system. Customers order medicine from a self-service screen while a separate live queue display keeps the counter moving.",
    highlights: [
      "Self-service kiosk ordering and a real-time queue display",
      "Admin dashboard for inventory, orders and low-stock alerts",
      "Staff and admin authentication with full transaction records",
    ],
    tags: ["Laravel", "PHP", "MySQL", "Tailwind", "Alpine.js"],
    links: [{ label: "View code", href: "https://github.com/katzennjammer/Medicare" }],
    palette: ["#2d5d8a", "#bfe3f2"],
    image: "/work/medicare-queue.webp",
    device: "browsers",
    extraImages: [
      { src: "/work/medicare-catalog.webp", alt: "Medicare medicine catalog" },
      { src: "/work/medicare-login.webp", alt: "Medicare staff login" },
    ],
  },
];

export const experience = [
  {
    period: "2026",
    role: "Web Developer",
    org: "Sunward",
    type: "Client",
    body: "Built the Sunward website for a client: topic pages, 3D data views, search, accounts and a light/dark theme, on Next.js and Supabase.",
  },
  {
    period: "2026",
    role: "Developer",
    org: "LoomLoop Labs",
    type: "Capstone team",
    body: "Building Baylo with a team of four: the Expo mobile app, plus a Next.js API and web admin backed by Postgres.",
  },
  {
    period: "Present",
    role: "BS Information Technology",
    org: "University of Cebu Lapu-Lapu and Mandaue",
    type: "Education",
    body: "Coursework and projects across web, mobile, databases and systems, from C programs to full-stack apps.",
  },
];

export const about = {
  heading: "I design it, then I build it right.",
  bio: "Hi! I'm Jamaica, a BS Information Technology student at the University of Cebu Lapu-Lapu and Mandaue. I like owning an app from the first sketch in Figma to launch day: I design the screens, build them in React Native or Next.js, and wire up the data with Laravel, Postgres or Supabase. So far that's a barter marketplace, a clothing-swap app, a pharmacy kiosk and a client site with 3D views. My favourite parts are the ones that make people trust an app, like ID checks, confirmation codes and numbers that always add up.",
  facts: [
    { icon: "briefcase", text: "4 projects designed and built end to end" },
    { icon: "screen", text: "Web, mobile & UI/UX design" },
    { icon: "pin", text: "Based in Cebu, Philippines" },
    { icon: "send", text: "Open to freelance & internships" },
  ] as const,
};

/** Keys must match the icon map in components/SkillIcon.tsx. */
export const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "React Native",
  "Next.js",
  "Expo",
  "Tailwind CSS",
  "Three.js",
  "Laravel",
  "PHP",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "MySQL",
  "HTML",
  "CSS",
  "C",
  "Git",
  "Figma",
] as const;

/** Quick replies in the contact chat. Each opens an email with this subject and body. */
export const inquiries = [
  {
    emoji: "🌐",
    label: "A website",
    subject: "Website project",
    body: "Hi Jamaica,\n\nI'd like to build a website:\n\n",
    reply: "Love it. Your email app should be open now. Tell me what the site is for and when you'd like it live.",
  },
  {
    emoji: "📱",
    label: "A mobile app",
    subject: "Mobile app project",
    body: "Hi Jamaica,\n\nI have an idea for a mobile app:\n\n",
    reply: "My favourite kind! Your email app should be open. Share the idea and who it's for.",
  },
  {
    emoji: "🎨",
    label: "UI/UX design",
    subject: "Design project",
    body: "Hi Jamaica,\n\nI need help with design:\n\n",
    reply: "Let's make it look good and work well. Your email app should be open, so send me what you have so far.",
  },
  {
    emoji: "💼",
    label: "A job or internship",
    subject: "Opportunity",
    body: "Hi Jamaica,\n\nWe have a role you might like:\n\n",
    reply: "Thank you for thinking of me! Your email app should be open. I'll reply as soon as I can.",
  },
  {
    emoji: "👋",
    label: "Just saying hi",
    subject: "Hello!",
    body: "Hi Jamaica,\n\n",
    reply: "Hi back! Your email app should be open. I'd love to hear from you.",
  },
];

/** Contact section copy. */
export const contact = {
  subtitle: "Got an app idea, a role to fill or a design that needs building? Send it my way.",
  greeting: "Hi there! 👋 What are you working on? Pick one below or type me a message.",
  typedReply: "Got it! Your email app should be open with your message, just hit send. ✉️",
  typedSubject: "Hello from your portfolio",
};

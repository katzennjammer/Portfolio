# Jamaica Mae Jumuad · Portfolio

A personal portfolio built with Next.js 16 and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Edit the content

All text is in [`src/content.ts`](src/content.ts): profile, projects, experience, about, skills, socials and the contact shortcuts.

- **Photo:** add `public/me.jpg` and set `profile.photo` to `"/me.jpg"`.
- **CV:** add `public/cv.pdf` and set `profile.cv` to `"/cv.pdf"`. A "Download CV" button appears.
- **Project screenshots:** add images under `public/work/` and set each project's `image`. Without one, the project gets generated cover art.
- **GitHub chart:** reads public contributions for `githubUser` from github-contributions-api.jogruber.de.

## Deploy

Import the repo at [vercel.com/new](https://vercel.com/new). No settings or environment variables are needed.

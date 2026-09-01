# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Celine's personal website as a pixel-faithful Next.js port of the `Portfolio Redesign.dc.html` mockup, deployed to Vercel and hosted on GitHub.

**Architecture:** Next.js App Router + TypeScript + Tailwind CSS. A single-page home (`/`) with hash-navigated sections (Hero, About, Projects, Kwentuhan) plus per-post article routes at `/blog/[slug]` sourced from MDX files. The design mockup is the spec — every section is translated 1:1 from the mockup's inline styles into Tailwind, using shared design tokens. Content (bio, experience, projects, socials) lives in typed data modules; blog posts live in MDX with frontmatter.

**Tech Stack:** Next.js (latest, App Router), React, TypeScript, Tailwind CSS, `next/font` (Outfit + JetBrains Mono), MDX (`@next/mdx` + `gray-matter` or `next-mdx-remote`), `@vercel/analytics`, deployed on Vercel.

**Spec:** `design-reference/Website redesign planning/Portfolio Redesign.dc.html` (home) and `design-reference/Website redesign planning/blogs/*.dc.html` (6 blog posts). These are the current `Website redesign planning/` files, moved to `design-reference/` in Phase 0. This plan argues from that mockup — executors read both.

## Global Constraints

- **Fidelity:** Pixel-faithful to the mockup. Deviate ONLY where the mockup is technically broken/incomplete (empty image slots) or physically impossible in real HTML (the `style-hover` custom attribute → Tailwind `hover:` variants; `sc-for`/`sc-if`/`image-slot` custom elements → React).
- **Design tokens (exact hex from mockup — copy verbatim):**
  - `ink` `#1a1a1a` · `bg` `#fafafa` · `surface` `#ffffff` · `accent` `#2b9fe0` · `accent-deep` `#1d7fbd`
  - `sky` `#e3f2fc` · `sky-soft` `#d3ecfb` · `sky-chip` `#e0f0fb`
  - `muted` `#6b6b66` · `muted-2` `#52524d` · `muted-3` `#98988f` · `body-text` `#333330` · `body-2` `#4c4c46`
  - `line` `#e5e5e2` · `line-2` `#ececea` · `line-dash` `#e3e3e0` · `border-soft` `#d8d8d4`
  - footer bg `#1a1a1a`, footer border `#2c2c2c`, footer muted `#787872`, footer link `#8fd0f5`
- **Fonts:** Outfit (weights 400/500/600/700) for body; JetBrains Mono (400/500, italic 400) for mono accents. Load via `next/font/google`, not `<link>`.
- **Selection color:** `::selection { background:#d3ecfb }`. **Smooth scroll:** `html { scroll-behavior:smooth }`.
- **Keyframes:** `fadeUp` (opacity 0→1, translateY 14px→0) and `skmarquee` (translateX 0→-50%).
- **Max content width:** `1060px` with `28px` horizontal padding (article pages: `720px`).
- **Accent underline SVG** under "Celine" in the hero must be preserved (inline SVG path from mockup line 37).
- **Copy is verbatim from the mockup** — including Taglish ("Ito ang kwento ko", "Kwentuhan"), the "give me a Coke and we're even ✳" sticker, and the footer quote. Do not paraphrase.
- **Node:** use the version pinned by `create-next-app` (latest LTS). **Package manager:** npm.
- **Every phase ends GREEN:** `npx tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds — before the manual gate.

---

## File Structure

```
portfolio-v2/
├─ app/
│  ├─ layout.tsx              # root layout: fonts, <body> base classes, global metadata, Analytics
│  ├─ globals.css             # Tailwind directives, @theme tokens, base styles, keyframes
│  ├─ page.tsx                # home: composes Hero, About, Projects, Kwentuhan, Footer
│  ├─ sitemap.ts              # sitemap.xml (home + all blog slugs)
│  ├─ robots.ts               # robots.txt
│  ├─ icon.png                # favicon (from logo.png)
│  ├─ opengraph-image.png     # default OG image (site-wide)
│  └─ blog/
│     └─ [slug]/
│        └─ page.tsx          # article layout, renders MDX by slug + per-post metadata
├─ components/
│  ├─ Nav.tsx                 # sticky blurred top nav (home)
│  ├─ Hero.tsx
│  ├─ About.tsx               # bio + experience + education + tech stack tiles
│  ├─ Projects.tsx            # projects grid
│  ├─ Kwentuhan.tsx           # blog list with client-side Technical/Life/All filter ("use client")
│  ├─ Footer.tsx              # dark footer, mailto + socials
│  ├─ SocialIcons.tsx         # shared SVG social icons (used by Hero + Footer)
│  └─ BlogNav.tsx             # minimal nav for article pages
├─ content/
│  ├─ site.ts                 # profile, experience, education, stack, socials (typed)
│  ├─ projects.ts             # projects array (typed)
│  ├─ blog.ts                 # loads MDX frontmatter, exposes getAllPosts()/getPost(slug)
│  └─ posts/
│     ├─ the-one-who-walks-behind.mdx
│     ├─ four-years-in-a-room.mdx
│     ├─ my-friendenemy-claude.mdx
│     ├─ the-duality-at-the-peak.mdx
│     ├─ the-5-minute-disaster.mdx
│     └─ from-breaking-things-to-building-them.mdx
├─ public/
│  ├─ images/…                # copied portfolio + blog images
│  ├─ logo.png
│  └─ Resume.pdf
├─ design-reference/          # git-ignored: the original "Website redesign planning" mockup
├─ .gitignore
├─ tailwind config (via globals.css @theme or tailwind.config.ts per create-next-app)
├─ next.config.ts             # MDX support if using @next/mdx
├─ tsconfig.json
└─ package.json
```

**Type contracts (defined once in `content/*`, consumed everywhere):**

```ts
// content/site.ts
export type Social = { href: string; label: string; path: string }; // path = SVG d attribute
export type Experience = { date: string; title: string; org: string; note?: string };
export type Education = { date: string; title: string; org: string };
export type Skill = { name: string; icon: string }; // icon = simpleicons cdn url

// content/projects.ts
export type Tag = { name: string; bg: string; fg: string };
export type Project = {
  name: string; kind: string; desc: string;
  img: string;            // /images/... path in public (placeholder if none yet)
  tags: Tag[];
  link: string;           // github or site or fallback
};

// content/blog.ts
export type Category = "Technical" | "Life";
export type PostMeta = {
  slug: string; title: string; date: string; category: Category; description: string;
};
export function getAllPosts(): PostMeta[];              // sorted newest-first by date
export function getPost(slug: string): { meta: PostMeta; content: string };
```

---

## Phase 0: Scaffold, tokens, fonts, asset migration

**Files:**
- Create: whole Next.js app (`app/`, `package.json`, `tsconfig.json`, `next.config.ts`)
- Create: `.gitignore` (add `design-reference/`, `.next/`, `node_modules/`, `.env*`)
- Create: `app/globals.css` (tokens + base + keyframes)
- Modify: `app/layout.tsx` (fonts)
- Move: `Website redesign planning/` → `design-reference/Website redesign planning/`
- Copy: images + `Resume.pdf` → `public/`

**Interfaces:**
- Produces: Tailwind theme tokens (names from Global Constraints), `Outfit`/`JetBrainsMono` font CSS variables, `public/images/...` asset paths, `public/Resume.pdf`.

- [ ] **Step 1: Scaffold the app in the project root**

Run (accept TypeScript, App Router, Tailwind, ESLint, no `src/` dir, import alias `@/*`):
```bash
cd /Users/celinejoiebuenaventura/Documents/portfolio-v2
npx create-next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```
If the CLI refuses because the directory is non-empty (the planning folder), scaffold in a temp dir and move files in, OR move the planning folder to `design-reference/` FIRST (Step 2) then scaffold.

- [ ] **Step 2: Move the mockup out of the way and git-ignore it**

```bash
mkdir -p design-reference
git init 2>/dev/null; mv "Website redesign planning" design-reference/
```
Add to `.gitignore`: `design-reference/`

- [ ] **Step 3: Copy assets into `public/`**

```bash
mkdir -p public/images
cp -R "design-reference/Website redesign planning/images/." public/images/
cp "design-reference/Website redesign planning/images/logo.png" public/logo.png
cp "design-reference/Website redesign planning/pdf/Resume.pdf" public/Resume.pdf
```
Verify `public/images/portfolio/`, `public/images/blogs/`, `public/images/about.jpg` exist. Also copy the hero photo referenced at mockup line 51 (`uploads/pasted-1788093281271-0.png`) → `public/images/hero.png`:
```bash
cp "design-reference/Website redesign planning/uploads/pasted-1788093281271-0.png" public/images/hero.png
```

- [ ] **Step 4: Configure fonts in `app/layout.tsx`**

```tsx
import { Outfit, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-outfit", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500"], style: ["normal","italic"], variable: "--font-mono", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Write `app/globals.css` with tokens, base styles, keyframes**

Use Tailwind v4 `@theme` (if create-next-app installed v4) OR extend `tailwind.config.ts` `theme.extend.colors` (if v3). Define every color token from Global Constraints, map `--font-outfit`→`font-sans` and `--font-mono`→`font-mono`. Base layer:
```css
html { scroll-behavior: smooth; }
body { margin: 0; background: #fafafa; color: #1a1a1a; font-family: var(--font-outfit), sans-serif; line-height: 1.6; }
a { color: #1a1a1a; text-decoration: none; }
::selection { background: #d3ecfb; }
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
@keyframes skmarquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
```

- [ ] **Step 6: Replace `app/page.tsx` with a minimal placeholder**

```tsx
export default function Home() {
  return <main className="mx-auto max-w-[1060px] px-7 py-24">Portfolio v2 — scaffold OK</main>;
}
```

- [ ] **Step 7: Automated gate**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all succeed, no errors.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js app, tokens, fonts, migrate assets"
```

**🔎 MANUAL VERIFICATION GATE — Phase 0**
Run `npm run dev`, open http://localhost:3000. Confirm: page loads with no console errors; "Portfolio v2 — scaffold OK" renders in the **Outfit** font; background is `#fafafa`. Confirm `public/images/` and `public/Resume.pdf` exist. **Do not proceed until Celine approves.**

---

## Phase 1: Nav + shared social icons + home shell

**Files:**
- Create: `components/Nav.tsx`, `components/SocialIcons.tsx`
- Create: `content/site.ts` (socials only for now)
- Modify: `app/page.tsx` (render `<Nav/>` + empty section anchors)

**Interfaces:**
- Consumes: design tokens, fonts (Phase 0).
- Produces: `<Nav/>`; `content/site.ts` `socials: Social[]` (data from mockup lines 271–276); `<SocialIcons items={socials} variant="hero"|"footer" />`.

- [ ] **Step 1: Add socials data to `content/site.ts`**

Copy the 4 socials verbatim from mockup lines 271–276 (GitHub, LinkedIn, Instagram, Facebook) with their `href`, `label`, and SVG `path` strings. Type as `Social[]`.

- [ ] **Step 2: Build `components/Nav.tsx`**

Port mockup lines 23–33. Sticky, `top:0`, `z-50`, `background: rgba(250,250,250,0.88)`, `backdrop-blur`, bottom border `#e5e5e2`. Inner: `max-w-[1060px] mx-auto px-7 h-16 flex items-center justify-between`. Left: `celine.` with blue `.` in mono. Right: links About / Projects / **Kwentuhan** (href `#blog`) / **Resume ↓** pill (href `/Resume.pdf`, `target="_blank"`, dark bg, `hover:bg-accent`). All hover states → Tailwind `hover:` variants matching the mockup's `style-hover`.

- [ ] **Step 3: Build `components/SocialIcons.tsx`**

Renders `<a>` per social with inline `<svg viewBox="0 0 24 24">` using `item.path`. `variant="hero"` = 36px round icon buttons (mockup line 44 styles); `variant="footer"` = text labels (mockup line 198). Map over passed `items`.

- [ ] **Step 4: Wire `app/page.tsx` shell**

```tsx
import Nav from "@/components/Nav";
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <header id="top" /><section id="about" /><section id="projects" /><section id="blog" />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Automated gate**

Run: `npx tsc --noEmit && npm run lint && npm run build` → all pass.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: sticky nav + shared social icons"
```

**🔎 MANUAL VERIFICATION GATE — Phase 1**
Compare the nav against the mockup: correct fonts, blue accent dot, backdrop blur on scroll, Resume pill hover turns blue and lifts, links hover blue. Anchor links present. **Await approval.**

---

## Phase 2: Hero section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx` (render `<Hero/>`)

**Interfaces:**
- Consumes: `socials` from `content/site.ts`, `<SocialIcons variant="hero"/>`, `public/images/hero.png`.

- [ ] **Step 1: Build `components/Hero.tsx`**

Port mockup lines 34–54 exactly:
- Two-column flex (`gap:64px`, wraps), `max-w-[1060px]`, padding `96px 28px 110px`.
- Eyebrow (mono, `#6b6b66`): `// software engineer · san pedro, laguna 🇵🇭`.
- H1 `clamp(44px,6vw,68px)`: "Hi, I'm **Celine**." with the inline underline `<svg>` (copy path from line 37) positioned under "Celine"; then "I build things end to end."
- Paragraph (mockup line 38, verbatim).
- CTA row: "See my work" (blue pill → `#projects`), "Ito ang kwento ko" (outlined pill → `#blog`), then `<SocialIcons variant="hero" items={socials}/>`.
- Right column: rotated framed photo (`next/image`, `public/images/hero.png`) with the `#d3ecfb` offset card behind (rotate 4deg) and the framed photo (rotate -2deg, 3px ink border), plus the "give me a Coke and we're even ✳" sticker (mono, rotate 6deg, `box-shadow: 2px 2px 0 #1a1a1a`). Preserve `hover:` transforms from `style-hover`.
- `fadeUp` entrance animation on both columns (0.6s, right column 0.15s delay).

- [ ] **Step 2: Render in `app/page.tsx`** (replace the empty `<header id="top"/>`).

- [ ] **Step 3: Automated gate** → `npx tsc --noEmit && npm run lint && npm run build` pass.

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: hero section"
```

**🔎 MANUAL VERIFICATION GATE — Phase 2**
Side-by-side with the mockup hero: headline underline SVG, photo rotation + offset card + sticker, both CTA pills and their hovers, fadeUp animation on load, responsive wrap on narrow width. **Await approval.**

---

## Phase 3: About section

**Files:**
- Create: `components/About.tsx`
- Modify: `content/site.ts` (add `experience`, `education`, `stack`, bio paragraphs)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `experience: Experience[]`, `education: Education[]`, `stack: Skill[]` from `content/site.ts`.
- Produces: nothing downstream depends on About.

- [ ] **Step 1: Add data to `content/site.ts`**

Copy verbatim from mockup: 3 bio paragraphs (lines 61–63), `experience` (lines 277–281), `education` (lines 282–286), `stack` (lines 263–267 — 16 skills, icon URLs `https://cdn.simpleicons.org/${slug}/4a8798`). Type them per the contracts above.

- [ ] **Step 2: Build `components/About.tsx`**

Port mockup lines 55–129. Section `border-top`, white bg. Eyebrow `01 — about`, H2 "About me". Two-column: left = 3 bio paragraphs + "View resume ↗" outlined button (→ `/Resume.pdf`) + **tech stack in Tiles style** (mockup lines 65–73: 46px tiles, hover blue). Right = Experience list + Education list (dashed row separators, mono blue dates, `flex:0 0 148px` date column). Only implement the **Tiles** variant (default); skip the other 3 `sc-if` variants.

- [ ] **Step 3: Render in `app/page.tsx`.**

- [ ] **Step 4: Automated gate** → pass.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: about section with experience, education, tech stack"
```

**🔎 MANUAL VERIFICATION GATE — Phase 3**
Verify bio copy exact, timelines with dashed separators and blue mono dates, 16 stack tiles with hover, resume button hover (dark bg + blue shadow). **Await approval.**

---

## Phase 4: Projects section

**Files:**
- Create: `components/Projects.tsx`, `content/projects.ts`
- Modify: `app/page.tsx`
- Add: placeholder image `public/images/portfolio/placeholder.png` (branded, temporary)

**Interfaces:**
- Consumes: `Project[]` from `content/projects.ts`.

- [ ] **Step 1: Build `content/projects.ts`**

Port the 6 projects from mockup lines 234–241. Map each to a real image in `public/images/portfolio/`:
- San Pedro Website Revamp → `placeholder.png` (Celine to supply real screenshot)
- Mobile Playground → `mobile-playground.png`
- Flowers by Jan → `placeholder.png` (Celine to supply)
- J A X | E-Commerce → `gallery_7.png`, link to its site/github
- Prelumens → `portfolio_4.png`
- Document Request System → `portfolio_3.png`

Tags use the mockup's tag styling: `bg:#e0f0fb, fg:#1d7fbd`, name without leading `#` (mockup `tagColor`/`tag` logic, lines 212–231). Add a `// TODO: replace placeholder.png` comment on the two pending projects.

- [ ] **Step 2: Create a temporary branded placeholder image**

Generate `public/images/portfolio/placeholder.png` — a simple 600×380 image in the blue palette (`#e3f2fc` bg, `#2b9fe0` accent) so cards look intentional. (A flat SVG exported to PNG, or a solid tinted block, is fine.)

- [ ] **Step 3: Build `components/Projects.tsx`**

Port mockup lines 130–160: eyebrow `02 — projects`, H2 "Things I've built", "want to see more? → github" link. Grid `repeat(auto-fill, minmax(300px,1fr))`, `gap:26px`. Cards: image (190px, `object-cover object-top`, `next/image`), kind label (mono uppercase), name, desc, tag chips. Card hover: `translateY(-8px) rotate(-0.6deg)` + shadow + inner image `scale(1.09)`.

- [ ] **Step 4: Render in `app/page.tsx`.**

- [ ] **Step 5: Automated gate** → pass.

- [ ] **Step 6: Commit**
```bash
git add -A && git commit -m "feat: projects grid"
```

**🔎 MANUAL VERIFICATION GATE — Phase 4**
Verify 6 cards, hover tilt + image zoom, tag chips, placeholder cards look intentional. Confirm which real screenshots Celine will send for San Pedro + Flowers by Jan. **Await approval.**

---

## Phase 5: Blog data layer + Kwentuhan section (with filter)

**Files:**
- Create: `content/blog.ts`, `content/posts/*.mdx` (6 files, frontmatter only in this phase — bodies filled in Phase 6)
- Create: `components/Kwentuhan.tsx` (`"use client"` for the filter)
- Modify: `app/page.tsx`, `next.config.ts` (MDX if needed)

**Interfaces:**
- Consumes: `getAllPosts()` from `content/blog.ts`.
- Produces: `getAllPosts(): PostMeta[]` (newest-first), `getPost(slug)` — consumed by Phase 6.

- [ ] **Step 1: Install MDX tooling**

```bash
npm install gray-matter
# plus @next/mdx @mdx-js/loader @mdx-js/react OR next-mdx-remote — pick one; @next/mdx recommended
```

- [ ] **Step 2: Create the 6 MDX files with frontmatter**

For each post use frontmatter (title/date/category/description verbatim from mockup lines 243–248) — bodies come in Phase 6:
```mdx
---
title: "My Friendenemy, Claude"
date: "2026-03-08"
category: "Technical"
description: "Finding the balance between AI assistance and human craft — without losing my confidence as a developer."
---
```
Slugs (filenames): match mockup `href` basenames — `the-one-who-walks-behind`, `four-years-in-a-room`, `my-friendenemy-claude`, `the-duality-at-the-peak`, `the-5-minute-disaster`, `from-breaking-things-to-building-them`.

- [ ] **Step 3: Build `content/blog.ts`**

`getAllPosts()` reads `content/posts/*.mdx`, parses frontmatter with `gray-matter`, returns `PostMeta[]` sorted by `date` descending. `getPost(slug)` returns `{ meta, content }`. Add a light check: export works and returns 6 posts.

- [ ] **Step 4: Verify the data layer**

Run a quick script or a temporary log in a server component: `getAllPosts().length === 6` and newest-first order (The One Who Walks Behind first). Remove the temp log after.

- [ ] **Step 5: Build `components/Kwentuhan.tsx`** (`"use client"`)

Port mockup lines 161–188: eyebrow `03 — kwentuhan`, H2 "Kwentuhan", filter buttons **All / Technical / Life** (active = dark pill, mockup lines 252–255 logic → `useState`). List rows (mockup lines 173–185): category chip + mono date + title + desc + `→`, hover `bg:#e3f2fc` + slide. Each row links to `/blog/[slug]`. Filter posts by `state.filter` client-side. Pass `getAllPosts()` from the server (`app/page.tsx`) as a prop so the client component stays data-light.

- [ ] **Step 6: Render in `app/page.tsx`** (pass `getAllPosts()` as prop).

- [ ] **Step 7: Automated gate** → pass.

- [ ] **Step 8: Commit**
```bash
git add -A && git commit -m "feat: blog data layer + kwentuhan section with filter"
```

**🔎 MANUAL VERIFICATION GATE — Phase 5**
Verify 6 posts listed newest-first, All/Technical/Life filter toggles correctly (active pill dark), row hover slide, dates + categories correct. Links point to `/blog/<slug>` (404 for now is OK — bodies come next). **Await approval.**

---

## Phase 6: Blog article pages + MDX bodies

**Files:**
- Create: `app/blog/[slug]/page.tsx`, `components/BlogNav.tsx`
- Modify: `content/posts/*.mdx` (fill bodies)
- Copy: any inline blog images already in `public/images/blogs/{friendenemy,walks-behind,duality}/`

**Interfaces:**
- Consumes: `getPost(slug)`, `getAllPosts()` (for `generateStaticParams`).

- [ ] **Step 1: Build `components/BlogNav.tsx`**

Port blog mockup nav (e.g. `my-friendenemy-claude.dc.html` lines 18–23): `celine.` → `/`, and "← all posts" → `/#blog`.

- [ ] **Step 2: Build `app/blog/[slug]/page.tsx`**

Port the article shell (blog mockup lines 24–46): `<article max-w-[720px]>`, header with category chip + date + H1 (`clamp(34px,5vw,48px)`) + "by Celine Joie V. Buenaventura", MDX body with prose styles (paragraphs `17.5px`, line-height `1.75`, `#333330`; images `w-full rounded-[14px] border`), footer "← back to all posts" + copyright. Implement `generateStaticParams()` from `getAllPosts()` and `generateMetadata()` per post (title, description, OG). Render MDX via chosen tooling.

- [ ] **Step 3: Port each post body from its `.dc.html` into MDX**

For each of the 6 posts, copy the prose paragraphs and inline `<img>` (rewrite `../images/blogs/...` → `/images/blogs/...`) from `design-reference/Website redesign planning/blogs/<slug>.dc.html` into the corresponding `content/posts/<slug>.mdx` body. Preserve paragraph breaks and image placement exactly. Posts with inline images: friendenemy, walks-behind, duality. Text-only: four-years, the-5-minute-disaster, from-breaking-things.

- [ ] **Step 4: Automated gate** → `npx tsc --noEmit && npm run lint && npm run build` pass (build must statically generate all 6 slugs).

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: blog article pages + MDX post bodies"
```

**🔎 MANUAL VERIFICATION GATE — Phase 6**
Open all 6 posts from the Kwentuhan list. Verify each article matches its mockup: header chip/date/title, prose readability, inline images load, back-links work. **Await approval.**

---

## Phase 7: Footer, SEO, favicon, sitemap/robots, analytics

**Files:**
- Create: `components/Footer.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/icon.png`, `app/opengraph-image.png`
- Modify: `app/layout.tsx` (metadata + `<Analytics/>`), `app/page.tsx` (render `<Footer/>`), each page's `generateMetadata`
- Install: `@vercel/analytics`

**Interfaces:**
- Consumes: `socials` from `content/site.ts`, `getAllPosts()` for sitemap.

- [ ] **Step 1: Build `components/Footer.tsx`**

Port mockup lines 189–207: dark bg `#1a1a1a`, "Let's talk.", `mailto:cjvbuenaventura@gmail.com` link (`#8fd0f5`), social **text** links (`<SocialIcons variant="footer"/>`), bottom row with the quote "Give me a Coke and we're even" + `© 2026 Celine Joie V. Buenaventura`. Render in `app/page.tsx`.

- [ ] **Step 2: Root metadata in `app/layout.tsx`**

`export const metadata` with `metadataBase`, default title template `%s · Celine Joie Buenaventura`, description, `openGraph` + `twitter` card. Per-page `generateMetadata` already added for blog (Phase 6); add a home-specific title/description.

- [ ] **Step 3: Favicon + OG image**

Copy `public/logo.png` → `app/icon.png` (Next auto-serves as favicon). Create `app/opengraph-image.png` (1200×630) — either export a branded card or reuse the hero photo composited on the palette.

- [ ] **Step 4: `app/sitemap.ts` + `app/robots.ts`**

`sitemap.ts` returns home `/` + `/blog/<slug>` for every `getAllPosts()`. `robots.ts` allows all, points to sitemap. Use a real production base URL constant (placeholder until domain known, e.g. the Vercel URL — update in Phase 8).

- [ ] **Step 5: Vercel Analytics**

```bash
npm install @vercel/analytics
```
Add `<Analytics/>` (from `@vercel/analytics/next`) to `app/layout.tsx` body.

- [ ] **Step 6: Automated gate** → pass.

- [ ] **Step 7: Commit**
```bash
git add -A && git commit -m "feat: footer, SEO metadata, favicon, sitemap, robots, analytics"
```

**🔎 MANUAL VERIFICATION GATE — Phase 7**
Verify footer matches mockup; check `<title>`/meta in page source; favicon shows in tab; visit `/sitemap.xml` and `/robots.txt`; confirm OG preview (e.g. paste localhost through a meta-tag previewer or inspect `<head>`). **Await approval.**

---

## Phase 8: GitHub + Vercel deployment

**Files:** none (infra). Prereq: `gh` CLI authenticated (`gh auth status`), Vercel account.

- [ ] **Step 1: Final full-site review**

Run `npm run build && npm run start`, click through the entire site once more against the mockup. Fix any stragglers, commit.

- [ ] **Step 2: Create the GitHub repo and push**

```bash
gh repo create portfolio-v2 --private --source=. --remote=origin --push
```
(Use `--public` if Celine wants it public. Confirm repo name/visibility with her first.)

- [ ] **Step 3: Deploy to Vercel**

Import the GitHub repo in the Vercel dashboard (or `npx vercel`), framework auto-detected as Next.js. Deploy. Note the production URL.

- [ ] **Step 4: Update production base URL**

Set the real Vercel URL (or custom domain) in the `metadataBase`/sitemap constant. Commit + push (triggers redeploy).

- [ ] **Step 5: Enable Analytics in Vercel**

Turn on Web Analytics for the project in the Vercel dashboard.

- [ ] **Step 6: Commit any final changes**
```bash
git add -A && git commit -m "chore: set production base url" && git push
```

**🔎 MANUAL VERIFICATION GATE — Phase 8**
Open the live Vercel URL. Verify: all sections render, all 6 blog posts open, Resume PDF downloads, favicon + OG preview work when the link is shared, Analytics receives a pageview. **Done.**

---

## Self-Review

**Spec coverage** (mockup sections → tasks):
- Nav → Phase 1 ✓ · Hero → Phase 2 ✓ · About (bio/exp/edu/stack Tiles) → Phase 3 ✓ · Projects → Phase 4 ✓ · Kwentuhan + filter → Phase 5 ✓ · Blog articles (6) → Phase 6 ✓ · Footer (mailto) → Phase 7 ✓
- Chosen extras: SEO/OG → Phase 7 ✓ · favicon → Phase 7 ✓ · sitemap/robots → Phase 7 ✓ · Vercel Analytics → Phases 7–8 ✓
- Deployment (GitHub + Vercel) → Phase 8 ✓
- Empty project slots handled (placeholder + Celine to supply) → Phase 4 ✓
- Skipped by design (matches decisions): the 3 non-default stack style variants, the current site's contact form, dark mode.

**Type consistency:** `PostMeta`/`getAllPosts`/`getPost` consistent across Phases 5–7. `Social`/`Project`/`Skill` defined in `content/*` and consumed as typed. `SocialIcons` `variant` prop (`"hero"|"footer"`) consistent between Hero (P2) and Footer (P7).

**Placeholders:** No TBD/TODO in steps except the intentional, tracked `placeholder.png` for two unshipped project screenshots (Celine supplying) and the production base URL finalized in Phase 8 — both explicitly flagged, not vague.

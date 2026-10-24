# ROADMAP.ai (for the coding agent; terse by design; read fully before any change)

## KICKOFF_PROMPT
```
Repo: pnpm monorepo "bangkardi". Owner: Kardi, senior full-stack engineer (9+ yrs), portfolio site.
Goal: recruiters/clients can reach owner in <30s; owner can ship Three.js experiments for fun, fast.
Do: read docs/ROADMAP.ai.md, then execute the lowest-numbered open task in PHASES. One task per commit.
Before declaring done: `pnpm check && pnpm build` pass, and RULES not violated.
Never: invent facts about owner, add AI-project content, buy/publish/deploy without owner confirmation.
Unknown value => see OPEN. Ask owner. Do not guess.
```

## STATE
```yaml
phase_done: [0]
phase_current: 1
verified:
  - node: 26.12.1, pnpm 10.28.0 (2026-10-23)
  - pnpm check: 0 errors
  - pnpm build: ok, 2 pages (index, 404)
  - chromium: light, dark, mobile 390px, reduced-motion all ok; no console errors except library warning (below)
  - 404: noindex, zero JS, deep path /a/b/c serves 404 with styles; no h-scroll at 360/390/768/1280 (Playwright, 2026-10-23)
  - toggle persists in localStorage key "globe-3d" = on|off
  - reduced-motion => 3D off by default, GlobeScene chunk NOT downloaded
bundle_gzip_kb: {initial_js: ~72, GlobeScene_lazy: ~240}
known_warning: "THREE.Clock deprecated" emitted by @react-three/fiber internals; not our code; revisit on R3F upgrade
```

## STACK (pinned by install, do not downgrade)
```yaml
node: ">=22.23.4"        # astro 7 hard requirement
pm: pnpm@10.28.0
astro: ^7.4
react: ^19.3
three: ^0.186
r3f: "@react-three/fiber ^9.8"
typescript: ^6           # astro check does NOT support TS7; keep ^6
dev_extra: ["@emnapi/core", "@emnapi/runtime"]   # required by @astrojs/check under pnpm; without them `astro check` mis-reports missing deps
font: "@fontsource-variable/bricolage-grotesque"
pnpm_builds_allowed: [esbuild, sharp]            # pnpm-workspace.yaml onlyBuiltDependencies
```

## COMMANDS
```
pnpm install
pnpm dev                       # gateway, astro dev
pnpm check                     # tsc (registry) + astro check (gateway)
pnpm build                     # -> apps/gateway/dist (static)
pnpm preview
CI=1 ASTRO_TELEMETRY_DISABLED=1 pnpm check < /dev/null   # non-interactive; astro check otherwise may prompt
SITE_URL=https://<domain> pnpm build                      # canonical/OG base
```

## FILE_MAP
```
packages/registry/src/index.ts        # SINGLE SOURCE OF TRUTH: Project[] (kind, period, context, summary, stack, featured, status, links)
apps/gateway/src/site.ts              # site facts + links ("" = hidden in UI)
apps/gateway/src/layouts/Base.astro   # head, OG, JSON-LD
apps/gateway/src/pages/index.astro    # page; reads registry via byKind()
apps/gateway/src/components/HeroGlobe.tsx   # island (client:idle): decides 3D on/off, toggle, IntersectionObserver pause
apps/gateway/src/components/GlobeScene.tsx  # R3F scene; lazy chunk; points + red equator torus
apps/gateway/src/components/StaticGlobe.tsx # SSR svg fallback; tilt must match TILT=0.35 in GlobeScene
apps/gateway/src/styles/global.css    # tokens + all styles
docs/PRD.md                           # human doc (Indonesian)
```

## RULES
```yaml
facts:
  - Every claim must exist in owner CV or be supplied by owner in chat. No new numbers, employers, titles, dates.
  - AI/LLM projects: OUT OF SCOPE until owner says "ready to showcase". Do not add to registry.
  - Client/government work: describe architecture+decisions only. No screenshots, internal names, data.
copy:
  - site language: English. sentence case. active voice. buttons = verb phrase ("Email me"). no "→", no "·" joins, no ALL-CAPS labels, no eyebrow labels.
design:
  - tokens only (global.css :root). one accent (--sambal). one font family.
  - forbidden: cream+terracotta, near-black+neon-green, identical rounded cards with shadow, gradient washes, entrance animations per section, hover-lift on everything.
  - motion: only the globe. anything else must answer a user action.
  - a11y floor: visible :focus-visible, skip link, prefers-reduced-motion respected, color contrast AA, keyboard-complete.
perf:
  - initial JS <= 90 KB gzip excluding lazy 3D chunk. three.js only via dynamic import.
  - no UI framework; Astro islands only where interaction is needed. no new dependency without a written reason in the commit body.
  - assets > 25 MiB or any .glb/texture => R2, not repo.
code:
  - TypeScript strict. no `any`. registry types are the contract; extend them, never fork data into pages.
  - links with empty string must render nothing (no dead links).
  - SSR output must be complete without JS.
process:
  - one task = one commit. Conventional Commits. run `pnpm check && pnpm build` before each commit.
  - ask owner before: buying domain/hosting, deploying, publishing, adding analytics, adding paid API usage, changing positioning copy.
```

## OPEN (owner must answer; ask, do not guess)
```yaml
- domain: bangkardi.<tld>    # name settled 2026-10-23; TLD (.com or other) depends on price, owner decides at purchase. keep placeholder https://bangkardi.com until then
- links.linkedin: https://www.linkedin.com/in/kardi-ansyah-64aa9b102/   # owner may switch to a shorter custom URL
- links.github: https://github.com/kardi06
- links.cv: ""               # settled 2026-10-23: web CV first (cv.<domain>, Phase 2). stays empty until P2 is live
- display_name: Kardi        # settled 2026-10-23: "Kardi" brand, "Kardiansyah" legal/footer/JSON-LD
- phone_public: false        # settled 2026-10-23: email only
- cv_pdf_public: false       # settled 2026-10-23: no PDF with phone; P2.3 PDF must omit phone
- permission_case_studies: {softnet_muneris: unknown, west_kalimantan_gov: unknown}
- avatar: undecided
- id_language: undecided
```

## PHASES
Format: `[ ] id | task | done-when`

### P1 launch gateway
```
[x] P1.1 | fill site.ts links from OPEN (only values owner supplied) | no empty CTA row except email   # linkedin+github set; cv empty by owner decision until P2
[x] P1.2 | 404 page (src/pages/404.astro), same tokens, link home | build emits dist/404.html
[x] P1.3 | OG image 1200x630 static png in public/, referenced in Base.astro (og:image, twitter summary_large_image) | link preview renders   # tags+png verified locally; real preview test after P1.6 (needs live domain). source: porto/_bmad-output/tools/og/
[x] P1.4 | @astrojs/sitemap + robots.txt sitemap line (needs real SITE_URL) | dist/sitemap-index.xml exists   # robots.txt is an endpoint (src/pages/robots.txt.ts); sitemap+robots+canonical+og follow SITE_URL, set it at P1.6
[ ] P1.5 | Lighthouse mobile run via chromium; fix regressions | perf>=90 a11y=100 best-practices>=95 seo>=95
[ ] P1.6 | deploy: Cloudflare Pages, build cmd `pnpm build`, output apps/gateway/dist, env SITE_URL, Node >=22.23.4 | owner confirms URL live
[ ] P1.7 | Cloudflare Web Analytics (no cookies), UTM convention doc in docs/ | owner confirms
```

### P2 cv.<domain>
```
[ ] P2.1 | new app apps/cv (Astro). reads registry + site.ts. one-column, semantic HTML, print stylesheet | prints to 2 pages A4
[ ] P2.2 | CV content from owner CV only: summary, skills, experience, projects, education, languages | diff vs source CV = none
[ ] P2.3 | PDF: generate from print css via chromium at build or ship owner-approved PDF | text selectable (ATS)
[ ] P2.4 | extract shared tokens to packages/ui (css only) used by gateway+cv | no visual diff on gateway
```

### P3 case studies
```
[ ] P3.1 | content collection (MDX) in apps/notes (catatan.<domain>) | schema: title, date, project id (registry), summary
[ ] P3.2 | template per PRD section 9; stub 4 registry entries as `draft` | stubs build, not linked until live
[ ] P3.3 | owner writes/approves first study; set registry status=live + links.article | gateway shows "Read the write-up"
```

### P4 labs.<domain>
```
[ ] P4.1 | app apps/labs (Astro + React islands, R3F). index lists experiments from registry kind=lab | builds static
[ ] P4.2 | experiment contract: one idea, own route, own chunk, reduced-motion fallback, "Pause" control, max 2 weeks | template in docs/EXPERIMENT_TEMPLATE.md
[ ] P4.3 | exp-001 (owner picks): candidates: shader terrain, instanced particles reacting to cursor, tiny physics toy, one-mechanic game | live + registry entry kind=lab status=live
```

### P5 tools, notes, novel
```
[ ] P5.1 | apps/tools: browser-only utilities, zero upload, each tool own route. start with 3 | no network calls with user data
[ ] P5.2 | apps/notes: posts + RSS | feed validates
[ ] P5.3 | apps/novel: chapters in MDX, reading-width typography (serif body allowed here only) | owner approves design
```

### P6 backend experiments (only if owner opts in)
```
[ ] P6.1 | NestJS + Redis + WebSocket leaderboard/rooms behind a labs experiment; deploy Railway | rate limit + spend cap + Turnstile before public
[ ] P6.2 | seat-booking live demo with 3D seat map; case study needs row-level locking, idempotency keys, 18 integration tests (facts from CV) | demo live
```

### P7 universe mode
```
[ ] P7.1 | optional 3D navigation of registry on gateway (?mode=universe); keyboard nav; pause control; plain mode stays default | Lighthouse unchanged for default mode
```

## DECISIONS (settled; do not reopen without owner)
```yaml
- gateway default = plain page; 3D globe is progressive enhancement
- hero memorable element = dotted globe + fixed red equator (equator crosses West Kalimantan; owner worked there 2018-2024)
- hosting start = Cloudflare Pages (static, free); R2 for big assets; Railway only for backends; no Supabase free for public demos (pauses after 7d idle); VPS deferred
- registry = single source of truth; sites never duplicate project data
- AI projects tracked elsewhere; excluded here until owner announces
- palette: salt #E9EFF0, ink #0F2A3D, tide #4B6878, sambal #D9301F (dark: #0B1B29, #E4EDEF, #93ABB8, #FF5A47)
```

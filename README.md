# CapMed — Egypt's Smart Healthcare City

A modern, multi-page React web application for **CAPITALMED**, Egypt's premier smart healthcare city. Built with Vite, TypeScript, and Tailwind CSS.

🌐 **Live Site:** [https://iabdelrhmaneyad.github.io/capmed/](https://iabdelrhmaneyad.github.io/capmed/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router DOM v6 |
| State / Data | TanStack React Query |
| Animations | Framer Motion |
| 3D Graphics | Three.js + React Three Fiber |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Testing | Vitest + Testing Library |
| Deployment | GitHub Pages via GitHub Actions |

---

## Project Structure

```
capmedv4-main/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build & deploy to Pages
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, fonts, etc.
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui primitives (49 components)
│   │   ├── header/             # Header sub-components
│   │   ├── About.tsx
│   │   ├── Chatbot.tsx         # AI chatbot widget
│   │   ├── CMSPanel.tsx        # Content management panel
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── NavLink.tsx
│   │   ├── Pillars.tsx
│   │   ├── QuickActions.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Services.tsx
│   │   └── Stats.tsx
│   ├── contexts/
│   │   ├── CMSContext.tsx       # CMS content state
│   │   └── LanguageContext.tsx  # Multi-language (i18n) state
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Responsive / mobile detection
│   │   └── use-toast.ts         # Toast notification hook
│   ├── lib/
│   │   └── utils.ts             # Shared utilities (cn, etc.)
│   ├── pages/                   # Route-level page components
│   │   ├── Index.tsx            # Home page
│   │   ├── AboutPage.tsx
│   │   ├── CampusMapPage.tsx    # Interactive campus map
│   │   ├── CareersPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DevelopmentPhasesPage.tsx
│   │   ├── DoctorsPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── FacilitiesPage.tsx
│   │   ├── InsurancePage.tsx
│   │   ├── InvestmentPage.tsx
│   │   ├── LocationPage.tsx
│   │   ├── MedicalTourismPage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── PartnershipsPage.tsx
│   │   ├── ResearchPage.tsx
│   │   ├── ServicesPage.tsx
│   │   └── NotFound.tsx
│   ├── test/                    # Vitest test files
│   ├── App.tsx                  # Root component + router setup
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home — Hero, Stats, Services, About, Pillars |
| `/about` | About CAPITALMED |
| `/services` | Medical Services |
| `/doctors` | Doctors Directory |
| `/facilities` | Facilities & Departments |
| `/campus-map` | Interactive Campus Map (3D) |
| `/location` | Location & Directions |
| `/medical-tourism` | Medical Tourism Hub |
| `/research` | Research & Innovation |
| `/development-phases` | City Development Phases |
| `/investment` | Investment Opportunities |
| `/partnerships` | Partnerships |
| `/insurance` | Insurance Information |
| `/careers` | Careers at CAPITALMED |
| `/news` | Latest News |
| `/faq` | Frequently Asked Questions |
| `/contact` | Contact Us |

---

## Getting Started (Local Development)

**Prerequisites:** Node.js ≥ 18

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Run tests
npm test

# Production build
npm run build
```

---

## Deployment

The site is automatically deployed to **GitHub Pages** on every push to `master` via GitHub Actions (`.github/workflows/deploy.yml`).

The workflow:
1. Checks out the repo
2. Installs Node 20 and runs `npm ci`
3. Builds with `npm run build` → outputs to `dist/`
4. Deploys `dist/` to GitHub Pages

To deploy manually, push any commit to `master`:
```bash
git add .
git commit -m "your message"
git push
```

---

## Key Features

- 🌍 **Multi-language support** — Arabic & English via `LanguageContext`
- 🗺️ **Interactive Campus Map** — 3D map powered by Three.js
- 🤖 **AI Chatbot** — Built-in assistant widget
- 📱 **Fully responsive** — Mobile-first design
- ♿ **Accessible** — Radix UI primitives via shadcn/ui
- 🎨 **Animated UI** — Framer Motion transitions throughout

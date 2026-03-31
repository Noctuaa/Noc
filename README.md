# Nocdev — Portfolio

Personal portfolio of Nocdev, freelance web application developer.

🌐 **[nocdev.fr](https://nocdev.fr)**

---

## Tech Stack

- **[Astro 5](https://astro.build)** — main framework (SSR)
- **[Vue 3](https://vuejs.org)** — interactive islands (form, navigation, modal)
- **[GSAP](https://gsap.com)** + ScrollTrigger — animations
- **[Lenis](https://lenis.darkroom.engineering)** — smooth scroll
- **[TypeScript](https://www.typescriptlang.org)** — type safety
- **[Nodemailer](https://nodemailer.com)** — contact form (SMTP)
- **Custom CSS** — CUBE CSS, semantic variables, clamp, calc

---

## Getting Started

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:4321`

---

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production into `./dist/` |
| `npm run preview` | Preview production build locally |

---

## Project Structure

```
src/
├── assets/
│   ├── images/
│   └── styles/
│       ├── base/          # Reset, variables, typography, utilities
│       ├── layouts/       # Navigation, layout, footer
│       └── sections/      # Hero, profile, portfolio, contact
├── components/            # TechCarousel, ContactForm, Modal...
├── layouts/               # Layout.astro, Footer.astro
└── pages/
    └── index.astro        # Main page
```

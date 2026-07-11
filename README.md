# Global Football Ecosystem (GFE) — Website

A multi-page marketing site for the Global Football Ecosystem: a (fictional)
network connecting players, clubs, academies, scouts, agents and fans into one
verified talent pipeline. Dark pitch-green aesthetic with a volt-lime accent
and lightweight, accessible animations.

## Open it

No build step, no dependencies. Just open `index.html` in any browser.
(Google Fonts and the demo imagery need an internet connection; everything
else works fully offline.)

```
open index.html        # macOS
```

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, manifesto, six ecosystem pillars, pathway, stats, insights, CTA |
| `ecosystem.html` | Deep-dive on the six stakeholder pillars (players, clubs, academies, scouts, agents, fans) |
| `talent.html` | The talent pathway — four stages, regional combines, development programs |
| `insights.html` | Featured report + article grid + newsletter sign-up |
| `passport.html` | Player passports demo — four switchable demo passports (identity, stats, combine benchmarks, timeline, footage, safeguarding), rendered from data |
| `contact.html` | Join-the-network form + regional hubs + safeguarding line |

## Brand

- **Taglines** — *"One game. One world. One ecosystem."* · eyebrow: *"The world's game, connected"*
- **Tone** — energetic, direct, mission-driven: opportunity for talent everywhere
- **Mark** — inline SVG football (circle + pentagon + seams), volt-lime on dark; also used as the favicon (data URI, no image files needed)

## Structure

```
global-football-ecosystem/
├── index.html  ecosystem.html  talent.html  passport.html
├── insights.html  contact.html
└── assets/
    ├── css/styles.css   # full design system (tokens, components, responsive)
    └── js/
        ├── main.js      # nav, scroll reveal, counters, parallax, forms
        └── passport.js  # passport demo data + switchable dashboard rendering
```

## Design system

- **Palette** — `#06130d` pitch-black · `#0e3b2c` pitch green · `#c6f94e` volt lime · `#f2f7f0` chalk white
- **Type** — Space Grotesk (headlines) · Inter (body)

## Animations (all GPU-friendly + accessible)

- Scroll-reveal via `IntersectionObserver` (transform/opacity only)
- Animated stat counters
- Pointer parallax on hero orbs (fine-pointer devices only)
- Sticky header transition + scroll progress bar
- Passport switcher (accessible tabs, arrow-key support, `#player` deep links) with cross-fade + growing benchmark bars
- **Respects `prefers-reduced-motion`** — all motion disables for users who opt out

## Notes for going live

- Replace Unsplash demo images with licensed photography (use `srcset`/WebP).
- Wire the two forms (`data-demo`) to a real backend or service (Formspree, etc.).
- All stats, offices and email addresses are illustrative placeholders.
- Add a real favicon set and Open Graph/social share images.
- The footer disclaimer ("demonstration project") should be replaced with real legal text before launch.

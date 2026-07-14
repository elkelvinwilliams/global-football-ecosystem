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
| `passport.html` | Player passports demo — four switchable demo passports rendered from data, each with four sub-views: Overview (identity, market value, benchmarks, AI analysis, representation, safeguarding), Match log, Growth charts, Education & availability |
| `clubs.html` | Clubs & academies — playing-style films (each club completes a guided video) + switchable club passport: identity, licence, style DNA, development record, facilities, compliance, alumni |
| `vision.html` | GFE Vision — the AI video-analysis product: annotated-clip mock, certification pipeline, position-aware metrics, integrity story |
| `scouts.html` | Scout/club console demo — filterable player pool (position/region), shortlisting, links into demo passports, safeguarded-contact flow |
| `fans.html` | Fans & partners — verified highlights, academy-funding memberships, transparent brand-deal marketplace with revenue split |
| `contact.html` | Join-the-network form + regional hubs + safeguarding line |

## Brand

- **Taglines** — *"One game. One world. One ecosystem."* · eyebrow: *"The world's game, connected"*
- **Tone** — energetic, direct, mission-driven: opportunity for talent everywhere
- **Mark** — inline SVG football (circle + pentagon + seams), volt-lime on dark; also used as the favicon (data URI, no image files needed)

## Structure

```
global-football-ecosystem/
├── index.html  ecosystem.html  clubs.html  talent.html  passport.html
├── vision.html  scouts.html  fans.html
├── insights.html  contact.html
└── assets/
    ├── css/styles.css   # full design system (tokens, components, responsive)
    ├── js/
    │   ├── main.js      # nav, scroll reveal, counters, parallax, forms
    │   ├── passport.js  # passport demo data, sub-views, SVG growth charts
    │   ├── clubs.js     # club passport demo data + style-film switching
    │   └── scouts.js    # scout console demo data, filters, shortlisting
    └── video/           # generated demo style films (mp4 + webm + poster)
```

The four club style films are original, programmatically generated tactical
animations (fictional clubs) — replace them with licensed club footage for
production; each club's `video`/`poster` path in `assets/js/clubs.js` is the
drop-in point.

## Design system

- **Palette** — `#06130d` pitch-black · `#0e3b2c` pitch green · `#c6f94e` volt lime · `#f2f7f0` chalk white
- **Type** — Space Grotesk (headlines) · Inter (body)

## Animations (all GPU-friendly + accessible)

- Scroll-reveal via `IntersectionObserver` (transform/opacity only)
- Animated stat counters
- Pointer parallax on hero orbs (fine-pointer devices only)
- Sticky header transition + scroll progress bar
- Passport switcher (accessible tabs, arrow-key support, `#player` deep links) with cross-fade + growing benchmark bars
- Passport sub-views (match log, SVG growth charts with hover tooltips, education record)
- Scout console filters + shortlist; GFE Vision animated tracking mock (all reduced-motion aware)
- **Respects `prefers-reduced-motion`** — all motion disables for users who opt out

## Notes for going live

- Replace Unsplash demo images with licensed photography (use `srcset`/WebP).
- Wire the two forms (`data-demo`) to a real backend or service (Formspree, etc.).
- All stats, offices and email addresses are illustrative placeholders.
- Add a real favicon set and Open Graph/social share images.
- The footer disclaimer ("demonstration project") should be replaced with real legal text before launch.

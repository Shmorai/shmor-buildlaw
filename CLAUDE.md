# BuildLaw (buildlaw.shmor.ai)

A Shmor marketplace (shared rules in `../../CLAUDE.md`): its own brand, design and SEO. UK construction law made clear for builders and clients: JCT and NEC contracts, payment notices, retentions, contract administration and disputes. Repo: `Shmorai/shmor-buildlaw` (private until launch). Status: **building**.

## Where things are
| What | Where |
|---|---|
| Card on shmor.ai, search keywords, **referral links**, offers, SEO defaults | `shmor-site.json` |
| Pages (1 JSON file = 1 Google landing page) | `content/` (`home.json` = homepage) |
| Design: header, logo, footer | `templates/layout.html` |
| Design: styles | `assets/site.css` (kit defaults; add this site's theme block at the bottom) |
| Generated output (don't edit by hand) | `index.html`, `*/index.html`, `sitemap.xml`, `robots.txt`, `404.html`, `search/` |

## Pages (22)
Home · construction-contracts · jct-contracts · nec-contracts · construction-payments · retentions · contract-administration · key-contract-terms · construction-disputes · construction-mediation · adjudication · homeowners-and-builders · case-studies (9 real landmark cases + 5 clearly-labelled illustrative examples) · example-notices-and-letters (free example wording) · services · editorial-standards · blog (+5 posts: retention ban / late payments bill, JCT 2024, court-ordered mediation, Arbitration Act 2025, URS v BDW).
Top menu = pages with navOrder (Contracts, JCT, Payments, Administration, Disputes, Case studies, Free examples, Blog, Services [mobile/tablet only; desktop shows the brick "Get expert help" header button]). `short` gives footer labels for pages not in the menu.
**Home blocks:** trust strip → What do you need help with? (9 photo tiles) → Key rules at a glance (8 white cards on a green band) → Sorting out a dispute (3 steps) → Need expert help? (4 service cards, `html` block with class `services`) → Why BuildLaw ("Clause 1.1" numbered) → latest posts → Popular questions → guide text → FAQ (visual order via CSS `order`).

## Design
"Keystone" (created 2026-10-15): UK professional. Portland-stone pages #F8F6F1, bands #F0ECE3, lines #E2DCCF, British racing green #123A2C (ink, bands; #0B261D footer/topbar), brick red #C2532F (buttons, rules, icons), #9E3F21 brick text on light, #EC9A78 brick on green, stone #EFE7D6, link green #1D5A44. Libre Baskerville headings + Public Sans body. Logo = keystone arch (stone) with a brick-red keystone carrying a §, in a green rounded square + "Build*Law*" (Law italic brick) + tagline "Every brick, every clause". Footer is topped with a CSS brick-course band. Case summaries use `.case` boxes (`.case.example` for illustrative ones), example notices use `.letter` boxes. Checked at 320/375/768/1280 (no horizontal scroll).

## Content rules
General information, never advice; BuildLaw is not a law firm. Written mainly for England & Wales, flagging Scotland/NI differences. No invented cases, fees or statistics; worked examples must stay labelled "illustrative" with made-up figures. Case links go to Find Case Law (Macob to BAILII). Services are delivered by independent professionals: never invent named lawyers, firms, credentials, prices or turnaround times. The enquiry link currently goes to shmor.ai/contact/ — replace with a dedicated enquiry email/form once the user supplies one. Time-sensitive facts to re-check: the late payments bill / retention ban (in the Lords as of Oct 2026), JCT 2024 rollout, Late Payment Act interest rate.

## Commands (run here)
```bash
node tools/build.js           # rebuild after ANY change to content/, templates/ or shmor-site.json
node tools/serve.js <port>    # local preview (see the "buildlaw" preview config)
```
After changing `shmor-site.json`, also run `node tools/sync-network.js` in `../../shmor-ai`.

## Referral links
Add to `shmor-site.json` → `"links"`, list slugs in a page's `"partners"` (or add `"offers"`), rebuild, sync the master, then commit both repos.

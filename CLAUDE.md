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

## Pages (37)
Home · construction-contracts · jct-contracts · nec-contracts · construction-payments · retentions · contract-administration · key-contract-terms · construction-disputes · construction-mediation · adjudication · homeowners-and-builders · case-studies (9 real landmark cases + 5 clearly-labelled illustrative examples) · example-notices-and-letters (free example wording) · services · editorial-standards · blog (+20 posts: retention ban / late payments bill, JCT 2024, court-ordered mediation, Arbitration Act 2025, URS v BDW, plus 15 keyword-targeted explainers added 2026-10-15: pay less notices, payment vs pay less notice, smash-and-grab adjudication, extension of time, liquidated damages, practical completion, variations, JCT MW vs IC, JCT vs NEC, collateral warranties, CIS, contractor insolvency, defects time limits, Party Wall Act, Building Regulations dutyholders). Each post links to 2–5 guides/posts in its body and in "related", and the guides link back via "related".
Top menu = pages with navOrder (Contracts, JCT, Payments, Administration, Disputes, Case studies, Free examples, Blog, Services [mobile/tablet only; desktop shows the brick "Get expert help" header button]). `short` gives footer labels for pages not in the menu.
**Home blocks:** trust strip → What do you need help with? (9 photo tiles) → Key rules at a glance (8 white cards on a navy blueprint band) → Payment deadline calculator → Sorting out a dispute (3 steps) → Need expert help? (4 service cards, `html` block with class `services`) → Why BuildLaw ("Clause 1.1" numbered) → latest posts → Popular questions → guide text → FAQ (visual order via CSS `order`).

## Design
"Blueprint" (redesigned 2026-10-15, replacing "Keystone"): modern UK professional. Midnight navy #0A1A33 (ink, heroes, deal band, footer; #071226 topbar) with a faint blueprint grid (CSS var --grid), hi-vis amber #F5A524 (buttons, icons, accents; #A65F00 amber text on light, #FFF4DF amber tint), link blue #1F56B3, cool-white pages #F6F8FB, lines #DDE4EE. Fonts: Sora (headings, wordmark), Inter (body), Instrument Serif italic (h1 highlight + "law" in the wordmark), IBM Plex Mono (eyebrows, labels, badges). Logo = amber tower crane lifting a § block on a navy rounded square (inverted amber version in the footer); wordmark "Build" Sora 800 + "law" Instrument Serif italic amber, with a mono "UK CONSTRUCTION LAW" tag. Home hero: text left, framed photo right with amber survey-corner brackets (.hero-art) and a floating "5 days" payment-notice badge (in heroHtml); full-bleed photo under navy on <1000px. Inner heroes: photo faded in on the right. Footer topped with an amber ruler. Payment deadline calculator (`html` block with class `calc-band`, on home + construction-payments; JS at the end of assets/site.js) counts days per HGCRA s116 using the live GOV.UK bank-holidays feed (England & Wales / Scotland / NI). Checked at 320/375/768/1024/1280 (no horizontal scroll; full menu fits at 1280). Manifest accent is sky #5FA8FF because amber is TradesStation's.

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

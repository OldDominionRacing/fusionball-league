# Fusionball League

Working repository for Fusionball — a continuous-play contact field sport launching in Colorado Springs, spring 2027.

This repo is also the public website. It is served by GitHub Pages from the repo root at **FusionballLeague.com**; **watchFBL.com** forwards to the `/watch/` page (see *Deploying* below).

## Contents

### Documents
- `docs/fusionball-charter-v0.1.md` — founding principles, ownership model, competition structure, economics, entity structure, open decisions
- `docs/fusionball-rulebook-v0.1.md` — rules tagged FIXED / PROPOSED / OPEN, with the fall playtest calibration plan
- `marketing/fusionball-ragain-field-proposal.pdf` — two-page sheet sent to City Parks (note: still says special event permit / additional insured; rental path and certificate-holder insurance are correct per Parks, Sep 2026)
- `marketing/fusionball-shield.png` — logo (full resolution)

### Not in this repo
The year-one finance model and the strategy notes are unfinalized working material. They live in `private/`, which is gitignored, so they stay on the founder's machine and never reach the public site.

### Website (static, no build step)
- `index.html` — home: the game, 6/3/1 scoring, the 2027 Invitational, ownership, contact
- `rules/` — fixed elements, then the full rulebook rendered live from `docs/fusionball-rulebook-v0.1.md`
- `charter/` — the three principles and the pyramid, then the full charter rendered live from `docs/fusionball-charter-v0.1.md`
- `teams/` — field a team: roster, units, cost, timeline, sponsors and vendors
- `watch/` — the watchFBL.com stream page (YouTube embed; see *Stream setup*)
- `assets/` — stylesheet, shared script, web-sized logo and favicons
- `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` — GitHub Pages plumbing

Edit a markdown file in `docs/` and the rules and charter pages update on the next deploy; there is nothing to rebuild. The pages load `marked` from cdnjs to render the markdown in the browser.

## Domains
- FusionballLeague.com — the league
- watchFBL.com — the stream (points at YouTube)

## Deploying

**GitHub Pages.** Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. The `CNAME` file sets the custom domain to `fusionballleague.com`; tick *Enforce HTTPS* once the certificate is issued. GitHub Pages on a free plan requires the repository to be public.

**DNS for fusionballleague.com** (at the registrar):
- `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` for `www` → `olddominionracing.github.io`

**watchFBL.com.** GitHub Pages serves one custom domain per repository, so point watchFBL.com at the watch page with a registrar-level forward (301 redirect) from `watchfbl.com` and `www.watchfbl.com` to `https://fusionballleague.com/watch/`. If you would rather it resolve directly to YouTube, forward it to the channel, https://www.youtube.com/@fusionball-w9k7j, instead.

**Stream setup.** In `watch/index.html`, set `CHANNEL` to the league's YouTube channel URL and `VIDEO_ID` to the id of the live stream or archived game to embed. Leave `VIDEO_ID` empty to show the offline card.

## Status (Sep 2026)
- Venue: Ragain Field, City of Colorado Springs, multi-date field rental (contact: Joe, Parks Sports Office)
- Production: outreach to John Pak (freelance) and Kelly McCommons (Colorado College); Garrett Kuecker (UCCS) consulting
- Next: fall closed playtests to freeze Rulebook v1.0; hoop prototypes (30/36/48 in rings); entity formation and trademark

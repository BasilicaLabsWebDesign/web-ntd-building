# NTD Carpentry & Building

One-page site for NTD Carpentry & Building, a carpenter and builder covering
Greater London, currently wrapped in a two-tab pitch demo. It is served as
Cloudflare Workers static assets: no framework, no build step. The files in
`public/` are the site.

## Structure

```
public/
  index.html            the new site, as supplied, with the demo bar on top
  offer/index.html      "The offer" tab: tale of the tape, prices and terms
  404.html              themed not-found page, served for any unknown path
  favicon.svg           monogram in the site's colours
  robots.txt            disallows all crawling while this is a pitch demo
  _headers              security and caching headers
  assets/
    css/site.css        the new site's stylesheet, including its embedded fonts
    img/og-image.png    social thumbnail (1200x630) for link previews
    js/enquiry.js       the enquiry-form handler (opens the visitor's email app)
  fonts/                Oswald and Inter, self-hosted for the offer page
social/                source and render script for the social thumbnail
wrangler.jsonc          assets-only Worker config, no Worker script
package.json            wrangler and playwright-core as devDependencies
package-lock.json
CLAUDE.md               working policy and the release ledger
prompt text/            the records behind the version currently in service
```

The new site's content, design and behaviour are as supplied, with two
deliberate changes since: the top bar stays pinned on screen, and a single
pinned bar of three buttons, Call, WhatsApp and Email, replaces the footer
and the phone call bar. The stylesheet and the form script were moved
out of the HTML into their own files, in the same positions and order. The
structured-data block (`application/ld+json`) stays inline because search
engines only read it from the page itself.

## The pitch demo

A dark "Demo" bar fixed to the top of both pages links them:

| Route | Tab | What it shows |
| --- | --- | --- |
| `/` | New site | The one-page site built for the business |
| `/offer/` | The offer | Tale of the tape, the £500 site and £50 changes, terms, ownership |

- **The demo bar** sits between two `site-pitch demo bar` comments in each page.
  On the new site it comes with a small style block that keeps the site's own
  sticky header and anchor jumps below it.
- **Their current site** opens in a new tab from a link at the top of the
  offer page. The repo holds no copy of it.
- **The offer** follows the site-pitch offer template: short titles and
  one-line subtitles, the sheet's numbers and promises, and the new site's
  colours and fonts. It is worded with the sell vocabulary, so the market range
  reads £1.5k–£8k. Replies go to the message that brought them to the demo.
  The referral band is left out.
- **The tale of the tape has three pairs**: the Wix address, and two Wix
  policies that apply to it. Pairs about the page itself need a capture of
  their site, which needs `wixsite.com`, `wixstatic.com` and `parastorage.com`
  reachable, or notes from someone who has opened it.
- Every page carries `noindex`. `robots.txt` keeps search engines out but lets
  link-preview bots in, so a shared link still shows its thumbnail.

## Social thumbnail

Shared links to either page preview with `public/assets/img/og-image.png`: the
business name, what and where, the free-consultation line and the phone
number, in the new site's colours and fonts. Its source is
`social/og-image.html`; after editing it, run `npm run social` to render the
PNG again at exactly 1200x630.

- **The image address is absolute**, on the demo's live domain, because
  WhatsApp, Instagram, Facebook and X need a full address. Move `og:image`
  and `og:url` on both pages with the site when it changes domain.
- **A changed image needs a new file name.** Everything under `/assets/` is
  cached for a year, and the social platforms cache previews by address too.

## Local development

```bash
npm install
npm run dev        # wrangler dev, serves public/ on http://localhost:8787
```

Any static server works too, e.g. `python3 -m http.server -d public 8000`.

## Verification before a release

```bash
npm run check      # wrangler deploy --dry-run: validates the config
```

Then render every tab in a browser or headless Chromium at desktop and phone
widths, and run the site-pitch layout verifier (see `CLAUDE.md`). Confirm the
styles apply, the fonts load and nothing overflows from 320px up.

## Deployment

The repository is connected to Cloudflare Workers Builds: every push to `main`
deploys to production, live at https://ntd-building.basilicalabs.ai. `CLAUDE.md` carries the release policy and the ledger.

To connect it the first time: Cloudflare dashboard → Workers & Pages → Create →
Import a repository → pick this repo. No build command is needed;
`wrangler.jsonc` is picked up as is.

Files under `/assets/` and `/fonts/` are served with a one-year immutable cache.
When a CSS or JS file changes, give it a new filename or add a version query
string to its link so returning visitors pick up the new version.

## External resources

All photographs on the new site load from the business's existing Wix site at
`static.wixstatic.com` (17 images: the hero, the about photo and the project
galleries). They are referenced by absolute URL exactly as in the supplied page
and are not vendored here. If the Wix site is ever taken down, copy them into
`public/assets/img/` and point the `src` attributes there.

The offer page links to the live site at `ntdbuilding.wixsite.com`, which
opens in a new tab.

The new site's fonts (Oswald 500 and 700, Inter 400 and 600) are embedded in
its stylesheet as data URIs; the offer page loads the same families from
`public/fonts/`. No other third-party resources are loaded.

## Before go-live

When the new site goes live under the business's own domain:

- Delete the demo bar from `index.html`: everything from the
  `site-pitch demo bar` comment to the closing `/site-pitch demo bar` comment.
- Delete `public/offer/` and `public/fonts/`, and their entries in `_headers`.
- Remove `<meta name="robots" content="noindex,nofollow">` from `index.html`
  and set `robots.txt` to allow crawling.
- Point `og:image` and `og:url` at the business's domain.
- The supplied page carried a placeholder Instagram link, dropped when the
  contact bar became three buttons. Find it a place once the handle is
  confirmed.

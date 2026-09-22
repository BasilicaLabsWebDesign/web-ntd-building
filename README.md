# NTD Carpentry & Building

One-page site for NTD Carpentry & Building, a carpenter and builder covering
Greater London. It is served as Cloudflare Workers static assets: no framework,
no build step. The files in `public/` are the site.

## Structure

```
public/
  index.html            the page, as supplied
  404.html              themed not-found page, served for any unknown path
  favicon.svg           monogram in the site's colours
  robots.txt
  _headers              security and caching headers
  assets/
    css/site.css        the page's stylesheet, including its embedded fonts
    js/enquiry.js       the enquiry-form handler (opens the visitor's email app)
wrangler.jsonc          assets-only Worker config, no Worker script
package.json            wrangler as a devDependency; dev, deploy and check scripts
package-lock.json
CLAUDE.md               working policy and the release ledger
prompt text/            the records behind the version currently in service
```

The page's content, design and behaviour are as supplied. The stylesheet and the
form script were moved out of the HTML into their own files without changes, in
the same positions and order. The structured-data block
(`application/ld+json`) stays inline because search engines only read it from
the page itself.

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

Then serve `public/` and render `index.html` and `404.html` in a browser or
headless Chromium at desktop and mobile widths. Confirm the styles apply, the
display font loads and the layout holds.

## Deployment

The repository is connected to Cloudflare Workers Builds: every push to `main`
deploys to production. `CLAUDE.md` carries the release policy and the ledger.

To connect it the first time: Cloudflare dashboard → Workers & Pages → Create →
Import a repository → pick this repo. No build command is needed;
`wrangler.jsonc` is picked up as is.

Files under `/assets/` are served with a one-year immutable cache. When a CSS
or JS file changes, give it a new filename or add a version query string to its
link so returning visitors pick up the new version.

## External resources

All photographs load from the business's existing Wix site at
`static.wixstatic.com` (17 images: the hero, the about photo and the project
galleries). They are referenced by absolute URL exactly as in the supplied page
and are not vendored here. If the Wix site is ever taken down, copy them into
`public/assets/img/` and point the `src` attributes there.

The fonts (Oswald 500 and 700, Inter 400 and 600) are embedded in the
stylesheet as data URIs. No other third-party resources are loaded.

## Before go-live

Two notes are carried in the supplied page itself:

- `<meta name="robots" content="noindex,nofollow">` marks the page as a pitch
  demo. Remove it when the site goes live under the business's own domain.
- The footer's Instagram link is a placeholder until the handle is confirmed.

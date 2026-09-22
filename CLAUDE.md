# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

The one-page site for NTD Carpentry & Building, a carpenter and builder covering
Greater London, served as Cloudflare Workers static assets. Everything served
lives in `public/` and there is no build step - the files in that directory are
the site. The repo is connected to Cloudflare Workers Builds, so **every push to
`main` deploys to production**.

It is currently a two-tab pitch demo built with the site-pitch skill: the new
site at `/` and the offer at `/offer/`. At the owner's request there is no
`/original/` tab; the offer's top band links to their live Wix site in a new
tab.

```
public/            everything served
  index.html       the new site (demo bar on top)
  offer/           "The offer" tab
  404.html
  favicon.svg
  assets/css|js|img  img/og-image.png is the social thumbnail
  fonts/           self-hosted Oswald + Inter for the offer page
  _headers         security + caching headers
  robots.txt
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler + playwright-core devDependencies, dev/deploy/check/social scripts
social/           source + render script for the social thumbnail
prompt text/       the records behind the version in service (see below)
```

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render every tab with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.
3. Run the site-pitch layout verifier (320-1920px, real fonts, no requests to
   the live site). Run it from the repo so it finds playwright-core, and give
   it an absolute `--dir` (with a relative one its server answers 403 to every
   page):

   ```bash
   NODE_PATH=node_modules node <site-pitch skill>/scripts/verify-layout.js \
     --dir "$PWD/public" --routes "/,/offer/" \
     --fonts "Oswald,Inter" --original-host ntdbuilding.wixsite.com
   ```

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## The page itself

Content, design, and behaviour are as supplied by the owner. Do not tidy markup,
rename classes, rewrite copy, or modernise CSS unless asked - changes to the
design are their own release, requested deliberately.

The stylesheet (with its embedded fonts) and the enquiry-form script live in
`public/assets/` exactly as they were in the supplied page's `<style>` and
`<script>` blocks, linked from the same positions. The JSON-LD structured data
stays inline in `index.html` because search engines only read it there. The
photographs load from the business's Wix site by absolute URL and are not
vendored.

`/assets/*` is served with a one-year immutable cache, so a changed CSS or JS
file needs a new filename or a version query string on its link tag, or
returning visitors keep the old one.

## The pitch demo

- The demo bar is pitch chrome, not the client's design. It sits between the
  `site-pitch demo bar` comments on both tabs; on the new site the style block
  inside those comments keeps the sticky header and anchor jumps below it.
- There is no `/original/` tab: the owner dropped it. Their live Wix site opens
  in a new tab from a link in the offer's top band instead.
- `/offer/` is built from the site-pitch offer template and sheet: every number
  and promise from the sheet, the new site's colours and fonts, and short copy -
  titles and one-liners. Every word a prospect reads uses the sell vocabulary;
  run the-sell's checker over its visible text.
- The tale of the tape is pairs: problem on top, fix underneath, each a title of
  five words or fewer and a one-sentence subtitle. Problems cite only what was
  observed on their own site or its address, never a social post. Add pairs
  when a capture or the owner's notes supply observations of the page itself.
- Every page is `noindex`. `robots.txt` disallows everyone except the
  link-preview bots it names, so shared links keep their thumbnail while
  search engines stay out. The README lists what to delete at go-live.
- The social thumbnail is rendered from `social/og-image.html` with
  `npm run social` - never edited as a PNG. Its words come from the new site
  and follow the sell vocabulary. Give a changed image a new file name (the
  `/assets/` cache is immutable), and make `og:image` absolute on both pages
  once the live host is known: until then it is a relative path.

## Prompt archive

`prompt text/` holds the records for the version currently in service -
nothing else. Shipping version N replaces the folder's contents wholesale, in
the same push that releases the version: remove the previous version's
folder(s) and add `prompt text/N/` containing `input.txt` (the prompt, byte for
byte), `output.txt` (the reply that shipped it, byte for byte), `ai model.txt`
(three lines: Anthropic / Claude / Fable 5 Max unless the owner directs
otherwise) and any input images or files the owner provided. The files are
owner-supplied records: never edit, reformat, trim or regenerate them.

The prompt version is its own counter, separate from the release tag: a push
that ships no new prompt (a cache-stamp fix, a ledger correction) leaves the
archive exactly as it is.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | The carpentry site gets a home of its own | The NTD Carpentry & Building page now lives in its own repository, ready for Cloudflare to publish on every release. It looks and works exactly as the single file did, and anyone who mistypes an address gets a matching page that points them back home. |
| v1.1 | The top bar and contact details never scroll away | The header with the phone button now stays fixed at the top while the page scrolls, and a slim footer with the phone number, WhatsApp, email and area stays fixed at the bottom. On phones it sits just above the Call now and WhatsApp bar, so a visitor can get in touch from anywhere on the page. |
| v1.2 | The demo now makes the offer | The new site now sits in a three-tab demo under a dark bar, beside a frame of the business's current Wix site and an offer page. The offer compares the two sites and lays out the £500 site, the optional £50 changes and the terms, and the whole demo stays out of search engines. |
| v1.3 | A shorter offer that gets to the point | The offer page is now a quick read, with the comparison against their current site cut to three short problem-and-fix cards and the prices and terms trimmed to titles and one-liners. The separate current-site tab is gone, and a link at the top of the offer opens their live site in a new tab instead. |
| v1.4 | Shared links now arrive with a picture | Links to the demo now show a branded preview card with the business name, its trade and area, and the free-consultation number, in the site's own colours. Search engines are still kept out, but messaging and social apps may now fetch the pages to build the preview. |

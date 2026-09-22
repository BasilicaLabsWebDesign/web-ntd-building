# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

The one-page site for NTD Carpentry & Building, a carpenter and builder covering
Greater London, served as Cloudflare Workers static assets. Everything served
lives in `public/` and there is no build step - the files in that directory are
the site. The repo is connected to Cloudflare Workers Builds, so **every push to
`main` deploys to production**.

```
public/            everything served
  index.html
  404.html
  favicon.svg
  assets/css|js
  _headers         security + caching headers
  robots.txt
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy/check scripts
prompt text/       the records behind the version in service (see below)
```

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact.

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

# WordPress → Eleventy (11ty) Conversion Plan  
Project: `thewhitestonefoundation-content`

This is the repeatable workflow used for `religioustheory`, `thenewpolis-content`, and `esthesis-content`. Follow these steps to convert the WordPress export in `thewhitestonefoundation.org/` into a clean 11ty site.

## 1) Inventory + Project Setup
- Confirm WordPress export root: `thewhitestonefoundation.org/`.
- Create 11ty project root (if not present): `/Users/abrett76/github/thewhitestonefoundation-content/`.
- Add baseline structure:
  - `content/posts/`
  - `content/pages/`
  - `public/images/`
  - `public/docs/`
  - `content/redirects.njk`
  - `_data/metadata.js`
  - `_includes/base.njk`, `_includes/post.njk`
- Initialize `package.json` and install dependencies:
  - `@11ty/eleventy`
  - `markdown-it`, `markdown-it-footnote`
  - `luxon`
  - `@zachleat/heading-anchors` (optional)
  - `eleventy-plugin-toc` (optional)
  - `@11ty/eleventy-plugin-syntaxhighlight` (optional)

## 2) Import Content (Posts/Pages)
- Convert WordPress HTML posts to Markdown and save as:
  - `content/posts/YYYY/MM/DD/slug.md`
- Convert WordPress pages to Markdown and save as:
  - `content/pages/*.md`
- Add defaults via data files:
  - `content/posts/posts.11tydata.cjs` → `{ layout: "post.njk" }`
  - `content/pages/pages.11tydata.cjs` → `{ layout: "base.njk" }`

## 3) Front Matter Requirements
Ensure every post has:
- `title`, `date`, `author`, `categories`, `tags`, `description`
- `image` (if a featured image existed)
- `permalink` (if needed for legacy URL parity)

Conventions:
- `categories`/`tags` stored as lowercase, hyphenated slugs.
- Descriptions 150–160 characters, double-quoted, no markdown.
- Front matter separators `---` must be on their own line.

## 4) Import Media (Images + Docs)
From `thewhitestonefoundation.org/wp-content/`:
- Copy images to: `public/images/wp-content/uploads/...`
- Copy documents to: `public/docs/wp-content/uploads/...`
- Normalize content links to `/images/...` and `/docs/...`.

## 5) Clean URLs + Internal Links
Normalize links across posts/pages:
- Replace `../` prefixed external URLs with `https://`.
- Replace `index.html` links with trailing slash `/`.
- Fix malformed markdown links (`(<...>)` → `(...)`).
- Ensure no stray `<`/`>` inside link parentheses.

## 6) Footnotes + Markdown-it
If footnotes exist:
- In-text footnotes: `[^n]` (no colon).
- Footnote definitions: `[^n]:` (colon required).
- Insert a single `## Footnotes` heading after `***` when needed.
- Convert `## Notes` / `## Endnotes` to `## Footnotes`.

## 7) Headings + Structure
- Convert standalone, title-like lines into `##` headings.
- Avoid skipping heading levels.
- Keep headings short and descriptive.

## 8) Navigation + Layout
- Metadata-driven nav in `_data/metadata.js`.
- Render nav in `_includes/base.njk`.
- Add breadcrumbs in `post.njk` using `metadata.title`.
- Render post hero image from `image:` before the title.
- Add Back/Forward pagination in `post.njk`.
- Add ShareOpenly after post content (posts only).

## 9) Search (Pagefind)
- Add Pagefind search page at `/search/`.
- Add `data-pagefind-meta="title"` and `data-pagefind-meta="description"` to titles.
- Ignore site header title (`data-pagefind-ignore`) to avoid skewed relevance.
- Run Pagefind once after build.

## 10) Tags/Categories Pages
- Build `/tags/` and `/categories/` index pages.
- Build per-tag/per-category pages.
- Display tags in lowercase with `#` formatting, comma-separated.

## 11) Redirects
- Create `content/redirects.njk` and add:
  - Legacy WordPress paths → new 11ty paths
  - `index.html` variants → trailing slash
  - Asset moves (e.g., `/wp-content/uploads/...` → `/images/...`)

## 12) Validation + Builds
- Run:
  - `npm install`
  - `npm run start` (local dev)
  - `npm run build` (production)
- Spot-check:
  - Missing images (`missing.md` list if needed)
  - Internal links
  - Tags/categories pages
  - Search results show page title/description

## 13) Missing Assets Workflow
- Generate `missing.md` with all missing local assets.
- Recover via:
  - SiteSucker dump
  - Web archive / web search
- Place recovered files in correct `public/` path.
- Update front matter or inline references.

## 14) Change Log + Summary
- Summarize changes in `CHANGELOG.md` with date and tasks completed.
- Keep `README.md` updated with build/run instructions.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Personal portfolio website for Sai Kiran, hosted on GitHub Pages at `saikiran92.github.io`. It is a **zero-build static HTML site** — no build step, no dependencies, no package manager. Files are served directly by GitHub Pages from the `main` branch.

## Development Workflow

Edit HTML files directly and push to deploy. There is no local dev server required, but you can preview with any static file server:

```bash
python3 -m http.server 8000
```

Deploy by pushing to `main`:

```bash
git push origin main
```

## Architecture

Four pages, each a self-contained HTML file:

- **`index.html`** — Personal homepage: bio intro, experience, education, skills
- **`posts.html`** — Blog post listing with integrated Fuse.js search (fetches `index.json`)
- **`projects.html`** — Projects page

Shared assets:
- **`style.css`** — All shared styles; CSS custom properties including `--accent` (#c8612a amber)
- **`main.js`** — Nav injection, theme toggle, share links, reading time, KaTeX render
- **`index.json`** — Post index for Fuse.js search

### Shared conventions

- CSS custom properties: `--bg`, `--fg`, `--muted`, `--border`, `--tag-bg`, `--accent`, `--max` (760px)
- Responsive grid: 120px date column + content, collapses at ≤500px via `@media`
- Sticky `<nav>` at top; nav links: Home | Posts | Projects
- System font stack for UI; Georgia serif for post body text

### Adding a blog post

1. Add an `<article class="post-entry">` block inside `#posts-list` in `posts.html`
2. Add a corresponding entry to `index.json` for search indexing
3. Create `posts/<slug>/index.html` for the post content

## Key Decisions

- **Moved away from Hugo** (a static site generator) to plain HTML for simplicity and direct control.
- **Search integrated into posts page** — no separate search page; Fuse.js filters the visible post list inline.

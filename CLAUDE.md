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

Two pages, each a self-contained HTML file with all CSS inlined in a `<style>` tag:

- **`index.html`** — Home page listing blog posts
- **`about.html`** — CV/About page with work history, education, skills

### Shared conventions (duplicated across files — no shared stylesheet)

- CSS custom properties: `--bg`, `--fg`, `--muted`, `--border`, `--tag-bg`, `--max` (760px max-width)
- Responsive grid: 120px date column + content, collapses at ≤500px via `@media`
- Sticky `<nav>` at top; semantic elements (`<article>`, `<section>`, `<nav>`)
- System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### Adding a blog post

Inside `index.html`, follow the inline comment pattern near the posts section — each post is an HTML block within the posts container.

## Key Decisions

- **Moved away from Hugo** (a static site generator) to plain HTML for simplicity and direct control.
- **No shared CSS file** — styles are intentionally duplicated per-page to keep each file self-contained.

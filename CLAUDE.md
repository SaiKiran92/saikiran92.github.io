# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Personal portfolio website for Sai Kiran, hosted on GitHub Pages at `saikiran92.github.io`. Pages are generated from Jinja2 templates by a small Python build script (`build.py`) and the **generated output is committed to `main`** — GitHub Pages just serves the static files directly, no CI build step involved.

## Development Workflow

1. Edit source files: templates in `templates/`, or a post's `content.html` / `meta.yaml` under `posts/<slug>/`.
2. Regenerate the site:

```bash
python3 build.py
```

3. Preview with any static file server if needed:

```bash
python3 -m http.server 8000
```

4. Commit **both** the source files and the regenerated output, then push to deploy:

```bash
git push origin main
```

**Never hand-edit a generated file** (`index.html`, `posts.html`, `projects.html`, `index.json`, or any `posts/<slug>/index.html`) — the next `build.py` run will silently overwrite it. Edit the corresponding template or source file instead. This has caused real regressions before (e.g. an Experience section edit made directly to `index.html` was wiped out by the next build because the template in `templates/index_page.html` wasn't updated).

## Architecture

### Build system (`build.py`)

- Loads Jinja2 templates from `templates/` via `Environment(loader=FileSystemLoader(...))`.
- `load_posts()` reads every `posts/<slug>/meta.yaml` + `posts/<slug>/content.html`, computes reading time, and sorts by `date_iso`.
- `build_posts()` renders `templates/post.html` for each post → `posts/<slug>/index.html`.
- `build_posts_list()` renders `templates/posts_list.html` → `posts.html`.
- `build_index_json()` writes `index.json` (used by Fuse.js search on `posts.html`).
- `build_page()` renders `templates/index_page.html` → `index.html`, and `templates/projects_page.html` → `projects.html`.

### Templates (`templates/`)

- **`base.html`** — shared HTML shell (nav, theme toggle script, footer, `main.js`)
- **`index_page.html`** — homepage: bio intro, Experience, Education, Skills
- **`post.html`** — individual blog post layout, including TOC sidebar/mobile panel driven by `meta.yaml`'s `toc` list
- **`posts_list.html`** — blog post listing (`posts.html`)
- **`projects_page.html`** — projects page

### Post source (`posts/<slug>/`)

- **`meta.yaml`** — title, dates, description/summary, tags, `toc` (list of `{id, label}` entries rendered as the Contents sidebar — only include entries for headings that should appear there), and `search_content` for Fuse.js
- **`content.html`** — the post body. `<h2>` = top-level section, add a matching `toc` entry. `<h3>` = sub-subheading (e.g. numbered steps within a section) — do **not** add these to `toc`.

### Generated output (commit but don't hand-edit)

- `index.html`, `posts.html`, `projects.html`, `index.json`, `posts/<slug>/index.html`

### Shared assets

- **`style.css`** — all shared styles; CSS custom properties including `--accent` (#c8612a amber)
- **`main.js`** — nav injection, theme toggle, share links, reading time, KaTeX render

### Shared conventions

- CSS custom properties: `--bg`, `--fg`, `--muted`, `--border`, `--tag-bg`, `--accent`, `--max` (760px)
- Responsive grid: 120px date column + content, collapses at ≤500px via `@media`
- Sticky `<nav>` at top; nav links: Home | Posts | Projects
- System font stack for UI; Georgia serif for post body text

### Adding a blog post

1. Create `posts/<slug>/meta.yaml` and `posts/<slug>/content.html`
2. Run `python3 build.py` to generate `posts/<slug>/index.html`, update `posts.html`, and update `index.json`
3. Commit both source and generated files

## Key Decisions

- **Moved away from Hugo** (a static site generator) to a lightweight Jinja2 build script for simplicity and direct control, while still committing generated HTML so GitHub Pages needs no build step.
- **Search integrated into posts page** — no separate search page; Fuse.js filters the visible post list inline.

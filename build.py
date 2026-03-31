#!/usr/bin/env python3
import json, os
from datetime import datetime
import yaml
from jinja2 import Environment, FileSystemLoader

SITE_ROOT = os.path.dirname(os.path.abspath(__file__))
env = Environment(loader=FileSystemLoader(os.path.join(SITE_ROOT, "templates")), autoescape=False)

def load_posts():
    posts = []
    posts_dir = os.path.join(SITE_ROOT, "posts")
    for slug in os.listdir(posts_dir):
        meta_path = os.path.join(posts_dir, slug, "meta.yaml")
        if not os.path.exists(meta_path):
            continue
        with open(meta_path, encoding="utf-8") as f:
            meta = yaml.safe_load(f)
        meta["slug"] = slug
        meta["permalink"] = f"/posts/{slug}/"
        posts.append(meta)
    posts.sort(key=lambda p: datetime.strptime(p["date_iso"], "%Y-%m-%d"))
    for i, p in enumerate(posts):
        p["prev"] = posts[i-1] if i > 0 else None
        p["next"] = posts[i+1] if i < len(posts)-1 else None
    return posts

def build_posts(posts):
    for post in posts:
        slug = post["slug"]
        content_path = os.path.join(SITE_ROOT, "posts", slug, "content.html")
        with open(content_path, encoding="utf-8") as f:
            content = f.read()
        html = env.get_template("post.html").render(post=post, content=content, depth="../../")
        out_path = os.path.join(SITE_ROOT, "posts", slug, "index.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  Built: posts/{slug}/index.html")

def build_posts_list(posts):
    html = env.get_template("posts_list.html").render(posts=list(reversed(posts)), depth="")
    with open(os.path.join(SITE_ROOT, "posts.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print("  Built: posts.html")

def build_index_json(posts):
    data = [{"title": p["title"], "permalink": p["permalink"], "date": p["date"],
             "summary": p["summary"], "tags": p["tags"], "content": p.get("search_content", "")}
            for p in posts]
    with open(os.path.join(SITE_ROOT, "index.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("  Built: index.json")

def build_page(template_name, output_name):
    html = env.get_template(template_name).render(depth="")
    with open(os.path.join(SITE_ROOT, output_name), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  Built: {output_name}")

if __name__ == "__main__":
    print("Building site...")
    posts = load_posts()
    build_posts(posts)
    build_posts_list(posts)
    build_index_json(posts)
    build_page("index_page.html", "index.html")
    if os.path.exists(os.path.join(SITE_ROOT, "templates", "projects_page.html")):
        build_page("projects_page.html", "projects.html")
    print("Done.")

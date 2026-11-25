"""Static release checks. No browser, network, secrets or production writes."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "daysicunha.com.br"
PAGES = ("index.html", "sobre.html", "cases.html", "laboratorio.html",
         "universo.html", "blog.html", "contato.html")

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.refs, self.ids, self.canonical = [], set(), []
        self.h1 = 0
        self.noindex = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "link" and "canonical" in (a.get("rel") or "").split():
            self.canonical.append(a.get("href"))
        if tag == "meta" and (a.get("name") or "").lower() == "robots":
            self.noindex = "noindex" in (a.get("content") or "").lower()
        for key in ("href", "src"):
            if a.get(key):
                self.refs.append(a[key])

def parse(path):
    return Page(path.read_text(encoding="utf-8"))

errors = []
pages = {name: parse(ROOT / name) for name in PAGES}
for name, page in pages.items():
    expected = "https://" + ORIGIN + ("/" if name == "index.html" else "/" + name)
    if page.h1 != 1:
        errors.append(f"{name}: expected exactly one H1")
    if page.canonical != [expected]:
        errors.append(f"{name}: incorrect canonical {page.canonical}")
    for ref in page.refs:
        u = urlsplit(ref)
        if u.scheme or u.netloc or not u.path:
            continue
        path = unquote(u.path)
        target = (ROOT / path.lstrip("/") if path.startswith("/") else ROOT / name / ".." / path).resolve()
        if target.is_dir():
            target = target / "index.html"
        if not target.is_relative_to(ROOT) or not target.is_file():
            errors.append(f"{name}: missing local asset or route {ref}")
            continue
        if u.fragment and target.suffix == ".html" and target.name in pages:
            if unquote(u.fragment) not in pages[target.name].ids:
                errors.append(f"{name}: missing static anchor {ref}")

ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
locations = [node.text for node in ET.parse(ROOT / "sitemap.xml").findall("s:url/s:loc", ns)]
if len(locations) != len(set(locations)):
    errors.append("sitemap: duplicate URLs")
for url in locations:
    u = urlsplit(url)
    target = ROOT / (u.path.lstrip("/") or "index.html")
    if u.scheme != "https" or u.netloc != ORIGIN or not target.is_file():
        errors.append(f"sitemap: invalid URL {url}")
    elif parse(target).noindex:
        errors.append(f"sitemap: URL marked noindex {url}")
for name in PAGES:
    expected = "https://" + ORIGIN + ("/" if name == "index.html" else "/" + name)
    if expected not in locations:
        errors.append(f"sitemap: missing primary route {expected}")

if errors:
    raise SystemExit("\n".join(errors))
print(f"OK: {len(PAGES)} primary pages, local references, canonical/H1, {len(locations)} sitemap URLs")

"""Audit every generated public HTML page, optionally against its live response.

Uses only the standard library. Never requests private/tokenized routes or sends forms.
The overlap metric is editorial evidence, not a prediction of a search-engine penalty.
"""
import argparse
import csv
import hashlib
import json
import re
import statistics
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "build"
ORIGIN = "https://www.pureaircalifornia.com"


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = []
        self.text = []
        self.main_text = []
        self.meta = {}
        self.canonicals = []
        self.links = []
        self.images = []
        self.schemas = []
        self.h1 = 0
        self.ids = set()
        self.stack = []
        self.schema = None
        self.lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "meta":
            key = a.get("name", a.get("property", "")).lower()
            self.meta.setdefault(key, []).append(a.get("content", ""))
        if tag == "link" and a.get("rel") == "canonical":
            self.canonicals.append(a.get("href"))
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "img":
            self.images.append(a)
        if tag == "h1":
            self.h1 += 1
        if tag == "script" and a.get("type") == "application/ld+json":
            self.schema = []
        if tag not in {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag == "script" and self.schema is not None:
            self.schemas.append("".join(self.schema))
            self.schema = None
        if tag in self.stack:
            self.stack = self.stack[:len(self.stack) - 1 - self.stack[::-1].index(tag)]

    def handle_data(self, data):
        if self.schema is not None:
            self.schema.append(data)
        if "title" in self.stack:
            self.title.append(data)
        if not any(tag in self.stack for tag in ("script", "style", "noscript")):
            self.text.append(data)
            if "main" in self.stack and not any(tag in self.stack for tag in ("nav", "footer", "form", "select")):
                self.main_text.append(data)


def normalize(value):
    return re.sub(r"\s+", " ", value).strip()


def retrieve(url):
    for attempt in range(2):
        try:
            request = Request(url, headers={"User-Agent": "PAC-Site-Quality-Audit/1.0", "Accept": "text/html,application/xml"})
            with urlopen(request, timeout=35) as response:
                return response.status, response.geturl(), dict(response.headers), response.read().decode("utf-8", errors="replace")
        except HTTPError as error:
            return error.code, url, dict(error.headers), error.read().decode("utf-8", errors="replace")
        except (URLError, TimeoutError, OSError) as error:
            if attempt:
                return 0, url, {}, str(error)


def page_files():
    return sorted(file for file in BUILD.rglob("*.html") if "_backup" not in file.parts and (file.name == "index.html" or file.parent == BUILD))


def audit(file, remote_origin, sitemap):
    relative = file.relative_to(BUILD).as_posix()
    route = "/" if relative == "index.html" else "/" + relative.removesuffix("index.html")
    canonical = ORIGIN + route
    # Preserve line endings for actual deployment byte-parity checks.
    local_html = file.read_bytes().decode("utf-8")
    status, destination, headers, html = retrieve(remote_origin + route) if remote_origin else (200, canonical, {}, local_html)
    page = Page()
    page.feed(html)
    errors, warnings = [], []
    title = normalize(" ".join(page.title))
    description = page.meta.get("description", [])
    robots = ", ".join(page.meta.get("robots", [])).lower()
    header_robots = next((value for key, value in headers.items() if key.lower() == "x-robots-tag"), "").lower()
    noindex = "noindex" in robots or "noindex" in header_robots
    indexed_candidate = canonical in sitemap
    if status != 200 and route != "/404.html":
        errors.append(f"HTTP {status}")
    if page.h1 != 1:
        errors.append(f"H1 count {page.h1}")
    if not title:
        errors.append("Missing title")
    if len(description) != 1 or not description[0]:
        errors.append("Expected one description")
    if len(page.meta.get("robots", [])) != 1:
        errors.append("Expected one robots meta")
    if route != "/404.html" and page.canonicals != [canonical]:
        errors.append("Canonical mismatch")
    if indexed_candidate and noindex:
        errors.append("Noindex URL is in sitemap")
    if not indexed_candidate and not noindex:
        warnings.append("Indexable page omitted from sitemap")
    body_text = normalize(" ".join(page.text))
    main = normalize(" ".join(page.main_text))
    for pattern in [r"448\s*[kK+]", r"NADCA[- ]certified", r"40\+ years", r"99\.9%", r"#1 rated"]:
        if re.search(pattern, body_text + " " + " ".join(description), re.I):
            warnings.append("Claim requires evidence: " + pattern)
    nodes = []
    for raw in page.schemas:
        try:
            data = json.loads(raw)
            nodes.extend(data if isinstance(data, list) else data.get("@graph", [data]))
        except (json.JSONDecodeError, AttributeError):
            errors.append("Invalid JSON-LD")
    for node in nodes:
        if node.get("@type") == "FAQPage":
            for faq in node.get("mainEntity", []):
                if normalize(faq.get("name", "")) not in body_text or normalize(faq.get("acceptedAnswer", {}).get("text", "")) not in body_text:
                    errors.append("FAQ markup does not match page text")
        if node.get("aggregateRating"):
            warnings.append("Review markup requires eligibility review")
    for img in page.images:
        if "alt" not in img:
            errors.append("Missing image alt")
        src = img.get("src", "")
        if src.startswith("/") and not src.startswith("//") and not (BUILD / urlsplit(src).path.lstrip("/")).is_file():
            errors.append("Missing local image: " + src)
    internal = set()
    broken_fragments = set()
    for href in page.links:
        url = urlsplit(urljoin(canonical, href))
        if url.netloc != urlsplit(ORIGIN).netloc:
            continue
        if re.match(r"^/(admin|feedback|api)(/|$)", url.path):
            continue
        if url.path == route and url.fragment and url.fragment not in page.ids:
            broken_fragments.add(url.fragment)
        if not Path(url.path).suffix:
            target = url.path if url.path.endswith("/") else url.path + "/"
            internal.add(target)
            if not (BUILD / target.lstrip("/") / "index.html").exists():
                errors.append("Broken internal page: " + target)
    errors.extend("Broken same-page fragment: " + fragment for fragment in sorted(broken_fragments))
    return {"route": route, "status": status, "finalUrl": destination, "title": title, "description": description[0] if description else "", "canonical": page.canonicals, "robots": robots, "headerRobots": header_robots, "inSitemap": indexed_candidate, "noindex": noindex, "h1": page.h1, "schemaTypes": [node.get("@type") for node in nodes], "images": len(page.images), "mainWords": len(main.split()), "bytes": len(html.encode()), "sha256": hashlib.sha256(html.encode()).hexdigest(), "matchesLocal": html == local_html if remote_origin else None, "errors": sorted(set(errors)), "warnings": sorted(set(warnings)), "links": sorted(internal), "mainText": main}


def overlap(rows):
    city_source = (ROOT / "src/pages/locations/data.ts").read_text(encoding="utf-8")
    names = re.findall(r'\bname:\s*[\'"]([^\'"]+)[\'"]', city_source)
    city_pattern = re.compile("|".join(re.escape(name) for name in sorted(set(names), key=len, reverse=True)), re.I)
    groups = {}
    for row in rows:
        if not re.match(r"^/industries/[^/]+/[^/]+/$", row["route"]):
            continue
        text = city_pattern.sub(" PLACE ", row["mainText"])
        words = re.findall(r"[a-z]+", re.sub(r"\b\d+\b", "NUMBER", text).lower())
        shingles = set(tuple(words[i:i+5]) for i in range(max(0, len(words)-4)))
        groups.setdefault(row["route"].split("/")[2], []).append((row["route"], shingles))
    result = []
    for market, group in groups.items():
        scores = []
        for (_, left), (_, right) in zip(group, group[1:]):
            scores.append(len(left & right) / max(1, len(left | right)))
        result.append({"market": market, "pages": len(group), "medianAdjacentFiveWordOverlap": round(statistics.median(scores), 3) if scores else None})
    return result


def main():
    global BUILD
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--build-dir", type=Path, default=BUILD, help="Fixed release directory to audit or compare against")
    parser.add_argument("--origin", help="Fetch generated routes from this public origin")
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    BUILD = args.build_dir.resolve()
    origin = args.origin.rstrip("/") if args.origin else None
    xml = retrieve(origin + "/sitemap.xml")[3] if origin else (BUILD / "sitemap.xml").read_text(encoding="utf-8")
    sitemap = {element.text for element in ET.fromstring(xml).findall("{*}url/{*}loc")}
    with ThreadPoolExecutor(max_workers=5 if origin else 4) as executor:
        rows = list(executor.map(lambda file: audit(file, origin, sitemap), page_files()))
    graph = {row["route"]: row["links"] for row in rows}
    seen, queue = {"/"}, ["/"]
    for route in queue:
        for target in graph.get(route, []):
            if target in graph and target not in seen:
                seen.add(target)
                queue.append(target)
    errors = [row["route"] + ": " + issue for row in rows for issue in row["errors"]]
    errors.extend("Sitemap page not linked from home: " + url for url in sitemap if urlsplit(url).path not in seen)
    report = {"checkedAt": datetime.now(timezone.utc).isoformat(), "origin": origin or "local build", "pageCount": len(rows), "sitemapCount": len(sitemap), "indexableCount": sum(not row["noindex"] for row in rows), "reachableCount": len(seen), "matchesLocalCount": sum(row["matchesLocal"] is True for row in rows), "errors": errors, "warningCount": sum(len(row["warnings"]) for row in rows), "industryCityOverlap": overlap(rows), "pages": [{key: value for key, value in row.items() if key != "mainText"} for row in rows]}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2), encoding="utf-8")
    with args.output.with_suffix(".csv").open("w", encoding="utf-8-sig", newline="") as stream:
        columns = ["route", "status", "title", "robots", "inSitemap", "mainWords", "images", "errors", "warnings"]
        writer = csv.DictWriter(stream, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(report["pages"])
    print(json.dumps({key: value for key, value in report.items() if key != "pages"}, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())

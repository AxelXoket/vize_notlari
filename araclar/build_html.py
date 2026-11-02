#!/usr/bin/env python3
"""Bundle the exam notes into one self-contained offline HTML file.

Usage: build_html.py <root>
Reads <root>/notlar/00_BASLA.md then <root>/notlar/haftalar/*.md in ORDER,
writes <root>/notlar/SINAV_NOTLARI.html. No network needed to open the result.
"""

import pathlib
import re
import sys

import markdown

ORDER = ["W2.md", "W3a.md", "W3b.md", "W3c.md", "W4.md", "W6.md", "EK_W7-W9_ve_Final.md"]
KONU_ORDER = ["W2.md", "W3.md", "W4.md", "W6.md"]
KONU_HEADER = """# Mobil Uygulama Geliştirme: Konu Anlatımı (W2, W3, W4, W6)

Hocanın materyaline (`zeki-ozen/MobileAppDevelopment`, commit `7a13069`) dayanan kısa anlatım.
Detaylı notlar ve soru-cevaplar: [notlar/haftalar/](notlar/haftalar/).

- [Hafta 2: JavaScript & ES6](#hafta-2-javascript--es6)
- [Hafta 3: React (web)](#hafta-3-react-web)
- [Hafta 4: React Native'e Giriş](#hafta-4-react-nativee-giriş)
- [Hafta 6: React Native Core Components](#hafta-6-react-native-core-components)"""

CSS = """
:root{--bg:#fbfaf7;--fg:#1d1d1b;--muted:#6b6a65;--line:#e3e1da;--card:#fff;--accent:#2b5cab;
--code-bg:#f2f1ec;--mark:#ffe58a;--side:#f4f2ec}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#17181a;--fg:#e8e6e1;--muted:#9a978f;
--line:#2c2d30;--card:#1e1f22;--accent:#8fb3ff;--code-bg:#232428;--mark:#6b5a12;--side:#1b1c1f}}
:root[data-theme=dark]{--bg:#17181a;--fg:#e8e6e1;--muted:#9a978f;--line:#2c2d30;--card:#1e1f22;
--accent:#8fb3ff;--code-bg:#232428;--mark:#6b5a12;--side:#1b1c1f}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
#side{position:fixed;top:0;left:0;bottom:0;width:270px;overflow-y:auto;background:var(--side);
border-right:1px solid var(--line);padding:14px 12px;font-size:13px}
#side h2{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:16px 0 6px}
#side a{display:block;color:var(--fg);text-decoration:none;padding:3px 6px;border-radius:5px}
#side a:hover{background:var(--line)}
#side a.l2{padding-left:16px;color:var(--muted)}
#q{width:100%;padding:7px 9px;border:1px solid var(--line);border-radius:7px;background:var(--card);color:var(--fg);font-size:14px}
#hits{color:var(--muted);font-size:12px;margin:4px 2px 0;min-height:16px}
main{margin-left:270px;padding:24px 40px 80px;max-width:1080px}
section.week{border-top:3px solid var(--accent);margin-top:36px;padding-top:6px}
h1{font-size:26px;margin:18px 0 8px}h2{font-size:20px;margin:28px 0 8px;border-bottom:1px solid var(--line);padding-bottom:4px}
h3{font-size:16.5px;margin:20px 0 6px}h4{font-size:15px;margin:16px 0 4px}
a{color:var(--accent)}
code{font:12.5px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--code-bg);padding:1px 4px;border-radius:4px}
pre{background:var(--code-bg);padding:10px 12px;border-radius:8px;overflow-x:auto;border:1px solid var(--line)}
pre code{background:none;padding:0}
table{border-collapse:collapse;margin:10px 0;font-size:13.5px;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:5px 8px;text-align:left;vertical-align:top}
th{background:var(--code-bg)}
blockquote{margin:8px 0;padding:4px 12px;border-left:3px solid var(--accent);color:var(--muted)}
mark{background:var(--mark);color:inherit}
#theme{margin-top:14px;font-size:12px;background:none;border:1px solid var(--line);color:var(--fg);border-radius:6px;padding:4px 8px;cursor:pointer}
@media (max-width:820px){#side{position:static;width:auto;border-right:0;border-bottom:1px solid var(--line)}
main{margin-left:0;padding:16px}}
@media print{#side{display:none}main{margin:0;padding:0;max-width:none}section.week{page-break-before:always}
pre,table{page-break-inside:avoid}body{font-size:11.5px}}
"""

JS = r"""
(function(){
const q=document.getElementById('q'),hits=document.getElementById('hits'),main=document.querySelector('main');
function clear(){main.querySelectorAll('mark').forEach(m=>{m.replaceWith(document.createTextNode(m.textContent))});main.normalize();}
let t;q.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(run,180)});
function run(){clear();const s=q.value.trim();if(s.length<2){hits.textContent='';return}
const re=new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');const w=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);
const nodes=[];while(w.nextNode())nodes.push(w.currentNode);let n=0,first=null;
for(const node of nodes){const txt=node.nodeValue;if(!re.test(txt))continue;re.lastIndex=0;const f=document.createDocumentFragment();let last=0,m;
while((m=re.exec(txt))){f.append(txt.slice(last,m.index));const mk=document.createElement('mark');mk.textContent=m[0];f.append(mk);if(!first)first=mk;n++;last=m.index+m[0].length}
f.append(txt.slice(last));node.replaceWith(f)}
hits.textContent=n+' sonuç';if(first)first.scrollIntoView({block:'center'})}
q.addEventListener('keydown',e=>{if(e.key==='Enter'){const ms=[...main.querySelectorAll('mark')];if(!ms.length)return;
const y=window.scrollY+window.innerHeight/2;const nx=ms.find(m=>m.getBoundingClientRect().top+window.scrollY>y+5)||ms[0];nx.scrollIntoView({block:'center'})}});
document.getElementById('theme').onclick=()=>{const r=document.documentElement;const d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);r.dataset.theme=d?'light':'dark'};
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus()}});
})();
"""


def render(md_text: str, prefix: str) -> tuple[str, list[tuple[int, str, str]]]:
    conv = markdown.Markdown(
        extensions=["fenced_code", "tables", "toc", "sane_lists", "codehilite"],
        extension_configs={
            "codehilite": {"noclasses": True, "pygments_style": "friendly", "guess_lang": False},
            "toc": {"slugify": lambda v, sep: prefix + "-" + re.sub(r"[^\w]+", "-", v.lower()).strip("-")},
        },
    )
    body = conv.convert(md_text)
    # A pipe inside inline code in a table cell must be written `\|` in Markdown;
    # Python-Markdown keeps the backslash inside <code>, GitHub does not.
    body = re.sub(r"<code>(.*?)</code>", lambda m: "<code>" + m.group(1).replace("\\|", "|") + "</code>", body, flags=re.S)
    heads = []

    def walk(items, level=1):
        for it in items:
            heads.append((level, it["id"], it["name"]))
            walk(it["children"], level + 1)

    walk(conv.toc_tokens)
    return body, heads


def build(files, out, title, placeholder):
    sections, nav = [], []
    for i, f in enumerate(files):
        body, heads = render(f.read_text(encoding="utf-8"), f"s{i}")
        sections.append(f'<section class="week" id="sec{i}">{body}</section>')
        tops = [h for h in heads if h[0] == 1][:1]
        # toc names are already HTML-escaped by Python-Markdown; do not escape twice.
        if tops:
            nav.append(f'<h2>{re.sub("<[^>]+>", "", tops[0][2])}</h2>')
        for level, hid, name in heads:
            label = re.sub(r"\s*\((?:W\d|kurtarilan|repodan)[^)]*\)\s*$", "", name)
            if level == 2 and label != "İçindekiler":
                nav.append(f'<a class="l2" href="#{hid}">{label}</a>')
    page = f"""<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><style>{CSS}</style></head><body>
<nav id="side"><input id="q" placeholder="{placeholder} ( / )" autocomplete="off"><div id="hits"></div>
{''.join(nav)}<button id="theme">Açık / koyu tema</button></nav>
<main>{''.join(sections)}</main><script>{JS}</script></body></html>"""
    out.write_text(page, encoding="utf-8")
    print(f"wrote {out} ({len(page)//1024} KB, {len(files)} sections)")


def main(argv):
    root = pathlib.Path(argv[1])
    notes = root / "notlar"
    build([notes / "00_BASLA.md"] + [notes / "haftalar" / f for f in ORDER],
          notes / "SINAV_NOTLARI.html", "Mobil Vize Notları", "Notlarda ara")

    # Lecture text: one HTML page, plus one Markdown file GitHub renders directly.
    konu = [notes / "konu" / f for f in KONU_ORDER]
    build(konu, root / "KONU_ANLATIMI.html", "Mobil Konu Anlatımı", "Anlatımda ara")
    parts = [KONU_HEADER] + [f.read_text(encoding="utf-8").strip() for f in konu]
    (root / "KONU_ANLATIMI.md").write_text("\n\n---\n\n".join(parts) + "\n", encoding="utf-8")
    print(f"wrote {root / 'KONU_ANLATIMI.md'}")


if __name__ == "__main__":
    main(sys.argv)

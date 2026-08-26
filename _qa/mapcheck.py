from playwright.sync_api import sync_playwright
URL="https://kristall2002-art.github.io/v-seti-demo-notary/"
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_context(viewport={"width":1440,"height":900}).new_page()
    pg.goto(URL, wait_until="networkidle", timeout=60000)
    pg.query_selector("#map").scroll_into_view_if_needed()
    pg.wait_for_timeout(6000)
    fr = pg.frames
    print("frames:", len(fr))
    for f in fr:
        if "openstreetmap" in (f.url or ""):
            print("osm frame url:", f.url)
            try:
                body = f.evaluate("document.body ? document.body.innerText.slice(0,120) : 'no body'")
                print("osm body text:", repr(body))
            except Exception as e:
                print("eval err", e)
    pg.query_selector("#map").screenshot(path="map_only.png")
    b.close()
print("ok")

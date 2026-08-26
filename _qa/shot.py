from playwright.sync_api import sync_playwright
import os

URL = "https://kristall2002-art.github.io/v-seti-demo-notary/"
OUT = os.path.dirname(os.path.abspath(__file__))

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Desktop
    ctx = browser.new_context(viewport={"width":1440,"height":900}, device_scale_factor=1)
    pg = ctx.new_page()
    pg.goto(URL, wait_until="networkidle", timeout=60000)
    pg.wait_for_timeout(3000)
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    pg.wait_for_timeout(2500)
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(1000)
    # try open first FAQ accordion + doc accordion
    try:
        for sel in ["details","[data-accordion]",".faq-item",".accordion"]:
            els = pg.query_selector_all(sel)
            for e in els[:2]:
                try: e.click(timeout=1000)
                except: pass
    except: pass
    pg.wait_for_timeout(1000)
    # horizontal scroll check
    hscroll = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    print("DESKTOP horizontal overflow px:", hscroll)
    pg.screenshot(path=os.path.join(OUT,"desktop.png"), full_page=True)
    ctx.close()

    # Mobile
    ctx = browser.new_context(viewport={"width":390,"height":844}, device_scale_factor=1, is_mobile=True)
    pg = ctx.new_page()
    pg.goto(URL, wait_until="networkidle", timeout=60000)
    pg.wait_for_timeout(3000)
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    pg.wait_for_timeout(2500)
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(1000)
    hscroll = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    print("MOBILE horizontal overflow px:", hscroll)
    pg.screenshot(path=os.path.join(OUT,"mobile.png"), full_page=True)
    ctx.close()

    browser.close()
print("done")

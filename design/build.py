"""Builds landing-mockup.html from landing-mockup.src.html: injects the traced wordmark and ribbon text."""
import json, pathlib
here = pathlib.Path(__file__).parent
wm = json.loads((here / "brand" / "wordmark.json").read_text())
src = (here / "landing-mockup.src.html").read_text()
ribbon = "Tap to pay &nbsp;·&nbsp; <b>tapa</b> &nbsp;·&nbsp; " * 8
flow = ("M-Pesa top-up KES 2,000 &nbsp;·&nbsp; <b>KES 650</b> Kilele Bar &nbsp;·&nbsp; <b>KES 300</b> Merch Tent &nbsp;·&nbsp; "
        "Sweep 22:20 + KES 6,400 &nbsp;·&nbsp; <b>KES 1,200</b> Main Stage Bar &nbsp;·&nbsp; USDC on Base &nbsp;·&nbsp; ") * 3
plus = '<svg class="i" width="22" height="22" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>'
out = (src.replace("{{RIBBON}}", ribbon).replace("{{FLOW}}", flow).replace("{{PLUS}}", plus)
          .replace("{{WM_W}}", str(wm["w"])).replace("{{WM_H}}", str(wm["h"])).replace("{{WM_D}}", wm["d"]))
(here / "landing-mockup.html").write_text(out)
print("ok", len(out))

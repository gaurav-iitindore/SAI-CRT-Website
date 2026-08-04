# Sai CRT — Website

Marketing website for **Sai Campus Recruitment Training (Sai CRT)**, Bhopal.
Static site (HTML/CSS/JS) — no build step, no dependencies.

**Live site:** https://saicrt.com

---

## 📁 Structure

| File          | What it is                                                        |
| ------------- | ----------------------------------------------------------------- |
| `index.html`  | Homepage — hero, stats, courses, placements, reviews, register    |
| `about.html`  | Founder / About-the-mentor page (Gaurav Tiwari)                   |
| `style.css`   | Shared theme (navy + gold). Design tokens live at the top.        |
| `script.js`   | Shared behaviour — nav, counters, scroll-reveal, register form    |
| `logo.png`    | Sai CRT crest logo                                                |
| `gaurav.jpg`  | Founder photo                                                     |

Keep all files in the **same folder** — they reference each other by relative name.

---

## 🖥️ Run it locally

Just open `index.html` in a browser, **or** serve it (recommended, so page-to-page links work):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## ✏️ Editing the common things

**New batch (dates / fees / seats):** search the code for `BATCH INFO: edit here`
— those comments mark every spot in `index.html` (sidebar, updates ticker, course
cards, register panel). Update the visible text there.

**Registration form:** `script.js` has a config block at the top:

```js
const SAICRT = {
  whatsapp: "918319953369",     // WhatsApp number (with country code)
  batchDate: "1 October 2026",
  googleFormUrl: ""             // paste a Google Form link to use a form instead of WhatsApp
};
```
- Leave `googleFormUrl` empty → the form composes a WhatsApp message to the number above.
- Paste a Google Form URL → the form and the "fill our form" link switch to it.

**Contact email:** currently `admissions@saicrt.com` (search & replace to change).

**Theme colours / fonts:** top of `style.css` (`:root` variables — navy, gold, etc.).

---

## 🚀 Deploy (GitHub Pages — free preview for the team)

1. Push this repo to GitHub (see below).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. In ~1 minute the site is live at `https://<user>.github.io/<repo>/` — share that link so the team can review the real thing.

(For the production domain, point `saicrt.com` at the host of your choice — any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages.)

---

## 🤝 Suggesting changes (for the team)

Two easy ways:

- **Open an Issue** describing the change (copy tweak, new section, a typo) — good for ideas/feedback.
- **Open a Pull Request** for actual edits:
  ```bash
  git checkout -b my-change      # make a branch
  # edit files...
  git commit -am "Describe the change"
  git push -u origin my-change   # then open a PR on GitHub
  ```

Please don't commit directly to `main` — use a branch + PR so changes can be reviewed.

---

_Sai CRT is an initiative for campus placement training in Bhopal. 10,000+ students trained · 2000+ placed at top MNCs._

# shubhambakre.com — Portfolio

Static personal portfolio site. One-page, no framework, no build step.

## File Structure

```
portfolio/
├── index.html          ← main page (upload to public_html root)
├── styles.css          ← all styles, dark/light theme
├── script.js           ← theme toggle, scroll reveal, active nav
└── assets/
    ├── photo.jpg       ← headshot (424×600, compressed for web)
    └── resume.pdf      ← downloadable resume
```

## Deploying to Hostinger (shubhambakre.com)

### Option A — File Manager (easiest)

1. Log in to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Go to **Hosting → Manage → File Manager**
3. Open the `public_html` folder
4. Delete any placeholder `index.html` that's already there
5. Upload all files maintaining the exact structure:
   - `index.html` → `public_html/index.html`
   - `styles.css` → `public_html/styles.css`
   - `script.js`  → `public_html/script.js`
   - `assets/photo.jpg`  → `public_html/assets/photo.jpg`
   - `assets/resume.pdf` → `public_html/assets/resume.pdf`

   **Tip:** Zip the entire `portfolio/` folder, upload the zip, then extract it in File Manager. Rename the unzipped folder's contents so they sit directly in `public_html/`, not inside a sub-folder.

6. Visit `https://shubhambakre.com` — it should be live immediately.

### Option B — FTP/SFTP

Use FileZilla or any FTP client with Hostinger's FTP credentials (found in hPanel → FTP Accounts).

Connect to your server and upload everything into `public_html/`.

---

## Updating Content

All content is in `index.html`. Section locations:

| Section    | Search for                  |
|------------|-----------------------------|
| Hero copy  | `class="hero-text"`         |
| Projects   | `id="projects"`             |
| Experience | `id="experience"`           |
| Skills     | `id="skills"`               |
| About      | `id="about"`                |
| Contact    | `id="contact"`              |

To add a new project: copy any `<article class="project-card">` block inside `#projects` and edit the content.

To update the resume: replace `assets/resume.pdf` with the new file (same filename).

---

## Tech

- Plain HTML5 / CSS3 / vanilla JS — no dependencies, no build step
- Google Fonts: Inter + JetBrains Mono (loaded from CDN)
- Dark mode default; light/dark toggle persisted in localStorage
- Respects `prefers-color-scheme` on first visit
- Scroll-reveal via IntersectionObserver (graceful fallback)
- Mobile responsive down to 360px

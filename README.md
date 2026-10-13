# Mark Beaver C. Atillano: Developer Portfolio

A static portfolio (HTML, CSS, vanilla JavaScript) that works on GitHub Pages. No backend, database, or XAMPP is needed after deployment.

## Files

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/ (profile.jpg, lto-payroll-project.svg)
│   └── documents/ (put the resume PDF here)
└── README.md
```

## Run locally

Open a terminal in the `portfolio` folder and run:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000. (Opening `index.html` by double-click also works, but the resume button check needs a server.)

## Customize

1. **Contact and links:** edit the `CONFIG` block at the top of `js/script.js` (email, LinkedIn, GitHub, location). Empty values stay hidden or show as placeholders. Nothing is invented.
2. **Profile photo:** your photo is `assets/images/profile.jpg` (4:5 portrait, about 640x800). To change it, replace that file with a new image of the same name and shape.
3. **Resume:** save your PDF as `assets/documents/Mark_Beaver_C_Atillano_Resume.pdf`. The Download Resume button appears automatically once the file exists.
4. **Project details:** edit the `details` fields of the LTO Payroll project in `js/script.js`. Yellow `[bracketed]` text is a placeholder to replace with facts you can verify.
5. **Screenshots:** replace `assets/images/lto-payroll-project.svg` (or change the `image` path) with a **sanitized screenshot or mock data only**. Never publish employee names, salaries, bank details, payslips, payroll records, credentials, internal URLs, or confidential screens.
6. **OJT dates and duties, skills:** edit the Experience and Skills sections in `index.html`. Only list skills you can demonstrate. "Git and GitHub" was removed until you confirm it; the Skills list has a comment showing where to add it back.
7. **SEO URLs:** if you rename the repository, update the `canonical`, `og:url`, and JSON-LD URLs in the `<head>` of `index.html`.
8. **More projects:** copy the project object in `PROJECTS` in `js/script.js` and edit it.

## Deploy to GitHub Pages

1. On github.com, click **New repository**. Name it (for example `portfolio`) and keep it **Public**. Create it.
2. Click **uploading an existing file**, drag in everything inside the `portfolio` folder (keep the folder structure), and click **Commit changes**. `index.html` must be at the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder to **/ (root)**, then **Save**.
5. Wait one to two minutes, then open `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
6. To update later: edit or upload the changed files in the repository and commit. The site refreshes automatically.

All paths are relative, so the site works under a repository subpath.

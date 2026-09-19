# Shammo Biswas — research portfolio

A responsive academic portfolio built with HTML, CSS, and a small amount of vanilla JavaScript. No build step, framework, or package installation is needed to run the site.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8000
```

Visit **http://localhost:8000**. You can also open `index.html` directly; clipboard functionality works best on localhost or HTTPS.

## Edit the content

- `index.html`: biography, research interests, publications, projects, experience, education, and links.
- `styles.css`: colors, typography, responsive layouts, and print styles. Core colors are CSS variables at the top.
- `script.js`: mobile navigation, publication filters, email copying, active navigation, and the SVG point cloud.
- `shammo_cv.pdf`: the original CV, linked for viewing and downloading.
- `assets/favicon.svg`: the site icon.

Content is based on the provided CV dated June 15, 2026, plus the research interests supplied for this portfolio. OCT-KAN is explicitly labeled under review. The withdrawn conference submission is not presented as a publication; the associated undergraduate thesis appears as a project. Research overview text summarizes the titles and is not presented as an original paper abstract. Check dates and publication status when updating the CV.

Google Fonts supplies DM Sans and Libre Caslon Display. Local system fonts are used if that service is unavailable. All illustrations are rendered locally using SVG or CSS.

## Publish

Upload `index.html`, `styles.css`, `script.js`, `shammo_cv.pdf`, and the `assets` folder to any static hosting provider. For GitHub Pages, keep these files at the publishing root. No server-side functionality or secrets are required.

### GitHub Pages

The included `.github/workflows/deploy.yml` publishes the site on pushes to `main`, or when manually run from the Actions tab. It packages only the public site files and the CV.

In the GitHub repository, select **Settings → Pages → Source → GitHub Actions** before the first deployment. A repository named `shammo-biswas.github.io` serves the portfolio at `https://shammo-biswas.github.io/`. A differently named repository serves it under that repository's path; all local asset links support either arrangement.

The workflow follows [GitHub's custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The site includes accessible navigation and focus states, publication filtering, expandable research overviews, direct GitHub links, email and clipboard contact options, reduced-motion support, and a print stylesheet.

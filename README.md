<div align="center">
  <img src="public/media/brand-logo.webp" alt="Project M.A.T.E.R.N. logo" width="340" />

  # Project M.A.T.E.R.N.

  **Maternal Awareness Through Effective Resource and Nursing Education**

  A responsive maternal health education website with Filipino guidance for pregnancy, childbirth, recovery, and family planning.
</div>

## About the project

Project M.A.T.E.R.N. was developed by fourth-year nursing students of Trinity University of Asia as a Plan-Do-Study-Act project for Nursing Leadership and Management. The website presents ten health topics from the project's approved content document. It is an information resource and does not require an account.

## Features

- Ten topic guides with in-page contents navigation and smooth scrolling
- Searchable, filterable topic cards and brief hover previews
- Filipino educational content with English topic headings
- Mobile layouts, keyboard navigation, and light and dark modes
- Official project branding, illustrations, and image credits

## Tech stack

Next.js 16, React 19, TypeScript, and CSS. The current site does not require a database, API key, or environment variables.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Keep the development server running while working on the site. If port 3000 is occupied, use the address shown in the terminal.

Check the project before publishing:

```bash
npm run typecheck
npm run build
```

## Deploy on Vercel

1. Create a GitHub repository for this project and push its files. Follow `.gitignore` so local dependencies, generated files, original source assets, and test artifacts stay out of the repository.
2. Sign in to [Vercel](https://vercel.com) and select **Add New → Project**.
3. Import the GitHub repository and confirm the **Next.js** framework preset.
4. Leave the root directory as `./` and the output directory blank. The default install and build commands work with this project.
5. Select **Deploy**, then check the homepage, a topic page, the navigation, and the images at the deployment URL.

Future pushes to the production branch trigger new deployments. The `.vercelignore` file also excludes local source and test files when deploying from a local checkout with the Vercel CLI.

## Project files

| Path | Purpose |
| --- | --- |
| `app/` | Pages, shared layout, metadata, and site styles |
| `components/` | Navigation, topic cards, search, and article display |
| `lib/project-content.json` | Website-ready content imported from the approved Word document |
| `lib/topics.ts` | Topic details and image mapping |
| `public/media/` | Optimized logos, icons, and content images used by the site |
| `public/pregnant.jpg` | Homepage image |
| `public/favicon-clean.png` | Transparent browser tab logo |
| `public/apple-touch-icon-clean.png` | Transparent phone home-screen logo |

To change the logo inside the website header, edit `components/navigation.tsx`. To change the browser tab logo, replace `public/favicon-clean.png`; the icon paths are declared in `app/layout.tsx`.

The original `.docx` document and full-resolution source images are not required for a Vercel deployment. Keep them separately if you plan to revise the educational content or create new image exports. The deployed site uses `lib/project-content.json` and the files in `public/media/`.

# Running and deploying Project M.A.T.E.R.N.

This guide is for people maintaining the website. The [README](README.md) introduces the site and its features to visitors.

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, usually [http://localhost:3000](http://localhost:3000). Keep the development server running while working on the site.

Before publishing, check the project with:

```bash
npm run typecheck
npm run build
```

## Deploy with Vercel

1. Push the project to a GitHub repository. Keep the local dependencies and generated files excluded by `.gitignore` out of the repository.
2. Sign in to [Vercel](https://vercel.com) and choose **Add New → Project**.
3. Import the repository and confirm the **Next.js** framework preset.
4. Leave the root directory as `./` and the output directory blank. Use the default install and build commands.
5. Select **Deploy**. At the deployment URL, check the homepage, a topic guide, navigation, and images on desktop and mobile.

Future pushes to the production branch trigger new deployments. When deploying from a local checkout with the Vercel CLI, `.vercelignore` excludes local source and test files.

## Where to make changes

| Path | Purpose |
| --- | --- |
| `app/` | Pages, shared layout, metadata, and site styles |
| `components/` | Navigation, topic cards, search, and guide display |
| `lib/project-content.json` | Website-ready educational content |
| `lib/topics.ts` | Topic details and image mapping |
| `public/media/` | Optimized logos, icons, and content images |
| `public/pregnant.jpg` | Homepage image |
| `public/favicon-clean.png` | Browser tab logo |
| `public/apple-touch-icon-clean.png` | Phone home-screen logo |

To change the website header logo, edit `components/navigation.tsx`. To change the browser tab logo, replace `public/favicon-clean.png`; the icon paths are declared in `app/layout.tsx`.

The original Word document and full-resolution source images are not needed for deployment. Keep them separately if you plan to revise the educational content or create new image exports. The deployed site uses `lib/project-content.json` and the files in `public/media/`.

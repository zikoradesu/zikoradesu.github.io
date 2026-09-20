# zikoradesu.github.io

[zikora.me](https://zikora.me), a small vite project.

## Development

```sh
npm install
npm run dev
```

The site is available at `/` and `/study`.

## Production

```sh
npm run build
npm run preview
```

Pushes to `main` are deployed automatically to GitHub Pages by the workflow in `.github/workflows/deploy.yml`.

### GitHub Pages SPA routing note

This project includes a fallback `public/404.html` so direct requests to `/study` or other generated routes redirect back into the built static app when hosted on GitHub Pages.
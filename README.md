# RSVP Dino SPA

A Vite-powered single page application with a dinosaur theme.

## Development

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy your app
3. Your site will be available at: `https://nqngo.github.io/2025-lucas-birthday/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

### Setup Requirements

To enable GitHub Pages deployment:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow in `.github/workflows/deploy.yml` will handle the rest

### Configuration

The app is configured to work with GitHub Pages through:
- `vite.config.js` - Sets the correct base path for production builds
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automated deployment
- `package.json` - Contains deployment scripts

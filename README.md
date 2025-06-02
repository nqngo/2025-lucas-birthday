# RSVP Dino SPA

A Vite-powered single page application with a dinosaur theme for birthday party invitations.

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and update with your party details:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` file with your party information:
   - `VITE_CHILD_NAME`: Child's name
   - `VITE_BIRTHDAY_TYPE`: Type of party (e.g., "SPA PARTY")
   - `VITE_EVENT_DATE`: Date and time of the event
   - `VITE_ADDRESS_LINE1`: First line of address
   - `VITE_ADDRESS_LINE2`: Second line of address
   - `VITE_RSVP_ENDPOINT`: Google Apps Script Web App URL for RSVP submissions

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

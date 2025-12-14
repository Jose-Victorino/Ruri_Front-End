## TODO:
- [ ] `STORE LOCATOR` UI & functionality
- [ ] `CART` UI
- [ ] `ITEM`, `PRODUCT` - add to cart functionality
- [ ] `CHECKOUT` UI & functionality
- [ ] `PRODUCT` - review UI & functionality
- [ ] `TRACK ORDER` - functionality

# Ruri

>A small React + Vite storefront and membership UI.

---

## Features
- Authentication pages (Login, Sign Up, Forgot Password)
- Shop listing, product and category pages
- Membership tiers and info
- Track order flow
- Responsive layout with SCSS modules

## Tech Stack
- Vite
- React 19
- React Router
- SCSS (module-based)
- Formik + Yup for forms

## Prerequisites
- Node.js 18+ (recommended)
- npm or a compatible package manager

## Setup
Clone the repo and install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Project Structure

- `src/` — application source
	- `App.jsx` — root app component
	- `main.jsx` — entry point
	- `components/` — UI components grouped by feature
	- `context/` — global context and state
	- `assets/` — images and svgs
	- `library/` — global SCSS (variables, utils, reset)

## Deployment
The project is a static frontend. After `npm run build`, serve the `dist/` output with any static host (Netlify, Vercel, GitHub Pages, or a simple static file server).

## Contributing
Open an issue or submit a PR. Keep changes focused and update styles or components with corresponding module files.

## License
Add a license file or specify the license here.

---

If you want I can: run the dev server, add a CONTRIBUTING guide, or add CI/deploy config.
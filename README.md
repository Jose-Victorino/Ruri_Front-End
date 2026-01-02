## TODO:
- [x] `CART` UI
- [x] `ITEM` - add to cart functionality
- [x] `STORE LOCATOR` UI
- [x] `PRODUCT` - review UI
- [x] `CHECKOUT` UI
- [x] `ALL POLICY` - UI
- [x] `PRODUCT, ITEM, CART, CHECKOUT` - Handle out of stock
- [ ] `ORDER CONFIRMATION` - UI
- [ ] `NAVIGATION, CART, CHECKOUT` - User functionality
- [ ] `NAVIGATION` - Search bar functionality
- [ ] `SEARCH RESULT` - UI
- [ ] `LOGIN` - forgot password
- [ ] `PROFILE` - UI & functionality
- [ ] App wide notification system **On-going**

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
- Vite 7
- React 19
- React Router 7
- SCSS (module-based)
- Formik + Yup for form validation
- React Toastify for notifications
- ESLint for code quality

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
MIT (add LICENSE file to repository)

---

Questions? Check the source code or open an issue.
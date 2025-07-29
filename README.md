# Yakov Yakubov — Illustrator Portfolio

This repository contains the source code for **Yakov Yakubov**, a high‑end portfolio website for the Israeli illustrator.  Built with the latest version of **React** and **Vite**, the site showcases Yakov’s work with a minimal aesthetic and a storytelling‑focused design.

## Features

* **Modern stack:** Vite + React + Tailwind CSS + Framer Motion
* **Responsive design:** fully adaptive layouts for desktop, tablet and mobile
* **Filterable portfolio:** gallery with category filters and list/grid view toggle
* **Animations:** subtle page and element transitions powered by Framer Motion
* **Accessibility:** semantic HTML, ARIA attributes and keyboard navigation support
* **SEO ready:** meta tags, OpenGraph tags and descriptive alt text
* **Dark mode:** optional dark theme included in the Tailwind configuration
* **Loading skeletons:** graceful loading states for images and content
* **Contact form:** built‑in form with client‑side validation (no back‑end)

## Development

This project uses [Vite](https://vitejs.dev/) as the build tool.  To work locally you need [Node.js](https://nodejs.org/) 16+ installed.

```bash
pnpm install # or `npm install` or `yarn install` if you prefer

npm run dev     # start a development server at http://localhost:5173
npm run build   # generate a production build in the `dist` folder
npm run preview # locally preview the production build
```

The code is organised into reusable components under `src/components`, pages under `src/pages`, a `MainLayout` in `src/layouts`, and utility hooks under `src/hooks`.  Global styles are defined with Tailwind in `src/index.css` and the custom theme lives in `tailwind.config.js`.

## Deployment

The `build` script generates a static site in the `dist` directory.  You can upload the contents of this folder to any static hosting service (e.g. Netlify, Vercel, GitHub Pages or a custom server).  No server‑side rendering is required.

## License

The code in this repository is provided for demonstration purposes.  Feel free to adapt it for your own projects.
# Yakov Yakubov — Illustrator Portfolio

This repository contains the source code for Yakov Yakubov, a high‑end portfolio website for the Israeli illustrator. Built with the latest version of React and Vite, the site showcases Yakov’s work with a minimal aesthetic and a storytelling‑focused design.

You can view the live site at [illustrator.yyakubov.com](https://illustrator.yyakubov.com).

## Features

- **Modern stack:** Vite + React + Tailwind CSS + Framer Motion
- **Responsive design:** fully adaptive layouts for desktop, tablet and mobile
- **Filterable portfolio:** gallery with category filters and list/grid view toggle
- **Animations:** subtle page and element transitions powered by Framer Motion
- **Accessibility:** semantic HTML, ARIA attributes and keyboard navigation support
- **SEO ready:** meta tags, OpenGraph tags and descriptive alt text
- **Dark mode:** optional dark theme included in the Tailwind configuration
- **Loading skeletons:** graceful loading states for images and content
- **Lightbox viewer:** clicking an artwork in the portfolio opens a responsive modal. The image is shown full‑size with its title and description (if provided), and you can navigate through artworks using left/right arrows or keyboard shortcuts. Clicking outside the modal or pressing Escape closes it.
- **Improved skeleton loading:** images are always loaded even when hidden and then fade in gracefully when ready. This ensures skeleton placeholders disappear as soon as the images have loaded.
- **Contact form:** built‑in form with client‑side validation (no back‑end)
- **Automatic artwork titles:** if an artwork pulled from your CMS lacks a title, the site generates a fallback title (e.g. “Editorial Artwork #3”) based on its category and position in the gallery.

## Contentful integration

Artworks and featured pieces are managed through Contentful. The portfolio and home pages fetch entries dynamically using the Contentful Content Delivery API.

### Fallback artwork titles

If you source artworks from a headless CMS such as Contentful, titles may occasionally be missing. A small utility (`src/utils/generateArtworkTitle.js`) provides a helper function that generates a default title whenever the title field is empty. The function formats the fallback as “{Category} Artwork #n”, where n is the artwork’s position in the current list. The gallery in `Portfolio.jsx` and the featured works section on the home page import this function and apply it when mapping over artworks.

### Contentful Setup

To enable dynamic artwork management, this project integrates with Contentful. You’ll need to supply credentials via environment variables and create an appropriate content model.

**Environment variables:**  
Create a `.env` file in the project root (or set environment variables in your deployment platform) with the following keys:

```
VITE_CONTENTFUL_SPACE_ID=<your_contentful_space_id>
VITE_CONTENTFUL_ACCESS_TOKEN=<your_contentful_access_token>
```

These values are used by the Contentful SDK in `src/utils/contentfulClient.js`.

**Content model:**  
In your Contentful space, define a content type named `artwork` with the following fields:
- `title` (Short text): optional – if left blank, a fallback title will be generated.
- `category` (Short text): e.g. “Editorial”, “Children’s Illustration”, etc. Used for filtering.
- `image` (Asset – Image): upload the artwork image.
- `description` (Long text): optional – used for extended details in list view.
- `featured` (Boolean): set to true for artworks that should appear on the home page’s Featured Works section.

**Adding artworks:**  
Create entries of type `artwork` for each piece in your portfolio. The site will fetch all artworks for the portfolio page and the first four featured items for the home page.

With these settings in place and valid credentials provided, the application will automatically fetch artwork data from Contentful on page load.

### Featured works on the home page

To display artworks in the Featured Works section of the home page, set the boolean field `featured` to true in your artwork entries on Contentful. The site requests up to four featured items (limit: 4) and displays them in a grid. If no featured artworks are found, the section shows a fallback message.

### Skeleton loader behaviour

The `ArtworkCard` component displays a gray skeleton while each image is loading. Images are rendered with zero opacity until they trigger the `onLoad` event. Once loaded, the skeleton is hidden and the image fades in smoothly. This approach prevents the situation where hiding the `<img>` tag would stop the browser from loading the image altogether.

## Development

This project uses Vite as the build tool. To work locally you need Node.js 16+ installed.

```bash
pnpm install # or `npm install` or `yarn install` if you prefer

npm run dev     # start a development server at http://localhost:5173
npm run build   # generate a production build in the `dist` folder
npm run preview # locally preview the production build
```

The code is organised into reusable components under `src/components`, pages under `src/pages`, a `MainLayout` in `src/layouts`, and utility hooks under `src/hooks`. Global styles are defined with Tailwind in `src/index.css` and the custom theme lives in `tailwind.config.js`.

## Deployment

The build script generates a static site in the `dist` directory. You can upload the contents of this folder to any static hosting service (e.g. Netlify, Vercel, GitHub Pages or a custom server). No server‑side rendering is required.

## License

The code in this repository is provided for demonstration purposes. Feel free to adapt it for your own projects.

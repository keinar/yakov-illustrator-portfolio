import { createClient } from 'contentful';

// Contentful client wrapper
// This file exports a preconfigured instance of the Contentful SDK
// using environment variables defined in your Vite configuration.
//
//   VITE_CONTENTFUL_SPACE_ID=<your_space_id>
//   VITE_CONTENTFUL_ACCESS_TOKEN=<your_access_token>
//
// You can then import `client` and call methods such as `getEntries`
// to fetch data.  See the Portfolio and Home pages for examples.

export const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

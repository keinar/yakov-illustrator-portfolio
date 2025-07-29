import dotenv from 'dotenv';
dotenv.config();
import pkg from 'contentful-management';
import OpenAI from 'openai';
const { createClient } = pkg;

const contentful = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const SPACE_ID = 'x93bgogiqd3y';
const ENVIRONMENT_ID = 'master';
const CONTENT_TYPE_ID = 'artwork';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// פונקציה להשהיה
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateTitleAndDescription(imageUrl) {
  while (true) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant that generates ONLY a clean title and description for an illustrator portfolio. Do NOT include labels like "Title:" or "Description:". Return only the plain text title and description.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze this illustration and return only:\n1st line = title (3–5 words)\n2nd line = description (1–2 sentences)' },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
      });

      const lines = response.choices[0].message.content.split('\n').map(l => l.trim()).filter(Boolean);
      const title = lines[0] || 'Untitled';
      const description = lines.slice(1).join(' ') || 'Illustration.';

      return { title, description };
    } catch (err) {
      if (err.status === 429) {
        const retryAfter = parseInt(err.headers?.get?.('retry-after-ms')) || 2000;
        console.warn(`⚠ Rate limit hit. Retrying in ${retryAfter}ms...`);
        await delay(retryAfter);
      } else {
        throw err;
      }
    }
  }
}

async function fetchAllAssets(environment) {
  let allAssets = [];
  let skip = 0;
  const limit = 100;

  while (true) {
    const response = await environment.getAssets({ limit, skip });
    allAssets = [...allAssets, ...response.items];
    if (response.items.length < limit) break;
    skip += limit;
  }

  return allAssets;
}

async function run() {
  const space = await contentful.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  const assets = await fetchAllAssets(environment);

  for (const asset of assets) {
    const assetId = asset.sys.id;
    const imageUrl = `https:${asset.fields.file['en-US'].url}`;

    // בדוק אם כבר יש Entry עם ה-Asset הזה
    const existingEntries = await environment.getEntries({
      content_type: CONTENT_TYPE_ID,
      'fields.image.sys.id': assetId,
    });

    if (existingEntries.items.length > 0) {
      console.log(`⏩ Skipped (already exists): ${asset.fields.file['en-US'].fileName}`);
      continue;
    }

    console.log(`➕ Creating new entry for: ${asset.fields.file['en-US'].fileName}`);

    const aiData = await generateTitleAndDescription(imageUrl);

    const newEntry = await environment.createEntry(CONTENT_TYPE_ID, {
      fields: {
        title: { 'en-US': aiData.title },
        category: { 'en-US': 'Uncategorized' },
        image: {
          'en-US': {
            sys: { type: 'Link', linkType: 'Asset', id: assetId },
          },
        },
        description: {
          'en-US': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [{ nodeType: 'text', value: aiData.description, marks: [], data: {} }],
              },
            ],
          },
        },
        featured: { 'en-US': false },
      },
    });

    await newEntry.publish();
    await delay(2000); // השהיה קטנה להפחתת עומס
  }
}

run().catch(console.error);

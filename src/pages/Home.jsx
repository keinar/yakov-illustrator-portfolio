import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArtworkCard from '../components/ArtworkCard.jsx';
import { generateArtworkTitle } from '../utils/generateArtworkTitle.js';
import { client } from '../utils/contentfulClient.js';

// Import static image used for the Visual Storytelling section only
import artwork5 from '../assets/artwork5.png';

/**
 * Home page fetches up to four featured artworks from Contentful on mount.
 * It displays a hero section, a responsive grid of featured works, a
 * storytelling explanation and a call‑to‑action. The featured works
 * section includes loading and error states; if no featured artworks are
 * returned or if the fetch fails, a user‑friendly message is shown.
 */
export default function Home() {
  // Featured artworks fetched from Contentful
  const [featuredWorks, setFeaturedWorks] = React.useState([]);
  const [featuredLoading, setFeaturedLoading] = React.useState(true);
  const [featuredError, setFeaturedError] = React.useState(null);

  // Fetch featured artworks on mount
  React.useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await client.getEntries({
          content_type: 'artwork',
          'fields.featured': true,
          limit: 4,
          include: 2, // ensure linked assets such as images are included
        });
        const mapped = response.items.map((entry) => {
          const { title = '', category, image } = entry.fields;
          // Some assets may not be resolved if include is insufficient; check existence
          const imageUrl = image?.fields?.file?.url ? `https:${image.fields.file.url}` : '';
          return {
            id: entry.sys.id,
            title,
            category,
            src: imageUrl,
            description:
              entry.fields.description?.content?.[0]?.content?.[0]?.value || '',
          };
        });
        setFeaturedWorks(mapped);
        setFeaturedLoading(false);
      } catch (err) {
        console.error(err);
        setFeaturedError(err);
        setFeaturedLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  // Animated floating shapes in the hero background
  const shapes = [
    { id: 1, size: 150, x: '-10%', y: '-10%', delay: 0 },
    { id: 2, size: 100, x: '80%', y: '20%', delay: 1 },
    { id: 3, size: 120, x: '30%', y: '70%', delay: 2 },
  ];

  return (
    <>
      <Helmet>
        <title>Home – Yakov Yakubov</title>
        <meta
          name="description"
          content="Welcome to the portfolio of illustrator Yakov Yakubov. Discover featured artworks and learn about his visual storytelling approach."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        {/* Animated background shapes */}
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-accent-light dark:bg-accent-dark opacity-30 mix-blend-multiply"
            style={{ width: shape.size, height: shape.size, top: shape.y, left: shape.x }}
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start text-center sm:text-left max-w-4xl">
          <motion.h1
            className="text-4xl sm:text-6xl font-serif font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Inspiring Illustrations
            <br />
            <span className="text-accent-light dark:text-accent-dark">by Yakov Yakubov</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl max-w-xl mb-8 text-muted-light dark:text-muted-dark"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          >
            Illustrator & visual storyteller crafting unforgettable images that spark imagination
            and emotion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.4 }}
          >
            <Link
              to="/portfolio"
              className="self-center sm:self-start inline-block bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Explore Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Featured Work */}
      <section className="py-20 sm:py-24 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-serif font-semibold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Featured Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLoading ? (
              <p className="col-span-full text-center text-lg">Loading artworks…</p>
            ) : featuredError || featuredWorks.length === 0 ? (
              <p className="col-span-full text-center text-lg">
                No artworks available. Please check back later or ensure your Contentful entries are correctly configured.
              </p>
            ) : (
              featuredWorks.map((work, index) => {
                const title = generateArtworkTitle(work, index);
                return (
                  <ArtworkCard
                    key={work.id ?? index}
                    title={title}
                    image={work.src}
                    category={work.category}
                  />
                );
              })
            )}
          </div>
          {/* Link to portfolio page below featured works */}
          <div className="mt-8 text-center">
            <Link
              to="/portfolio"
              className="inline-block bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              See More Works
            </Link>
          </div>
        </div>
      </section>
      {/* Visual Storytelling Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-4">Visual Storytelling</h2>
            <p className="text-lg leading-relaxed text-muted-light dark:text-muted-dark">
              My art is rooted in storytelling – each line and colour choice is made with
              intention to guide the viewer’s eye and evoke emotion. I merge traditional
              techniques with modern digital tools to craft imagery that resonates across
              cultures and generations. From editorial pieces to children’s books and
              character design, my work captures the essence of the narrative and invites
              audiences into new worlds.
            </p>
          </motion.div>
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <img
              src={artwork5}
              alt="Storytelling illustration"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>
      </section>
      {/* Collaborate Section */}
      <section className="py-20 sm:py-24 bg-accent-light/10 dark:bg-accent-dark/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-serif font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Let’s Collaborate
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-muted-light dark:text-muted-dark max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            Ready to bring your story to life? I’d love to hear about your project and
            explore how we can create something extraordinary together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <Link
              to="/contact"
              className="inline-block bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark px-8 py-3 rounded-full font-semibold uppercase tracking-wide shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Let’s Talk
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
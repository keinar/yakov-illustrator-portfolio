import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';

// Utility for generating fallback titles when missing
import { generateArtworkTitle } from '../utils/generateArtworkTitle.js';

// Contentful client for fetching artwork entries
import { client } from '../utils/contentfulClient.js';

/**
 * Portfolio page showcases the full collection of artworks. Users can filter
 * by category and toggle between grid and list views. The page fetches
 * artwork data from Contentful, including a description field used in the
 * lightbox modal. Clicking on any artwork opens a full‑screen modal where
 * the image, title and description can be viewed. Users can navigate
 * between artworks with arrows or keyboard keys and close the modal by
 * clicking outside, using the escape key, or the close button. The
 * background scroll is disabled while the modal is open.
 */
export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  // Artworks fetched from Contentful
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for lightbox modal
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch artworks from Contentful on mount
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const response = await client.getEntries({ content_type: 'artwork' });
        const mapped = response.items.map((entry) => {
          return {
            id: entry.sys.id,
            title: entry.fields.title || '',
            category: entry.fields.category,
            src: `https:${entry.fields.image.fields.file.url}`,
            description:
              entry.fields.description?.content?.[0]?.content?.[0]?.value || '',
          };
        });
        setArtworks(mapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    }
    fetchArtworks();
  }, []);

  // Extract unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = Array.from(new Set(artworks.map((a) => a.category)));
    return ['All', ...cats];
  }, [artworks]);

  // Filter artworks by selected category
  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'All') return artworks;
    return artworks.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, artworks]);

  /**
   * Open modal for selected artwork. Save the index so we can navigate
   * relative to the filtered list.
   */
  const openModal = (art, index) => {
    setSelectedArtwork(art);
    setCurrentIndex(index);
  };

  /**
   * Close modal and restore scroll.
   */
  const closeModal = () => {
    setSelectedArtwork(null);
  };

  /**
   * Show previous artwork in filtered list, wrapping around if at start.
   */
  const showPrev = () => {
    if (filteredArtworks.length === 0) return;
    const newIndex = (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    setCurrentIndex(newIndex);
    setSelectedArtwork(filteredArtworks[newIndex]);
  };

  /**
   * Show next artwork in filtered list, wrapping around if at end.
   */
  const showNext = () => {
    if (filteredArtworks.length === 0) return;
    const newIndex = (currentIndex + 1) % filteredArtworks.length;
    setCurrentIndex(newIndex);
    setSelectedArtwork(filteredArtworks[newIndex]);
  };

  /**
   * Handle keydown events for modal navigation and closing. Left/right arrows
   * navigate between artworks; Escape closes the modal.
   */
  useEffect(() => {
    function handleKeyDown(e) {
      if (!selectedArtwork) return;
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArtwork, currentIndex, filteredArtworks]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (selectedArtwork) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [selectedArtwork]);

  // Render loading state
  if (loading) {
    return (
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg">Loading artworks…</p>
        </div>
      </section>
    );
  }

  // Render error or empty state
  if (error || artworks.length === 0) {
    return (
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg">
            No artworks available. Please check back later or ensure your Contentful entries are correctly configured.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portfolio – Yakov Yakubov</title>
        <meta
          name="description"
          content="Explore the comprehensive collection of Yakov Yakubov’s artistic journey across various styles and mediums."
        />
      </Helmet>
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-3xl sm:text-4xl font-serif font-semibold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-muted-light dark:text-muted-dark text-center max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            A comprehensive collection of my artistic journey, showcasing various styles,
            mediums, and creative explorations across different projects and periods.
          </motion.p>
          {/* Filters and view toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-accent-light text-background-light dark:bg-accent-dark dark:text-background-dark'
                      : 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors ${
                  viewMode === 'grid'
                    ? 'text-accent-light dark:text-accent-dark'
                    : 'text-muted-light dark:text-muted-dark'
                }`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors ${
                  viewMode === 'list'
                    ? 'text-accent-light dark:text-accent-dark'
                    : 'text-muted-light dark:text-muted-dark'
                }`}
              >
                <ListBulletIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Gallery */}
          {viewMode === 'grid' ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
              <AnimatePresence>
                {filteredArtworks.map((art, index) => {
                  const title = generateArtworkTitle(art, index);
                  return (
                    <motion.div
                      key={art.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden rounded-lg shadow-md bg-background-light dark:bg-background-dark cursor-pointer"
                      onClick={() => openModal({ ...art, title }, index)}
                    >
                      <img
                        src={art.src}
                        alt={title}
                        className="w-full h-56 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{title}</h3>
                        <p className="text-sm text-muted-light dark:text-muted-dark uppercase tracking-wider">
                          {art.category}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div className="space-y-6" layout>
              <AnimatePresence>
                {filteredArtworks.map((art, index) => {
                  const title = generateArtworkTitle(art, index);
                  return (
                    <motion.div
                      key={art.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex flex-col md:flex-row overflow-hidden rounded-lg shadow-md bg-background-light dark:bg-background-dark cursor-pointer"
                      onClick={() => openModal({ ...art, title }, index)}
                    >
                      <img
                        src={art.src}
                        alt={title}
                        className="w-full md:w-64 h-56 md:h-auto object-cover"
                        loading="lazy"
                      />
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-xl mb-2">{title}</h3>
                        <p className="text-sm text-muted-light dark:text-muted-dark uppercase tracking-wider mb-4">
                          {art.category}
                        </p>
                        <p className="text-base text-muted-light dark:text-muted-dark">
                          This piece explores the nuances of {art.category.toLowerCase()} illustration through
                          thoughtful composition and rich detail.
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Close button floating in overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="absolute top-6 right-6 text-white text-3xl cursor-pointer"
            >
              ✕
            </button>
            {/* Left arrow: on mobile place closer to edge */}
            {filteredArtworks.length > 1 && (
              <div
                className="absolute top-1/2 left-2 sm:left-6 text-white text-5xl sm:text-4xl cursor-pointer select-none z-10"
                style={{ transform: 'translateY(-50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
              >
                ‹
              </div>
            )}
            {/* Right arrow: on mobile place closer to edge */}
            {filteredArtworks.length > 1 && (
              <div
                className="absolute top-1/2 right-2 sm:right-6 text-white text-5xl sm:text-4xl cursor-pointer select-none z-10"
                style={{ transform: 'translateY(-50%)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
              >
                ›
              </div>
            )}
            <motion.div
              className="relative max-w-3xl w-[90%] max-h-[80vh] overflow-y-auto p-4 bg-background-light dark:bg-background-dark rounded-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <img
                src={selectedArtwork.src}
                alt={selectedArtwork.title}
                className="w-full max-h-[60vh] object-contain rounded"
              />
              <div className="mt-4">
                <h2 className="text-2xl font-semibold text-center md:text-left text-gray-900 dark:text-gray-100 break-words">
                  {selectedArtwork.title}
                </h2>
                {selectedArtwork.description && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedArtwork.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton.jsx';

/**
 * ArtworkCard displays a single piece of artwork with a loading skeleton
 * until the image has fully loaded.  On hover the card scales slightly
 * and reveals an overlay containing the artwork title and category.  The
 * component is responsive and accessible via alt text.
 */
export default function ArtworkCard({ src, title, category, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg bg-background-light dark:bg-background-dark group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {!loaded && <Skeleton className="w-full h-64" />}
      <img
        src={src}
        alt={alt || title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 ${loaded ? 'block' : 'hidden'}`}
      />
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 dark:bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        {category && (
          <span className="text-sm text-gray-200 uppercase tracking-wider">{category}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
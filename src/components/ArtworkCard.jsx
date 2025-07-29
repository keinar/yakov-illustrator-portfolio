import React, { useState } from 'react';

/**
 * Reusable card component for displaying an artwork thumbnail. Shows a
 * skeleton placeholder while the image loads, then fades the image in.
 * Hovering over the card reveals the title and category. The image is
 * still loaded when hidden via opacity so the onLoad event fires, avoiding
 * the bug where hidden images never load.
 */
export default function ArtworkCard({ title, image, category }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg bg-background-light dark:bg-background-dark group">
      {/* Skeleton overlay while image loads */}
      <div
        className={`${loaded ? 'hidden' : ''} bg-muted-light dark:bg-muted-dark rounded animate-pulse w-full h-64 absolute inset-0`}
      />
      <img
        src={image}
        alt={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Overlay with title and category on hover */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        {category && <span className="text-sm text-gray-200 uppercase tracking-wider">{category}</span>}
      </div>
    </div>
  );
}
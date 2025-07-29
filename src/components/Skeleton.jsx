import React from 'react';

/**
 * Skeleton component renders a gray placeholder with a pulsating animation.
 * Use it to display loading placeholders for images or content.  The
 * component accepts `className` to override width/height.
 */
export default function Skeleton({ className = '' }) {
  return (
    <div className={`bg-muted-light dark:bg-muted-dark rounded animate-pulse ${className}`}></div>
  );
}
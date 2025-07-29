import React from 'react';

/**
 * LoadingPage provides a simple fallback UI while lazy‑loaded pages are
 * downloading.  It displays an animated spinner in the centre of the
 * viewport.  You could enhance this with skeletons or branded animations.
 */
export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-light dark:border-accent-dark"></div>
    </div>
  );
}
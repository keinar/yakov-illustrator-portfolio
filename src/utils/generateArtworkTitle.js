/**
 * Utility helper to generate a display title for an artwork.  If the
 * artwork has a defined and non‑empty `title` field it is returned as
 * is.  Otherwise a generic title based on the artwork’s category and
 * position in the collection is returned.  This enables graceful
 * fallback behaviour when content originates from a headless CMS such
 * as Contentful where titles may be optional.
 *
 * @param {Object} artwork The artwork object (may originate from CMS or local data)
 * @param {number} index   Zero‑based index of the artwork in the current list
 * @returns {string}       The computed title
 */
export function generateArtworkTitle(artwork, index) {
  const category = artwork.category || 'Artwork';
  return artwork.title && artwork.title.trim() !== ''
    ? artwork.title
    : `${category} Artwork #${index + 1}`;
}

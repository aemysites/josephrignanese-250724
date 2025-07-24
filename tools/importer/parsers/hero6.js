/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly the block name in the requirements
  const headerRow = ['Hero (hero6)'];

  // 1st content row: Background Image (optional)
  // The background image is the absolutely positioned .cover-image
  let bgImage = element.querySelector('img.cover-image.utility-position-absolute');
  // Fallback, if not present, to just the first .cover-image
  if (!bgImage) {
    bgImage = element.querySelector('img.cover-image');
  }

  // 2nd content row: Title, subheading, features, CTA (all in card body)
  // The main card body contains all textual content and button(s)
  // We want to reference the real element, not clone
  let cardBody = null;
  const card = element.querySelector('.card.card-on-secondary');
  if (card) {
    cardBody = card.querySelector('.card-body');
  }
  // If for some reason cardBody isn't found, fallback to the card or container
  if (!cardBody) {
    // try the next container up
    const container = element.querySelector('.container');
    cardBody = container || '';
  }

  // Compose table rows as per spec
  const rows = [
    headerRow,
    [bgImage ? bgImage : ''],
    [cardBody ? cardBody : ''],
  ];

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

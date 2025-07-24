/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Hero (hero11)'];

  // Collect all direct child divs (for grid layout)
  const gridItems = Array.from(element.querySelectorAll(':scope > div'));

  // Collect all images from the grid
  const images = gridItems
    .map(div => div.querySelector('img'))
    .filter(Boolean); // Only those divs that actually contain an image

  // There is no text content (headings/subheading/cta) in the provided HTML
  // so the third row must be present but empty as per structure

  // Compose cells array matching required block structure: 1 col, 3 rows
  const cells = [
    headerRow,
    [images], // all images as a single cell (array of elements)
    [''],     // empty cell for text/cta which don't exist in HTML
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as example
  const headerRow = ['Hero (hero38)'];

  // Get the immediate children of the main grid
  const grid = element.querySelector('.w-layout-grid');
  let imageCell = '';
  let contentCell = '';

  if (grid) {
    const gridDivs = grid.querySelectorAll(':scope > div');
    // First cell: background image (if any)
    if (gridDivs.length > 0) {
      const img = gridDivs[0].querySelector('img');
      if (img) imageCell = img;
    }
    // Second cell: content (headings, description, button)
    if (gridDivs.length > 1) {
      // Grab everything in the 2nd grid div
      // This may include its own inner grid - preserve entire block
      contentCell = gridDivs[1];
    }
  }

  // Build table rows as a single-column, three-row block
  const cells = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

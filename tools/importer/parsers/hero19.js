/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (must match exactly)
  const headerRow = ['Hero (hero19)'];

  // 2. Background image cell: use the collage/grid of images (referencing the existing node)
  // Find the grid-layout > desktop-3-column container
  let bgCell = '';
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (imageGrid) {
    bgCell = imageGrid;
  } else {
    // Fallback: collect all images in a div
    const imgs = element.querySelectorAll('img');
    if (imgs.length > 0) {
      const imgDiv = document.createElement('div');
      imgs.forEach(img => imgDiv.appendChild(img));
      bgCell = imgDiv;
    }
  }

  // 3. Content cell: headline, subheading, CTA (reference container if possible)
  let contentCell = '';
  // Try to find the main content div
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (!contentContainer) {
    // Fallback: Try .utility-text-on-overlay or .container
    contentContainer = element.querySelector('.utility-text-on-overlay') || element.querySelector('.container');
  }
  if (contentContainer) {
    contentCell = contentContainer;
  } else {
    // Fallback: Compose from headline, subheading, CTA buttons
    const div = document.createElement('div');
    const h1 = element.querySelector('h1');
    const p = element.querySelector('p');
    const btns = element.querySelectorAll('a.button');
    if (h1) div.appendChild(h1);
    if (p) div.appendChild(p);
    btns.forEach(btn => div.appendChild(btn));
    contentCell = div.childNodes.length ? div : '';
  }

  // 4. Compose cells for the block table: 1 column, 3 rows
  const cells = [
    headerRow,
    [bgCell],
    [contentCell]
  ];

  // 5. Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

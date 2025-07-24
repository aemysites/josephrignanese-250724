/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main two-column grid (text and text+meta)
  const firstGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  if (!firstGrid) return;
  const leftCol = firstGrid.children[0];
  const rightCol = firstGrid.children[1];

  // The images are in the second grid
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md.utility-margin-top-8rem.y-top');
  const images = imagesGrid ? Array.from(imagesGrid.querySelectorAll('img')) : [];

  // Compose left (text) column content: headline, eyebrow, intro, author info, button
  // We reference the actual elements directly (do not clone)
  const leftContent = document.createElement('div');
  Array.from(leftCol.childNodes).forEach(node => leftContent.appendChild(node));
  Array.from(rightCol.childNodes).forEach(node => leftContent.appendChild(node));

  // Compose right (images) column content
  const rightContent = document.createElement('div');
  images.forEach(img => rightContent.appendChild(img));

  // Build the table cells
  const headerRow = ['Columns (columns16)'];
  const cells = [headerRow, [leftContent, rightContent]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

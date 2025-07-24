/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return; // edge case: no grid, do nothing

  // Find all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // For each column, get the nested <img> (the content)
  const images = columns.map(col => col.querySelector('img')).filter(Boolean);

  // Table header: must be a single cell (array with one string)
  const headerRow = ['Columns (columns30)'];
  // Table content: array with N cells, each one an image
  const contentRow = images;

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
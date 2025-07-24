/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid -- should be the columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // --- Header row per block spec ---
  const headerRow = ['Columns (columns31)'];

  // --- Content row: each column should be a single cell referencing the actual node ---
  // Reference the real DOM elements in the cells array
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the origin element with the new block table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container, which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns) inside the grid
  const columns = Array.from(grid.children);

  // The header row must be a single cell with the block name, per example
  const headerRow = ['Columns (columns34)'];
  // The content row contains each column as a separate cell
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}

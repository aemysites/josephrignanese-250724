/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns grid inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child columns from the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row: exactly one cell, per the example
  const headerRow = ['Columns (columns9)'];

  // Content row: as many cells as there are columns
  const contentRow = columns;

  // Create the table with correct header structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

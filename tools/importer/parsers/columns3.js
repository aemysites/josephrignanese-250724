/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header row: must be a single cell, even for multi-column content
  const headerRow = ['Columns (columns3)'];

  // Find the grid container that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all columns (direct children of the grid)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Second row: one cell per column
  const contentRow = columns;

  // Compose the cells array so that header row has only one cell (single array element)
  // and the content row has as many cells as columns
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the two columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  
  // Get the immediate children of the grid (should be the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: need at least 2 columns

  // Block header row (MUST match spec exactly)
  const headerRow = ['Columns (columns26)'];

  // Content row: left and right columns
  // Reference the *existing* elements directly (do not clone)
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Table structure as per spec: [header], [left, right]
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCol, rightCol],
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

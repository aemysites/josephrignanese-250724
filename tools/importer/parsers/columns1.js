/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Create the table with a single header cell (spans all columns)
  // This will ensure the header row has only one column, as required.
  const headerRow = ['Columns (columns1)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Set the header cell to span all columns
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }

  element.replaceWith(table);
}

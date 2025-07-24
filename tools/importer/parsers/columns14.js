/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single column with the exact text
  const headerRow = ['Columns (columns14)'];

  // Find the .grid-layout container which holds the columns
  const grid = element.querySelector('.grid-layout');

  let contentRow = [];
  if (grid) {
    // For the columns row, push all column divs into a single array (each will become a <td>)
    contentRow = Array.from(grid.children);
  } else {
    // Fallback: treat the whole element as one column if structure is unexpected
    contentRow = [element];
  }

  // Build the rows: one header row (1 col), one data row (N columns)
  const rows = [
    headerRow,
    contentRow
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

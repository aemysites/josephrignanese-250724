/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all direct children divs representing columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Header row: single cell, exactly as in the example
  const headerRow = ['Columns (columns28)'];
  // Second row: one cell per column
  const contentRow = columns.map(col => {
    // If the column contains an image, use the image
    const img = col.querySelector('img');
    if (img) return img;
    // Otherwise, use the column element itself
    return col;
  });
  // Compose table data: first row is single header cell, second row is one cell per column
  const tableCells = [headerRow, contentRow];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // The table header row must have a single cell spanning all columns
  // WebImporter.DOMUtils.createTable does not automatically set colspan
  // Fix: Manually set colspan on the first th if there are multiple columns
  if (contentRow.length > 1) {
    const th = table.querySelector('tr:first-child th');
    if (th) th.colSpan = contentRow.length;
  }
  element.replaceWith(table);
}

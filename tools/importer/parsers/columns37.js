/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column cell, per example
  const headerRow = ['Columns (columns37)'];

  // Second row: each column div becomes a cell
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = columns;

  // Assemble the table: header is a single cell, next row has N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}

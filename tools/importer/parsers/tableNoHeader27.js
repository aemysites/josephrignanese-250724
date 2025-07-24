/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per the example
  const headerRow = ['Table (no header)'];
  const rows = [];

  // Find all immediate children that are .divider elements
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each .divider contains a .w-layout-grid with two children (Q and A)
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    const [heading, answer] = grid.children;
    if (heading && answer) {
      rows.push([[heading, answer]]); // Place both elements in a single cell (array)
    }
  });

  // Only build the table if there is at least one data row
  if (rows.length > 0) {
    const tableData = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(table);
  }
}

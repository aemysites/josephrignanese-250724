/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (representing the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the header row (single column)
  const cells = [
    ['Columns (columns18)'],
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original grid block with the new table
  element.replaceWith(table);
}

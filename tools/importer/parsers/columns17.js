/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block: exactly one column, as per requirements
  const headerRow = ['Columns (columns17)'];

  // Get the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left content (text: headings, subheading)
  const leftContent = gridChildren.find(
    (el) => el.tagName !== 'UL' && el.tagName !== 'IMG'
  );
  // Identify contacts list (ul)
  const contactsList = gridChildren.find((el) => el.tagName === 'UL');
  // Identify image (column 2)
  const imageContent = gridChildren.find((el) => el.tagName === 'IMG');

  // Compose left cell: left content + contacts list (if present)
  const leftCell = document.createElement('div');
  if (leftContent) leftCell.appendChild(leftContent);
  if (contactsList) leftCell.appendChild(contactsList);

  // Compose right cell: image only
  const rightCell = imageContent;

  // Table row containing both columns
  const row2 = [leftCell, rightCell];

  // Final table: header is a single column, next row is both columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // single cell
    row2       // two cells (columns)
  ], document);

  element.replaceWith(table);
}

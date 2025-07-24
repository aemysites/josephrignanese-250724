/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .grid-layout which contains all column content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // There are 4 direct children:
  // 0: Taylor Brooks
  // 1: tag list
  // 2: h2 heading
  // 3: body rich text

  // Left Column: author name
  const leftCol = columns[0];
  // Middle Column: the tag list
  const middleCol = columns[1];
  // Right Column: heading + body rich text
  // Put heading and body within a wrapper for structure
  const rightColWrapper = document.createElement('div');
  if (columns[2]) rightColWrapper.appendChild(columns[2]);
  if (columns[3]) rightColWrapper.appendChild(columns[3]);

  // Table header as specified
  const headerRow = ['Columns (columns29)'];
  // Table content row: three columns
  const contentRow = [leftCol, middleCol, rightColWrapper];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

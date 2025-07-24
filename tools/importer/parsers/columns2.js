/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (main content)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  // The structure is:
  // [0]: large left column (main image, tag, heading, desc)
  // [1]: right top (two cards)
  // [2]: right vertical list of links (with dividers)
  const gridChildren = Array.from(grid.children);
  const leftCol = gridChildren[0];
  // For right col: combine gridChildren[1] and gridChildren[2] into a single div
  const rightColGroup = document.createElement('div');
  for (let i = 1; i < gridChildren.length; i++) {
    rightColGroup.appendChild(gridChildren[i]);
  }
  // Compose the block table: header and content row (2 columns)
  const headerRow = ['Columns (columns2)'];
  const cells = [
    headerRow,
    [leftCol, rightColGroup],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

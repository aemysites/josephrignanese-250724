/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The left column is the textual content (possibly nested grid), right column is the image
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 2) return;

  let leftCol = gridChildren[0];
  let rightCol = gridChildren[1];

  // Handle possible nested grid for leftCol
  // If the leftCol contains a single child that is a grid, drill down
  if (leftCol.classList.contains('w-layout-grid')) {
    const innerSections = leftCol.querySelectorAll(':scope > .section');
    if (innerSections.length) {
      leftCol = innerSections[0];
    }
  }

  // Table header as per the Block Table Creation guidelines
  const headerRow = ['Columns (columns23)'];
  // Table content row contains both columns as elements
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

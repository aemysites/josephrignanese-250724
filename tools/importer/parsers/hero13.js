/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row, as specified in the markdown example
  const headerRow = ['Hero (hero13)'];

  // 2. Extract background image (row 2)
  // The image is always present and should be in the first grid cell
  let bgImg = null;
  // Find the grid container
  let grid = element.querySelector(':scope > .w-layout-grid') || element.querySelector('.w-layout-grid') || element;
  let gridChildren = Array.from(grid.children);
  // First cell/column is the image
  let bgImgDiv = gridChildren[0];
  if (bgImgDiv) {
    bgImg = bgImgDiv.querySelector('img');
  }
  // If not found, fallback to any cover image inside the element
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  // If still not found, leave empty cell
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Extract title/subtitle/CTA (row 3)
  // The main content is in the second cell of the grid
  let contentDiv = gridChildren[1];
  // Strip out empty elements (like .button-group align-center if empty)
  let contentCell = '';
  if (contentDiv) {
    // Clone so we can strip empty .button-group if necessary
    const temp = contentDiv.cloneNode(true);
    const buttonGroup = temp.querySelector('.button-group');
    if (buttonGroup && !buttonGroup.textContent.trim()) {
      buttonGroup.remove();
    }
    // If still anything left, keep the element
    if (temp.innerHTML.trim()) {
      contentCell = temp;
    } else {
      contentCell = '';
    }
  }

  // 4. Build the cells array, structure is exactly as the markdown/table example (1 col x 3 rows)
  const cells = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

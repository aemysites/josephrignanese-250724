/* global WebImporter */
export default function parse(element, { document }) {
  // Set number of columns per row based on example (3 per row)
  const columnsPerRow = 3;
  const headerRow = ['Columns (columns8)'];

  // Get all immediate child divs (each contains an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each, get the <img>, or empty string if missing
  const imgs = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : '';
  });

  // Distribute images into rows of N columns each
  const contentRows = [];
  for (let i = 0; i < imgs.length; i += columnsPerRow) {
    contentRows.push(imgs.slice(i, i + columnsPerRow));
  }

  // Compose final table
  const cells = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

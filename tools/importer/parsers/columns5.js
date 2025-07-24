/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Prepare header row, block name and variant exactly as specified
  const headerRow = ['Columns (columns5)'];
  // Each column cell should reference the key content: if a single child, that child; otherwise the column itself
  const contentRow = columns.map((col) => {
    // Usually there's a single wrapper (like utility-aspect-1x1), use its child if it's a single content element
    if (col.childElementCount === 1 && col.firstElementChild) {
      return col.firstElementChild;
    }
    // Otherwise, use the column wrapper itself
    return col;
  });
  // Build the block table per the block guidelines
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}

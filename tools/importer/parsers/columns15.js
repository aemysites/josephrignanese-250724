/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with columns (e.g. for columns15 block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all columns (direct children of grid)
  const columns = Array.from(grid.children).filter(col => col.nodeType === 1);
  if (columns.length < 2) return;

  // Helper to collect all meaningful content in a given column
  function collectContent(col) {
    // If the column is an image (for robustness)
    if (col.tagName === 'IMG') return [col];
    // Otherwise, gather all non-empty child nodes (including text nodes)
    const nodes = [];
    col.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        nodes.push(node);
      } else if (node.nodeType === 3) {
        // Text node with actual text
        if (node.textContent && node.textContent.trim().length > 0) {
          // Wrap in a span for proper DOM referencing
          const span = document.createElement('span');
          span.textContent = node.textContent;
          nodes.push(span);
        }
      }
    });
    return nodes;
  }

  const col1Content = collectContent(columns[0]);
  const col2Content = collectContent(columns[1]);

  // Table header row exactly as required
  const headerRow = ['Columns (columns15)'];
  const cells = [
    headerRow,
    [col1Content, col2Content]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

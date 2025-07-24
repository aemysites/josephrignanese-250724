/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, as per instructions and example
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // All cards are within .w-tab-pane > .w-layout-grid > a
  const panes = element.querySelectorAll('.w-tab-pane');
  panes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((a) => {
      // Try to get image
      let img = null;
      // Two patterns: image card and text-only card
      const aspectDiv = a.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        img = aspectDiv.querySelector('img');
      }

      // Text elements may be direct or nested deeper for text-only cards
      let title = a.querySelector('h3, .h4-heading');
      let desc = a.querySelector('.paragraph-sm');
      if (!title || !desc) {
        // Check for text cards with .utility-text-align-center
        const deeper = a.querySelector('.utility-text-align-center');
        if (deeper) {
          if (!title) title = deeper.querySelector('h3, .h4-heading');
          if (!desc) desc = deeper.querySelector('.paragraph-sm');
        }
      }

      // Build text cell: Keep original nodes for correct referencing
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);

      // Add row if there is at least one cell with content
      if (img || textCell.length > 0) {
        rows.push([
          img ? img : '',
          textCell.length === 1 ? textCell[0] : textCell
        ]);
      }
    });
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

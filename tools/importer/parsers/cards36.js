/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function: extract title, p, and CTA from a container
  function extractTextContent(container) {
    const parts = [];
    // Title: h2, h3, or h4
    const heading = container.querySelector('h2, h3, h4');
    if (heading) parts.push(heading);
    // Description: first <p>
    const desc = container.querySelector('p');
    if (desc) parts.push(desc);
    // CTA: .button
    const cta = container.querySelector('.button');
    if (cta) parts.push(cta);
    return parts;
  }

  // Get the main .container > .grid-layout
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const mainGrid = container.querySelector(':scope > .grid-layout');
  if (!mainGrid) return;

  // Gather all card elements (direct <a>s and <a>s inside nested .grid-layout)
  const cards = [];
  mainGrid.childNodes.forEach(node => {
    if (node.nodeType !== 1) return;
    if (node.matches('a')) {
      cards.push(node);
    } else if (node.matches('.grid-layout')) {
      node.querySelectorAll(':scope > a').forEach(a => cards.push(a));
    }
  });

  const rows = [];
  // Header row: must match exactly
  rows.push(['Cards (cards36)']);

  cards.forEach(card => {
    // Find image: first image in any aspect-ratio container, fallback to first img
    let img = card.querySelector('.utility-aspect-2x3 img, .utility-aspect-1x1 img');
    if (!img) img = card.querySelector('img');

    // Text: prefer .utility-padding-all-2rem if present, else the card itself
    const textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    const textElements = extractTextContent(textContainer);

    // Only add the row if image and text exist
    if (img || textElements.length) {
      rows.push([
        img || '',
        textElements
      ]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

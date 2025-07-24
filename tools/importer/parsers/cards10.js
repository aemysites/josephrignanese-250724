/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, use exact text from the requirements
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card anchors directly under grid
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // Find the image for the card (always present)
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Build the text content for the 2nd cell
    const textWrap = card.querySelector('.utility-padding-all-1rem');
    const cellContent = [];

    if (textWrap) {
      // Tag (optional)
      const tag = textWrap.querySelector('.tag-group .tag');
      if (tag) cellContent.push(tag);
      // Heading (optional)
      const heading = textWrap.querySelector('h3');
      if (heading) cellContent.push(heading);
      // Description (optional)
      const desc = textWrap.querySelector('p');
      if (desc) cellContent.push(desc);
      // If there's a CTA link in the text block (not in this HTML), add here
    }
    // Compose the row: [image, text content]
    rows.push([
      img,
      cellContent
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

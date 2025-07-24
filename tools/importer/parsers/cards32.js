/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in the example
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Select all direct <a> elements (cards) inside this block
  const cardLinks = element.querySelectorAll(':scope > a');
  cardLinks.forEach((cardLink) => {
    // Image: always first <img> descendant of the card link
    const img = cardLink.querySelector('img');

    // Find the grid that wraps the text and image
    const innerGrid = cardLink.querySelector(':scope > div');
    let textDiv = null;
    if (innerGrid) {
      // Find the first descendant div that contains a heading (h3.h4-heading)
      // This is the main text content block for that card
      const maybeTextDivs = innerGrid.querySelectorAll(':scope > div');
      for (const div of maybeTextDivs) {
        if (div.querySelector('h3, .h4-heading')) {
          textDiv = div;
          break;
        }
      }
      // If not found, fallback to the second div if it exists
      if (!textDiv && maybeTextDivs.length > 1) textDiv = maybeTextDivs[1];
      if (!textDiv && maybeTextDivs.length > 0) textDiv = maybeTextDivs[0];
    }
    // Defensive: fallback to cardLink itself (should never hit, but just in case)
    if (!textDiv) textDiv = document.createElement('div');

    // Add the image and text div as references to the new table row
    rows.push([
      img,
      textDiv
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Set up the header row to match the example exactly
  const headerRow = ['Cards (cards20)'];

  // Defensive: Try to find the .card-body. If not found, use the element itself.
  let cardBody = element.querySelector('.card-body') || element;

  // Get the first img inside the card body (image is mandatory)
  const img = cardBody.querySelector('img');

  // Get the heading (typically h4-heading class; could be h4, h3, etc.)
  let heading = cardBody.querySelector('.h4-heading, h4, h3, h2, h1');

  // If no heading, fallback to first heading element
  if (!heading) {
    heading = cardBody.querySelector('h1,h2,h3,h4,h5,h6');
  }

  // Defensive handling: if any are missing, use an empty string
  const imageCell = img || '';
  const textCell = heading || '';

  // Compose table rows: header and one card row
  const rows = [
    headerRow,
    [imageCell, textCell],
  ];

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element in the DOM
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero7)'];

  // 2nd row: Background image (optional)
  // Find the relevant image (background image)
  let img = element.querySelector('.cover-image');
  if (!img) {
    img = element.querySelector('img');
  }
  // Always reference the original element
  const imageRow = [img ? img : ''];

  // 3rd row: Heading, subheading, CTAs (all in one cell)
  const card = element.querySelector('.card');
  const contentEls = [];
  if (card) {
    // Title (find first heading)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentEls.push(heading);
    // Subheading (find p.subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentEls.push(subheading);
    // CTA(s): .button-group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentEls.push(buttonGroup);
  }
  const contentRow = [contentEls.length > 0 ? contentEls : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

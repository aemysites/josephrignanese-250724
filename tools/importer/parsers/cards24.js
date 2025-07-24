/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  const cardLinks = element.querySelectorAll(':scope > a');
  const rows = Array.from(cardLinks).map(card => {
    // Image for first cell
    const imgDiv = card.querySelector(':scope > div');
    let imgEl = null;
    if (imgDiv) {
      imgEl = imgDiv.querySelector('img');
    }

    // Text cell (tag + date, then heading)
    const textCell = document.createElement('div');
    // Tag and Date
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) {
      const tag = metaDiv.querySelector('.tag');
      const date = metaDiv.querySelector('.paragraph-sm');
      if (tag || date) {
        const metaContainer = document.createElement('div');
        if (tag) {
          // Use the existing tag element
          metaContainer.appendChild(tag);
        }
        if (date) {
          if (tag) metaContainer.appendChild(document.createTextNode(' '));
          metaContainer.appendChild(date);
        }
        textCell.appendChild(metaContainer);
      }
    }
    // Heading (title)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      textCell.appendChild(heading);
    }
    return [imgEl, textCell];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

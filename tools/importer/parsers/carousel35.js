/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per example
  const headerRow = ['Carousel'];

  // Find grid containers for images and text
  const gridLayouts = element.querySelectorAll('.w-layout-grid');
  let imageGrid = null;
  let textCell = [];

  // Identify which grid contains images
  gridLayouts.forEach(grid => {
    if (grid.querySelectorAll('img').length > 0) {
      imageGrid = grid;
    }
  });
  if (!imageGrid) return;

  // Find the text container (the one with h1)
  let textContainer = null;
  const wNodes = element.querySelectorAll('[class*=w-node-]');
  for (const node of wNodes) {
    if (node.querySelector('h1')) {
      textContainer = node;
      break;
    }
  }
  if (textContainer) {
    // Only add heading, paragraph, and buttons if they exist (in order)
    const h1 = textContainer.querySelector('h1');
    if (h1) textCell.push(h1);
    const p = textContainer.querySelector('p');
    if (p) textCell.push(p);
    const btnGroup = textContainer.querySelector('.button-group');
    if (btnGroup) textCell.push(btnGroup);
  }

  // Get all images for slides
  const imgs = Array.from(imageGrid.querySelectorAll('img'));

  const rows = [headerRow];
  imgs.forEach((img, idx) => {
    if (idx === 0 && textCell.length) {
      rows.push([img, textCell]);
    } else {
      rows.push([img, '']);
    }
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we reference only existing elements and keep semantics
  // Find main container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Locate the top-level grid (the main content area inside the section)
  const grid = container.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // The grid has: [heading, paragraph, subgrid]
  const children = Array.from(grid.children);
  if (children.length < 3) return;
  const heading = children[0]; // .h2-heading
  const paragraph = children[1]; // .paragraph-lg
  const subgrid = children[2]; // inner grid with avatar, divider, svg

  // The subgrid has three main children: divider, profile (flex-horizontal), logo (svg)
  const subChildren = Array.from(subgrid.children);
  // Usually: divider, flex-horizontal, logo
  // We want to keep the divider and flex-horizontal (avatar+name+title) together for left cell
  // We'll put the logo svg in the right cell
  let flex = subgrid.querySelector('.flex-horizontal');
  let svg = subgrid.querySelector('svg');

  // Build left column: heading, divider, profile (avatar+name+title)
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  // The divider (an empty div) can be omitted as it adds no semantic value, but let's include all content per review
  const divider = subgrid.querySelector('.divider');
  if (divider) leftCol.appendChild(divider);
  if (flex) leftCol.appendChild(flex);

  // Build right column: paragraph, logo (svg)
  const rightCol = document.createElement('div');
  if (paragraph) rightCol.appendChild(paragraph);
  if (svg) rightCol.appendChild(svg);

  // Table header as specified
  const headerRow = ['Columns (columns25)'];
  const columnsRow = [leftCol, rightCol];
  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

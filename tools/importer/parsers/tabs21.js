/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = Array.from(tabMenu ? tabMenu.querySelectorAll('a') : []);
  const tabLabels = tabLinks.map((link) => {
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Get tab contents
  const tabContentContainer = element.querySelector('.w-tab-content');
  const tabPanes = Array.from(tabContentContainer ? tabContentContainer.querySelectorAll('.w-tab-pane') : []);
  const tabContents = tabPanes.map((pane) => {
    let grid = pane.querySelector('.w-layout-grid, .grid-layout');
    if (!grid) grid = pane;
    return grid;
  });

  // Build cells array: single-cell header, then rows: [label, content]
  const cells = [['Tabs']];
  for (let i = 0; i < Math.max(tabLabels.length, tabContents.length); i++) {
    const row = [tabLabels[i] || '', tabContents[i] || ''];
    cells.push(row);
  }
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

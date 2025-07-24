/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child divs (grid columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Extract content for each column
  const colContents = columns.map((col) => {
    const img = col.querySelector('img');
    const text = col.querySelector('.utility-padding-all-2rem');
    if (img && text) {
      return [img, text];
    }
    if (img) return img;
    if (text) return text;
    return col;
  });

  // Build table with header cell spanning all columns
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Columns (columns12)';
  headerTh.setAttribute('colspan', colContents.length || 1);
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  const contentTr = document.createElement('tr');
  colContents.forEach(cell => {
    const td = document.createElement('td');
    if (Array.isArray(cell)) {
      cell.forEach(item => td.appendChild(item));
    } else {
      td.appendChild(cell);
    }
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}

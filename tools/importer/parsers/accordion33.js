/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header row
  const rows = [['Accordion']];

  // Get all accordion items (direct children)
  const accordionItems = element.querySelectorAll(':scope > div.accordion');

  accordionItems.forEach((item) => {
    // Extract the title element
    let title = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // The best candidate for title is a .paragraph-lg child
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      } else {
        // Fallback: use the entire toggle div if .paragraph-lg is missing
        title = toggle;
      }
    }

    // Extract the content element
    let content = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Look for padding wrapper, then for rich text
      let pad = nav.querySelector('.utility-padding-all-1rem') || nav.querySelector('.utility-padding-horizontal-0') || nav;
      // In Webflow, rich text is usually in .rich-text.w-richtext
      const rich = pad.querySelector('.rich-text, .w-richtext');
      if (rich) {
        content = rich;
      } else {
        // Otherwise, use all children for content
        const children = Array.from(pad.children);
        if (children.length === 1) {
          content = children[0];
        } else if (children.length > 1) {
          content = children;
        } else {
          // Fallback to pad itself
          content = pad;
        }
      }
    }

    rows.push([title, content]);
  });

  // Build the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

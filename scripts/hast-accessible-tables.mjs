// Wrap Markdown tables at build time: no client-side script is required.
// Sätteri hast plugin; the factory runs per document so numbering restarts.
export default function hastAccessibleTables() {
  let tableNumber = 0;
  return {
    name: "accessible-tables",
    element: {
      filter: ["table"],
      visit(node, ctx) {
        tableNumber += 1;
        ctx.wrapNode(node, {
          type: "element",
          tagName: "div",
          properties: {
            className: ["article-table-scroll"],
            tabIndex: 0,
            role: "region",
            ariaLabel: `Tableau ${tableNumber} — défilement horizontal si nécessaire`,
          },
          children: [],
        });
      },
    },
  };
}

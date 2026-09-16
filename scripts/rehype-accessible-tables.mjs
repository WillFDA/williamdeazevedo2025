// Wrap Markdown tables at build time: no client-side script is required.
export default function rehypeAccessibleTables() {
  return (tree) => {
    let tableNumber = 0;
    function wrapTables(node) {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        wrapTables(child);
        if (child.type !== "element" || child.tagName !== "table") return child;
        tableNumber += 1;
        return {
          type: "element",
          tagName: "div",
          properties: {
            className: ["article-table-scroll"],
            tabIndex: 0,
            role: "region",
            ariaLabel: `Tableau ${tableNumber} — défilement horizontal si nécessaire`,
          },
          children: [child],
        };
      });
    }
    wrapTables(tree);
  };
}

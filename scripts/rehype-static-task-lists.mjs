// GFM task lists render disabled, unlabelled checkboxes. In articles they are
// printed checklists, not form controls: hide the boxes from assistive tech.
export default function rehypeStaticTaskLists() {
  return (tree) => {
    function hideCheckboxes(node) {
      if (
        node.tagName === "input" &&
        node.properties?.type === "checkbox" &&
        node.properties.disabled
      ) {
        node.properties.ariaHidden = "true";
      }
      for (const child of node.children ?? []) hideCheckboxes(child);
    }
    hideCheckboxes(tree);
  };
}

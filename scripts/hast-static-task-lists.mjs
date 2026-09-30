// GFM task lists render disabled, unlabelled checkboxes. In articles they are
// printed checklists, not form controls: hide the boxes from assistive tech.
export default {
  name: "static-task-lists",
  element: {
    filter: ["input"],
    visit(node, ctx) {
      if (node.properties?.type === "checkbox" && node.properties.disabled) {
        ctx.setProperty(node, "ariaHidden", "true");
      }
    },
  },
};

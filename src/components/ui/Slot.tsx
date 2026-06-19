import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

const Slot = (props: PropsWithChildren) => {
  const children = Children.toArray(props.children).filter((c) =>
    isValidElement(c)
  );

  if (children.length !== 1) {
    throw new Error("Slot must have exactly one child");
  }

  const child = children[0] as React.ReactElement<HTMLAttributes<HTMLElement>>;

  return cloneElement(child, {
    ...props,
    ...child.props,
  });
};

export default Slot;

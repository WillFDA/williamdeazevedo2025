import { motion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
export default function Link() {
  const [ref, bounds] = useMeasure();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: bounds.width }}
      ref={ref}
      className="px-4 py-2 bg-gray-100 shrink-0 w-auto"
    >
      <span className="flex gap-4" ref={ref}>
        {isHovered && <span>Je suis la </span>} Je suis large
      </span>
    </motion.a>
  );
}

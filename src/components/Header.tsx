import { useEffect, useRef } from "react";
import { MotionConfig, motion } from "motion/react";

export default function Header({ pathName }: { pathName: string }) {
  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/vault", label: "La grotte" },
  ];

  const isActive = (path: string) => pathName === path;
  const activeIndex = navItems.findIndex((item) => item.href === pathName);
  const previousIndexRef = useRef(activeIndex);
  const travelDistance =
    activeIndex >= 0 && previousIndexRef.current >= 0
      ? Math.abs(activeIndex - previousIndexRef.current)
      : 0;

  useEffect(() => {
    previousIndexRef.current = activeIndex;
  }, [activeIndex]);

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 26,
    mass: 0.9 + travelDistance * 0.1,
  };

  const blockSpan = () => {
    return (
      <motion.span
        layoutId="block-span"
        transition={springTransition}
        className="absolute inset-0 bg-gray-100 rounded-full"
      ></motion.span>
    );
  };
  return (
    <header className="w-full p-4 mb-12">
      <nav className="max-w-5xl mx-auto p-4">
        <ul className="flex gap-4 justify-center items-center font-light">
          <MotionConfig transition={springTransition}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="relative z-10 px-5 py-3" href={item.href}>
                  {isActive(item.href) && blockSpan()}
                  <motion.span
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {item.label}
                  </motion.span>
                </a>
              </li>
            ))}
          </MotionConfig>
        </ul>
      </nav>
    </header>
  );
}

import { useEffect, useState } from "react";
import { MotionConfig, motion } from "motion/react";

export default function Header({ pathName }: { pathName: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => pathName === path;

  const blockSpan = () => {
    return (
      <motion.span
        layoutId="block-span"
        className="absolute inset-0 bg-gray-100 rounded-full"
      ></motion.span>
    );
  };
  return (
    <header className="w-full p-4">
      <nav className="max-w-3xl mx-auto p-4">
        <ul className="flex gap-4 justify-center items-center">
          <MotionConfig
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
          >
            <li>
              <a className="relative z-10 px-5 py-3" href="/">
                {isActive("/") && blockSpan()}
                <motion.span
                  // animate={{ fontWeight: isActive("/") ? 600 : 400 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  Accueil
                </motion.span>
              </a>
            </li>
            <li>
              <a className="relative z-10 px-5 py-3" href="/about">
                {isActive("/about") && blockSpan()}
                <motion.span
                  // animate={{ fontWeight: isActive("/about") ? 600 : 400 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  À propos
                </motion.span>
              </a>
            </li>
            <li>
              <a className="relative z-10 px-5 py-3" href="/blog">
                {isActive("/blog") && blockSpan()}
                <motion.span
                  // animate={{ fontWeight: isActive("/blog") ? 600 : 400 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  Blog
                </motion.span>
              </a>
            </li>
            <li>
              <a className="relative z-10 px-5 py-3" href="/vault">
                {isActive("/vault") && blockSpan()}
                <motion.span
                  // animate={{ fontWeight: isActive("/blog") ? 600 : 400 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  La grotte
                </motion.span>
              </a>
            </li>
          </MotionConfig>
        </ul>
      </nav>
    </header>
  );
}

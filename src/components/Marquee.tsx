import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const icons = [
  { src: "/icons/figma-icon.svg", name: "Figma" },
  { src: "/icons/react-icon.svg", name: "React" },
  { src: "/icons/react-query.svg", name: "React Query" },
  { src: "/icons/material-ui.svg", name: "Material UI" },
  { src: "/icons/zustand.svg", name: "Zustand" },
  { src: "/icons/typescript.svg", name: "TypeScript" },
  { src: "/icons/shadcn-ui.svg", name: "shadcn/ui" },
  { src: "/icons/next.svg", name: "Next.js" },
  { src: "/icons/tailwindcss.svg", name: "Tailwind CSS" },
  { src: "/icons/prisma.svg", name: "Prisma" },
  { src: "/icons/Drizzle.svg", name: "Drizzle" },
  { src: "/icons/motion.svg", name: "Motion" },
  { src: "/icons/Astro.svg", name: "Astro" },
  { src: "/icons/linear-dark-logo.svg", name: "Linear" },
  { src: "/icons/claude-logo.svg", name: "Claude" },
  { src: "/icons/neon-logomark-light-color.svg", name: "Neon" },
];

const SLOTS = 7;
const TICK_MS = 1400;

function Slot({ iconIndex }: { iconIndex: number }) {
  const icon = icons[iconIndex];
  return (
    <div className="flex items-center justify-center w-12 h-12">
      <AnimatePresence mode="wait">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.img
                key={iconIndex}
                src={icon.src}
                alt={icon.name}
                className="h-8"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </TooltipTrigger>
            <TooltipContent>{icon.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AnimatePresence>
    </div>
  );
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initIndices() {
  const shuffled = [...icons.keys()].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, SLOTS);
}

export default function Marquee() {
  const [indices, setIndices] = useState<number[]>(initIndices);
  const indicesRef = useRef(indices);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    indicesRef.current = indices;
  }, [indices]);

  useEffect(() => {
    function tick() {
      setIndices((prev) => {
        const slot = randomBetween(0, SLOTS - 1);
        const shown = new Set(prev);
        const candidates = [...icons.keys()].filter((i) => !shown.has(i));
        if (candidates.length === 0) return prev;
        const nextIcon = candidates[randomBetween(0, candidates.length - 1)];
        const next = [...prev];
        next[slot] = nextIcon;
        return next;
      });

      timeoutRef.current = setTimeout(tick, randomBetween(800, TICK_MS));
    }

    timeoutRef.current = setTimeout(tick, randomBetween(800, TICK_MS));
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="flex items-center justify-between my-8">
      {indices.map((iconIndex, slot) => (
        <Slot key={slot} iconIndex={iconIndex} />
      ))}
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { animate, spring, type JSAnimation } from "animejs";
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
  { src: "/icons/Astro.svg", name: "Astro" },
  { src: "/icons/linear-dark-logo.svg", name: "Linear" },
  { src: "/icons/claude-logo.svg", name: "Claude" },
  { src: "/icons/neon-logomark-light-color.svg", name: "Neon" },
];

const SLOTS = 7;
const TICK_MS = 1400;

function Slot({ iconIndex }: { iconIndex: number }) {
  const [shownIndex, setShownIndex] = useState(iconIndex);
  const imgRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<JSAnimation | null>(null);
  const icon = icons[shownIndex];

  useEffect(() => {
    const img = imgRef.current;
    if (!img || shownIndex === iconIndex) return;

    animationRef.current?.cancel();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShownIndex(iconIndex);
      return;
    }

    let active = true;
    animationRef.current = animate(img, {
      opacity: 0,
      filter: "blur(8px)",
      duration: 120,
      ease: "inOut(2)",
      onComplete: () => {
        if (active) setShownIndex(iconIndex);
      },
    });

    return () => {
      active = false;
      animationRef.current?.cancel();
    };
  }, [iconIndex, shownIndex]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    animationRef.current?.cancel();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      Object.assign(img.style, { filter: "blur(0px)", opacity: "1" });
      return;
    }

    animationRef.current = animate(img, {
      opacity: [0, 1],
      filter: ["blur(8px)", "blur(0px)"],
      ease: spring({ duration: 240, bounce: 0.05 }),
    });

    return () => animationRef.current?.cancel();
  }, [shownIndex]);

  return (
    <div className="flex items-center justify-center w-12 h-12">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              ref={imgRef}
              key={shownIndex}
              src={icon.src}
              alt={icon.name}
              className="h-8"
            />
          </TooltipTrigger>
          <TooltipContent>{icon.name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Marquee() {
  const [indices, setIndices] = useState<number[]>(() =>
    [...icons.keys()].slice(0, SLOTS),
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

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
    <section className="flex items-center justify-between my-8 max-w-5xl w-5xl mx-auto">
      {indices.map((iconIndex, slot) => (
        <Slot key={slot} iconIndex={iconIndex} />
      ))}
    </section>
  );
}

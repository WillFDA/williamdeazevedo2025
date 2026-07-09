import type { HTMLAttributes } from "astro/types";

export type RevealStyle = HTMLAttributes<"div">["style"];

export const joinClasses = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const formatDelay = (delay: number | string) =>
  typeof delay === "number" ? `${delay}s` : delay;

export const buildRevealStyle = (
  delay: number | string,
  style: RevealStyle,
  shouldAnimate: boolean
) => {
  if (!shouldAnimate) return style;

  const formattedDelay = formatDelay(delay);

  if (typeof style === "string") {
    return `--fade-delay: ${formattedDelay}; ${style}`;
  }

  return { "--fade-delay": formattedDelay, ...style };
};

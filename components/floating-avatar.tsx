"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";

const DEFAULT_SIZE = 80;
const PINNED_SIZE = 44;

type FloatingAvatarProps = {
  alt: string;
  image: StaticImageData;
};

export default function FloatingAvatar({ alt, image }: FloatingAvatarProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [navAnchor, setNavAnchor] = useState({ left: 16, centerY: 32 });

  useEffect(() => {
    const updateNavAnchor = () => {
      const nav = document.querySelector("header nav");

      if (!nav) return;

      const rect = nav.getBoundingClientRect();
      setNavAnchor({
        left: rect.left - PINNED_SIZE - 12,
        centerY: rect.top + rect.height / 2,
      });
    };

    updateNavAnchor();
    window.addEventListener("resize", updateNavAnchor);
    window.addEventListener("scroll", updateNavAnchor, { passive: true });

    return () => {
      window.removeEventListener("resize", updateNavAnchor);
      window.removeEventListener("scroll", updateNavAnchor);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsPinned(window.scrollY > 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const avatarStyle = useMemo(() => {
    if (!isPinned) return { width: DEFAULT_SIZE, height: DEFAULT_SIZE };

    return {
      position: "fixed" as const,
      left: navAnchor.left,
      top: navAnchor.centerY,
      transform: "translateY(-50%)",
      width: PINNED_SIZE,
      height: PINNED_SIZE,
    };
  }, [isPinned, navAnchor.centerY, navAnchor.left]);

  return (
    <div
      aria-hidden
      className="relative h-20 w-20 shrink-0"
      style={{ height: DEFAULT_SIZE, width: DEFAULT_SIZE }}
    >
      <Image
        alt={alt}
        className={`fade-up rounded-full transition-all duration-300 [--animation-delay:200ms] ${
          isPinned ? "shadow-sm ring-1 ring-gray-200" : ""
        }`}
        height={DEFAULT_SIZE}
        src={image}
        style={avatarStyle}
        width={DEFAULT_SIZE}
      />
    </div>
  );
}

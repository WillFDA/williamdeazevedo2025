"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const MotiviaOldUI = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!(containerRef.current && isDragging.current)) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="mx-auto my-8 w-full max-w-2xl">
      <p className="mb-4 text-center text-gray-600 text-sm">
        L'ancienne interface vs la nouvelle.{" "}
        <span className="text-gray-400">Glisse pour comparer</span>
      </p>

      <div
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-lg border border-gray-200"
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        ref={containerRef}
      >
        <Image
          alt="Nouvelle interface de Motivia"
          className="absolute inset-0 h-full w-full object-cover object-top"
          draggable={false}
          height={600}
          src="https://igpmag5dwziffdrn.public.blob.vercel-storage.com/blog/motivai_new_ui.png"
          width={800}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            alt="Ancienne interface de Motivia"
            className="absolute inset-0 h-full w-full object-cover object-top"
            draggable={false}
            height={600}
            src="https://igpmag5dwziffdrn.public.blob.vercel-storage.com/blog/motivia_old_ui.jpeg"
            width={800}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize bg-white/90"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Slider handle */}
          <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-0.5 font-medium text-gray-600 text-xs backdrop-blur-sm">
          Avant
        </div>
        <div className="absolute right-3 bottom-3 rounded bg-gray-900/80 px-2 py-0.5 font-medium text-white text-xs backdrop-blur-sm">
          Après
        </div>
      </div>
    </div>
  );
};

export default MotiviaOldUI;

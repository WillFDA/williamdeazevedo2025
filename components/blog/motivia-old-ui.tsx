"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const MotiviaOldUI = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;

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
    <div className="w-full max-w-2xl mx-auto my-8">
      <p className="mb-4 text-sm text-center text-gray-600">
        L'ancienne interface vs la nouvelle.{" "}
        <span className="text-gray-400">
          Glisse pour comparer
        </span>
      </p>

      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none border border-gray-200"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <Image
          width={800}
          height={600}
          alt="Nouvelle interface de Motivia"
          src="https://igpmag5dwziffdrn.public.blob.vercel-storage.com/blog/motivai_new_ui.png"
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            width={800}
            height={600}
            alt="Ancienne interface de Motivia"
            src="https://igpmag5dwziffdrn.public.blob.vercel-storage.com/blog/motivia_old_ui.jpeg"
            className="absolute inset-0 w-full h-full object-cover object-top"
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Slider handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
          Avant
        </div>
        <div className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-medium">
          Après
        </div>
      </div>
    </div>
  );
};

export default MotiviaOldUI;

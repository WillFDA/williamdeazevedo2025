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
    <div className="w-full max-w-4xl mx-auto bg-gray-100 p-8 rounded-2xl my-12">
      <p className="mb-6 text-center text-gray-700">
        Ça c'était l'ancienne interface 😭, heureusement du chemin a été
        parcouru depuis !{" "}
        <span className="text-sm text-gray-500">
          (Glisse le curseur pour comparer)
        </span>
      </p>

      <div
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden rounded-xl cursor-ew-resize select-none bg-gray-200"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <Image
          width={800}
          height={500}
          alt="Nouvelle interface de Motivia"
          src="https://igpmag5dwziffdrn.public.blob.vercel-storage.com/blog/motivai_new_ui.png"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            width={800}
            height={500}
            alt="Ancienne interface de Motivia"
            src="https://igpmag5dwziffdrn.public.blob.vercel-storage.com/blog/motivia_old_ui.jpeg"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-600"
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
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          Avant
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          Après
        </div>
      </div>
    </div>
  );
};

export default MotiviaOldUI;

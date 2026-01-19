
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl border border-white/10 cursor-ew-resize select-none shadow-2xl bg-black"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Background) - Pristine clean look */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-110 contrast-110"
        style={{ backgroundImage: `url(${afterImage})` }}
      />

      {/* Before Image (Foreground with Clip) - Added dirt effects via filters */}
      <div 
        className="absolute inset-0 bg-cover bg-center sepia-[0.3] brightness-[0.7] contrast-[1.2] saturate-[0.8]"
        style={{ 
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      />

      {/* Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(251,191,36,0.6)] z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-[#fbbf24]">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-4 bg-[#fbbf24] rounded-full" />
            <div className="w-1.5 h-4 bg-[#fbbf24] rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <span className="bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-mono font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-[0.2em] shadow-lg">
          Before: Built-up Grime
        </span>
      </div>
      <div className="absolute top-6 right-6 z-20 pointer-events-none">
        <span className="bg-[#fbbf24] text-black text-[10px] md:text-xs font-mono font-bold px-4 py-2 rounded-full border border-black/20 uppercase tracking-[0.2em] shadow-lg">
          After: Restored Clarity
        </span>
      </div>
    </div>
  );
};

export default ComparisonSlider;

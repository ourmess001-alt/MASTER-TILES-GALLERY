'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TileItem } from '../types';

interface CarouselScrubberProps {
  tiles: TileItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  className?: string;
}

export const CarouselScrubber: React.FC<CarouselScrubberProps> = ({
  tiles,
  activeIndex,
  onSelectIndex,
  className = '',
}) => {
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      onSelectIndex(activeIndex - 1);
    } else {
      onSelectIndex(tiles.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex < tiles.length - 1) {
      onSelectIndex(activeIndex + 1);
    } else {
      onSelectIndex(0);
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-marble-300 shadow-floating ${className}`}
    >
      {/* Prev Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous tile"
        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-900 hover:bg-marble-200 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Tick Marks Rail */}
      <div className="flex items-center gap-1.5 px-2">
        {tiles.map((tile, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={tile.id}
              onClick={() => onSelectIndex(idx)}
              aria-label={`Go to tile ${idx + 1}: ${tile.name}`}
              className="group relative py-2 focus:outline-none"
            >
              {isActive ? (
                <motion.div
                  layoutId="scrubber-active-pill"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="h-2 px-2.5 rounded-full bg-slate-900 flex items-center justify-center gap-1 shadow-sm"
                >
                  <span className="text-[9px] font-mono font-bold text-white leading-none">
                    {tile.index}
                  </span>
                </motion.div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400/50 group-hover:bg-slate-700 group-hover:scale-125 transition-all" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next tile"
        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-900 hover:bg-marble-200 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Active Label Mini Pill */}
      <div className="hidden sm:flex items-center pl-2 pr-1 border-l border-marble-300 text-[11px] font-medium text-slate-600">
        <span className="font-mono text-slate-900 font-semibold mr-1">
          {tiles[activeIndex]?.index}
        </span>
        <span className="text-slate-400">/</span>
        <span className="font-mono text-slate-400 ml-1">
          {String(tiles.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

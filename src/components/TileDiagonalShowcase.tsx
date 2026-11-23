'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Filter, SlidersHorizontal, Eye } from 'lucide-react';
import { TileItem } from '../types';
import { TILE_SIZES, CATEGORIES } from '../data/tiles';
import { TileSlabVisual } from './TileSlabVisual';
import { CarouselScrubber } from './CarouselScrubber';
import { useQuote } from '../context/QuoteContext';

interface TileDiagonalShowcaseProps {
  tiles: TileItem[];
  onOpenDetail: (tile: TileItem) => void;
}

export const TileDiagonalShowcase: React.FC<TileDiagonalShowcaseProps> = ({
  tiles,
  onOpenDetail,
}) => {
  const { isWholesaleMode, toggleWholesaleMode } = useQuote();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Filtered tiles
  const filteredTiles = tiles.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSize = !selectedSizeFilter || t.availableSizes.includes(selectedSizeFilter);
    return matchesCategory && matchesSize;
  });

  // Clamp activeIndex if filtered count shrinks
  useEffect(() => {
    if (activeIndex >= filteredTiles.length) {
      setActiveIndex(Math.max(0, filteredTiles.length - 1));
    }
  }, [filteredTiles.length, activeIndex]);

  const activeTile = filteredTiles[activeIndex] || tiles[0];

  // Throttled wheel navigation
  const wheelLockRef = useRef<boolean>(false);
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 25 && Math.abs(e.deltaX) < 25) return;

      wheelLockRef.current = true;
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 350);

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta > 0) {
        // Next
        setActiveIndex((prev) => (prev < filteredTiles.length - 1 ? prev + 1 : 0));
      } else {
        // Prev
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredTiles.length - 1));
      }
    },
    [filteredTiles.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev < filteredTiles.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredTiles.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredTiles.length]);

  // Touch drag tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev < filteredTiles.length - 1 ? prev + 1 : 0));
      } else {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredTiles.length - 1));
      }
    }
    setTouchStartX(null);
  };

  // Pricing based on wholesale toggle
  const displayPrice = isWholesaleMode ? activeTile.priceWholesale : activeTile.priceRetail;

  return (
    <section
      id="catalog"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] min-h-[640px] max-h-[1100px] bg-marble-100 overflow-hidden flex flex-col justify-between pt-20 pb-4 select-none"
    >
      {/* Background Architectural Watermark & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#B8A382_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-taupe/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-white/70 blur-3xl pointer-events-none" />

      {/* Top Filter Bar: Collections Pill Strip */}
      <div className="relative z-20 px-6 sm:px-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isCatActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white/70 hover:bg-white text-slate-700 border-marble-300'
                }`}
              >
                <span>{cat.label}</span>
                <span className="hidden md:inline font-bengali ml-1 text-[11px] opacity-75">
                  ({cat.bengali})
                </span>
              </button>
            );
          })}
        </div>

        {/* Wholesale Mode Toggle */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-marble-300 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider hidden sm:inline">
            Pricing:
          </span>
          <button
            onClick={toggleWholesaleMode}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              !isWholesaleMode
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Retail (খুচরা)
          </button>
          <button
            onClick={toggleWholesaleMode}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              isWholesaleMode
                ? 'bg-taupe-dark text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wholesale (পাইকারী)
          </button>
        </div>
      </div>

      {/* ========================================================
          MAIN STAGE: Left Editorial Column + Center-Right Diagonal Rail
         ======================================================== */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-12 max-w-7xl mx-auto w-full gap-8 my-auto">
        {/* ========================================================
            LEFT COLUMN: Dynamic Counter, Title, Price, CTA
           ======================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          {/* Dynamic Item Counter & Category Pill */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-taupe-dark tracking-widest bg-taupe/10 px-2.5 py-1 rounded">
              {activeTile.index} / {String(filteredTiles.length).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-slate-600">
              {activeTile.categoryLabel}
            </span>
            {activeTile.isBestSeller && (
              <span className="text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                Best Seller
              </span>
            )}
          </div>

          {/* Bold Uppercase Tile Title */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTile.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-display uppercase font-bold text-slate-900 tracking-tight leading-[1.08]">
                  {activeTile.name}
                </h1>
                <p className="font-bengali text-base sm:text-lg text-slate-600 font-medium mt-1">
                  {activeTile.bengaliName}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 max-w-md font-body leading-relaxed">
                  {activeTile.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Price & Wholesale Details */}
          <div className="flex items-baseline gap-3 pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
                ৳{displayPrice}
              </span>
              <span className="text-xs font-semibold text-slate-600">/ sq.ft</span>
            </div>

            <div className="text-xs text-slate-600 pl-3 border-l border-marble-300">
              <div>
                {isWholesaleMode ? (
                  <span className="text-taupe-dark font-semibold">Bulk Wholesale Rate Active</span>
                ) : (
                  <span>Wholesale: ৳{activeTile.priceWholesale} / sq.ft</span>
                )}
              </div>
              <div className="text-[10px] text-slate-400">
                Code: {activeTile.code} • Rectified 1.5mm Joint
              </div>
            </div>
          </div>

          {/* View Details Button & Available Sizes */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenDetail(activeTile)}
              className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span>View details</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-1 text-[11px] text-slate-600">
              <span className="text-slate-400">Sizes:</span>
              <div className="flex gap-1 font-mono font-semibold">
                {activeTile.availableSizes.map((s) => (
                  <span key={s} className="bg-white/80 px-1.5 py-0.5 rounded border border-marble-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Subtle Navigation Hint */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-400 pt-2 font-mono">
            <span>Scroll wheel</span>
            <span>•</span>
            <span>Arrow keys ← →</span>
            <span>•</span>
            <span>Click any tile to inspect</span>
          </div>
        </div>

        {/* ========================================================
            CENTER-RIGHT STAGE: Diagonal Z-Depth Perspective Rail
           ======================================================== */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
          {/* Diagonal Rail Container with 3D Perspective */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: 1200 }}
          >
            {filteredTiles.map((tile, idx) => {
              const offset = idx - activeIndex;
              const isHero = offset === 0;

              // Only render tiles within view window (-1 to +3)
              if (offset < -1 || offset > 3) return null;

              // Calculate 3D perspective diagonal rail coordinates
              let x = 0;
              let y = 0;
              let scale = 1;
              let rotate = 0;
              let opacity = 1;
              let zIndex = 20;

              if (offset === 0) {
                // Active Center Hero
                x = 0;
                y = 0;
                scale = 1.05;
                rotate = 0;
                opacity = 1;
                zIndex = 30;
              } else if (offset === -1) {
                // Inbound Bottom-Left Tile
                x = -220;
                y = 120;
                scale = 0.82;
                rotate = -5;
                opacity = 0.65;
                zIndex = 15;
              } else if (offset === 1) {
                // Receding Upper-Right 1
                x = 210;
                y = -90;
                scale = 0.88;
                rotate = 4;
                opacity = 0.85;
                zIndex = 25;
              } else if (offset === 2) {
                // Receding Upper-Right 2
                x = 380;
                y = -170;
                scale = 0.72;
                rotate = 8;
                opacity = 0.55;
                zIndex = 18;
              } else if (offset === 3) {
                // Receding Upper-Right 3
                x = 510;
                y = -240;
                scale = 0.58;
                rotate = 12;
                opacity = 0.3;
                zIndex = 10;
              }

              return (
                <motion.div
                  key={tile.id}
                  layoutId={isHero ? `tile-slab-${tile.id}` : undefined}
                  onClick={() => {
                    if (isHero) {
                      onOpenDetail(tile);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  animate={{
                    x,
                    y,
                    scale,
                    rotate,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 32,
                  }}
                  className={`absolute cursor-pointer transform-gpu transition-shadow duration-300 ${
                    isHero ? 'w-[230px] sm:w-[280px] lg:w-[320px]' : 'w-[200px] sm:w-[240px] lg:w-[280px]'
                  }`}
                  style={{ zIndex }}
                >
                  <div className="relative group">
                    <TileSlabVisual
                      tile={tile}
                      finish="glossy"
                      isHero={isHero}
                      className={`transition-all duration-300 ${
                        isHero
                          ? 'ring-2 ring-taupe/40 ring-offset-2 ring-offset-marble-100'
                          : 'group-hover:opacity-90'
                      }`}
                    />

                    {/* Hover Peek Pill for Inactive Queue Tiles */}
                    {!isHero && (
                      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <span className="bg-slate-900/90 text-white text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                          Click to inspect
                        </span>
                      </div>
                    )}

                    {/* Active Hero Pill Action Indicator */}
                    {isHero && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-marble-300 text-slate-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100">
                        <Eye className="w-3 h-3 text-taupe-dark" />
                        <span>Inspect</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM BAR: Pill Tick-Mark Scrubber + Compact Size Matrix
         ======================================================== */}
      <div className="relative z-20 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left spacer / status */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Showroom Inventory Online</span>
        </div>

        {/* Center: Interactive Pill Tick-Mark Scrubber */}
        <div className="mx-auto sm:mx-0">
          <CarouselScrubber
            tiles={filteredTiles}
            activeIndex={activeIndex}
            onSelectIndex={setActiveIndex}
          />
        </div>

        {/* Bottom-Right: Compact Tile Size Filter Matrix */}
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-marble-300 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-taupe-dark" />
            Size:
          </span>

          <button
            onClick={() => {
              setSelectedSizeFilter(null);
              setActiveIndex(0);
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
              selectedSizeFilter === null
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>

          {TILE_SIZES.map((size) => {
            const isPicked = selectedSizeFilter === size;
            return (
              <button
                key={size}
                onClick={() => {
                  setSelectedSizeFilter(isPicked ? null : size);
                  setActiveIndex(0);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  isPicked
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

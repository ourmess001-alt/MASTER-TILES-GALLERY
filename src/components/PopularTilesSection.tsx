'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, ShoppingCart, Check } from 'lucide-react';
import { TileItem } from '../types';
import { TileSlabVisual } from './TileSlabVisual';
import { useQuote } from '../context/QuoteContext';

interface PopularTilesSectionProps {
  tiles: TileItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenDetail: (tile: TileItem) => void;
}

export const PopularTilesSection: React.FC<PopularTilesSectionProps> = ({
  tiles,
  selectedCategory,
  onSelectCategory,
  onOpenDetail,
}) => {
  const { isWholesaleMode, addItem } = useQuote();
  const [addedTileId, setAddedTileId] = React.useState<string | null>(null);

  // Curate 5 popular featured tiles from authentic RAK Ceramics collection:
  const featuredFive = React.useMemo(() => {
    const bestSellers = tiles.filter((t) => t.isBestSeller);
    return bestSellers.length >= 5 ? bestSellers.slice(0, 5) : tiles.slice(0, 5);
  }, [tiles]);

  const handleQuickAdd = (tile: TileItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = tile.defaultSize;
    const sqftPerBox = tile.sqftPerBoxBySize[defaultSize] || 16.0;
    const price = isWholesaleMode ? tile.priceWholesale : tile.priceRetail;

    addItem({
      tileId: tile.id,
      tileName: tile.name,
      tileCode: tile.code,
      size: defaultSize,
      finish: 'glossy',
      sqft: sqftPerBox,
      boxes: 1,
      pricePerSqft: price,
      totalBDT: Math.round(sqftPerBox * price),
      isWholesale: isWholesaleMode,
    });

    setAddedTileId(tile.id);
    setTimeout(() => {
      setAddedTileId(null);
    }, 1500);
  };

  return (
    <section id="featured" className="py-12 sm:py-16 bg-white border-t border-[#EAE7E1]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-3 mb-6 sm:mb-8">
          <div className="min-w-0">
            {/* Overline with Line */}
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <span className="w-6 sm:w-8 h-[2px] bg-gradient-to-r from-[#9AA2B0] via-[#666C7A] to-[#3B404B] rounded-full" />
              <span className="text-[10.5px] sm:text-[11px] uppercase tracking-widest font-bold text-[#5A606D]">
                FEATURED PRODUCTS
              </span>
            </div>

            {/* Luxury Serif Title */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-tight leading-tight">
              <span className="heading-brand-gradient">Popular Tile</span>{' '}
              <span className="heading-brand-accent">Designs</span>
            </h2>
          </div>

          {/* Right Button */}
          <Link
            href="/products"
            className="group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D5D0C7] hover:border-[#1F2124] bg-white hover:bg-[#FAF9F5] text-[11.5px] sm:text-xs md:text-sm font-semibold text-[#1F2124] transition-all shadow-2xs hover:shadow-xs flex-shrink-0 self-end active:scale-95"
            title="View All Products"
          >
            <span>View All</span>
            <span className="hidden min-[420px]:inline">Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9E783B] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 5 Real Photographic Tile Cards Grid (Responsive 2-col on mobile, 5-col on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {featuredFive.map((tile, idx) => {
            const displayPrice = isWholesaleMode ? tile.priceWholesale : tile.priceRetail;

            const isJustAdded = addedTileId === tile.id;

            return (
              <div
                key={tile.id || idx}
                onClick={() => onOpenDetail(tile)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#9E783B] transition-all duration-300 bg-white shadow-xs hover:shadow-xl flex flex-col active:scale-[0.99] relative"
              >
                {/* Real Photographic Tile Image */}
                <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#F6F5F2]">
                  {tile.image ? (
                    <Image
                      src={tile.image}
                      alt={`${tile.name} - ${tile.bengaliName}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  ) : (
                    <TileSlabVisual
                      tile={tile}
                      finish="glossy"
                      className="w-full h-full transform group-hover:scale-103 transition-transform duration-500 rounded-none shadow-none"
                    />
                  )}

                  {/* Top Badge (Single Glossy Badge) */}
                  {(tile.isBestSeller || tile.isNew) && (
                    <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
                      <span className="bg-white/80 hover:bg-white/95 backdrop-blur-md border border-white/60 text-slate-900 text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wider">
                        {tile.isBestSeller ? 'Best Seller' : 'New Slab'}
                      </span>
                    </div>
                  )}

                  {/* Subtle Tile Size Chip (No giant black box covering texture) */}
                  <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium text-white/95 border border-white/10 shadow-xs z-10">
                    {tile.defaultSize}
                  </div>

                  {/* Desktop Hover Quick Actions (Glossy Quick View Only) */}
                  <div className="hidden lg:flex absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center p-3 z-20 backdrop-blur-[2px]">
                    <span className="bg-white/85 hover:bg-white backdrop-blur-md border border-white/70 text-slate-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95">
                      <Eye className="w-4 h-4 text-[#9E783B]" />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-3 sm:p-4 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#9E783B] block truncate leading-none">
                      {tile.categoryLabel}
                    </span>

                    {/* Tile Name */}
                    <h3 className="text-[13px] sm:text-[15px] font-bold text-[#1A1A1A] line-clamp-1 group-hover:text-[#9E783B] transition-colors leading-snug mt-1">
                      {tile.name}
                    </h3>

                    {/* Bengali Subtitle (Hidden on mobile for clean clutter-free card) */}
                    <p className="hidden sm:block text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                      {tile.bengaliName}
                    </p>

                    {/* Clean Micro Specs without cluttering divider lines */}
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-mono mt-1">
                      <span>{tile.specs.thicknessMm}mm</span>
                      <span>•</span>
                      <span>{tile.specs.slipRating.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Pricing & Quick Button */}
                  <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-bold font-mono text-slate-900 leading-tight">
                          ৳{displayPrice}
                        </span>
                        <span className="text-[10px] sm:text-xs font-normal text-slate-400">/sq.ft</span>
                      </div>
                    </div>

                    {/* Cart Button: Clean cart icon without background color */}
                    <button
                      onClick={(e) => handleQuickAdd(tile, e)}
                      className={`w-8 h-8 flex items-center justify-center transition-all duration-200 active:scale-90 flex-shrink-0 ${
                        isJustAdded
                          ? 'text-emerald-600'
                          : 'text-slate-700 hover:text-[#9E783B]'
                      }`}
                      title="Add to Quote"
                      aria-label="Add to Quote"
                    >
                      {isJustAdded ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

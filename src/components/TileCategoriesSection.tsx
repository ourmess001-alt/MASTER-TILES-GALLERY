'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Box, Layers, LayoutGrid, Bath, Sun } from 'lucide-react';
import { CATEGORY_TILES } from '../data/tiles';

interface TileCategoriesSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TileCategoriesSection: React.FC<TileCategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  // Category Icons matching the mockup icons
  const categoryIcons: Record<string, React.ElementType> = {
    floor: Box,
    wall: Layers,
    decorative: LayoutGrid,
    bathroom: Bath,
    outdoor: Sun,
  };

  return (
    <section id="collection" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
          <div>
            {/* Overline with Line */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#9AA2B0] via-[#666C7A] to-[#3B404B] rounded-full" />
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#5A606D]">
                OUR COLLECTION
              </span>
            </div>

            {/* Luxury Serif Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight">
              <span className="heading-brand-gradient">Explore Tile </span>
              <span className="heading-brand-accent">Categories</span>
            </h2>
          </div>

          {/* Right Link */}
          <Link
            href="/products"
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#5A606D] hover:text-[#1F2228] transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5 Category Cards Grid (Responsive 2-col on mobile, 5-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORY_TILES.map((cat, idx) => {
            const Icon = categoryIcons[cat.id] || Box;
            const isSelected = selectedCategory === cat.id;
            const isLastOnMobile = idx === CATEGORY_TILES.length - 1;

            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 bg-white shadow-xs hover:shadow-md ${
                  isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? 'border-[#9E783B] ring-2 ring-[#9E783B]/30'
                    : 'border-[#E5E5E5] hover:border-[#D0D0D0]'
                }`}
              >
                {/* Category Image */}
                <div className={`relative w-full overflow-hidden bg-[#FAF9F5] ${
                  isLastOnMobile ? 'aspect-[21/9] sm:aspect-[16/11]' : 'aspect-[16/11]'
                }`}>
                  <Image
                    src={cat.image}
                    alt={`${cat.name} Master Tiles Gallery Gazipur`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>

                {/* Bottom Bar: Icon + Category Name + Bengali subtitle + Arrow */}
                <div className="py-2.5 sm:py-3 px-3 sm:px-3.5 flex items-center justify-between bg-white border-t border-[#F0F0F0]">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9E783B] flex-shrink-0 stroke-[1.8]" />
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] block truncate group-hover:text-[#9E783B] transition-colors leading-tight">
                        {cat.name}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#666] font-bengali block truncate mt-0.5">
                        {cat.bengali}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9E783B] flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  X,
  Eye,
  ShoppingBag,
  ArrowRight,
  Phone,
  Check,
  ChevronRight,
  Layers,
  Box,
  Ruler,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react';
import { TILES_DATA, CATEGORIES, TILE_SIZES } from '../data/tiles';
import { TileItem } from '../types';
import { TileSlabVisual } from './TileSlabVisual';
import { useQuote } from '../context/QuoteContext';
import { TileDetailOverlay } from './TileDetailOverlay';
import { QuoteDrawer } from './QuoteDrawer';
import { DigitalCardModal } from './DigitalCardModal';

export const ProductsCatalog: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const { isWholesaleMode, toggleWholesaleMode, addItem, setIsDrawerOpen } = useQuote();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Detail Modal State
  const [selectedTile, setSelectedTile] = useState<TileItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [addedTileId, setAddedTileId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Sync state if URL search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, selectedSize, searchQuery, sortBy]);

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TILES_DATA.length };
    TILES_DATA.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort Logic
  const filteredTiles = useMemo(() => {
    let result = [...TILES_DATA];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    // 2. Size Filter
    if (selectedSize !== 'all') {
      result = result.filter((t) => t.availableSizes.includes(selectedSize));
    }

    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.bengaliName.toLowerCase().includes(q) ||
          t.code.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.bengaliDesc.toLowerCase().includes(q)
      );
    }

    // 4. Sorting
    result.sort((a, b) => {
      const priceA = isWholesaleMode ? a.priceWholesale : a.priceRetail;
      const priceB = isWholesaleMode ? b.priceWholesale : b.priceRetail;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // 'featured': preserves best sellers and order
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });

    return result;
  }, [selectedCategory, selectedSize, searchQuery, sortBy, isWholesaleMode]);

  // Open Product Modal
  const handleOpenDetail = (tile: TileItem) => {
    setSelectedTile(tile);
    setIsDetailOpen(true);
  };

  // Quick Add to Quote Bag
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
    setTimeout(() => setAddedTileId(null), 1600);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedSize !== 'all' || searchQuery.trim() !== '' || sortBy !== 'featured';

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-body">
      {/* ========================================================
          1. BREADCRUMBS & LUXURY CATALOG HERO BANNER
         ======================================================== */}
      <section className="bg-[#18191B] text-white pt-8 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 border-b border-white/10 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5994E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#C5994E] font-semibold">All Products</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* Overline with Silver Accent */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#FFFFFF] via-[#A4ACB9] to-[#606775] rounded-full" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#D4DAE2]">
                  COMPLETE PRODUCT CATALOG
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                All Tiles & Slabs <span className="heading-brand-accent-light">Collection</span>
              </h1>
              <p className="text-sm sm:text-base text-white/75 font-bengali font-normal mt-2 max-w-2xl">
                গাজীপুরের সবচেয়ে বিশ্বস্ত শোরুম—ফ্লোর, ওয়াল, মার্বেল ও ডেকোরেটিভ টাইলসের পাইকারী ও খুচরা সম্পূর্ণ কালেকশন।
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm self-start lg:self-auto">
              <div className="text-center px-3 border-r border-white/10">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-[#C5994E]">
                  {TILES_DATA.length}+
                </span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Designs</span>
              </div>
              <div className="text-center px-3 border-r border-white/10">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-white">6</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Sizes</span>
              </div>
              <div className="text-center px-3">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Grade-A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. STICKY FILTER, SEARCH & CONTROLS TOOLBAR
         ======================================================== */}
      <div className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E5DF] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-3.5 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input Bar */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tile name, model code (e.g. 7002 LWD), or Bengali name..."
                className="w-full pl-10 pr-9 py-2 rounded-lg bg-white border border-[#DDD9D0] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9E783B] focus:ring-2 focus:ring-[#9E783B]/20 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right Controls: Size Filter, Sorting & Wholesale Toggle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Size Filter Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-[#DDD9D0] rounded-lg px-2.5 py-1.5 shadow-xs">
                <Ruler className="w-3.5 h-3.5 text-[#9E783B]" />
                <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Sizes ({TILE_SIZES.length})</option>
                  {TILE_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-[#DDD9D0] rounded-lg px-2.5 py-1.5 shadow-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E783B]" />
                <span className="text-[11px] font-semibold text-slate-600 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-asc">Price: Low to High (৳)</option>
                  <option value="price-desc">Price: High to Low (৳)</option>
                  <option value="name">Name (A - Z)</option>
                </select>
              </div>

              {/* Wholesale / Retail Toggle Switch (Hidden on mobile) */}
              <button
                onClick={toggleWholesaleMode}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-xs ${
                  isWholesaleMode
                    ? 'bg-[#1F2124] text-[#C5994E] border-[#1F2124]'
                    : 'bg-white text-slate-700 border-[#DDD9D0] hover:border-[#9E783B]'
                }`}
                title="Toggle Wholesale vs Retail Price Mode"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isWholesaleMode ? 'bg-[#C5994E] animate-pulse' : 'bg-slate-300'
                  }`}
                />
                <span className="font-sans">
                  {isWholesaleMode ? 'পাইকারী রেট (Wholesale)' : 'খুচরা রেট (Retail)'}
                </span>
              </button>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-3 pb-1 border-t border-[#ECE8E0] mt-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#9E783B] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-[#E0DCD4]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          3. ACTIVE FILTERS STATUS & COUNTER
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-5 pb-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">
            Showing {filteredTiles.length} of {TILES_DATA.length} products
          </span>
          {isWholesaleMode && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.5 rounded font-bold">
              Wholesale Active
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#9E783B] hover:text-[#7A5B27] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* ========================================================
          4. MAIN PRODUCTS GRID
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 pb-20">
        {filteredTiles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#DDD9D0] p-8 max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#9E783B] mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">No matching tiles found</h3>
            <p className="text-xs text-slate-500 mb-5">
              We couldn't find any tile matching your current search or filters. Try adjusting the size, category, or search term.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-lg bg-[#9E783B] text-white text-xs font-bold hover:bg-[#85642E] transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredTiles.slice(0, visibleCount).map((tile) => {
                const displayPrice = isWholesaleMode ? tile.priceWholesale : tile.priceRetail;
                const isJustAdded = addedTileId === tile.id;

              return (
                <div
                  key={tile.id}
                  onClick={() => handleOpenDetail(tile)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#9E783B] transition-all duration-300 bg-white shadow-xs hover:shadow-xl flex flex-col active:scale-[0.99] relative"
                >
                  {/* Visual Image Slab */}
                  <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-[#F6F5F2]">
                    {tile.image ? (
                      <Image
                        src={tile.image}
                        alt={`${tile.name} - ${tile.bengaliName}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

          {/* Load More Button */}
          {visibleCount < filteredTiles.length && (
            <div className="flex flex-col items-center justify-center mt-10 sm:mt-14 gap-3">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredTiles.length))}
                className="group px-6 sm:px-8 py-3 rounded-xl bg-white border border-[#DDD9D0] hover:border-[#9E783B] text-slate-800 hover:text-[#9E783B] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Load More Products (আরো টাইল্স দেখুন)</span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#9E783B]">
                  ({visibleCount} of {filteredTiles.length})
                </span>
              </button>
              <span className="text-[11px] text-slate-500 font-bengali">
                গাজীপুর শোরুমের সব ১০০+ টাইল্স ডিজাইন এক্সপ্লোর করুন
              </span>
            </div>
          )}
        </>
      )}

        {/* ========================================================
            5. WHOLESALE & BULK INQUIRY BANNER
           ======================================================== */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#18191B] via-[#222428] to-[#18191B] p-6 sm:p-10 border border-white/10 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4DAE2]">
              DIRECT SHOWROOM SUPPLY & WHOLESALE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Need Bulk Supply or <span className="heading-brand-accent-light">Custom Site Delivery?</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/75 font-bengali max-w-xl">
              বিল্ডিং কনস্ট্রাকশন, ডুপ্লেক্স ও প্রজেক্টের জন্য বিশেষ পাইকারী রেট ও ফ্রি সাইট পরিদর্শনের জন্য সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <a
              href="tel:+8801743381500"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#C5994E] hover:bg-[#B58940] text-[#1F2124] font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Owner (+880 1743-381500)</span>
            </a>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/15"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5994E]" />
              <span>Open Quote Bag</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. MODALS & DRAWERS
         ======================================================== */}
      <TileDetailOverlay
        tile={selectedTile}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
      <QuoteDrawer />
      <DigitalCardModal />
    </div>
  );
};
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  Calculator,
  MessageSquare,
  ChevronDown,
  Box,
  ShieldCheck,
  Ruler,
  ShoppingBag,
} from 'lucide-react';
import { TileItem, TileFinishType, TileFinishVariant } from '../types';
import { TileSlabVisual } from './TileSlabVisual';
import { useQuote } from '../context/QuoteContext';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TileDetailOverlayProps {
  tile: TileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const FINISH_VARIANTS: TileFinishVariant[] = [
  {
    type: 'glossy',
    label: 'Glossy',
    badge: 'Specular Mirror',
    desc: 'High-gloss polished surface with crystalline specular light reflection.',
  },
  {
    type: 'matte',
    label: 'Matte',
    badge: 'Silk Velvet',
    desc: 'Soft diffused velvet touch with high anti-slip grip and zero glare.',
  },
  {
    type: 'room',
    label: 'Room 3D',
    badge: 'In-Situ Mockup',
    desc: 'Simulated 3D living space with continuous 1.5mm rectified joint tiling.',
  },
  {
    type: 'grain',
    label: '4× Zoom',
    badge: 'Mineral Zoom',
    desc: 'Micro-macro magnification revealing authentic marble veins and mineral flecks.',
  },
];

const PRESET_AREAS = [100, 150, 250, 500];

export const TileDetailOverlay: React.FC<TileDetailOverlayProps> = ({
  tile,
  isOpen,
  onClose,
}) => {
  const { addItem, isWholesaleMode } = useQuote();

  // State
  const [selectedFinish, setSelectedFinish] = useState<TileFinishType>('glossy');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [areaInput, setAreaInput] = useState<string>('150');
  const [includeWastage, setIncludeWastage] = useState<boolean>(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Automatically select default size when tile changes
  useEffect(() => {
    if (tile) {
      setSelectedSize(tile.defaultSize || tile.availableSizes[0] || '24×24"');
      setAreaInput('150');
      setSelectedFinish('glossy');
    }
  }, [tile]);

  if (!tile) return null;

  // Clean title & series (reducing redundant boilerplate)
  const nameParts = tile.name.split('(');
  const cleanTitle = nameParts[0].trim();
  const seriesInfo = nameParts.length > 1 ? nameParts[1].replace(')', '').trim() : '';

  // Pricing
  const effectivePrice = isWholesaleMode ? tile.priceWholesale : tile.priceRetail;

  // Active Size details
  const activeSize = selectedSize || tile.defaultSize || tile.availableSizes[0] || '24×24"';
  const sqftPerBox = tile.sqftPerBoxBySize[activeSize] || 16.0;
  const piecesPerBox = tile.piecesPerBoxBySize[activeSize] || 2;

  // Area & Box Calculations
  const rawArea = Math.max(1, parseFloat(areaInput) || 0);
  const areaWithWastage = includeWastage ? rawArea * 1.05 : rawArea;
  const calculatedBoxes = Math.max(1, Math.ceil(areaWithWastage / sqftPerBox));
  const finalSqftCovered = Math.round(calculatedBoxes * sqftPerBox * 10) / 10;
  const estimatedSubtotal = Math.round(finalSqftCovered * effectivePrice);

  // Handle Add to Bag
  const handleAddToBag = () => {
    addItem({
      tileId: tile.id,
      tileName: tile.name,
      tileCode: tile.code,
      size: activeSize,
      finish: selectedFinish,
      sqft: finalSqftCovered,
      boxes: calculatedBoxes,
      pricePerSqft: effectivePrice,
      totalBDT: estimatedSubtotal,
      isWholesale: isWholesaleMode,
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  // Pre-fill WhatsApp Inquiry
  const whatsappNumber = '8801743381500';
  const whatsappMessage = encodeURIComponent(
    `Salam Md. Abir Hossain, I am inquiring about "${cleanTitle}" (${tile.code}) from Master Tiles Gallery:\n- Size: ${activeSize}\n- Finish: ${selectedFinish}\n- Area Required: ${finalSqftCovered} sq.ft (${calculatedBoxes} boxes)\n- Estimated Total: ৳${estimatedSubtotal.toLocaleString()} BDT\nPlease advise stock availability.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center sm:p-4 sm:py-6">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container - Full screen on mobile (no top gap), elegant floating modal on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="relative w-full max-w-4xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden sm:border border-[#E5E2DA] z-10 h-full sm:h-auto sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Header Bar */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-[#EAE7E0] flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 pr-3">
                <span className="px-2 py-0.5 rounded bg-[#FAF6EE] text-[#9E783B] border border-[#E8DEC8] text-[10px] sm:text-xs font-mono font-bold flex-shrink-0">
                  {tile.code}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  {cleanTitle}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close details"
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#F4F2EC] hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-colors flex-shrink-0 active:scale-90"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

              {/* Scrollable Content Grid */}
              <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#EAE7E0]">
                {/* ========================================================
                    LEFT COLUMN: Tile Slab Preview + Finish Switcher
                   ======================================================== */}
                <div className="lg:col-span-5 bg-[#FAF9F6] p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    {/* Visual Card */}
                    <div className="relative w-full max-w-[240px] sm:max-w-xs mx-auto aspect-[3/4] mb-3 sm:mb-4 rounded-xl overflow-hidden shadow-md border border-[#E2DFD7] bg-white">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedFinish}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full"
                        >
                          <TileSlabVisual
                            tile={tile}
                            finish={selectedFinish}
                            isHero={true}
                            className="w-full h-full rounded-xl"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Spec Overlay Badge */}
                      <div className="absolute bottom-2 left-2 bg-slate-900/85 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-white border border-white/10">
                        {activeSize}
                      </div>
                    </div>
                  </div>

                  {/* Finish Selector */}
                  <div className="pt-2 border-t border-[#EAE7E0]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                      Finish Preview:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {FINISH_VARIANTS.map((variant) => {
                        const isCurrent = selectedFinish === variant.type;
                        return (
                          <button
                            key={variant.type}
                            type="button"
                            onClick={() => setSelectedFinish(variant.type)}
                            className={`py-1.5 px-1 rounded-lg text-center transition-all border text-[10px] font-bold ${
                              isCurrent
                                ? 'bg-[#1F2124] text-white border-[#1F2124] shadow-xs'
                                : 'bg-white hover:bg-slate-50 text-slate-700 border-[#DDD9D0]'
                            }`}
                          >
                            {variant.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ========================================================
                    RIGHT COLUMN: Streamlined Configurator & Actions
                   ======================================================== */}
                <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-3.5">
                  {/* Clean Title Block (Reduced text, no walls of boilerplate) */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#9E783B]">
                        {tile.categoryLabel}
                      </span>
                      {tile.isBestSeller && (
                        <span className="text-[9.5px] font-bold text-[#C5994E] font-mono tracking-wider">
                          BESTSELLER
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-2xl font-serif font-bold text-slate-900 tracking-tight leading-snug mt-0.5">
                      {cleanTitle}
                    </h2>

                    {seriesInfo && (
                      <p className="text-xs text-slate-500 font-sans mt-0.5">
                        {seriesInfo}
                      </p>
                    )}
                  </div>

                  {/* Minimal Luxury Price Card */}
                  <div className="bg-[#FAF9F5] rounded-xl px-4 py-2.5 sm:py-3 border border-[#E8E4DC] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        {isWholesaleMode ? 'Wholesale Rate' : 'Retail Price'}
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                          ৳{effectivePrice}
                        </span>
                        <span className="text-xs text-slate-500 font-normal">/ sq.ft</span>
                      </div>
                    </div>

                    <div className="text-right">
                      {isWholesaleMode ? (
                        <div className="space-y-0.5">
                          <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono">
                            Wholesale Active
                          </span>
                          <span className="block text-[10px] text-slate-400 font-mono line-through">
                            Retail: ৳{tile.priceRetail}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-slate-500">
                          Wholesale: ৳{tile.priceWholesale}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-500">
                        <Ruler className="w-3 h-3 text-[#9E783B]" />
                        <span>Select Size:</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-[#9E783B]">
                        {activeSize}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tile.availableSizes.map((size) => {
                        const isPicked = activeSize === size;
                        const boxSqft = tile.sqftPerBoxBySize[size] || 16.0;

                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                              isPicked
                                ? 'bg-[#1F2124] text-white border-[#1F2124] shadow-xs'
                                : 'bg-white hover:bg-slate-50 text-slate-800 border-[#DDD9D0]'
                            }`}
                          >
                            <span>{size}</span>
                            <span
                              className={`text-[9.5px] font-normal ${
                                isPicked ? 'text-white/70' : 'text-slate-400'
                              }`}
                            >
                              ({boxSqft} sqft)
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Streamlined Box Calculator */}
                  <div className="bg-[#FAF9F5] rounded-xl p-3 sm:p-3.5 border border-[#E8E4DC] space-y-2.5">
                    {/* Area input & Box output row */}
                    <div className="grid grid-cols-2 gap-2.5 items-center">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Room Area (sq.ft)
                        </span>
                        <input
                          type="number"
                          min="1"
                          max="50000"
                          value={areaInput}
                          onChange={(e) => setAreaInput(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-bold font-mono rounded-lg border border-[#D5D0C5] bg-white text-slate-900 focus:outline-none focus:border-[#C5994E]"
                        />
                      </div>

                      <div className="bg-white rounded-lg p-2 border border-[#E0DCD2] flex flex-col justify-center">
                        <span className="text-[10px] text-slate-500 block">Required Boxes</span>
                        <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 flex items-center gap-1 mt-0.5">
                          <Box className="w-3.5 h-3.5 text-[#9E783B]" />
                          <span>{calculatedBoxes} Boxes</span>
                          <span className="text-[9.5px] text-slate-400 font-normal">
                            ({finalSqftCovered} sqft)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Presets & Wastage Toggle */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1">
                        {PRESET_AREAS.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setAreaInput(String(preset))}
                            className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${
                              areaInput === String(preset)
                                ? 'bg-[#1F2124] text-white font-bold'
                                : 'bg-white border border-[#D8D4CC] text-slate-600'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setIncludeWastage(!includeWastage)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                          includeWastage
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        +5% Wastage
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-[#EAE6DF]">
                      <span className="text-xs text-slate-600 font-medium">Estimated Total:</span>
                      <span className="text-sm sm:text-base font-bold font-mono text-slate-900">
                        ৳{estimatedSubtotal.toLocaleString()} BDT
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Luxury Obsidian Charcoal CTA + Authentic WhatsApp Green */}
                  <div className="space-y-2.5 pt-1.5 pb-8 sm:pb-0">
                    {/* Primary Action: Add to Quote Bag */}
                    <button
                      type="button"
                      onClick={handleAddToBag}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98 ${
                        addedSuccess
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#18191B] hover:bg-[#25272B] text-white border border-white/10'
                      }`}
                    >
                      {addedSuccess ? (
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-white stroke-[2.5]" />
                          <span className="text-xs sm:text-sm uppercase tracking-wider font-bold">Added to Quote Bag!</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                          <ShoppingBag className="w-4 h-4 text-[#C5994E]" />
                          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                            Add to Quote
                          </span>
                          <span className="text-white/30 text-xs">•</span>
                          <span className="text-xs sm:text-sm font-semibold font-mono text-[#E5C27C]">
                            {calculatedBoxes} Boxes (৳{estimatedSubtotal.toLocaleString()})
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Secondary Action: Direct WhatsApp Chat */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
                    >
                      <WhatsAppIcon className="w-4.5 h-4.5 fill-current text-white flex-shrink-0" />
                      <span className="tracking-wide">Inquire on WhatsApp</span>
                      <span className="text-white/80 font-mono text-xs font-normal">
                        (+880 1743-381500)
                      </span>
                    </a>
                  </div>

                  {/* Minimal Technical Specifications Accordion */}
                  <div className="border-t border-[#EAE7E0] pt-1.5">
                    <button
                      type="button"
                      onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                      className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 py-1"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9E783B]" />
                        <span>Specifications</span>
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${
                          isAccordionOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isAccordionOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-xs space-y-1.5 text-slate-600"
                      >
                        <div className="grid grid-cols-2 gap-1.5 bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E8E5DD] font-mono text-[11px]">
                          <div>
                            <span className="text-[9.5px] text-slate-400 block font-sans">Thickness</span>
                            <span className="font-semibold text-slate-900">{tile.specs.thicknessMm} mm</span>
                          </div>
                          <div>
                            <span className="text-[9.5px] text-slate-400 block font-sans">Water Absorption</span>
                            <span className="font-semibold text-slate-900">{tile.specs.waterAbsorption}</span>
                          </div>
                          <div>
                            <span className="text-[9.5px] text-slate-400 block font-sans">Slip Rating</span>
                            <span className="font-semibold text-slate-900">{tile.specs.slipRating}</span>
                          </div>
                          <div>
                            <span className="text-[9.5px] text-slate-400 block font-sans">Box Packing</span>
                            <span className="font-semibold text-slate-900">{piecesPerBox} pcs/box</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
};

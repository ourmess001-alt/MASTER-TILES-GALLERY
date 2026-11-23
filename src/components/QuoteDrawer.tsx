'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, MessageSquare, Copy, Check, ShoppingBag } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { TILES_DATA } from '../data/tiles';
import { TileSlabVisual } from './TileSlabVisual';
import { WhatsAppIcon } from './WhatsAppIcon';

export const QuoteDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearBag,
    isDrawerOpen,
    setIsDrawerOpen,
    isWholesaleMode,
    toggleWholesaleMode,
    totalSqft,
    totalBoxes,
    totalBDT,
    itemCount,
  } = useQuote();

  const [copied, setCopied] = useState(false);

  if (!isDrawerOpen) return null;

  // Format WhatsApp message with entire order list in Bengali/English
  const formatQuoteText = () => {
    let msg = `Salam / Hello Md. Abir Hossain,\n\nআমি Master Tiles Gallery (মাস্টার টাইল্স গ্যালারী) থেকে নিম্নলিখিত টাইল্সগুলোর ${
      isWholesaleMode ? 'পাইকারী (WHOLESALE)' : 'খুচরা (RETAIL)'
    } কোটেশন ও স্টক নিশ্চিত করতে চাচ্ছি:\n\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. ${item.tileName} (${item.tileCode})\n`;
      msg += `   - সাইজ: ${item.size} | ফিনিশ: ${item.finish.toUpperCase()}\n`;
      msg += `   - পরিমাণ: ${item.boxes} বক্স (~${item.sqft} স্কয়ার ফিট)\n`;
      msg += `   - রেট: ৳${item.pricePerSqft} / স্কয়ার ফিট\n`;
      msg += `   - সাবটোটাল: ৳${item.totalBDT.toLocaleString()} টাকা\n\n`;
    });

    msg += `----------------------------------------\n`;
    msg += `মোট এরিয়া: ${totalSqft} স্কয়ার ফিট\n`;
    msg += `মোট বক্স সংখ্যা: ${totalBoxes} বক্স\n`;
    msg += `আনুমানিক মোট দর: ৳${totalBDT.toLocaleString()} টাকা\n`;
    msg += `দরদাম মোড: ${isWholesaleMode ? 'পাইকারী (Wholesale)' : 'খুচরা (Retail)'}\n`;
    msg += `----------------------------------------\n\n`;
    msg += `দয়া করে বর্তমান স্টক ও ডেলিভারি সংক্রান্ত বিস্তারিত তথ্য জানাবেন। ধন্যবাদ।`;

    return msg;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(formatQuoteText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappNumber = '8801743381500';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatQuoteText())}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Slide-over Drawer - Full width on mobile, max-w-md on desktop with NO left offset */}
        <div className="fixed inset-y-0 right-0 max-w-full flex w-full justify-end z-50 pointer-events-none">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E2DFD8] pointer-events-auto h-full overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-[#EAE7E0] flex items-center justify-between bg-[#FAF9F5]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#9E783B]" />
                <h3 className="font-serif font-bold uppercase tracking-wider text-sm sm:text-base text-[#1F2124]">
                  Quote Bag ({itemCount})
                </h3>
              </div>

              <div className="flex items-center gap-2.5">
                {items.length > 0 && (
                  <button
                    onClick={clearBag}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close quote bag"
                  className="w-8.5 h-8.5 rounded-full bg-white hover:bg-slate-100 border border-[#DDD9D0] flex items-center justify-center text-slate-700 transition-colors shadow-2xs active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Wholesale / Retail Toggle Strip */}
            <div className="bg-[#F5F3ED] px-4 sm:px-6 py-2.5 border-b border-[#EAE7E0] flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Pricing Mode:
              </span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#DCD7CE] shadow-2xs">
                <button
                  onClick={toggleWholesaleMode}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    !isWholesaleMode ? 'bg-[#1F2124] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Retail
                </button>
                <button
                  onClick={toggleWholesaleMode}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    isWholesaleMode ? 'bg-[#9E783B] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Wholesale
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-600">
                  <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#E5E2DC] flex items-center justify-center text-[#9E783B]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                    Your Quote Bag is Empty
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs font-body">
                    Explore our curated collection and add your preferred tile sizes and finishes to request a direct estimate.
                  </p>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="mt-2 px-5 py-2.5 rounded-full bg-[#1F2124] hover:bg-[#9E783B] text-white font-serif font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const tileObj = TILES_DATA.find((t) => t.id === item.tileId) || TILES_DATA[0];

                  return (
                    <div
                      key={item.id}
                      className="bg-[#FAF9F5] rounded-2xl p-3.5 sm:p-4 border border-[#EAE7E0] flex gap-3 sm:gap-3.5 relative group shadow-2xs"
                    >
                      {/* Mini Thumbnail */}
                      <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-[#E5E2DC] shadow-xs relative">
                        {tileObj.image ? (
                          <Image
                            src={tileObj.image}
                            alt={tileObj.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <TileSlabVisual
                            tile={tileObj}
                            finish={item.finish}
                            className="w-full h-full pointer-events-none"
                          />
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1.5">
                            <h4 className="text-xs sm:text-[13px] font-bold font-serif text-[#1F2124] leading-snug line-clamp-2">
                              {item.tileName}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                              className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 flex-shrink-0 -mr-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-600 mt-1 font-mono">
                            <span className="bg-white px-1.5 py-0.5 rounded border border-[#E0DCD4] font-bold text-slate-800">
                              {item.size}
                            </span>
                            <span className="capitalize font-medium text-slate-600">{item.finish}</span>
                          </div>
                        </div>

                        {/* Quantity Stepper & Subtotal */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EAE7E0]/70">
                          <div className="flex items-center border border-[#D5D0C7] bg-white rounded-lg overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.boxes - 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors active:scale-95"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-[#1F2124]">
                              {item.boxes}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.boxes + 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors active:scale-95"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-xs sm:text-sm font-bold font-serif text-[#1F2124]">
                              ৳{item.totalBDT.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bengali">
                              {item.sqft} স্কয়ার ফিট
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Calculation & Actions */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#EAE7E0] bg-white space-y-3.5 shadow-lg">
                {/* Summary Figures */}
                <div className="space-y-1.5 text-xs sm:text-sm bg-[#FAF9F5] p-3 rounded-xl border border-[#ECE8E0]">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Total Coverage Area:</span>
                    <span className="font-mono font-bold text-[#1F2124]">{totalSqft} sq.ft</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Total Boxes:</span>
                    <span className="font-mono font-bold text-[#1F2124]">{totalBoxes} Boxes</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 pt-2 border-t border-[#E0DCD4]">
                    <span className="font-bold text-[#1F2124] text-xs sm:text-sm">Estimated Total:</span>
                    <div className="text-right">
                      <span className="font-bold text-base sm:text-lg font-serif text-[#1F2124]">
                        ৳{totalBDT.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-slate-500 ml-1">BDT</span>
                    </div>
                  </div>
                </div>

                {/* Primary WhatsApp Action */}
                <div className="space-y-2 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                  >
                    <WhatsAppIcon className="w-4.5 h-4.5 fill-current flex-shrink-0" />
                    <span>Send Quote via WhatsApp (হোয়াটসঅ্যাপে পাঠান)</span>
                  </a>

                  <button
                    onClick={handleCopyQuote}
                    className="w-full py-2.5 sm:py-3 px-3 rounded-xl bg-[#FAF9F5] hover:bg-[#F2EFE9] border border-[#D5D0C7] text-slate-800 text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Quote Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Quote Summary (কোটেশন কপি করুন)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

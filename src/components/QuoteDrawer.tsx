'use client';

import React, { useState } from 'react';
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
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Slide-over Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-marble-300"
          >
            {/* Header */}
            <div className="p-5 border-b border-marble-300 flex items-center justify-between bg-marble-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-slate-900" />
                <h3 className="font-display font-bold uppercase tracking-wider text-sm text-slate-900">
                  Quote Bag ({itemCount})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearBag}
                    className="text-[11px] text-slate-600 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close quote bag"
                  className="w-8 h-8 rounded-full bg-white hover:bg-marble-200 border border-marble-300 flex items-center justify-center text-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Wholesale / Retail Toggle Strip */}
            <div className="bg-marble-200/70 px-5 py-2.5 border-b border-marble-300 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-700">
                Pricing Mode:
              </span>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-marble-300 shadow-xs">
                <button
                  onClick={toggleWholesaleMode}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    !isWholesaleMode ? 'bg-slate-900 text-white' : 'text-slate-600'
                  }`}
                >
                  Retail
                </button>
                <button
                  onClick={toggleWholesaleMode}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    isWholesaleMode ? 'bg-taupe-dark text-white' : 'text-slate-600'
                  }`}
                >
                  Wholesale
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-600">
                  <div className="w-14 h-14 rounded-full bg-marble-100 border border-marble-300 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">
                    Your Quote Bag is Empty
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs font-body">
                    Explore our curated collection and add your preferred tile sizes and finishes to request a direct estimate.
                  </p>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="mt-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs uppercase tracking-wider"
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
                      className="bg-marble-100/70 rounded-xl p-3.5 border border-marble-300 flex gap-3 relative group"
                    >
                      {/* Mini Thumbnail */}
                      <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-marble-300">
                        <TileSlabVisual
                          tile={tileObj}
                          finish={item.finish}
                          className="w-full h-full pointer-events-none"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold font-display uppercase text-slate-900 truncate">
                            {item.tileName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                            className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-0.5 font-mono">
                          <span className="bg-white px-1.5 py-0.2 rounded border border-marble-300 font-bold">
                            {item.size}
                          </span>
                          <span className="capitalize">{item.finish}</span>
                        </div>

                        {/* Quantity Stepper & Subtotal */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-marble-300 bg-white rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.boxes - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-marble-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-900">
                              {item.boxes}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.boxes + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-marble-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-bold font-display text-slate-900">
                              ৳{item.totalBDT.toLocaleString()}
                            </div>
                            <div className="text-[9px] text-slate-600 font-mono">
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
              <div className="p-5 border-t border-marble-300 bg-white space-y-4">
                {/* Summary Figures */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Coverage Area:</span>
                    <span className="font-mono font-semibold text-slate-900">{totalSqft} sq.ft</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Boxes:</span>
                    <span className="font-mono font-semibold text-slate-900">{totalBoxes} Boxes</span>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-1.5 border-t border-marble-200">
                    <span className="font-bold text-slate-900">Estimated Total:</span>
                    <span className="font-bold text-base font-display text-slate-900">
                      ৳{totalBDT.toLocaleString()} BDT
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Action */}
                <div className="space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                  >
                    <WhatsAppIcon className="w-4.5 h-4.5 fill-current" />
                    <span>Send Quote via WhatsApp (হোয়াটসঅ্যাপে পাঠান)</span>
                  </a>

                  <button
                    onClick={handleCopyQuote}
                    className="w-full py-2.5 px-3 rounded-xl bg-marble-100 hover:bg-marble-200 border border-marble-300 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Quote Copied to Clipboard!</span>
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

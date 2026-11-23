'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Phone, CreditCard, Menu, X } from 'lucide-react';
import { MtgLogo } from './MtgLogo';
import { useQuote } from '../context/QuoteContext';

export const Navbar: React.FC = () => {
  const { itemCount, setIsDrawerOpen, setIsDigitalCardOpen } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-marble-100/90 backdrop-blur-md border-b border-marble-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group">
          <MtgLogo size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13.5px] font-serif font-semibold tracking-wide text-slate-700">
          <a
            href="#catalog"
            className="hover:text-slate-900 transition-colors py-1 relative group"
          >
            <span>Catalog</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full" />
          </a>
          <a
            href="#showroom"
            className="hover:text-slate-900 transition-colors py-1 relative group"
          >
            <span>Showroom Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full" />
          </a>
          <a
            href="#consultation"
            className="hover:text-slate-900 transition-colors py-1 relative group"
          >
            <span>Wholesale & Retail</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full" />
          </a>
          <a
            href="#contact"
            className="hover:text-slate-900 transition-colors py-1 relative group"
          >
            <span>Location & Storefront</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full" />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Digital Visiting Card Modal Trigger */}
          <button
            onClick={() => setIsDigitalCardOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-marble-200 border border-marble-300 text-slate-800 text-xs font-serif font-bold tracking-wide shadow-xs transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-taupe-dark" />
            <span>Visiting Card</span>
          </button>

          {/* Direct Hotline Call */}
          <a
            href="tel:+8801743381500"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-marble-200 hover:bg-marble-300 text-slate-900 text-xs font-serif font-bold tracking-wide transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono">+880 1743-381500</span>
          </a>

          {/* Quote Bag Drawer Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Quote Bag"
            className="relative px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-serif font-bold tracking-wide flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Quote Bag</span>
            {itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-taupe text-slate-900 text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-white border border-marble-300 flex items-center justify-center text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-marble-300 px-6 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-marble-200"
            >
              Tile Collections
            </a>
            <a
              href="#showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-marble-200"
            >
              Showroom Experience
            </a>
            <a
              href="#consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-marble-200"
            >
              Wholesale & Retail Pricing
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-marble-200"
            >
              Location & Contact
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDigitalCardOpen(true);
              }}
              className="w-full py-2.5 rounded-lg bg-marble-100 border border-marble-300 text-slate-900 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-taupe-dark" />
              <span>View Digital Visiting Card</span>
            </button>
            <a
              href="tel:+8801743381500"
              className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Owner (+880 1743-381500)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

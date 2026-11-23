'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { MtgLogo } from './MtgLogo';
import { useQuote } from '../context/QuoteContext';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory, onOpenSearch }) => {
  const { itemCount, setIsDrawerOpen } = useQuote();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHome = pathname === '/';
  const isProducts = pathname?.startsWith('/products');

  const categories = [
    { id: 'floor', label: 'Floor Tiles' },
    { id: 'wall', label: 'Wall Tiles' },
    { id: 'marble', label: 'Marble Porcelain' },
    { id: 'wood', label: 'Wood Grain' },
    { id: 'islamic', label: 'Islamic Feature' },
    { id: 'decorative', label: 'Decorative Tiles' },
    { id: 'bathroom', label: 'Bathroom Tiles' },
    { id: 'outdoor', label: 'Outdoor Tiles' },
  ];

  return (
    <header className="relative w-full z-40 select-none">
      {/* ========================================================
          TOP ROW: White Marble Background with Contact Strip
         ======================================================== */}
      <div className="bg-[#FAF9F6] bg-marble-vein border-b border-[#E8E5DF] py-2.5 sm:py-3.5 lg:py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-4 lg:gap-6">
          {/* Left: Vertically Stacked M T G Logo & Name (Matching Mockup) */}
          <Link href="/" className="flex-shrink-0 group">
            <MtgLogo layout="stacked" size="md" className="hidden lg:flex" />
            <MtgLogo layout="inline" size="sm" className="lg:hidden" />
          </Link>

          {/* Right: Contact Items with Thin Dividers & Bengali Guidance */}
          <div className="hidden lg:flex items-center gap-7 text-[#222428]">
            {/* Showroom Hotline 1 */}
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#A67839] flex-shrink-0" />
              <div className="leading-tight">
                <span className="text-[11px] text-[#555] block font-medium">
                  Showroom
                </span>
                <a
                  href="tel:+8801911776657"
                  className="font-bold text-[13px] hover:text-[#A67839] transition-colors font-mono"
                >
                  +880 1911776657
                </a>
              </div>
            </div>

            {/* Divider */}
            <span className="h-7 w-[1px] bg-[#D8D4CC]" />

            {/* Showroom Hotline 2 */}
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#A67839] flex-shrink-0" />
              <div className="leading-tight">
                <a
                  href="tel:+8801615970588"
                  className="font-bold text-[13px] hover:text-[#A67839] transition-colors font-mono"
                >
                  +880 1615970588
                </a>
              </div>
            </div>

            {/* Divider */}
            <span className="h-7 w-[1px] bg-[#D8D4CC]" />

            {/* Email */}
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#A67839] flex-shrink-0" />
              <div className="leading-tight">
                <a
                  href="mailto:abirhossain7741@gmail.com"
                  className="text-[12.5px] text-[#222428] hover:text-[#A67839] transition-colors font-medium"
                >
                  abirhossain7741@gmail.com
                </a>
              </div>
            </div>

            {/* Divider */}
            <span className="h-7 w-[1px] bg-[#D8D4CC]" />

            {/* Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#A67839] flex-shrink-0 mt-0.5" />
              <div className="leading-tight text-[11px] text-[#444] font-medium">
                <span className="block font-bold text-[#1F2124]">
                  Three Brothers Tiles Market
                </span>
                <span className="block text-[#666]">Nolapara, Bhabanipur,</span>
                <span className="block text-[#666]">Gazipur Sadar, Gazipur</span>
              </div>
            </div>
          </div>

          {/* Mobile Right Action Bar: Call + Search + Quote + Hamburger (All in ONE sleek bar) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Call Showroom */}
            <a
              href="tel:+8801911776657"
              className="w-8.5 h-8.5 rounded-full bg-white border border-[#E2DFD8] text-[#9E783B] flex items-center justify-center hover:bg-[#C5994E] hover:text-[#1F2124] transition-colors shadow-2xs active:scale-95"
              title="Call Showroom Hotline"
              aria-label="Call Showroom"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>

            {/* Search */}
            <button
              onClick={() => {
                if (onOpenSearch) {
                  onOpenSearch();
                } else if (!pathname?.startsWith('/products')) {
                  router.push('/products');
                }
              }}
              className="w-8.5 h-8.5 rounded-full bg-white border border-[#E2DFD8] text-slate-700 flex items-center justify-center hover:border-[#9E783B] transition-colors shadow-2xs active:scale-95"
              title="Search Tiles"
              aria-label="Search Tiles"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Quote Button with Badge */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C5994E] to-[#B58940] hover:brightness-105 text-[#18191B] text-xs font-serif font-bold tracking-wide flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
              title="View Quote"
              aria-label="View Quote"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-[11.5px] font-serif font-bold tracking-wide">Quote</span>
              {itemCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#1F2124] text-white text-[9.5px] font-mono font-bold flex items-center justify-center -mr-0.5">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8.5 h-8.5 rounded-lg bg-[#1F2124] text-white flex items-center justify-center shadow-2xs active:scale-95"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE SLIDE-DOWN NAVIGATION DRAWER
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18191B] border-t border-white/10 px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Main Navigation Links */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10 font-serif">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-xs font-serif flex items-center justify-between ${
                isHome ? 'bg-[#C5994E]/25 text-[#C5994E] border border-[#C5994E]/40 font-bold' : 'bg-white/5 hover:bg-white/10 text-white/95 font-semibold'
              }`}
            >
              <span className="tracking-wide">Home</span>
              <span className="text-[10px] text-white/40 font-bengali font-normal">হোম</span>
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-xs font-serif flex items-center justify-between ${
                isProducts ? 'bg-[#C5994E]/25 text-[#C5994E] border border-[#C5994E]/40 font-bold' : 'bg-[#C5994E]/15 border border-[#C5994E]/30 text-[#C5994E] font-bold'
              }`}
            >
              <span className="tracking-wide">All Products</span>
              <span className="text-[10px] text-[#C5994E]/80 font-bengali font-normal">সব টাইল্স</span>
            </Link>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-serif font-semibold text-white/95 flex items-center justify-between"
            >
              <span className="tracking-wide">About Us</span>
              <span className="text-[10px] text-white/40 font-bengali font-normal">পরিচিতি</span>
            </a>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-serif font-semibold text-white/95 flex items-center justify-between"
            >
              <span className="tracking-wide">Collection</span>
              <span className="text-[10px] text-white/40 font-bengali font-normal">ক্যাটালগ</span>
            </Link>
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-serif font-semibold text-white/95 flex items-center justify-between"
            >
              <span className="tracking-wide">Services</span>
              <span className="text-[10px] text-white/40 font-bengali font-normal">সেবা</span>
            </a>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-serif font-semibold text-white/95 flex items-center justify-between"
            >
              <span className="tracking-wide">Contact</span>
              <span className="text-[10px] text-white/40 font-bengali font-normal">যোগাযোগ</span>
            </a>
          </div>

          {/* Quick Categories Filter Pills */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#C5994E] mb-2 flex items-center justify-between">
              <span>Browse Categories</span>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[9px] font-semibold text-[#C5994E] hover:underline"
              >
                সব দেখুন →
              </Link>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-1 rounded-md bg-[#C5994E] text-[#1F2124] text-[11px] font-bold"
              >
                All (সব)
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  onClick={() => {
                    onSelectCategory?.(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#C5994E] hover:text-[#1F2124] text-[11px] font-medium text-white/90 transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Direct Showroom Hotline & WhatsApp Buttons */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
            <a
              href="tel:+8801911776657"
              className="px-3 py-2 rounded-lg bg-[#FAF9F5] text-[#1F2124] text-[11px] font-serif font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <Phone className="w-3.5 h-3.5 text-[#A67839]" />
              <span>Call Hotline</span>
            </a>
            <a
              href="https://wa.me/8801743381500?text=Salam%20Md.%20Abir%20Hossain,%20I%20am%20inquiring%20about%20tiles%20from%20Master%20Tiles%20Gallery."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-[#25D366] text-white text-[11px] font-serif font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Showroom Address Brief */}
          <div className="text-[10px] text-white/60 leading-snug pt-1 flex items-start gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5994E] flex-shrink-0 mt-0.5" />
            <span>তিন ভাই টাইলস মার্কেট, মোল্লাপাড়া, ভবানীপুর, গাজীপুর সদর</span>
          </div>
        </div>
      )}

      {/* ========================================================
          DESKTOP NAVIGATION BAR: Dark Charcoal (#1F2124) - Hidden on Mobile
         ======================================================== */}
      <nav className="hidden lg:block bg-[#1F2124] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-13 flex items-center justify-between">
          {/* Left Navigation Links matching Mockup exactly */}
          <div className="flex items-center gap-7 text-[13.5px] font-serif font-semibold tracking-wide text-white/90">
            {/* Home Link */}
            <Link
              href="/"
              className={`transition-colors relative py-3.5 flex items-center ${
                isHome ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>Home</span>
              {isHome && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C5994E]" />}
            </Link>

            {/* All Products Link */}
            <Link
              href="/products"
              className={`transition-colors relative py-3.5 flex items-center ${
                isProducts ? 'text-white font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>All Products</span>
              {isProducts && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C5994E]" />}
            </Link>

            {/* Tiles Collection Dropdown */}
            <div
              className="relative py-3.5"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/products"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Tiles Collection</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              </Link>

              {dropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white text-slate-900 rounded-lg shadow-xl border border-marble-300 py-2 z-50">
                  <Link
                    href="/products"
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-xs font-serif font-bold text-[#A67839] hover:bg-[#FAF9F5] border-b border-slate-100 flex items-center justify-between tracking-wide"
                  >
                    <span>All Collections (সকল টাইল্স)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      onClick={() => {
                        onSelectCategory?.(cat.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-serif font-semibold hover:bg-[#FAF9F5] hover:text-[#A67839] transition-colors block text-slate-800 tracking-wide"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#about"
              className="text-white/80 hover:text-white transition-colors py-3.5"
            >
              About Us
            </a>

            <a
              href="/#featured"
              className="text-white/80 hover:text-white transition-colors py-3.5"
            >
              Gallery
            </a>

            <a
              href="/#services"
              className="text-white/80 hover:text-white transition-colors py-3.5"
            >
              Services
            </a>

            <a
              href="/#contact"
              className="text-white/80 hover:text-white transition-colors py-3.5"
            >
              Contact
            </a>
          </div>

          {/* Right: Search & Get a Quote CTA Button */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Search Icon */}
            <button
              onClick={() => {
                if (onOpenSearch) {
                  onOpenSearch();
                } else if (!pathname?.startsWith('/products')) {
                  router.push('/products');
                }
              }}
              aria-label="Search Tiles"
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Get a Quote Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="group bg-gradient-to-r from-[#C5994E] via-[#D0A65B] to-[#B58940] hover:brightness-105 text-[#18191B] px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-[13px] font-serif font-bold tracking-wide flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              {itemCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#18191B] text-white text-[9px] font-mono font-bold flex items-center justify-center ml-1">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

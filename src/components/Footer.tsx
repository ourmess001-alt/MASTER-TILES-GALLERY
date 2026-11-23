'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUp, CreditCard } from 'lucide-react';
import { MtgLogo } from './MtgLogo';
import { useQuote } from '../context/QuoteContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const { setIsDigitalCardOpen } = useQuote();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F2124] text-white border-t border-white/10 pt-12 pb-10 sm:pt-16 sm:pb-12 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Bengali Subtitle */}
          <div className="space-y-4">
            <MtgLogo size="md" textColor="text-white" subtextColor="text-white/70" />
            <p className="text-xs text-white/70 leading-relaxed font-body">
              A complete tiles solution for your home, office, and commercial space. Offering premium vitrified porcelain, wall tiles, and decorative panels.
            </p>
            <div className="font-bengali text-xs text-gold font-medium">
              এখানে সকল প্রকার টাইল্স পাইকারী ও খুচরা বিক্রয় করা হয়।
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gold font-bold hover:text-white transition-colors flex items-center gap-1">
                  <span>All Products (সকল পণ্য)</span>
                  <span className="text-[9px] bg-gold/20 px-1.5 py-0.2 rounded font-mono">NEW</span>
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/products" className="hover:text-gold transition-colors">
                  Tile Categories
                </Link>
              </li>
              <li>
                <a href="/#featured" className="hover:text-gold transition-colors">
                  Popular Tile Designs
                </a>
              </li>
              <li>
                <a href="/#services" className="hover:text-gold transition-colors">
                  Wholesale & Estimation
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-gold transition-colors">
                  Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Showroom Hotlines
            </h4>
            <div className="space-y-2 text-xs text-white/75 font-mono">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href="tel:+8801911776657" className="hover:text-white">
                  +880 1911776657
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href="tel:+8801615970588" className="hover:text-white">
                  +880 1615970588
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href="tel:+8801743381500" className="hover:text-white font-bold text-white">
                  +880 1743-381500 (Owner)
                </a>
              </div>
              <div className="flex items-center gap-2 pt-1 font-body">
                <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <a href="mailto:abirhossain7741@gmail.com" className="hover:text-white truncate">
                  abirhossain7741@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Address & Digital Card */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Gazipur Location
            </h4>
            <div className="flex items-start gap-2 text-xs text-white/75 leading-relaxed">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>
                Three Brothers Tiles Market, Nolapara, Bhabanipur, Gazipur Sadar, Gazipur
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsDigitalCardOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/15"
              >
                <CreditCard className="w-3.5 h-3.5 text-gold" />
                <span>Digital Visiting Card</span>
              </button>

              <a
                href="https://wa.me/8801743381500"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Owner</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} MASTER TILES GALLERY (মাস্টার টাইল্স গ্যালারী). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Proprietor: Md. Abir Hossain</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-slate-900 text-white flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

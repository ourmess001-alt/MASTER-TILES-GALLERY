'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const handleScrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#FBFBFA] bg-marble-vein">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[520px] xl:min-h-[550px]">
        {/* ========================================================
            LEFT COLUMN: Editorial Copy & Bengali Guidance
           ======================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-10 lg:pl-16 lg:pr-8 py-10 sm:py-14 lg:py-16 z-10">
          {/* Luxury 3D Brand Title Lockup with Official M-T-G Emblem & Chrome Typography */}
          <h1 className="relative mb-3.5 sm:mb-4.5">
            <span className="sr-only">Master Tiles Gallery</span>
            <div className="relative w-full max-w-[380px] sm:max-w-[480px] lg:max-w-[540px] aspect-[1091/248] select-none">
              <Image
                src="/images/hero-brand-lockup.png"
                alt="Master Tiles Gallery - Premium Tiles Showroom in Gazipur"
                fill
                priority
                className="object-contain object-left drop-shadow-xs"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 500px, 540px"
              />
            </div>
          </h1>

          {/* Bengali Brand Subtitle */}
          <div className="font-bengali text-sm sm:text-base lg:text-lg font-bold text-[#8C642A] mb-3 sm:mb-4 leading-snug">
            মাস্টার টাইল্স গ্যালারী • পাইকারী ও খুচরা বিক্রয় কেন্দ্র
          </div>

          {/* Description Paragraph with Professional Context */}
          <p className="text-xs sm:text-sm lg:text-[15px] text-[#4E5055] max-w-lg leading-relaxed font-body mb-7 sm:mb-8">
            A complete tiles solution for your home, office, and commercial space. বাড়ি ও ব্যবসা প্রতিষ্ঠানের জন্য প্রিমিয়াম কোয়ালিটির ফ্লোর, ওয়াল ও ডেকোরেটিভ টাইলসের বিশাল কালেকশন।
          </p>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">
            {/* Explore Collection */}
            <button
              onClick={handleScrollToCollection}
              className="group bg-[#A27535] hover:bg-[#8E6429] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Visit Showroom */}
            <button
              onClick={handleScrollToContact}
              className="bg-white hover:bg-[#FAF9F5] text-[#1F2124] px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-[#D5D5D5] hover:border-[#A27535] transition-all shadow-xs active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-[#444]" />
              <span>Visit Showroom</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: Real Showroom Showcase with Slanted Diagonal Corner
           ======================================================== */}
        <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full px-6 sm:px-10 lg:pl-0 lg:pr-16 pb-6 lg:pb-0">
          {/* Diagonal Angle Container on Desktop, Rounded Luxury Frame on Mobile */}
          <div className="relative w-full h-full rounded-2xl lg:rounded-none lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)] overflow-hidden shadow-lg lg:shadow-none border border-[#EAE7E1] lg:border-none group">
            {/* Showroom Inside Photo */}
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] xl:min-h-[540px]">
              <Image
                src="/images/showroom/showroom-inside.jpg"
                alt="Master Tiles Gallery Interior Showroom Experience in Gazipur"
                fill
                priority
                className="object-cover object-center transform hover:scale-103 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Gold Divider Line on the Left Angle Cut (Desktop only) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-20"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heroGoldDivider" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C5994E" />
                  <stop offset="50%" stopColor="#E2C17D" />
                  <stop offset="100%" stopColor="#966C2D" />
                </linearGradient>
              </defs>
              <line
                x1="10%"
                y1="0"
                x2="0%"
                y2="100%"
                stroke="url(#heroGoldDivider)"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

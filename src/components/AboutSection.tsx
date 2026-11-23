'use client';

import React from 'react';
import Image from 'next/image';
import { Store, Layers, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-18 bg-[#FBFBFA] bg-marble-vein border-t border-[#EAE7E1] relative overflow-hidden">
      {/* Tall Leaning White Marble Slabs on Far Right */}
      <div className="absolute -right-4 top-0 bottom-0 w-36 lg:w-48 pointer-events-none hidden md:block opacity-90">
        <svg
          viewBox="0 0 160 400"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="marbleSlab1" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F5F3EC" />
              <stop offset="100%" stopColor="#E5E0D5" />
            </linearGradient>
            <linearGradient id="marbleSlab2" x1="0" y1="0" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF8F3" />
              <stop offset="100%" stopColor="#DBD5C7" />
            </linearGradient>
          </defs>

          {/* Slab 1 (Back) */}
          <polygon
            points="60,0 160,0 120,400 20,400"
            fill="url(#marbleSlab1)"
            stroke="#D0C9BA"
            strokeWidth="1.5"
          />
          <path d="M70 40 Q110 180 80 340" stroke="#C5A059" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M100 80 Q130 220 110 370" stroke="#7A7870" strokeWidth="1.5" fill="none" opacity="0.5" />

          {/* Slab 2 (Front Leaning) */}
          <polygon
            points="20,0 120,0 80,400 -20,400"
            fill="url(#marbleSlab2)"
            stroke="#C4BCAB"
            strokeWidth="1.5"
          />
          <path d="M40 30 Q70 170 50 350" stroke="#8A867D" strokeWidth="2.5" fill="none" opacity="0.6" />
          <path d="M60 90 Q90 240 70 380" stroke="#C5A059" strokeWidth="1.8" fill="none" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ========================================================
              LEFT COLUMN: Storefront Photograph with Signboard
              (/images/showroom/showroom-exterior.jpg)
             ======================================================== */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden shadow-md border border-[#E5E5E5] bg-slate-900">
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src="/images/showroom/showroom-exterior.jpg"
                  alt="Master Tiles Gallery Illuminated Showroom Storefront in Gazipur"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Bengali Badge */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-lg border border-white/60 shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F2124] block">
                    মাস্টার টাইল্স গ্যালারী
                  </span>
                  <span className="text-[10px] font-bengali text-slate-600">
                    তিন ভাই টাইলস মার্কেট, ভবানীপুর, গাজীপুর সদর
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#9E783B] text-white px-2 py-0.5 rounded">
                  শোরুম
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: About Copy & 3 Stat Counters with Bengali
             ======================================================== */}
          <div className="lg:col-span-7 space-y-4 pr-0 lg:pr-14">
            {/* Overline with Line */}
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#9AA2B0] via-[#666C7A] to-[#3B404B] rounded-full" />
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#5A606D]">
                ABOUT US
              </span>
            </div>

            {/* Luxury Serif Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight leading-tight">
              <span className="heading-brand-gradient">Your Trusted Tiles Partner </span>
              <br className="hidden sm:inline" />
              <span className="heading-brand-accent">in Gazipur</span>
            </h2>

            {/* Description in clear, professional English and Bengali */}
            <p className="text-xs sm:text-sm text-[#4E5055] leading-relaxed font-body">
              Master Tiles Gallery (MTG) is a premier tiles showroom located at Bhabanipur, Gazipur Sadar. আমরা বাসা-বাড়ি, কমার্শিয়াল বিল্ডিং এবং বড় প্রকল্পের জন্য সরাসরি ফ্যাক্টরি রেটে শতভাগ জেনুইন টাইল্স, সঠিক পরিমাপ এবং সর্বোত্তম বিক্রয়োত্তর সেবা প্রদান করি।
            </p>

            {/* 3 Stat Counters matching Mockup (Responsive Cards on Mobile) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3">
              {/* Stat 1 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-[#EAE7E1] shadow-xs sm:shadow-none">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[#9E783B] bg-[#FAF9F5] sm:bg-transparent">
                  <Store className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold font-serif text-[#1A1A1A] leading-tight">
                    10+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight">
                    Experience
                  </div>
                  <div className="text-[8.5px] sm:text-[9px] text-[#888] font-bengali">
                    ১০+ বছর অভিজ্ঞতা
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-[#EAE7E1] shadow-xs sm:shadow-none">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[#9E783B] bg-[#FAF9F5] sm:bg-transparent">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold font-serif text-[#1A1A1A] leading-tight">
                    500+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight">
                    Tile Designs
                  </div>
                  <div className="text-[8.5px] sm:text-[9px] text-[#888] font-bengali">
                    ৫০০+ ডিজাইন
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-white sm:bg-transparent border sm:border-0 border-[#EAE7E1] shadow-xs sm:shadow-none">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[#9E783B] bg-[#FAF9F5] sm:bg-transparent">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold font-serif text-[#1A1A1A] leading-tight">
                    1,000+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight">
                    Happy Clients
                  </div>
                  <div className="text-[8.5px] sm:text-[9px] text-[#888] font-bengali">
                    ১,০০০+ গ্রাহক
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

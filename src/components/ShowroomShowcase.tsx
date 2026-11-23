'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, Layers, ShieldCheck, Calculator, Building2, CheckCircle2 } from 'lucide-react';

export const ShowroomShowcase: React.FC = () => {
  return (
    <div className="space-y-24 py-16 bg-white">
      {/* ========================================================
          SECTION 1: Architectural Showroom Experience
          (Using /images/showroom/showroom-inside.jpg)
         ======================================================== */}
      <section id="showroom" className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-taupe" />
              <span className="text-xs uppercase tracking-widest font-bold text-slate-600">
                Architectural Showroom Experience
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display uppercase font-bold text-slate-900 tracking-tight leading-tight">
              A Living Gallery of Premium Porcelain & Marble Slabs
            </h2>

            <p className="font-bengali text-base text-slate-700 font-medium">
              গাজীপুর সদরের ভবানীপুরে অবস্থিত মাস্টার টাইল্স গ্যালারী—যেখানে প্রতিটি টাইল্সকে প্রদর্শন করা হয়েছে বাস্তব ফ্লোর ও দেয়ালের জীবন্ত অনুভূতির সাথে।
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              Step inside our flagship showroom to experience over 5,000 sq.ft of curated vitrified porcelain, large-format marble slabs, and custom Islamic feature panels under true warm architectural illumination.
            </p>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-taupe-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    True-Scale Display Walls
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Wall-to-wall installed tile panels to inspect real joint alignment and natural lighting response.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-taupe-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Polished Marble Continuous Floor
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Walk on real polished glazed porcelain to verify slip resistance, foot-feel, and gloss mirror depth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-taupe-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Direct Factory Import Standards
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Direct access to top-tier international & domestic brands with certified zero-warpage rectification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Photographic Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-marble-300 group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/showroom/showroom-inside.jpg"
                  alt="Master Tiles Gallery Interior Showroom Experience in Gazipur"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>

              {/* Architectural Overlay Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-900" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                      Main Showroom Gallery Hall
                    </span>
                    <span className="text-[10px] text-slate-600 font-bengali">
                      তিন ভাই টাইলস মার্কেট, ভবানীপুর, গাজীপুর
                    </span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Plan Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: In-Showroom Consultation & Wholesale/Retail Desk
          (Using /images/showroom/showroom-interior.jpg)
         ======================================================== */}
      <section id="consultation" className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Photographic Showcase */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-marble-300 group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/showroom/showroom-interior.jpg"
                  alt="In-Showroom Consultation & Transparent Wholesale Estimate Desk"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Consultation Callout */}
              <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-[11px] font-mono tracking-wider flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5 text-taupe" />
                <span>Live On-Desk Area & Box Computation</span>
              </div>
            </div>
          </div>

          {/* Right Text: Transparent Wholesale & Retail */}
          <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              <span className="text-xs uppercase tracking-widest font-bold text-slate-600">
                Transparent Estimation & Consultation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display uppercase font-bold text-slate-900 tracking-tight leading-tight">
              Wholesale Bulk Rates & Retail Tailoring Under One Roof
            </h2>

            <p className="font-bengali text-base text-slate-700 font-medium">
              বিল্ডিং কন্ট্রাক্টর, ডেভেলপার কিংবা ব্যক্তিগত বাড়ি নির্মাণ—প্রত্যেক গ্রাহকের জন্য রয়েছে সঠিক পরিমাপের পরামর্শ ও পাইকারী রেটের সুবিধা।
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              Sit down directly with owner <strong>Md. Abir Hossain</strong> at our consultation desk. We calculate exact square footage, incorporate necessary 5% cutting wastage, and recommend precise box quantities to avoid shortages or overspending.
            </p>

            {/* Wholesale vs Retail Tier Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-marble-100 p-3.5 rounded-xl border border-marble-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-taupe-dark block">
                  Wholesale (পাইকারী)
                </span>
                <span className="text-lg font-bold font-display text-slate-900 block mt-0.5">
                  Direct Bulk Rate
                </span>
                <p className="text-[10px] text-slate-600 mt-1">
                  Applicable for full apartment projects, developers, and commercial contractors.
                </p>
              </div>

              <div className="bg-marble-100 p-3.5 rounded-xl border border-marble-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 block">
                  Retail (খুচরা)
                </span>
                <span className="text-lg font-bold font-display text-slate-900 block mt-0.5">
                  Room Custom Pack
                </span>
                <p className="text-[10px] text-slate-600 mt-1">
                  Individual room renovators, single bathroom tiles, and Islamic feature pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

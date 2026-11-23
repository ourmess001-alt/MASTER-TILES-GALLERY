'use client';

import React from 'react';
import Image from 'next/image';
import { Calculator, Box } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ConsultationSection: React.FC = () => {
  const { toggleWholesaleMode, isWholesaleMode, setIsDrawerOpen } = useQuote();

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#FAF9F5] border-t border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Consultation Desk Photo */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5E2DC] group">
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <Image
                  src="/images/showroom/showroom-interior.jpg"
                  alt="In-Showroom Consultation & Transparent Calculation Desk Master Tiles Gallery"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Consultation Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white text-xs font-semibold flex items-center gap-2 shadow-lg font-bengali">
                <Calculator className="w-4 h-4 text-gold" />
                <span>সরাসরি হিসাব ও পরামর্শ ডেস্ক • প্রোঃ মোঃ আবির হোসেন</span>
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale & Retail Benefits */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#9AA2B0] via-[#666C7A] to-[#3B404B] rounded-full" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#5A606D]">
                SERVICES & ESTIMATION
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight leading-tight">
              <span className="heading-brand-gradient">Direct Wholesale </span>
              <span className="heading-brand-accent">Pricing & Estimation</span>
              <span className="block font-bengali text-lg sm:text-xl font-normal text-slate-700 mt-2">
                সরাসরি পাইকারী দর ও নিখুঁত পরিমাপের পরামর্শ
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#5A5B61] leading-relaxed font-body">
              বাসা-বাড়ি নির্মাণ বা ফ্ল্যাট রেনোভেশনে কত স্কয়ার ফিট টাইল্স লাগবে এবং কত বক্স প্রয়োজন—তা সঠিকভাবে হিসাব করা খুব জরুরি। আমাদের শোরুমে এসে স্বত্বাধিকারী মোঃ আবির হোসেনের সাথে সরাসরি বসে সঠিক পরিমাপ করুন, যাতে টাইল্স কম বা অতিরিক্ত কেনার ঝামেলা না হয়।
            </p>

            {/* Wholesale vs Retail Tier Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div
                onClick={toggleWholesaleMode}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isWholesaleMode
                    ? 'bg-white border-gold shadow-md ring-2 ring-gold/30'
                    : 'bg-white/70 hover:bg-white border-[#E5E2DC]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold block">
                  Wholesale Tier
                </span>
                <span className="text-sm sm:text-base font-bold font-serif text-[#1F2124] block mt-0.5">
                  পাইকারী রেট
                </span>
                <p className="text-[11px] text-[#5A5B61] mt-1 leading-tight font-bengali">
                  বিল্ডিং ডেভেলপার, কন্ট্রাক্টর ও ৫০০+ স্কয়ার ফিট অর্ডারের জন্য বিশেষ পাইকারী ছাড়।
                </p>
              </div>

              <div
                onClick={toggleWholesaleMode}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  !isWholesaleMode
                    ? 'bg-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                    : 'bg-white/70 hover:bg-white border-[#E5E2DC]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F2124] block">
                  Retail Tier
                </span>
                <span className="text-sm sm:text-base font-bold font-serif text-[#1F2124] block mt-0.5">
                  খুচরা প্যাকেজ
                </span>
                <p className="text-[11px] text-[#5A5B61] mt-1 leading-tight font-bengali">
                  ব্যক্তিগত ফ্ল্যাট, সিঙ্গেল রুম ও বাথরুমের কাজের জন্য সুলভ প্যাকেজ সুবিধা।
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="bg-gold hover:bg-gold-hover text-[#1F2124] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
              >
                <Box className="w-4 h-4" />
                <span>Calculate & Quote (হিসাব দেখুন)</span>
              </button>

              <a
                href="https://wa.me/8801743381500"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp Owner</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

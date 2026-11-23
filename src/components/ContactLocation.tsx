'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, MapPin, Clock, Navigation, Truck, Building2 } from 'lucide-react';

export const ContactLocation: React.FC = () => {
  const showroomPhone1 = '+880 1911-776657';
  const address = 'Three Brothers Tiles Market, Nolapara, Bhabanipur, Gazipur Sadar, Gazipur';

  // Google Maps search query URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Three Brothers Tiles Market Nolapara Bhabanipur Gazipur'
  )}`;

  return (
    <section id="contact" className="py-20 bg-marble-100 border-t border-marble-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <span className="w-8 h-[2px] bg-gradient-to-r from-[#9AA2B0] via-[#666C7A] to-[#3B404B] rounded-full" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#5A606D]">
              Direct Storefront & Logistics Hub
            </span>
            <span className="w-8 h-[2px] bg-gradient-to-r from-[#3B404B] via-[#666C7A] to-[#9AA2B0] rounded-full" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight">
            <span className="heading-brand-gradient">Visit Our </span>
            <span className="heading-brand-accent">Gazipur Showroom</span>
          </h2>
          <p className="font-bengali text-base text-slate-700 font-medium">
            তিন ভাই টাইলস মার্কেট, মোল্লাপাড়া, ভবানীপুর, গাজীপুর সদর—সরাসরি প্রদর্শনী ও গোডাউন
          </p>
          <p className="text-xs text-slate-600">
            Open Saturday to Thursday (8:30 AM – 9:00 PM). Direct truck and pickup dispatch available across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Exterior Storefront Photograph */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-marble-300 group h-full min-h-[320px] sm:min-h-[400px]">
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px]">
                <Image
                  src="/images/showroom/showroom-exterior.jpg"
                  alt="Master Tiles Gallery Illuminated Storefront in Three Brothers Tiles Market Gazipur"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Storefront Badge */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-[11px] sm:text-xs font-medium flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bengali">মাস্টার টাইল্স গ্যালারী • শোরুম সাইনবোর্ড</span>
              </div>

              {/* Location Tag */}
              <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2 text-xs font-semibold text-slate-900">
                <MapPin className="w-3.5 h-3.5 text-[#9E783B] flex-shrink-0" />
                <span>Nolapara, Bhabanipur, Gazipur Sadar</span>
              </div>
            </div>
          </div>

          {/* Right: Showroom Address & Logistics Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DECF] shadow-[0_8px_30px_rgba(0,0,0,0.06)] space-y-5 overflow-hidden h-full flex flex-col justify-between">
              {/* Top Gold Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C5994E] via-[#A27535] to-[#C5994E]" />

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0EEE8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#9E783B] flex items-center justify-center flex-shrink-0 border border-[#E8DEC8] shadow-2xs">
                      <Building2 className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 font-serif">
                        Showroom & Warehouse
                      </h4>
                      <span className="text-[11px] text-slate-500 font-bengali block">
                        সরাসরি শোরুম ও কেন্দ্রীয় গোডাউন
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-emerald-200/80 shadow-2xs whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open 6 Days</span>
                  </span>
                </div>

                {/* Information Cards Group */}
                <div className="space-y-3">
                  {/* Location Card */}
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EFECE4] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#EAE5D9] text-[#9E783B] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9E783B] block">
                        Location Address
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                        Three Brothers Tiles Market, Nolapara
                      </p>
                      <p className="text-xs text-slate-600 font-bengali mt-0.5">
                        মোল্লাপাড়া, ভবানীপুর, গাজীপুর সদর, গাজীপুর
                      </p>
                    </div>
                  </div>

                  {/* Visiting Hours Card */}
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EFECE4] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#EAE5D9] text-[#9E783B] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                        Visiting Hours
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                        Saturday – Thursday: 8:30 AM – 9:00 PM
                      </p>
                      <p className="text-xs text-amber-800 font-medium font-bengali mt-0.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        শুক্রবার সাপ্তাহিক বন্ধ (Friday Closed)
                      </p>
                    </div>
                  </div>

                  {/* Logistics & Dispatch Card */}
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EFECE4] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#EAE5D9] text-[#9E783B] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                        Logistics & Dispatch
                      </span>
                      <p className="text-xs text-slate-700 font-bengali mt-0.5 leading-relaxed">
                        সরাসরি শোরুম থেকে ট্রাক ও পিকআপে সারাদেশে দ্রুত ও নিরাপদ টাইল্স ডেলিভারির সুব্যবস্থা।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F0EEE8] grid grid-cols-2 gap-3">
                <a
                  href={`tel:${showroomPhone1.replace(/\s+/g, '')}`}
                  className="px-3 py-2.5 sm:py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EFE8] border border-[#EAE6DD] text-slate-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9E783B]" />
                  <span>Call Showroom</span>
                </a>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 sm:py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5994E]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

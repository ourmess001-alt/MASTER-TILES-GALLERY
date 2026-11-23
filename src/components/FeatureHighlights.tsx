'use client';

import React from 'react';
import { Gem, Award, Truck, Headphones } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Gem,
      title: 'Wide Range',
      subtitle: 'Floor, wall & decorative tiles',
      bengaliHint: 'মেঝে ও দেয়াল টাইল্স',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Durable & long lasting finish',
      bengaliHint: 'সেরা টেকসই মান',
    },
    {
      icon: Truck,
      title: 'Showroom Experience',
      subtitle: 'See & choose in person',
      bengaliHint: 'সরাসরি প্রদর্শনী',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      subtitle: 'Accurate estimation & advice',
      bengaliHint: 'অভিজ্ঞ পরামর্শ',
    },
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 -mt-4 sm:-mt-8 mb-10 sm:mb-14 select-none">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-lg p-3.5 sm:py-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0 rounded-xl sm:rounded-none bg-[#FAF9F6] sm:bg-transparent border sm:border-0 border-[#F0EEEA]"
              >
                {/* Outlined Gold/Bronze Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#9E783B] bg-white sm:bg-transparent shadow-xs sm:shadow-none">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.8]" />
                </div>

                {/* Text Block matching Mockup */}
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#1A1A1A] tracking-tight leading-tight truncate sm:whitespace-normal">
                    {feature.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#6B7280] mt-0.5 leading-tight hidden sm:block">
                    {feature.subtitle}
                  </p>
                  <span className="text-[9px] sm:text-[10px] font-bengali text-[#9E783B] font-semibold block mt-0.5 truncate">
                    {feature.bengaliHint}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

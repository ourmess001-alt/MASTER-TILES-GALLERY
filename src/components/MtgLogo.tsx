'use client';

import React from 'react';
import Image from 'next/image';

interface MtgLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  layout?: 'stacked' | 'inline';
  textColor?: string;
  subtextColor?: string;
  useImage?: boolean;
}

export const MtgLogo: React.FC<MtgLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  layout = 'stacked',
  textColor = 'text-[#1F2124]',
  subtextColor = 'text-[#5A5B61]',
  useImage = true,
}) => {
  const emblemDimensions = {
    sm: { width: 48, height: 28 },
    md: { width: 66, height: 38 },
    lg: { width: 90, height: 52 },
    xl: { width: 120, height: 70 },
  };

  const titleSizes = {
    sm: 'text-[9px] tracking-[0.14em]',
    md: 'text-[11px] font-bold tracking-[0.18em]',
    lg: 'text-sm font-bold tracking-[0.2em]',
    xl: 'text-lg font-bold tracking-[0.22em]',
  };

  const currentDim = emblemDimensions[size];

  return (
    <div
      className={`select-none transition-transform duration-300 hover:scale-102 ${
        layout === 'stacked'
          ? 'flex flex-col items-center text-center gap-1.5'
          : 'flex items-center gap-3'
      } ${className}`}
    >
      {/* ========================================================
          AUTHENTIC 3-PETAL "M T G" EMBLEM FROM VISITING CARD
          (Top Petal: M, Bottom-Left: T, Bottom-Right: G)
         ======================================================== */}
      <div
        className="relative flex-shrink-0"
        style={{ width: currentDim.width, height: currentDim.height }}
      >
        {useImage ? (
          <Image
            src="/images/logo-emblem.png"
            alt="Master Tiles Gallery Visiting Card Logo Emblem (M T G)"
            width={currentDim.width}
            height={currentDim.height}
            className="w-full h-full object-contain drop-shadow-xs"
            priority
          />
        ) : (
          <svg
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            <defs>
              {/* Metallic Silver-Charcoal Bevel Gradients matching Visiting Card */}
              <linearGradient id="visitingCardBevel" x1="0" y1="0" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A8A8A8" />
                <stop offset="30%" stopColor="#7A7A7A" />
                <stop offset="70%" stopColor="#4A4A4A" />
                <stop offset="100%" stopColor="#2A2A2A" />
              </linearGradient>

              {/* Gold/Bronze Center Accent */}
              <linearGradient id="goldAccent" x1="0" y1="0" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5CA98" />
                <stop offset="50%" stopColor="#B88A44" />
                <stop offset="100%" stopColor="#8C642A" />
              </linearGradient>
            </defs>

            {/* ========================================================
                TOP PETAL: "M" (Master) - Pointing Upwards
               ======================================================== */}
            <g>
              <path
                d="M120 10 C146 36 142 58 126 66 C120 66 120 90 120 90 C120 90 120 66 114 66 C98 58 94 36 120 10 Z"
                fill="url(#visitingCardBevel)"
                stroke="#2B2C30"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M120 19 C138 39 135 55 124 61 C120 61 120 76 120 76 C120 76 120 61 116 61 C105 55 102 39 120 19 Z"
                fill="#FFFFFF"
                stroke="#333333"
                strokeWidth="0.9"
              />
              <text
                x="120"
                y="48"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-plus-jakarta), sans-serif"
                fontSize="18"
                fontWeight="900"
                fill="#1F2124"
              >
                M
              </text>
            </g>

            {/* ========================================================
                LEFT PETAL: "T" (Tiles) - Pointing Down-Left
               ======================================================== */}
            <g>
              <path
                d="M40 82 C68 56 92 60 102 74 C102 82 120 82 120 82 C120 82 102 82 102 90 C92 104 68 108 40 82 Z"
                fill="url(#visitingCardBevel)"
                stroke="#2B2C30"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M49 82 C71 63 88 66 96 77 C96 82 108 82 108 82 C108 82 96 82 96 87 C88 98 71 101 49 82 Z"
                fill="#FFFFFF"
                stroke="#333333"
                strokeWidth="0.9"
              />
              <text
                x="73"
                y="83"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-plus-jakarta), sans-serif"
                fontSize="18"
                fontWeight="900"
                fill="#1F2124"
              >
                T
              </text>
            </g>

            {/* ========================================================
                RIGHT PETAL: "G" (Gallery) - Pointing Down-Right
               ======================================================== */}
            <g>
              <path
                d="M200 82 C172 56 148 60 138 74 C138 82 120 82 120 82 C120 82 138 82 138 90 C148 104 172 108 200 82 Z"
                fill="url(#visitingCardBevel)"
                stroke="#2B2C30"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M191 82 C169 63 152 66 144 77 C144 82 132 82 132 82 C132 82 144 82 144 87 C152 98 169 101 191 82 Z"
                fill="#FFFFFF"
                stroke="#333333"
                strokeWidth="0.9"
              />
              <text
                x="167"
                y="83"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="var(--font-plus-jakarta), sans-serif"
                fontSize="18"
                fontWeight="900"
                fill="#1F2124"
              >
                G
              </text>
            </g>

            {/* Center Junction Point */}
            <circle cx="120" cy="82" r="3.5" fill="url(#goldAccent)" stroke="#1F2124" strokeWidth="0.5" />
          </svg>
        )}
      </div>

      {/* Brand Text Typography directly matching the visiting card */}
      {showText && (
        <div className="flex flex-col items-center">
          <span
            className={`font-body uppercase font-bold ${textColor} ${titleSizes[size]} whitespace-nowrap`}
          >
            MASTER TILES GALLERY
          </span>
        </div>
      )}
    </div>
  );
};

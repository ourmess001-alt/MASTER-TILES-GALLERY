'use client';

import React from 'react';
import Image from 'next/image';
import { TileItem, TileFinishType } from '../types';

interface TileSlabVisualProps {
  tile: TileItem;
  finish?: TileFinishType;
  className?: string;
  isHero?: boolean;
  aspectRatio?: 'square' | 'slab' | 'plank' | 'tall';
  showSpecBadge?: boolean;
}

export const TileSlabVisual: React.FC<TileSlabVisualProps> = ({
  tile,
  finish = 'glossy',
  className = '',
  isHero = false,
  aspectRatio = 'slab',
  showSpecBadge = false,
}) => {
  const { patternType } = tile.surfacePattern;

  // Aspect ratio classes
  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'plank'
      ? 'aspect-[1/2.2]'
      : aspectRatio === 'tall'
      ? 'aspect-[3/4]'
      : 'aspect-[3/4.2]';

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white select-none transition-shadow duration-500 ${aspectClass} ${
        isHero ? 'shadow-slab-active' : 'shadow-slab'
      } ${className}`}
    >
      {/* 3D Slab Layer 1: Base Ceramic Body & Edge Bevel Effect */}
      <div className="absolute inset-0 z-0">
        {tile.image ? (
          <Image
            src={tile.image}
            alt={tile.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <SurfacePatternRenderer patternType={patternType} finish={finish} />
        )}
      </div>

      {/* Finish Overlay: Room Floor Preview Mode */}
      {finish === 'room' && isHero && (
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-2.5 border border-white/60 shadow-lg text-slate-900">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider">
              <span className="text-taupe-dark">Architectural Living Room Simulation</span>
              <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded">Continuous Grid</span>
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5">
              Reflective marble continuity with 1.5mm rectified joints.
            </div>
          </div>
        </div>
      )}

      {/* Finish Overlay: Grain Macro Zoom Mode */}
      {finish === 'grain' && isHero && (
        <div className="absolute inset-0 z-10 pointer-events-none border-4 border-taupe/40 ring-1 ring-inset ring-white/50">
          <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-taupe animate-pulse" />
            4× Micro-Macro Mineral Inspection
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 px-2 py-0.5 rounded text-[9px] font-mono shadow">
            Feldspar & Calcite Crystalline Structure
          </div>
        </div>
      )}

      {/* Finish Overlay: Glossy Specular Sheen vs Matte Soft Diffusion */}
      {finish === 'glossy' && (
        <>
          {/* Diagonal Glass Sheen Light Reflection */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/18 to-transparent opacity-90 transform -rotate-12 translate-x-1/4 scale-150" />
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-black/10" />
          {/* Specular corner highlight */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white/30 blur-xl pointer-events-none" />
        </>
      )}

      {finish === 'matte' && (
        <>
          {/* Soft Velvet Diffuse Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-stone-900/5 mix-blend-multiply" />
          <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-stone-900/10" />
          {isHero && (
            <div className="absolute top-3 right-3 bg-slate-800/80 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
              Matte Silk Finish
            </div>
          )}
        </>
      )}

      {/* 3D Realistic Porcelain Slab Outer Edge Borders */}
      <div className="absolute inset-0 z-30 pointer-events-none rounded-xl border border-black/8 ring-1 ring-inset ring-white/40" />

      {/* Bottom and Right Edge Bevel Shadows giving 3D porcelain thickness */}
      <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-l from-black/25 to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-30" />

      {/* Authentic Tile Spec Label - Only when explicitly requested */}
      {showSpecBadge && (
        <div className="absolute bottom-3 left-3 z-30 pointer-events-none">
          <div className="bg-slate-900/75 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-sm border border-white/15">
            <span className="font-bold text-taupe-soft">{tile.code}</span>
            <span className="text-white/40">|</span>
            <span>{tile.defaultSize}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Procedural SVG Pattern Generator tailored to each stone/marble style
 */
const SurfacePatternRenderer: React.FC<{
  patternType: string;
  finish: TileFinishType;
}> = ({ patternType, finish }) => {
  const isZoomed = finish === 'grain';
  const isRoom = finish === 'room';

  // Room view renders simulated floor perspective tile grid
  if (isRoom) {
    return (
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="roomFloorGrad" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#DFDCD5" />
            <stop offset="40%" stopColor="#ECE9E2" />
            <stop offset="100%" stopColor="#F5F3ED" />
          </linearGradient>
          <linearGradient id="wallBackdrop" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#25262B" />
            <stop offset="100%" stopColor="#3C3E44" />
          </linearGradient>
          <linearGradient id="groutLine" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#9E9B95" />
            <stop offset="100%" stopColor="#D2CFC7" />
          </linearGradient>
        </defs>

        {/* Interior Wall & Skirting */}
        <rect x="0" y="0" width="400" height="150" fill="url(#wallBackdrop)" />
        <rect x="0" y="145" width="400" height="8" fill="#151618" />
        <rect x="0" y="150" width="400" height="5" fill="#E2DFD8" />

        {/* Polished Marble Floor with Perspective Perspective Grid Lines */}
        <path d="M0 155 L400 155 L400 500 L0 500 Z" fill="url(#roomFloorGrad)" />

        {/* Perspective Traversal Lines */}
        <g stroke="url(#groutLine)" strokeWidth="1.5">
          <line x1="200" y1="155" x2="-80" y2="500" strokeWidth="2" />
          <line x1="200" y1="155" x2="60" y2="500" strokeWidth="2" />
          <line x1="200" y1="155" x2="200" y2="500" strokeWidth="2.5" />
          <line x1="200" y1="155" x2="340" y2="500" strokeWidth="2" />
          <line x1="200" y1="155" x2="480" y2="500" strokeWidth="2" />
        </g>

        {/* Horizontal Perspective Row Tile Grid Lines */}
        <line x1="0" y1="180" x2="400" y2="180" stroke="#BBB7AF" strokeWidth="1" />
        <line x1="0" y1="220" x2="400" y2="220" stroke="#BBB7AF" strokeWidth="1.2" />
        <line x1="0" y1="280" x2="400" y2="280" stroke="#BBB7AF" strokeWidth="1.5" />
        <line x1="0" y1="365" x2="400" y2="365" stroke="#B0ACA4" strokeWidth="2" />
        <line x1="0" y1="480" x2="400" y2="480" stroke="#9E9A92" strokeWidth="2.5" />

        {/* Ambient Window Reflection on Floor */}
        <polygon
          points="60,160 140,160 210,480 30,480"
          fill="url(#roomFloorGrad)"
          opacity="0.3"
          className="mix-blend-overlay"
        />
        <polygon
          points="240,160 320,160 420,480 270,480"
          fill="#FFFFFF"
          opacity="0.25"
          className="mix-blend-overlay"
        />
      </svg>
    );
  }

  // CALACATTA GOLD ROYAL SLAB
  if (patternType === 'calacatta') {
    return (
      <svg
        viewBox={isZoomed ? '100 100 200 250' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="calacattaBase" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF9F5" />
            <stop offset="45%" stopColor="#F5F3EC" />
            <stop offset="100%" stopColor="#ECE8DF" />
          </linearGradient>
          <filter id="calacattaBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        <rect width="400" height="520" fill="url(#calacattaBase)" />

        {/* Soft Grey Feathery Sub-Veins */}
        <path
          d="M-30 40 Q80 120 180 190 T340 320 T440 480"
          fill="none"
          stroke="#C5C2BA"
          strokeWidth="12"
          opacity="0.4"
          filter="url(#calacattaBlur)"
        />
        <path
          d="M120 -20 Q190 140 220 280 T310 440"
          fill="none"
          stroke="#BDB9B0"
          strokeWidth="16"
          opacity="0.35"
          filter="url(#calacattaBlur)"
        />

        {/* Primary Warm Taupe & Golden Honey Veining */}
        <path
          d="M-20 60 Q90 130 190 200 T330 310 Q370 380 430 460"
          fill="none"
          stroke="#C5A059"
          strokeWidth="5"
          opacity="0.9"
        />
        <path
          d="M190 200 Q240 230 310 210 Q360 200 420 240"
          fill="none"
          stroke="#B8A382"
          strokeWidth="3.5"
          opacity="0.85"
        />
        <path
          d="M80 120 Q130 90 200 80 Q280 70 360 110"
          fill="none"
          stroke="#D8C6A5"
          strokeWidth="2.5"
          opacity="0.7"
        />

        {/* Sharp Graphite Core Fissures inside gold */}
        <path
          d="M-15 62 Q92 131 191 201 T329 311 Q370 380 428 461"
          fill="none"
          stroke="#52504B"
          strokeWidth="1.4"
          opacity="0.6"
        />
        <path
          d="M191 201 Q241 231 310 211 Q360 201 418 241"
          fill="none"
          stroke="#42413E"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* Micro Crystalline Mineral Flecks */}
        <circle cx="210" cy="220" r="1.5" fill="#C5A059" opacity="0.8" />
        <circle cx="240" cy="180" r="1.2" fill="#8C785B" opacity="0.7" />
        <circle cx="160" cy="260" r="1.8" fill="#B8A382" opacity="0.8" />
        <circle cx="330" cy="330" r="1.4" fill="#C5A059" opacity="0.75" />
      </svg>
    );
  }

  // STATUARIO FIRENZE BIANCO
  if (patternType === 'statuario') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 250' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="statuarioBase" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FAFAFC" />
            <stop offset="100%" stopColor="#F1F3F6" />
          </linearGradient>
          <filter id="statuarioBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <rect width="400" height="520" fill="url(#statuarioBase)" />

        {/* Broad Soft Cloud Veins */}
        <path
          d="M40 -40 Q140 180 260 290 T380 540"
          fill="none"
          stroke="#D4D7DE"
          strokeWidth="24"
          opacity="0.6"
          filter="url(#statuarioBlur)"
        />
        <path
          d="M-40 260 Q120 280 240 360 T420 420"
          fill="none"
          stroke="#E0E3EA"
          strokeWidth="18"
          opacity="0.7"
          filter="url(#statuarioBlur)"
        />

        {/* Architectural Bold Slate/Graphite Primary Branching */}
        <path
          d="M50 -20 Q145 185 265 295 T375 530"
          fill="none"
          stroke="#4D5057"
          strokeWidth="6"
          opacity="0.9"
        />
        <path
          d="M145 185 Q80 240 -20 260"
          fill="none"
          stroke="#5D6068"
          strokeWidth="4"
          opacity="0.8"
        />
        <path
          d="M265 295 Q330 330 420 340"
          fill="none"
          stroke="#686C75"
          strokeWidth="3.5"
          opacity="0.85"
        />

        {/* Razor-Sharp Crystalline Darker Inlines */}
        <path
          d="M51 -20 Q146 186 266 296 T376 531"
          fill="none"
          stroke="#2B2C30"
          strokeWidth="2"
          opacity="0.95"
        />
        <path
          d="M146 186 Q81 241 -19 261"
          fill="none"
          stroke="#2B2C30"
          strokeWidth="1.5"
          opacity="0.85"
        />
      </svg>
    );
  }

  // NERO MARQUINA BLACK LUXE
  if (patternType === 'marquina') {
    return (
      <svg
        viewBox={isZoomed ? '80 80 220 260' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="marquinaBase" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1F24" />
            <stop offset="50%" stopColor="#141518" />
            <stop offset="100%" stopColor="#0B0C0E" />
          </linearGradient>
          <filter id="marquinaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
        </defs>

        <rect width="400" height="520" fill="url(#marquinaBase)" />

        {/* Ambient Dark Charcoal Textures */}
        <path
          d="M0 80 Q160 180 320 240 T450 490"
          fill="none"
          stroke="#2A2C33"
          strokeWidth="30"
          opacity="0.8"
        />

        {/* Lightning Strike Quartz Crystalline Fractures */}
        <path
          d="M-10 40 L90 120 L130 110 L210 240 L260 230 L350 410 L410 480"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          opacity="0.95"
        />
        <path
          d="M210 240 L270 270 L340 260 L420 310"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          opacity="0.88"
        />
        <path
          d="M90 120 L60 170 L-20 210"
          fill="none"
          stroke="#E6E8ED"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Soft Quartz Halo Glow */}
        <path
          d="M-10 40 L90 120 L130 110 L210 240 L260 230 L350 410 L410 480"
          fill="none"
          stroke="#B5B9C4"
          strokeWidth="6"
          opacity="0.35"
          filter="url(#marquinaGlow)"
        />

        {/* Fine White Spider Micro-Threads */}
        <path
          d="M130 110 L180 140 L230 135"
          fill="none"
          stroke="#D8DBE2"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <path
          d="M260 230 L290 200 L350 190"
          fill="none"
          stroke="#D8DBE2"
          strokeWidth="0.8"
          opacity="0.6"
        />
      </svg>
    );
  }

  // ROYAL ISLAMIC FEATURE TILE (Calligraphy & Geometric Arabesque)
  if (patternType === 'islamic') {
    return (
      <svg
        viewBox={isZoomed ? '100 140 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="islamicCream" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="50%" stopColor="#F9F5EC" />
            <stop offset="100%" stopColor="#F0E8D7" />
          </linearGradient>
          <linearGradient id="islamicGold" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9CA7C" />
            <stop offset="50%" stopColor="#C8963E" />
            <stop offset="100%" stopColor="#966C22" />
          </linearGradient>
          <filter id="goldDrop" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#4A3410" floodOpacity="0.4" />
          </filter>
        </defs>

        <rect width="400" height="520" fill="url(#islamicCream)" />

        {/* Intricate Geometric Arabesque Outer Border Frame */}
        <rect
          x="24"
          y="24"
          width="352"
          height="472"
          fill="none"
          stroke="url(#islamicGold)"
          strokeWidth="4"
          filter="url(#goldDrop)"
        />
        <rect
          x="34"
          y="34"
          width="332"
          height="452"
          fill="none"
          stroke="url(#islamicGold)"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        />

        {/* Corner 8-Pointed Star Rosettes */}
        {[
          [54, 54],
          [346, 54],
          [54, 466],
          [346, 466],
        ].map(([cx, cy], idx) => (
          <g key={idx} transform={`translate(${cx}, ${cy})`} filter="url(#goldDrop)">
            <polygon
              points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
              fill="url(#islamicGold)"
            />
            <circle cx="0" cy="0" r="3" fill="#FFFDF9" />
          </g>
        ))}

        {/* Central Arch / Mihrab Motif */}
        <path
          d="M80 390 L80 180 C80 100 200 70 200 70 C200 70 320 100 320 180 L320 390 Z"
          fill="none"
          stroke="url(#islamicGold)"
          strokeWidth="3"
          filter="url(#goldDrop)"
        />

        {/* Ornate Arabic Calligraphy Arch Centerpiece (Bismillah Artistic Flow) */}
        <g filter="url(#goldDrop)" transform="translate(200, 240)">
          {/* Main Calligraphic Crest Stroke */}
          <path
            d="M-90 -30 C-60 -60 0 -70 80 -40 C110 -25 90 20 20 10 C-40 0 -70 40 40 45 C70 46 80 30 90 25"
            fill="none"
            stroke="url(#islamicGold)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M-80 0 C-30 -25 30 -25 70 -5 C-10 15 -50 15 -70 5 Z"
            fill="url(#islamicGold)"
          />
          <circle cx="-50" cy="-45" r="4" fill="url(#islamicGold)" />
          <circle cx="-35" cy="-55" r="3.5" fill="url(#islamicGold)" />
          <circle cx="20" cy="-35" r="4" fill="url(#islamicGold)" />
          <circle cx="50" cy="-25" r="3" fill="url(#islamicGold)" />
        </g>

        {/* Subtle Moroccan Arabesque Trellis Background */}
        <g stroke="#C8963E" strokeWidth="0.7" opacity="0.25">
          <circle cx="200" cy="350" r="45" fill="none" />
          <circle cx="200" cy="350" r="30" fill="none" />
          <circle cx="200" cy="350" r="15" fill="none" />
        </g>
      </svg>
    );
  }

  // CREMA MARFIL VALENCIA
  if (patternType === 'crema') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cremaBase" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8F3EA" />
            <stop offset="50%" stopColor="#F2EAD9" />
            <stop offset="100%" stopColor="#E9DEC8" />
          </linearGradient>
          <filter id="cremaSoft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <rect width="400" height="520" fill="url(#cremaBase)" />

        {/* Gentle Warm Beige Calcite Clouds */}
        <path
          d="M-20 80 Q100 160 220 180 T420 300"
          fill="none"
          stroke="#DFCBB0"
          strokeWidth="40"
          opacity="0.6"
          filter="url(#cremaSoft)"
        />
        <path
          d="M40 320 Q180 340 300 420 T440 500"
          fill="none"
          stroke="#D8C3A4"
          strokeWidth="35"
          opacity="0.5"
          filter="url(#cremaSoft)"
        />

        {/* Fine Amber Fossil Strands */}
        <path
          d="M10 60 Q120 140 230 170 T390 280"
          fill="none"
          stroke="#BFA582"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <path
          d="M180 160 Q240 220 320 250"
          fill="none"
          stroke="#CBB494"
          strokeWidth="1.8"
          opacity="0.75"
        />
        <path
          d="M30 360 Q160 380 280 430"
          fill="none"
          stroke="#B89B74"
          strokeWidth="2"
          opacity="0.7"
        />
      </svg>
    );
  }

  // TRAVERTINE SILVER ASH
  if (patternType === 'travertine') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="travertineBase" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#ECE8E1" />
            <stop offset="50%" stopColor="#E2DDD5" />
            <stop offset="100%" stopColor="#D8D2C8" />
          </linearGradient>
        </defs>

        <rect width="400" height="520" fill="url(#travertineBase)" />

        {/* Horizontal Sedimentary Stratification Bands */}
        {[40, 75, 110, 150, 190, 230, 270, 315, 360, 400, 445, 480].map((y, idx) => (
          <g key={idx}>
            <line
              x1="0"
              y1={y}
              x2="400"
              y2={y + (idx % 2 === 0 ? 3 : -2)}
              stroke={idx % 3 === 0 ? '#9D9991' : '#B8B3AA'}
              strokeWidth={idx % 3 === 0 ? '3' : '1.8'}
              opacity="0.85"
            />
            {/* Porous micro-voids characteristic of Italian travertine */}
            <line
              x1={40 + (idx * 27) % 280}
              y1={y + 1}
              x2={80 + (idx * 27) % 280}
              y2={y + 1}
              stroke="#68645C"
              strokeWidth="2.5"
              opacity="0.7"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    );
  }

  // NORDIC OAK SMOKED TIMBER
  if (patternType === 'wood') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="woodBase" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#C4A377" />
            <stop offset="48%" stopColor="#D5B68C" />
            <stop offset="50%" stopColor="#8C673D" />
            <stop offset="52%" stopColor="#C8A77C" />
            <stop offset="100%" stopColor="#B39063" />
          </linearGradient>
        </defs>

        <rect width="400" height="520" fill="url(#woodBase)" />

        {/* Cathedral Wood Grain Flow */}
        <path
          d="M0 80 Q100 60 200 140 T400 110"
          fill="none"
          stroke="#7A5630"
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M0 160 Q120 130 200 230 T400 200"
          fill="none"
          stroke="#684624"
          strokeWidth="2.5"
          opacity="0.75"
        />
        <path
          d="M0 260 Q80 230 200 340 T400 310"
          fill="none"
          stroke="#8A633B"
          strokeWidth="2"
          opacity="0.65"
        />
        <path
          d="M0 380 Q140 340 200 460 T400 430"
          fill="none"
          stroke="#59391B"
          strokeWidth="2.2"
          opacity="0.8"
        />

        {/* Center Plank Divider Seam */}
        <line x1="200" y1="0" x2="200" y2="520" stroke="#482D13" strokeWidth="2" opacity="0.9" />

        {/* Wood Knot Detail */}
        <ellipse cx="280" cy="240" rx="14" ry="22" fill="#5A3A1C" opacity="0.7" />
        <ellipse cx="280" cy="240" rx="8" ry="12" fill="#3D240E" opacity="0.85" />
      </svg>
    );
  }

  // TERRAZZO VENEZIANO GRIGIO
  if (patternType === 'terrazzo') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="terrazzoBase" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAE7E1" />
            <stop offset="50%" stopColor="#DFDBD2" />
            <stop offset="100%" stopColor="#D5D0C6" />
          </linearGradient>
        </defs>

        <rect width="400" height="520" fill="url(#terrazzoBase)" />

        {/* Multi-Colored Aggregate Chips */}
        {Array.from({ length: 45 }).map((_, i) => {
          const x = ((i * 73) % 380) + 10;
          const y = ((i * 97) % 500) + 10;
          const r = (i % 5) + 3;
          const colors = ['#2B2C30', '#7A766F', '#C5A059', '#FFFFFF', '#968F84', '#B8A382'];
          const color = colors[i % colors.length];
          return (
            <polygon
              key={i}
              points={`${x},${y - r} ${x + r + 1},${y - 1} ${x + r - 1},${y + r} ${x - r},${y + 1}`}
              fill={color}
              opacity={color === '#2B2C30' ? '0.85' : '0.9'}
            />
          );
        })}
      </svg>
    );
  }

  // SAHARA AMBER ONYX SLAB
  if (patternType === 'onyx') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="onyxBase" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBF2DE" />
            <stop offset="40%" stopColor="#F2DBAE" />
            <stop offset="100%" stopColor="#E5C17D" />
          </linearGradient>
          <filter id="onyxBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <rect width="400" height="520" fill="url(#onyxBase)" />

        {/* Swirling Amber Magma River Bands */}
        <path
          d="M-30 60 Q120 180 200 220 T430 380"
          fill="none"
          stroke="#C57F26"
          strokeWidth="35"
          opacity="0.65"
          filter="url(#onyxBlur)"
        />
        <path
          d="M30 180 Q160 260 240 280 T460 480"
          fill="none"
          stroke="#A85E14"
          strokeWidth="20"
          opacity="0.55"
          filter="url(#onyxBlur)"
        />

        {/* Luminous Core Quartz Seams */}
        <path
          d="M-20 70 Q125 185 205 225 T425 385"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          opacity="0.85"
        />
        <path
          d="M-20 68 Q125 183 205 223 T425 383"
          fill="none"
          stroke="#85480D"
          strokeWidth="2"
          opacity="0.9"
        />
      </svg>
    );
  }

  // GEOMETRIC ANDALUSIAN 3D CUBE MOSAIC
  if (patternType === 'geometric') {
    return (
      <svg
        viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="cubeGrid" width="80" height="92.38" patternUnits="userSpaceOnUse">
            {/* Top diamond */}
            <polygon points="40,0 80,23.09 40,46.19 0,23.09" fill="#E8E4DC" stroke="#CCC6BC" strokeWidth="1" />
            {/* Left face */}
            <polygon points="0,23.09 40,46.19 40,92.38 0,69.28" fill="#8A857D" stroke="#757068" strokeWidth="1" />
            {/* Right face */}
            <polygon points="40,46.19 80,23.09 80,69.28 40,92.38" fill="#B88A44" stroke="#9E7638" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="520" fill="#EFECE6" />
        <rect width="400" height="520" fill="url(#cubeGrid)" />
      </svg>
    );
  }

  // Default: CARRARA PURE METRO WALL
  return (
    <svg
      viewBox={isZoomed ? '100 120 200 240' : '0 0 400 520'}
      className="w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="carraraBase" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F7F8FA" />
          <stop offset="100%" stopColor="#ECEEF2" />
        </linearGradient>
        <filter id="carraraBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      <rect width="400" height="520" fill="url(#carraraBase)" />

      {/* Soft Feathered Smoke Veins */}
      <path
        d="M-20 90 Q120 160 240 210 T430 380"
        fill="none"
        stroke="#D2D5DE"
        strokeWidth="30"
        opacity="0.5"
        filter="url(#carraraBlur)"
      />
      <path
        d="M60 260 Q180 300 290 380 T420 480"
        fill="none"
        stroke="#CBD0DB"
        strokeWidth="24"
        opacity="0.6"
        filter="url(#carraraBlur)"
      />

      {/* Fine Grey Feather Thread */}
      <path
        d="M-10 95 Q125 165 242 212 T425 382"
        fill="none"
        stroke="#7A7F8C"
        strokeWidth="1.6"
        opacity="0.75"
      />
    </svg>
  );
};

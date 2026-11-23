'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { TileCategoriesSection } from '../components/TileCategoriesSection';
import { AboutSection } from '../components/AboutSection';
import { PopularTilesSection } from '../components/PopularTilesSection';
import { ConsultationSection } from '../components/ConsultationSection';
import { ContactLocation } from '../components/ContactLocation';
import { TileDetailOverlay } from '../components/TileDetailOverlay';
import { DigitalCardModal } from '../components/DigitalCardModal';
import { QuoteDrawer } from '../components/QuoteDrawer';
import { Footer } from '../components/Footer';
import { TILES_DATA } from '../data/tiles';
import { TileItem } from '../types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTile, setSelectedTile] = useState<TileItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (tile: TileItem) => {
    setSelectedTile(tile);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-slate-900 font-body">
      {/* Top Contact Strip + Charcoal Navigation Bar (Matching Reference Mockup) */}
      <Header
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenSearch={() => {
          const el = document.getElementById('featured');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 1. Hero Section: Split Diagonal Layout with Showroom Inside Photo */}
      <HeroSection />

      {/* 2. Floating Feature Highlights Card (4 Pillars) */}
      <FeatureHighlights />

      {/* 3. Explore Tile Categories (Floor, Wall, Decorative, Bathroom, Outdoor) */}
      <TileCategoriesSection
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 4. About Us: Your Trusted Tiles Partner in Gazipur (Storefront Photo + 3 Stats) */}
      <AboutSection />

      {/* 5. Popular Tile Designs (6 Featured Slabs with Interactive Actions) */}
      <PopularTilesSection
        tiles={TILES_DATA}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenDetail={handleOpenDetail}
      />

      {/* 6. Consultation & Transparent Estimation Desk (Real Interior Desk Photo) */}
      <ConsultationSection />

      {/* 7. Storefront, Hours, and Google Maps Location */}
      <ContactLocation />

      {/* Interactive Shared-Element Tile Detail Configurator Modal */}
      <TileDetailOverlay
        tile={selectedTile}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />

      {/* Digital Visiting Card Modal (Replicating Physical Card with QR & vCard) */}
      <DigitalCardModal />

      {/* Slide-over Quote Bag Drawer with Single-Click WhatsApp Action */}
      <QuoteDrawer />

      {/* Luxury Editorial Footer */}
      <Footer />
    </div>
  );
}

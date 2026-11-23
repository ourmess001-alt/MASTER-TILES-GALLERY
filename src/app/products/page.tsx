import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductsCatalog } from '../../components/ProductsCatalog';

export const metadata: Metadata = {
  title: 'All Tiles & Slabs Products | Master Tiles Gallery Gazipur',
  description:
    'Explore our complete collection of floor tiles, wall tiles, marble porcelain slabs, and decorative tiles at Master Tiles Gallery, Gazipur. Wholesale & retail prices available.',
  openGraph: {
    title: 'All Tiles & Slabs Products | Master Tiles Gallery Gazipur',
    description:
      'A complete tiles solution for your home, office, and commercial space. Floor, wall, and decorative tiles in Gazipur.',
    images: ['/images/showroom/showroom-inside.jpg'],
  },
};

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[#9E783B] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-600 font-mono tracking-wider">
          LOADING MASTER TILES GALLERY CATALOG...
        </span>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] flex flex-col justify-between">
      {/* Universal Top Header with Brand & Contact */}
      <Header />

      {/* Interactive Products Catalog with Suspense for Search Params */}
      <Suspense fallback={<ProductsLoading />}>
        <ProductsCatalog />
      </Suspense>

      {/* Universal Luxury Footer */}
      <Footer />
    </main>
  );
}

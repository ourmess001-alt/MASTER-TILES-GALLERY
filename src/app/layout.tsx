import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { QuoteProvider } from '../context/QuoteContext';
import { ScrollToTop } from '../components/ScrollToTop';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mastertilesgallery.com'),
  title: 'Master Tiles Gallery (মাস্টার টাইল্স গ্যালারী) | Premium Tiles Showroom in Gazipur',
  description:
    'A complete tiles solution for your home, office and commercial space. Explore a premium collection of floor, wall, and decorative tiles at Three Brothers Tiles Market, Nolapara, Bhabanipur, Gazipur.',
  keywords: [
    'Master Tiles Gallery',
    'মাস্টার টাইল্স গ্যালারী',
    'Tiles Showroom Gazipur',
    'Three Brothers Tiles Market',
    'Bhabanipur Tiles Market',
    'Porcelain Tiles',
    'Floor Tiles Bangladesh',
    'Wall Tiles',
    'Abir Hossain',
  ],
  authors: [{ name: 'Md. Abir Hossain' }],
  openGraph: {
    title: 'Master Tiles Gallery | Premium Tiles Showroom in Gazipur',
    description:
      'A complete tiles solution for your home, office and commercial space. Floor, wall, and decorative tiles in Gazipur.',
    images: ['/images/showroom/showroom-inside.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} ${hindSiliguri.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-marble-vein text-slate-900 antialiased selection:bg-gold selection:text-white font-body">
        <QuoteProvider>
          {children}
          <ScrollToTop />
        </QuoteProvider>
      </body>
    </html>
  );
}

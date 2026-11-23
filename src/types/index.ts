export type TileFinishType = 'glossy' | 'matte' | 'room' | 'grain';

export type TileCategory = 'all' | 'floor' | 'wall' | 'marble' | 'wood' | 'islamic' | 'decorative' | 'bathroom' | 'outdoor';

export interface TileFinishVariant {
  type: TileFinishType;
  label: string;
  badge: string;
  desc: string;
}

export interface TileSpecs {
  thicknessMm: number;
  waterAbsorption: string;
  slipRating: string;
  mohsHardness: number;
  originStandard: string;
  recommendedGrout: string;
  applications: string[];
  piecesPerBox: number;
  sqftPerBox: number;
  weightPerBoxKg: number;
}

export interface SurfacePattern {
  baseColor: string;
  accentColor: string;
  veinColors: string[];
  patternType:
    | 'calacatta'
    | 'statuario'
    | 'marquina'
    | 'crema'
    | 'islamic'
    | 'travertine'
    | 'wood'
    | 'terrazzo'
    | 'onyx'
    | 'carrara'
    | 'geometric';
}

export interface TileItem {
  id: string;
  index: string; // e.g. "01"
  name: string;
  bengaliName: string;
  code: string;
  category: TileCategory;
  categoryLabel: string;
  priceRetail: number; // BDT / sq.ft
  priceWholesale: number; // BDT / sq.ft
  unit: string; // "sq.ft"
  availableSizes: string[]; // ["12×18\"", "12×24\"", "16×16\"", "24×24\"", "24×48\"", "32×32\""]
  defaultSize: string;
  sqftPerBoxBySize: Record<string, number>;
  piecesPerBoxBySize: Record<string, number>;
  surfacePattern: SurfacePattern;
  image?: string;
  description: string;
  bengaliDesc: string;
  specs: TileSpecs;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface QuoteItem {
  id: string;
  tileId: string;
  tileName: string;
  tileCode: string;
  size: string;
  finish: TileFinishType;
  sqft: number;
  boxes: number;
  pricePerSqft: number;
  totalBDT: number;
  isWholesale: boolean;
}

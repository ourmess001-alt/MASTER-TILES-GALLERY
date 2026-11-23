import { TileItem } from '../types';
import { RAK_TILES_DATA } from './rakTiles';

export const TILE_SIZES = [
  '8×12"',
  '10×16"',
  '10×28"',
  '12×12"',
  '12×18"',
  '12×20"',
  '12×24"',
  '12×36"',
  '16×16"',
  '24×24"',
  '24×48"',
  '32×32"',
] as const;

export const CATEGORIES = [
  { id: 'all', label: 'All Collections', bengali: 'সকল কালেকশন' },
  { id: 'wall', label: 'Wall Tiles', bengali: 'দেওয়াল টাইল্স' },
  { id: 'decorative', label: 'Decorative Tiles', bengali: 'ডেকোরেটিভ টাইল্স' },
  { id: 'bathroom', label: 'Bathroom Tiles', bengali: 'বাথরুম টাইল্স' },
  { id: 'marble', label: 'Marble & Stone Art', bengali: 'মার্বেল ও স্টোন আর্ট' },
  { id: 'floor', label: 'Floor Tiles', bengali: 'মেঝে টাইল্স' },
  { id: 'wood', label: 'Wood Grain', bengali: 'উডেন টেক্সচার' },
  { id: 'outdoor', label: 'Outdoor Tiles', bengali: 'আউটডোর ও পার্কিং' },
] as const;

// 458 Authentic RAK Ceramics Catalog Products (Demo items removed)
export const TILES_DATA: TileItem[] = RAK_TILES_DATA;

export const CATEGORY_TILES = [
  {
    id: 'wall',
    name: 'Wall Tiles',
    bengali: 'দেওয়াল টাইল্স',
    image: '/images/categories/wall-tiles.jpg',
    description: 'Glossy & matte wall claddings with stain resistance',
    count: '150+ Designs',
  },
  {
    id: 'decorative',
    name: 'Decorative Tiles',
    bengali: 'ডেকোরেটিভ টাইল্স',
    image: '/images/categories/decorative-tiles.jpg',
    description: 'Highlighters, decors & 3D listello borders',
    count: '150+ Designs',
  },
  {
    id: 'bathroom',
    name: 'Bathroom Tiles',
    bengali: 'বাথরুম টাইল্স',
    image: '/images/categories/bathroom-tiles.jpg',
    description: 'Anti-slip floors and moisture-resistant wall panels',
    count: '120+ Designs',
  },
  {
    id: 'floor',
    name: 'Floor Tiles',
    bengali: 'মেঝে টাইল্স',
    image: '/images/categories/floor-tiles.jpg',
    description: 'Polished vitrified porcelain for living rooms & halls',
    count: '150+ Designs',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Tiles',
    bengali: 'আউটডোর টাইল্স',
    image: '/images/categories/outdoor-tiles.jpg',
    description: 'Heavy-duty 16mm pavers for parking, rooftops & patios',
    count: '45+ Designs',
  },
] as const;

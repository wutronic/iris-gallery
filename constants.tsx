
import { GalleryItemData } from './types';

export const GALLERY_ITEMS: GalleryItemData[] = [
  {
    id: '1',
    title: 'ONYX PULSE',
    category: 'Editorial',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    title: 'LIQUID MERCURY',
    category: 'Abstract',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    title: 'VELVET SHADOW',
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1539109132381-31a1ca9b3b3f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '4',
    title: 'CHROME NEON',
    category: 'Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '5',
    title: 'ETHEREAL FLUX',
    category: 'Nature',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '6',
    title: 'COBALT VOID',
    category: 'Editorial',
    imageUrl: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '7',
    title: 'PRISM CORE',
    category: 'Crystal',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200',
  }
];

export const THEME = {
  colors: {
    cyan: '#00f5ff',
    magenta: '#ff00ff',
    gold: '#ffd700',
    violet: '#8b5cf6',
    rose: '#ff6b9d',
    mint: '#00ffaa',
  },
  animations: {
    popDuration: 0.45,
    ease: [0.34, 1.56, 0.64, 1], // easeOutBack-ish
  }
};

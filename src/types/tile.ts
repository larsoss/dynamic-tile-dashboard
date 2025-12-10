export interface Tile {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  order: number;
  color: TileColor;
}

export type TileColor = 'gold' | 'purple' | 'orange' | 'blue' | 'coral' | 'lavender';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

export const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#E9B949',
  secondaryColor: '#A88CC8',
  backgroundColor: '#FFF5EB',
  textColor: '#2D3748',
};

export const TILE_COLORS: Record<TileColor, string> = {
  gold: 'bg-tile-gold',
  purple: 'bg-tile-purple',
  orange: 'bg-tile-orange',
  blue: 'bg-tile-blue',
  coral: 'bg-tile-coral',
  lavender: 'bg-tile-lavender',
};

export const DEFAULT_TILES: Tile[] = [
  {
    id: '1',
    title: 'Dashboard',
    url: '#dashboard',
    imageUrl: '',
    order: 1,
    color: 'gold',
  },
  {
    id: '2',
    title: 'Sales Reports',
    url: '#sales',
    imageUrl: '',
    order: 2,
    color: 'purple',
  },
  {
    id: '3',
    title: 'Marketing Plans',
    url: '#marketing',
    imageUrl: '',
    order: 3,
    color: 'gold',
  },
  {
    id: '4',
    title: 'Product Development',
    url: '#product',
    imageUrl: '',
    order: 4,
    color: 'orange',
  },
  {
    id: '5',
    title: 'Customer Report',
    url: '#customer-report',
    imageUrl: '',
    order: 5,
    color: 'coral',
  },
  {
    id: '6',
    title: 'Customer Feedback',
    url: '#feedback',
    imageUrl: '',
    order: 6,
    color: 'lavender',
  },
  {
    id: '7',
    title: 'Team Directory',
    url: '#team',
    imageUrl: '',
    order: 7,
    color: 'blue',
  },
  {
    id: '8',
    title: 'Company Events',
    url: '#events',
    imageUrl: '',
    order: 8,
    color: 'orange',
  },
];

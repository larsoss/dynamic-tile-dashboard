import { useState, useEffect } from 'react';
import { Tile, ThemeSettings, DEFAULT_TILES, DEFAULT_THEME } from '@/types/tile';

const TILES_STORAGE_KEY = 'tiles-data';
const THEME_STORAGE_KEY = 'theme-settings';

export function useTileStore() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedTiles = localStorage.getItem(TILES_STORAGE_KEY);
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTiles) {
      setTiles(JSON.parse(storedTiles));
    } else {
      setTiles(DEFAULT_TILES);
    }

    if (storedTheme) {
      setTheme(JSON.parse(storedTheme));
    }

    setIsLoading(false);
  }, []);

  // Apply theme colors to CSS variables
  useEffect(() => {
    if (!isLoading) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', hexToHSL(theme.primaryColor));
      root.style.setProperty('--theme-secondary', hexToHSL(theme.secondaryColor));
      root.style.setProperty('--theme-background', hexToHSL(theme.backgroundColor));
      root.style.setProperty('--theme-text', hexToHSL(theme.textColor));
    }
  }, [theme, isLoading]);

  // Save tiles to localStorage
  const saveTiles = (newTiles: Tile[]) => {
    setTiles(newTiles);
    localStorage.setItem(TILES_STORAGE_KEY, JSON.stringify(newTiles));
  };

  // Save theme to localStorage
  const saveTheme = (newTheme: ThemeSettings) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
  };

  const addTile = (tile: Omit<Tile, 'id' | 'order'>) => {
    const newTile: Tile = {
      ...tile,
      id: crypto.randomUUID(),
      order: tiles.length + 1,
    };
    saveTiles([...tiles, newTile]);
  };

  const updateTile = (id: string, updates: Partial<Tile>) => {
    saveTiles(tiles.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTile = (id: string) => {
    const filtered = tiles.filter((t) => t.id !== id);
    // Recalculate order
    const reordered = filtered.map((t, index) => ({ ...t, order: index + 1 }));
    saveTiles(reordered);
  };

  const reorderTiles = (newOrder: Tile[]) => {
    const reordered = newOrder.map((t, index) => ({ ...t, order: index + 1 }));
    saveTiles(reordered);
  };

  const getSortedTiles = () => {
    return [...tiles].sort((a, b) => a.order - b.order);
  };

  return {
    tiles: getSortedTiles(),
    theme,
    isLoading,
    addTile,
    updateTile,
    deleteTile,
    reorderTiles,
    saveTheme,
  };
}

// Helper function to convert hex to HSL string for CSS variables
function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

import { useState, useEffect } from "react";
import { Tile, ThemeSettings } from "@/types/tile";

/**
 * Structuur zoals de backend /api/config terugstuurt
 */
type ApiConfig = {
  settings: {
    site_name: string;
    subtitle: string;
  };
  theme: {
    primary_color: string | null;
    background_color: string | null;
    accent_color: string | null;
    border_radius: number | null;
  };
  tiles: {
    id?: number;
    title: string;
    url: string;
    icon?: string | null;
    color?: string | null;
    position?: number;
    enabled?: number;
  }[];
};

/**
 * ✅ Browser-safe ID generator (werkt ook op TV / oudere browsers)
 */
function generateId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
}

export function useTileStore() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 1️⃣ Config laden uit backend (SQLite)
   */
  useEffect(() => {
    fetch("/api/config")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load config");
        return res.json();
      })
      .then((data: ApiConfig) => {
        const loadedTiles: Tile[] = (data.tiles || []).map((t, index) => ({
          id: String(t.id ?? generateId()),
          title: t.title,
          url: t.url,
          icon: t.icon ?? undefined,
          color: t.color ?? undefined,
          order: t.position ?? index + 1,
        }));

        setTiles(loadedTiles);

        setTheme({
          primaryColor: data.theme.primary_color ?? "#0f172a",
          secondaryColor: data.theme.accent_color ?? "#38bdf8",
          backgroundColor: data.theme.background_color ?? "#020617",
          textColor: "#ffffff",
          welcomeTitle: data.settings.site_name,
          welcomeSubtitle: data.settings.subtitle,
        });

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard config", err);
        setIsLoading(false);
      });
  }, []);

  /**
   * 2️⃣ Theme toepassen op CSS variables
   */
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--theme-primary", hexToHSL(theme.primaryColor));
    root.style.setProperty("--theme-secondary", hexToHSL(theme.secondaryColor));
    root.style.setProperty("--theme-background", hexToHSL(theme.backgroundColor));
    root.style.setProperty("--theme-text", hexToHSL(theme.textColor));
  }, [theme]);

  /**
   * Helper: alles opslaan naar backend
   */
  async function saveToBackend(updatedTiles: Tile[]) {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      alert("Admin token ontbreekt");
      throw new Error("No admin token");
    }
    if (!theme) return;

    const payload = {
      settings: {
        site_name: theme.welcomeTitle,
        subtitle: theme.welcomeSubtitle,
      },
      theme: {
        primary_color: theme.primaryColor,
        background_color: theme.backgroundColor,
        accent_color: theme.secondaryColor,
        border_radius: 16,
      },
      tiles: updatedTiles.map((t, index) => ({
        title: t.title,
        url: t.url,
        icon: t.icon ?? null,
        color: t.color ?? null,
        position: index + 1,
        enabled: 1,
      })),
    };

    const res = await fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Opslaan naar backend mislukt");
    }
  }

  /**
   * 3️⃣ Tile-acties (volledig DB-backed)
   */
  const addTile = async (tile: Omit<Tile, "id" | "order">) => {
    const newTile: Tile = {
      ...tile,
      id: generateId(),
      order: tiles.length + 1,
    };

    const updated = [...tiles, newTile];
    setTiles(updated);
    await saveToBackend(updated);
  };

  const updateTile = async (id: string, updates: Partial<Tile>) => {
    const updated = tiles.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTiles(updated);
    await saveToBackend(updated);
  };

  const deleteTile = async (id: string) => {
    const updated = tiles
      .filter((t) => t.id !== id)
      .map((t, index) => ({ ...t, order: index + 1 }));
    setTiles(updated);
    await saveToBackend(updated);
  };

  const reorderTiles = async (newOrder: Tile[]) => {
    const reordered = newOrder.map((t, index) => ({
      ...t,
      order: index + 1,
    }));
    setTiles(reordered);
    await saveToBackend(reordered);
  };

  return {
    tiles: [...tiles].sort((a, b) => a.order - b.order),
    theme,
    isLoading,
    addTile,
    updateTile,
    deleteTile,
    reorderTiles,
    saveTheme: async (newTheme: ThemeSettings) => {
      setTheme(newTheme);
      await saveToBackend(tiles);
    },
  };
}

/**
 * Helper: hex → HSL (voor CSS variables)
 */
function hexToHSL(hex: string): string {
  hex = hex.replace(/^#/, "");
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

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(
    l * 100
  )}%`;
}

import { useState, useEffect } from "react";
import { Tile, ThemeSettings } from "@/types/tile";

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
  tiles: any[];
};

export function useTileStore() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Stap 1: config laden uit backend (DB)
  useEffect(() => {
    fetch("/api/config")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load config");
        return res.json();
      })
      .then((data: ApiConfig) => {
        // Tiles
        setTiles(
          (data.tiles || []).map((t, index) => ({
            id: t.id,
            title: t.title,
            url: t.url,
            icon: t.icon,
            color: t.color,
            order: t.position ?? index + 1,
          }))
        );

        // Theme → omzetten naar jouw ThemeSettings
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

  // ✅ Theme toepassen op CSS-variabelen (dit blijft intact)
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--theme-primary", hexToHSL(theme.primaryColor));
    root.style.setProperty("--theme-secondary", hexToHSL(theme.secondaryColor));
    root.style.setProperty("--theme-background", hexToHSL(theme.backgroundColor));
    root.style.setProperty("--theme-text", hexToHSL(theme.textColor));
  }, [theme]);

  // ⛔️ Opslaan doen we LATER via backend (Admin-pagina)
  const addTile = () => {
    console.warn("addTile not implemented yet (DB-backed)");
  };

  const updateTile = () => {
    console.warn("updateTile not implemented yet (DB-backed)");
  };

  const deleteTile = () => {
    console.warn("deleteTile not implemented yet (DB-backed)");
  };

  const reorderTiles = () => {
    console.warn("reorderTiles not implemented yet (DB-backed)");
  };

  return {
    tiles: [...tiles].sort((a, b) => a.order - b.order),
    theme,
    isLoading,
    addTile,
    updateTile,
    deleteTile,
    reorderTiles,
    saveTheme: () => {
      console.warn("saveTheme not implemented yet (DB-backed)");
    },
  };
}

// Helper blijft exact hetzelfde
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

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

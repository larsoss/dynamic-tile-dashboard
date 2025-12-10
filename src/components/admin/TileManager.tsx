import { useState } from "react";
import { Tile } from "@/types/tile";
import { Button } from "@/components/ui/button";
import { TileFormDialog } from "./TileFormDialog";
import { SortableTileItem } from "./SortableTileItem";
import { useTileStore } from "@/hooks/useTileStore";

export function TileManager() {
  const {
    tiles,
    addTile,
    updateTile,
    deleteTile,
    reorderTiles,
  } = useTileStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTile, setEditingTile] = useState<Tile | null>(null);

  /**
   * ✅ EXPLICIETE save-handler
   * (dit voorkomt “t is not a function”)
   */
  const handleSaveTile = async (
    tile: Omit<Tile, "id" | "order">
  ) => {
    if (typeof addTile !== "function") {
      console.error("addTile is not a function", addTile);
      return;
    }

    if (editingTile) {
      await updateTile(editingTile.id, tile);
    } else {
      await addTile(tile);
    }

    setDialogOpen(false);
    setEditingTile(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingTile(null);
            setDialogOpen(true);
          }}
        >
          + Add Tile
        </Button>
      </div>

      {tiles.map((tile) => (
        <SortableTileItem
          key={tile.id}
          tile={tile}
          onEdit={() => {
            setEditingTile(tile);
            setDialogOpen(true);
          }}
          onDelete={() => deleteTile(tile.id)}
        />
      ))}

      <TileFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tile={editingTile}
        onSave={handleSaveTile}
      />
    </div>
  );
}

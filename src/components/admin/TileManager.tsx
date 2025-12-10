import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Tile } from '@/types/tile';
import { SortableTileItem } from './SortableTileItem';
import { TileFormDialog } from './TileFormDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TileManagerProps {
  tiles: Tile[];
  onAddTile: (tile: Omit<Tile, 'id' | 'order'>) => void;
  onUpdateTile: (id: string, updates: Partial<Tile>) => void;
  onDeleteTile: (id: string) => void;
  onReorder: (tiles: Tile[]) => void;
}

export function TileManager({
  tiles,
  onAddTile,
  onUpdateTile,
  onDeleteTile,
  onReorder,
}: TileManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTile, setEditingTile] = useState<Tile | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tiles.findIndex((t) => t.id === active.id);
      const newIndex = tiles.findIndex((t) => t.id === over.id);

      const newTiles = [...tiles];
      const [removed] = newTiles.splice(oldIndex, 1);
      newTiles.splice(newIndex, 0, removed);

      onReorder(newTiles);
    }
  };

  const handleEdit = (tile: Tile) => {
    setEditingTile(tile);
    setDialogOpen(true);
  };

  const handleSave = (tileData: Omit<Tile, 'id' | 'order'>) => {
    if (editingTile) {
      onUpdateTile(editingTile.id, tileData);
    } else {
      onAddTile(tileData);
    }
    setEditingTile(null);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingTile(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tile Management</h2>
          <p className="text-muted-foreground">Drag to reorder, click to edit</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tile
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tiles.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tiles.map((tile) => (
              <SortableTileItem
                key={tile.id}
                tile={tile}
                onEdit={handleEdit}
                onDelete={onDeleteTile}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {tiles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No tiles yet. Click "Add Tile" to create your first tile.</p>
        </div>
      )}

      <TileFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogChange}
        tile={editingTile}
        onSave={handleSave}
      />
    </div>
  );
}

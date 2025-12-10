import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tile, TILE_COLORS } from '@/types/tile';
import { Button } from '@/components/ui/button';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableTileItemProps {
  tile: Tile;
  onEdit: (tile: Tile) => void;
  onDelete: (id: string) => void;
}

export function SortableTileItem({
  tile,
  onEdit,
  onDelete,
}: SortableTileItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tile.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border',
        'bg-card border-border',
        'transition-shadow duration-200',
        isDragging && 'shadow-lg opacity-90'
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="touch-none p-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
        aria-label="Reorder tile"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Color indicator */}
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex-shrink-0',
          TILE_COLORS[tile.color]
        )}
      />

      {/* Title + URL */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate text-foreground">
          {tile.title || '—'}
        </h4>
        <p className="text-sm text-muted-foreground truncate">
          {tile.url}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-foreground"
          onClick={() => onEdit(tile)}
          aria-label="Edit tile"
        >
          <Pencil className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(tile.id)}
          aria-label="Delete tile"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

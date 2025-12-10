import { Tile } from '@/types/tile';
import { TileCard } from './TileCard';

interface TileGridProps {
  tiles: Tile[];
}

export function TileGrid({ tiles }: TileGridProps) {
  if (tiles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
        <p className="text-lg">No tiles yet. Add some from the admin panel.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {tiles.map((tile, index) => (
        <TileCard key={tile.id} tile={tile} index={index} />
      ))}
    </div>
  );
}

import { Tile, TILE_COLORS } from '@/types/tile';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart3,
  Megaphone,
  Lightbulb,
  FileText,
  BookOpen,
  Users,
  Calendar,
} from 'lucide-react';

interface TileCardProps {
  tile: Tile;
  index: number;
}

// Icon mapping based on tile title keywords
const getIconForTile = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('dashboard')) return LayoutDashboard;
  if (lowerTitle.includes('sales') || lowerTitle.includes('report')) return BarChart3;
  if (lowerTitle.includes('marketing') || lowerTitle.includes('plan')) return Megaphone;
  if (lowerTitle.includes('product') || lowerTitle.includes('development')) return Lightbulb;
  if (lowerTitle.includes('customer') && lowerTitle.includes('report')) return FileText;
  if (lowerTitle.includes('feedback') || lowerTitle.includes('book')) return BookOpen;
  if (lowerTitle.includes('team') || lowerTitle.includes('directory')) return Users;
  if (lowerTitle.includes('event') || lowerTitle.includes('calendar')) return Calendar;
  return LayoutDashboard;
};

export function TileCard({ tile, index }: TileCardProps) {
  const Icon = getIconForTile(tile.title);

  return (
    <a
      href={tile.url}
      className={cn(
        'group relative flex flex-col items-center justify-center aspect-square rounded-2xl p-6',
        'tile-shadow transition-all duration-300 ease-out',
        'hover:tile-shadow-hover hover:scale-[1.02] hover:-translate-y-1',
        'focus:outline-none focus:ring-4 focus:ring-primary/30',
        'animate-fade-in',
        TILE_COLORS[tile.color]
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Icon or Image */}
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
        {tile.icon ? (
          <img
            src={tile.icon}
            alt={tile.title}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
        ) : (
          <Icon className="w-16 h-16 text-foreground/80" strokeWidth={1.5} />
        )}
      </div>

      {/* Title */}
      <h3 className="text-center font-semibold text-lg leading-tight text-foreground/90">
        {tile.title}
      </h3>

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-2xl bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
    </a>
  );
}

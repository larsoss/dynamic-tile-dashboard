import { useState } from 'react';
import { Tile, TileColor, TILE_COLORS } from '@/types/tile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TileFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tile?: Tile | null;
  onSave: (tile: Omit<Tile, 'id' | 'order'>) => void;
}

const colorOptions: { value: TileColor; label: string }[] = [
  { value: 'gold', label: 'Gold' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'blue', label: 'Blue' },
  { value: 'coral', label: 'Coral' },
  { value: 'lavender', label: 'Lavender' },
];

export function TileFormDialog({ open, onOpenChange, tile, onSave }: TileFormDialogProps) {
  const [title, setTitle] = useState(tile?.title || '');
  const [url, setUrl] = useState(tile?.url || '');
  const [imageUrl, setImageUrl] = useState(tile?.imageUrl || '');
  const [color, setColor] = useState<TileColor>(tile?.color || 'gold');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, url, imageUrl, color });
    onOpenChange(false);
    // Reset form
    setTitle('');
    setUrl('');
    setImageUrl('');
    setColor('gold');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tile ? 'Edit Tile' : 'Add New Tile'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dashboard"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (optional)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/icon.png"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use a default icon based on the title
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Tile Color</Label>
            <Select value={color} onValueChange={(v) => setColor(v as TileColor)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${TILE_COLORS[option.value]}`} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

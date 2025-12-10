import { useState, useEffect } from "react";
import { Tile, TileColor, TILE_COLORS } from "@/types/tile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TileFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tile?: Tile | null;
  onSave: (tile: Omit<Tile, "id" | "order">) => Promise<void> | void;
}

const colorOptions: { value: TileColor; label: string }[] = [
  { value: "gold", label: "Gold" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "blue", label: "Blue" },
  { value: "coral", label: "Coral" },
  { value: "lavender", label: "Lavender" },
];

export function TileFormDialog({
  open,
  onOpenChange,
  tile,
  onSave,
}: TileFormDialogProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState<TileColor>("gold");

  // ✅ reset / preload when dialog opens
  useEffect(() => {
    if (tile) {
      setTitle(tile.title);
      setUrl(tile.url);
      setIcon(tile.icon ?? "");
      setColor(tile.color ?? "gold");
    } else {
      setTitle("");
      setUrl("");
      setIcon("");
      setColor("gold");
    }
  }, [tile, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof onSave !== "function") {
      console.error("onSave is not a function", onSave);
      return;
    }

    await onSave({
      title,
      url,
      icon: icon || undefined,
      color,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{tile ? "Edit Tile" : "Add New Tile"}</DialogTitle>
          <DialogDescription>
            Voeg een tegel toe aan je dashboard
          </DialogDescription>
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
            <Label htmlFor="icon">Image URL (optional)</Label>
            <Input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="https://example.com/icon.png"
            />
            <p className="text-xs text-muted-foreground">
              Laat leeg om automatisch een icoon te gebruiken
            </p>
          </div>

          <div className="space-y-2">
            <Label>Tile Color</Label>
            <Select
              value={color}
              onValueChange={(v) => setColor(v as TileColor)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded ${TILE_COLORS[option.value]}`}
                      />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

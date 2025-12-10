import { ThemeSettings, DEFAULT_THEME } from "@/types/tile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ThemeCustomizerProps {
  theme: ThemeSettings;
  onSave: (theme: ThemeSettings) => void;
}

export function ThemeCustomizer({ theme, onSave }: ThemeCustomizerProps) {
  // ✅ Defensieve guard BINNEN de component
  if (!theme) {
    return (
      <div className="text-muted-foreground p-4">
        Theme wordt geladen…
      </div>
    );
  }
  
  const handleChange = (
    key: keyof ThemeSettings,
    value: string
  ) => {
    onSave({
      ...theme,
      [key]: value,
    });
  };

  const handleReset = () => {
    onSave({
      ...DEFAULT_THEME,
      logoUrl: DEFAULT_THEME.logoUrl || "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Theme</h2>
          <p className="text-muted-foreground">
            Pas kleuren en teksten van je dashboard aan
          </p>
        </div>

        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Colors */}
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          ["primaryColor", "Primary color"],
          ["secondaryColor", "Secondary color"],
          ["backgroundColor", "Background color"],
          ["textColor", "Text color"],
        ].map(([key, label]) => (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-3">
              <Input
                type="color"
                value={theme[key as keyof ThemeSettings] as string}
                onChange={(e) =>
                  handleChange(
                    key as keyof ThemeSettings,
                    e.target.value
                  )
                }
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={theme[key as keyof ThemeSettings] as string}
                onChange={(e) =>
                  handleChange(
                    key as keyof ThemeSettings,
                    e.target.value
                  )
                }
                className="flex-1"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Site content */}
      <div className="pt-6 border-t border-border space-y-4">
        <div>
          <Label>Site naam</Label>
          <Input
            value={theme.welcomeTitle}
            onChange={(e) =>
              handleChange("welcomeTitle", e.target.value)
            }
            placeholder="Welkom"
          />
        </div>

        <div>
          <Label>Subtitel</Label>
          <Input
            value={theme.welcomeSubtitle}
            onChange={(e) =>
              handleChange("welcomeSubtitle", e.target.value)
            }
            placeholder="Jouw centrale dashboard"
          />
        </div>

        <div>
          <Label>Logo URL (optioneel)</Label>
          <Input
            value={theme.logoUrl || ""}
            onChange={(e) =>
              handleChange("logoUrl", e.target.value)
            }
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

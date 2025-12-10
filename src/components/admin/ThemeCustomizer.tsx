import { ThemeSettings } from '@/types/tile';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface ThemeCustomizerProps {
  theme: ThemeSettings;
  onSave: (theme: ThemeSettings) => void;
}

const DEFAULT_THEME: ThemeSettings = {
  primaryColor: '#E9B949',
  secondaryColor: '#A88CC8',
  backgroundColor: '#FFF5EB',
  textColor: '#2D3748',
};

export function ThemeCustomizer({ theme, onSave }: ThemeCustomizerProps) {
  const handleColorChange = (key: keyof ThemeSettings, value: string) => {
    onSave({ ...theme, [key]: value });
  };

  const handleReset = () => {
    onSave(DEFAULT_THEME);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Theme Customization</h2>
          <p className="text-muted-foreground">Customize colors for your tile grid</p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Default
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex gap-3">
            <Input
              type="color"
              id="primaryColor"
              value={theme.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Used for buttons and accents</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <div className="flex gap-3">
            <Input
              type="color"
              id="secondaryColor"
              value={theme.secondaryColor}
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.secondaryColor}
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Used for hover effects</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color</Label>
          <div className="flex gap-3">
            <Input
              type="color"
              id="backgroundColor"
              value={theme.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.backgroundColor}
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Main page background</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color</Label>
          <div className="flex gap-3">
            <Input
              type="color"
              id="textColor"
              value={theme.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={theme.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">Text throughout the site</p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8 p-6 rounded-xl border border-border bg-card">
        <h3 className="font-semibold mb-4">Preview</h3>
        <div 
          className="grid grid-cols-4 gap-3 p-4 rounded-lg"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <div 
            className="aspect-square rounded-lg flex items-center justify-center text-sm font-medium"
            style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
          >
            Primary
          </div>
          <div 
            className="aspect-square rounded-lg flex items-center justify-center text-sm font-medium"
            style={{ backgroundColor: theme.secondaryColor, color: '#fff' }}
          >
            Secondary
          </div>
          <div 
            className="aspect-square rounded-lg flex items-center justify-center text-sm font-medium border border-current"
            style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
          >
            Background
          </div>
          <div 
            className="aspect-square rounded-lg flex items-center justify-center text-sm font-medium"
            style={{ backgroundColor: theme.textColor, color: theme.backgroundColor }}
          >
            Text
          </div>
        </div>
      </div>
    </div>
  );
}

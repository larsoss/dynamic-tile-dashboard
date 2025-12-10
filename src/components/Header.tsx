import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSettings } from '@/types/tile';

interface HeaderProps {
  theme: ThemeSettings;
}

export function Header({ theme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          {theme.logoUrl ? (
            <img 
              src={theme.logoUrl} 
              alt={theme.siteName} 
              className="w-10 h-10 rounded-xl object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg">
                {theme.siteName?.charAt(0)?.toUpperCase() ?? ""}
              </span>
            </div>
          )}
          <span className="font-bold text-xl text-foreground">{theme.siteName}</span>
        </Link>

        <Link to="/admin">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Admin Panel</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}

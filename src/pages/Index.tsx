import { Header } from '@/components/Header';
import { TileGrid } from '@/components/TileGrid';
import { useTileStore } from '@/hooks/useTileStore';

const Index = () => {
  const { tiles, theme, isLoading } = useTileStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header theme={theme} />
      <main className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{theme.welcomeTitle}</h1>
          <p className="text-lg text-muted-foreground">
            {theme.welcomeSubtitle}
          </p>
        </div>
        <TileGrid tiles={tiles} />
      </main>
    </div>
  );
};

export default Index;

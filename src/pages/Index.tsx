import { Header } from '@/components/Header';
import { TileGrid } from '@/components/TileGrid';
import { useTileStore } from '@/hooks/useTileStore';

const Index = () => {
  const { tiles, isLoading } = useTileStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to TileHub</h1>
          <p className="text-lg text-muted-foreground">
            Your central navigation portal
          </p>
        </div>
        <TileGrid tiles={tiles} />
      </main>
    </div>
  );
};

export default Index;

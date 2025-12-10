import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutGrid, Palette } from 'lucide-react';
import { Header } from '@/components/Header';
import { TileManager } from '@/components/admin/TileManager';
import { ThemeCustomizer } from '@/components/admin/ThemeCustomizer';
import { useTileStore } from '@/hooks/useTileStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const {
    tiles,
    theme,
    isLoading,
    addTile,
    updateTile,
    deleteTile,
    reorderTiles,
    saveTheme,
  } = useTileStore();

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
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your tiles and customize the theme</p>
        </div>

        <Tabs defaultValue="tiles" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="tiles" className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Tiles
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tiles">
            <TileManager
              tiles={tiles}
              onAddTile={addTile}
              onUpdateTile={updateTile}
              onDeleteTile={deleteTile}
              onReorder={reorderTiles}
            />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeCustomizer theme={theme} onSave={saveTheme} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

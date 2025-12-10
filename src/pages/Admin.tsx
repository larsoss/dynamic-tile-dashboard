import { Link } from "react-router-dom";
import { ArrowLeft, LayoutGrid, Palette } from "lucide-react";
import { Header } from "@/components/Header";
import { TileManager } from "@/components/admin/TileManager";
import { ThemeCustomizer } from "@/components/admin/ThemeCustomizer";
import { useTileStore } from "@/hooks/useTileStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AdminLogin } from "@/components/AdminLogin";
import { useState } from "react";

const Admin = () => {
  // ✅ hooks horen HIER
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("adminToken"))
  );

  const { tiles, theme } = useTileStore();

  // ✅ niet ingelogd → login scherm
  if (!isAdmin) {
    return <AdminLogin onSuccess={() => setIsAdmin(true)} />;
  }

  // ✅ ingelogd → admin panel
  return (
    <div className="min-h-screen bg-background">
      <Header theme={theme} />

      <main className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage your tiles and customize the theme
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug
              </Button>
            </Link>

            <Button
              variant="destructive"
              onClick={() => {
                localStorage.removeItem("adminToken");
                location.reload();
              }}
            >
              Uitloggen
            </Button>
          </div>
        </div>

        <Tabs defaultValue="tiles">
          <TabsList>
            <TabsTrigger value="tiles">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Tiles
            </TabsTrigger>
            <TabsTrigger value="theme">
              <Palette className="mr-2 h-4 w-4" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tiles">
            <TileManager tiles={tiles} />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeCustomizer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

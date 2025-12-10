import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    if (!password) {
      setError("Vul een wachtwoord in");
      return;
    }

    // We slaan het wachtwoord op als token
    localStorage.setItem("adminToken", password);
    onSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Admin login</h1>

        <Input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <Button className="w-full" onClick={login}>
          Inloggen
        </Button>
      </Card>
    </div>
  );
}

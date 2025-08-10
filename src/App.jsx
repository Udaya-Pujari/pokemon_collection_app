import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Collection from "./components/Collection";

const queryClient = new QueryClient();

export default function App() {
  const [view, setView] = useState("discover");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-violet-400 p-6">
        <Header view={view} setView={setView} />
        <main className="max-w-6xl mx-auto">
          {view === "discover" ? <PokemonList /> : <Collection />}
        </main>
      </div>
    </QueryClientProvider>
  );
}


import React, { useEffect, useState } from "react";
import { getCollection, saveCollection } from "../utils/localStorageUtils";
import PokemonCard from "./PokemonCard";

export default function Collection() {
  const [collection, setCollection] = useState(getCollection());

  useEffect(() => {
    const update = () => setCollection(getCollection());
    window.addEventListener("collectionUpdated", update);
    return () => {
      window.removeEventListener("collectionUpdated", update);
    };
  }, []);

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("text/plain", String(idx));
  };

  const handleDrop = (e, idx) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    if (isNaN(fromIndex)) return;

    const updated = [...collection];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(idx, 0, moved);
    saveCollection(updated); // triggers update event
  };

  if (!collection.length) {
    return <p className="text-white">Your collection is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {collection.map((pokemon, idx) => (
        <div
          key={pokemon.name}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
          onDragOver={(e) => e.preventDefault()}
        >
          <PokemonCard pokemonData={pokemon} />
        </div>
      ))}
    </div>
  );
}

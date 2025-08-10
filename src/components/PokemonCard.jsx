import React, { useEffect, useState } from "react";
import {
  addToCollection,
  removeFromCollection,
  isInCollection,
} from "../utils/localStorageUtils";

export default function PokemonCard({ pokemonData, goToCollection }) {
  const pokemon = pokemonData;
  const [inCollection, setInCollection] = useState(
    isInCollection(pokemon.name)
  );

  const types = pokemon.types.map((t) => t.type.name);
  const stats = {
    hp: pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0,
    attack: pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0,
    defense:
      pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0,
  };

  useEffect(() => {
    const checkStatus = () => setInCollection(isInCollection(pokemon.name));
    window.addEventListener("collectionUpdated", checkStatus);
    return () => {
      window.removeEventListener("collectionUpdated", checkStatus);
    };
  }, [pokemon.name]);

  const handleClick = () => {
    if (inCollection) {
      removeFromCollection(pokemon.name);
    } else {
      addToCollection(pokemon);
      if (goToCollection) goToCollection();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition relative text-center">
      {/* Toggle Button */}
      <button
        onClick={handleClick}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
          inCollection ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {inCollection ? "×" : "+"}
      </button>

      {/* Image */}
      <div className="flex justify-center mb-3">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>

      {/* Types */}
      <div className="mt-2 flex justify-center gap-2 mb-3">
        {types.map((t) => (
          <span
            key={t}
            className={`text-xs px-2 py-1 rounded-full capitalize text-white ${
              t === "fire"
                ? "bg-red-500"
                : t === "water"
                ? "bg-cyan-400"
                : t === "grass"
                ? "bg-green-500"
                : t === "electric"
                ? "bg-yellow-400 text-black"
                : t === "psychic"
                ? "bg-pink-500"
                : t === "dragon"
                ? "bg-purple-600"
                : t === "flying"
                ? "bg-indigo-400"
                : t === "poison"
                ? "bg-purple-500"
                : "bg-gray-400"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-3 grid grid-cols-3 text-center text-sm">
        <div>
          <div className="text-xs text-gray-500">HP</div>
          <div className="font-semibold">{stats.hp}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">ATK</div>
          <div className="font-semibold">{stats.attack}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">DEF</div>
          <div className="font-semibold">{stats.defense}</div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getCollection } from "../utils/localStorageUtils";

export default function Header({ view, setView }) {
  const [count, setCount] = useState(getCollection().length);

  useEffect(() => {
    const updateCount = () => setCount(getCollection().length);
    window.addEventListener("collectionUpdated", updateCount);
    return () => {
      window.removeEventListener("collectionUpdated", updateCount);
    };
  }, []);

  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
        <span>🔥</span>
        <span>Pokemon Collection App</span>
      </h1>
      <p className="text-violet-100 mt-1 mb-4">
        Discover, collect, and organize your favorite Pokémon!
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setView("discover")}
          className={`px-4 py-2 rounded-full font-semibold ${
            view === "discover" ? "bg-white/20 text-white" : "bg-white text-purple-700"
          }`}
        >
          Discover Pokemon
        </button>
        <button
          onClick={() => setView("collection")}
          className={`px-4 py-2 rounded-full font-semibold ${
            view === "collection" ? "bg-white/20 text-white" : "bg-white text-purple-700"
          }`}
        >
          My Collection ({count})
        </button>
      </div>
    </header>
  );
}

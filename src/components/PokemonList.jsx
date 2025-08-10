import React, { useRef, useEffect } from "react";
import useInfinitePokemon from "../hooks/useInfinitePokemon";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfinitePokemon();
  const loaderRef = useRef();

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (status === "loading")
    return <p className="text-center text-white">Loading...</p>;
  if (status === "error")
    return <p className="text-center text-white">Error loading Pokémon.</p>;

  const pages = data.pages || [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pages
          .flatMap((page) => page.results)
          .map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemonData={pokemon} />
          ))}
      </div>

      <div ref={loaderRef} className="mt-6 text-center col-span-full">
        {isFetchingNextPage ? (
          <p className="text-white">Loading more Pokémon...</p>
        ) : hasNextPage ? (
          <p className="text-white/80">Scroll to load more</p>
        ) : (
          <p className="text-white/70">No more Pokémon</p>
        )}
      </div>
    </>
  );
}

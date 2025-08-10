import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_SIZE = 6;

async function fetchPokemonPage({ pageParam = 0 }) {
  // pageParam is offset
  const offset = pageParam;
  const listRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  const results = listRes.data.results;

  // fetch details for each pokemon in parallel
  const detailsRes = await Promise.all(results.map(r => axios.get(r.url).then(res => res.data)));
  return {
    results: detailsRes,
    nextOffset: offset + PAGE_SIZE,
    total: listRes.data.count,
  };
}

export default function useInfinitePokemon() {
  return useInfiniteQuery(
    ["pokemon", PAGE_SIZE],
    fetchPokemonPage,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextOffset >= lastPage.total) return undefined;
        return lastPage.nextOffset;
      }
    }
  );
}

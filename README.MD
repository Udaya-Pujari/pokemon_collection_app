# :atom_symbol: : Features

## 📃 Pokémon Discovery Page

- Infinite scrolling to load Pokémon in batches as you scroll down.
- Cards show name, image, types, and basic stats (HP, ATK, DEF).
- button to add to your collection (turns into a red × button when already added).

## 📃 Personal Collection Page

- Displays all Pokémon you’ve added.
- Drag-and-drop reordering.
- Persistent storage in localStorage so your collection remains after refresh.

## 📄 Header Collection Count

- Displays how many Pokémon are in your collection.
- Updates automatically when adding/removing Pokémon — without React Context.

## 🧑‍💻 Technology Stack

- React functional components & hooks.
- Tailwind CSS for styling.
- TanStack Query for fetching and caching Pokémon data.
- Intersection Observer for infinite scrolling.
- localStorage for persistence.

# 1. Discovery Flow

## When app loads:

- TanStack Query fetches the first 6 Pokémon from the PokéAPI.
- IntersectionObserver detects when the user scrolls near the bottom and triggers the next fetch (6 more).

## When user clicks +:

- The Pokémon object is saved to localStorage.
- A custom browser event collectionUpdated is dispatched.
- All components listening to collectionUpdated update automatically (like header count and card toggle state).

## When user clicks ×:

- Pokémon is removed from localStorage.
- Same collectionUpdated event updates relevant components.

## 2. Collection Flow

## When switching to "My Collection" tab:

- CollectionList reads Pokémon from localStorage.
- Displays them in current saved order.

## Reordering:

- Uses drag-and-drop (e.g., react-beautiful-dnd).
- On drop, the new order is saved back into localStorage.

# 3. Without Context API

- localStorage as the single source of truth.
- A collectionUpdated CustomEvent that’s dispatched every time collection changes:
  - window.dispatchEvent(new Event("collectionUpdated"));
- Components like Header and PokemonCard listen for this event:
  useEffect(() => {
  const updateCount = () => setCount(getCollection().length);
  window.addEventListener("collectionUpdated", updateCount);
  return () => window.removeEventListener("collectionUpdated", updateCount);
  }, []);

# 📁 Components Overview

## 🗄️ PokemonCard

- Displays Pokémon image, name, types, and stats.
- - button to add/remove from collection.
- Color-coded type badges.
- Listens for collectionUpdated to change toggle state instantly.

## 🗄️ DiscoveryList

- Uses TanStack Query to fetch Pokémon data.
- Renders PokemonCards in a grid.
- Implements infinite scrolling with Intersection Observer.

## 🗄️ CollectionList

- Reads Pokémon from localStorage.
- Renders them in draggable order.
- Saves order changes to localStorage.

## 🗄️ Header

- Shows app navigation and current collection count.
- Listens for collectionUpdated to refresh the count.

## 🗄️ localStorageUtils.js

- addToCollection(pokemon) – Adds a Pokémon.
- removeFromCollection(name) – Removes Pokémon by name.
- isInCollection(name) – Checks if Pokémon is in collection.
- getCollection() – Returns saved collection array.

# 🚀 How to Run

## Clone repository

git clone
cd pokemon-discovery

## Install dependencies

npm install

## Start development server

npm run dev

## 🖼️ Example UI Flow

- Open app → see first 6 Pokémon.
- Scroll → loads 6 more Pokémon automatically.
- Click + → Pokémon added to My Collection (count updates in header).
- Switch to My Collection tab → see saved Pokémon.
- Drag to reorder → refresh → order is preserved.

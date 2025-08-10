export const getCollection = () => {
  return JSON.parse(localStorage.getItem("pokemon_collection") || "[]");
};

export const saveCollection = (collection) => {
  localStorage.setItem("pokemon_collection", JSON.stringify(collection));
  window.dispatchEvent(new Event("collectionUpdated")); // 🔥 notify listeners
};

export const addToCollection = (pokemon) => {
  const collection = getCollection();
  if (!collection.some((p) => p.name === pokemon.name)) {
    saveCollection([...collection, pokemon]);
  }
};

export const removeFromCollection = (name) => {
  const updated = getCollection().filter((p) => p.name !== name);
  saveCollection(updated);
};

export const isInCollection = (name) => {
  return getCollection().some((p) => p.name === name);
};

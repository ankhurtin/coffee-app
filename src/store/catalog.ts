import { writable } from 'svelte/store';
import API from 'src/api/api';
import type { CoffeeItem } from 'src/types/catalog.t';

function createCatalogStore() {
  const { subscribe, update } = writable<CoffeeItem[]>([]);
  return {
    subscribe,
    add: async () => {
      const { id, uid, blend_name, origin, variety, notes, intensifier } = await API.getRandomCoffee();
      update((list) => [
        ...list,
        {
          id,
          uid,
          blendName: blend_name,
          origin,
          variety,
          notes: notes.split(','),
          intensifier
        }
      ]);
    }
  };
}

export const catalogStore = createCatalogStore();

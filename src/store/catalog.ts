import { writable } from 'svelte/store';
import API from 'src/api/api';
import type { CoffeeItem } from 'src/types/api';

function createCatalogStore() {
  const { subscribe, update } = writable<CoffeeItem[]>([]);
  return {
    subscribe,
    add: async () => {
      const coffee = await API.getRandomCoffee();
      update((list) => [...list, coffee]);
    }
  };
}

export const catalogStore = createCatalogStore();

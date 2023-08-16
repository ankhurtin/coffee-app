import type { CoffeeItem } from 'src/types/api';

export default {
  async getRandomCoffee(): Promise<CoffeeItem> {
    const data = await fetch('https://random-data-api.com/api/coffee/random_coffee');
    return await data.json();
  },
  async getRandomCoffeeImage(): Promise<Blob> {
    const data = await fetch('https://loremflickr.com/320/320/coffee,bean');
    return data.blob();
  }
};

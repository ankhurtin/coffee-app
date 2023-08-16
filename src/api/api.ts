import type { CoffeeResponseItem } from 'src/types/api.t';

export default {
  async getRandomCoffee(): Promise<CoffeeResponseItem> {
    const data = await fetch('https://random-data-api.com/api/coffee/random_coffee');
    return await data.json();
  },
  async getRandomCoffeeImage(): Promise<Blob> {
    const data = await fetch('https://loremflickr.com/320/320/coffee,bean');
    return data.blob();
  }
};

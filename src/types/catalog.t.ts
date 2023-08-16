import { type CoffeeResponseItem } from './api.t';

export interface CoffeeItem extends Omit<CoffeeResponseItem, 'notes' | 'blend_name'> {
  notes: string[];
  blendName: CoffeeResponseItem['blend_name'];
}

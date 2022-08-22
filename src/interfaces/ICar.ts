import { z } from 'zod';
import { zodVeicle } from './IVehicle';

const zodCar = zodVeicle.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = z.infer<typeof zodCar>;

export { zodCar };
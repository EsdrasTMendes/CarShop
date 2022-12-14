import { z } from 'zod';

const zodVeicle = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof zodVeicle>;

export { zodVeicle };
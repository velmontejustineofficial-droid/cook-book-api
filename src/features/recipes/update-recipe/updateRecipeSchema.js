import { z } from 'zod';

export const updateRecipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),
  description: z.string().min(5, 'Description must be at least 5 characters').optional(),
  category: z.string().optional(),
  time: z.string().optional(),
  image: z.string().url('Must be a valid URL').nullable().optional(),

  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, 'Ingredient name cannot be empty'),
        amount: z.string().optional().nullable(),
      })
    )
    .optional(),

  steps: z
    .array(z.string().min(1, 'Step instruction cannot be empty'))
    .optional(),
});
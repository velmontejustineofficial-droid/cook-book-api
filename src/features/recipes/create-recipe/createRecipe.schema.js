import { z } from 'zod'

export const createRecipeSchema = z.object({
  title: z
    .string({ required_error: 'Recipe title is required' })
    .min(3, 'Title must be at least 3 characters'),

  description: z
    .string({ required_error: 'Recipe description is required' })
    .min(5, 'Description must be at least 5 characters'),

  category: z.string().optional().default('Filipino'),
  time: z.string().optional().default('—'),
  image: z.string().url('Image must be a valid URL').nullable().optional(),

  // Validation para sa Ingredients
  ingredients: z
    .array(
      z.union([
        z.string().min(1, 'Ingredient name cannot be empty'),
        z.object({
          name: z.string().min(1, 'Ingredient name cannot be empty'),
          amount: z.string().optional().nullable(),
        }),
      ])
    )
    .min(1, 'At least 1 ingredient is required'),

  // Validation para sa Steps
  steps: z
    .array(z.string().min(1, 'Step instruction cannot be empty'))
    .min(1, 'At least 1 instruction step is required'),
})
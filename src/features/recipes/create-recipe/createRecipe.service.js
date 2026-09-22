import pool from '../../../core/config/database.js'
import { saveRecipe } from '../shared/repository/saveRecipe.repository.js'
import { saveIngredients } from '../shared/repository/saveIngredients.repository.js'
import { saveSteps } from '../shared/repository/saveSteps.repository.js'

import { createRecipeSchema } from './createRecipe.schema.js'

export async function createRecipeService(recipeData) {
  // 1. SCHEMA VALIDATION
  // Pag may mali sa input, mag-t-throw ito ng ZodError at hihinto agad dito
  const validatedData = createRecipeSchema.parse(recipeData)
  
  // 1. Get a dedicated client for the transaction
  const client = await pool.connect()

  try {
    // Start transaction
    await client.query('BEGIN')

    // 2. Insert Base Recipe
    const savedRecipe = await saveRecipe(client, validatedData)

    // 3. Insert Ingredients using the new recipe ID
    const savedIngredients = await saveIngredients(client, savedRecipe.id, validatedData.ingredients)

    // 4. Insert Steps using the new recipe ID
    const savedSteps = await saveSteps(client, savedRecipe.id, validatedData.steps)

    // Commit transaction if all queries succeed
    await client.query('COMMIT')

    // 5. Return the aggregated result
    return {
      ...savedRecipe,
      ingredients: savedIngredients,
      steps: savedSteps,
    }
  } catch (error) {
    // Rollback everything if any step fails (e.g., missing title, duplicate step)
    await client.query('ROLLBACK')
    throw error
  } finally {
    // Always release the client back to the pool
    client.release()
  }
}
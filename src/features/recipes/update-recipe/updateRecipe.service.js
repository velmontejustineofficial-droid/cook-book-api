// src/features/recipes/update-recipe/updateRecipe.service.js
import pool from '../../../core/config/database.js';
import { updateRecipeSchema } from "./updateRecipeSchema.js";

// Individual repository imports
import { updateRecipe } from "../shared/repository/updateRecipe.repository.js";
import { deleteIngredientsByRecipeId } from '../shared/repository/deleteIngredientsByRecipeId.repository.js';
import { deleteStepsByRecipeId } from '../shared/repository/deleteStepsByRecipeId.repository.js';
import { saveIngredients } from '../shared/repository/saveIngredients.repository.js';
import { saveSteps } from '../shared/repository/saveSteps.repository.js';

export async function updateRecipeService(id, recipeData) {
  const validatedData = updateRecipeSchema.parse(recipeData);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const updatedRecipe = await updateRecipe(client, id, validatedData);

    if (!updatedRecipe) {
      throw new Error('Recipe not found');
    }

    let updatedIngredients = [];
    let updatedSteps = [];

    if (validatedData.ingredients) {
      await deleteIngredientsByRecipeId(client, id);
      updatedIngredients = await saveIngredients(client, id, validatedData.ingredients);
    }

    if (validatedData.steps) {
      await deleteStepsByRecipeId(client, id);
      updatedSteps = await saveSteps(client, id, validatedData.steps);
    }

    await client.query('COMMIT');

    return {
      ...updatedRecipe,
      ingredients: updatedIngredients,
      steps: updatedSteps,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
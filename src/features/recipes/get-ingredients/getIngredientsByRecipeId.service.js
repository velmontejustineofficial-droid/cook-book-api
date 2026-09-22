import pool from '../../../core/config/database.js';
import { findIngredientsByRecipeId } from '../shared/repository/findIngredientsByRecipeId.repository.js';

export async function getIngredientsByRecipeIdService(recipeId) {
  const client = await pool.connect();

  try {
    // Nagbabalik ng listahan ng ingredients batay sa recipeId
    return await findIngredientsByRecipeId(client, recipeId);
  } finally {
    client.release();
  }
}
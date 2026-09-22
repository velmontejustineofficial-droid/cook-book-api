import pool from '../../../core/config/database.js';
import { deleteRecipe } from '../shared/repository/deleteRecipe.repository.js';

export async function deleteRecipeService(id) {
  const client = await pool.connect();

  try {
    const deletedRecipe = await deleteRecipe(client, id);

    if (!deletedRecipe) {
      throw new Error('Recipe not found');
    }

    return deletedRecipe;
  } finally {
    client.release();
  }
}
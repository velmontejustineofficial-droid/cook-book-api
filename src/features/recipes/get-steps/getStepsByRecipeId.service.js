import pool from '../../../core/config/database.js';
import { findStepsByRecipeId } from '../shared/repository/findStepsByRecipeId.repository.js';

export async function getStepsByRecipeIdService(recipeId) {
  const client = await pool.connect();

  try {
    // Kukunin ang mga hakbang para sa partikular na recipeId
    return await findStepsByRecipeId(client, recipeId);
  } finally {
    client.release(); // Kina-release ang connection para hindi mag-hang ang server
  }
}
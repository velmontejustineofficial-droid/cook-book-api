import pool from '../../../core/config/database.js';
import { findAllRecipes } from '../shared/repository/findAllRecipes.repository.js';

export async function getAllRecipesService() {
  const client = await pool.connect();

  try {
    // Nagbabalik lang ng listahan ng recipes na WALANG ingredients at steps
    return await findAllRecipes(client);
  } finally {
    client.release();
  }
}
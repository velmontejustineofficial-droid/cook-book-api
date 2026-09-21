import pool from "../../../core/config/database.js";
import RecipeModel from "../model/RecipeModel.js";

export async function createRecipe(data) {
    const recipe = RecipeModel(data.title, data.description, data.ingredients, data.category, data.time, data.image, data.ownerId);

    const result = await pool.query(
        "INSERT INTO recipes (title, description, ingredients, category, time, image, owner_id) VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7) RETURNING * ",
        [recipe.title, recipe.description, JSON.stringify(recipe.ingredients), recipe.category, recipe.time, recipe.image, recipe.ownerId],
    );

    return result.rows[0];
}


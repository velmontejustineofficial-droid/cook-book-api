import pool from "../../../core/config/database.js";
import RecipeModel from "../model/RecipeModel.js";

export async function createRecipe(data) {
    const recipe = RecipeModel(data.title, data.description, data.ingredients);

    const result = await pool.query(
        `
            INSERT INTO recipes (title, description, ingredients)
            VALUES ($1, $2, $3::jsonb)
            RETURNING *
        `,
        [recipe.title, recipe.description, JSON.stringify(recipe.ingredients)],
    );

    return result.rows[0];
}


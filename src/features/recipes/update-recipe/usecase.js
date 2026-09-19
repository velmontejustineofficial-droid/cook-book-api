import pool from "../../../core/config/database.js";
import RecipeModel from "../model/RecipeModel.js";

export async function updateRecipe(id, data) {
    if (!id) {
        throw new Error("Recipe id is required");
    }

    const recipe = RecipeModel(
        data.title,
        data.description,
        data.ingredients,
    );

    const result = await pool.query(
        "UPDATE recipes SET title = $1, description = $2, ingredients = $3::jsonb, updated_at = NOW() WHERE id = $4 RETURNING * ", [recipe.title, recipe.description, JSON.stringify(recipe.ingredients), id, ],
    );

    return result.rows[0] || null;
}

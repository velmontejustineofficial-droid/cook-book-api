import pool from "../../../core/config/database.js";
import RecipeModel from "../model/RecipeModel.js";

export async function updateRecipe(id, data) {
    if (!id) {
        throw new Error("Recipe id is required");
    }
    if (!data.ownerId) {
        throw new Error("Recipe owner is required");
    }

    const recipe = RecipeModel(
        data.title,
        data.description,
        data.ingredients,
        data.category,
        data.time,
        data.image,
        data.ownerId,
    );

    const result = await pool.query(
        "UPDATE recipes SET title = $1, description = $2, ingredients = $3::jsonb, category = $4, time = $5, image = $6, updated_at = NOW() WHERE id = $7 AND owner_id = $8 RETURNING * ", [recipe.title, recipe.description, JSON.stringify(recipe.ingredients), recipe.category, recipe.time, recipe.image, id, recipe.ownerId],
    );

    return result.rows[0] || null;
}

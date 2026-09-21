import pool from "../../../core/config/database.js";

export async function deleteRecipe(id, ownerId) {
    if (!id) {
        throw new Error("Recipe id is required");
    }
    if (!ownerId) {
        throw new Error("Recipe owner is required");
    }

    const result = await pool.query(
        "DELETE FROM recipes WHERE id = $1 AND owner_id = $2 RETURNING *",
        [id, ownerId],
    );

    return result.rows[0] || null;
}

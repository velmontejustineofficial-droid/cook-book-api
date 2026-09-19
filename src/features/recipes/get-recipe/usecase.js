import pool from "../../../core/config/database.js";

export async function getRecipe(id) {
    if (!id) {
        throw new Error("Recipe id is required");
    }

    const result = await pool.query(
        "SELECT * FROM recipes WHERE id = $1 LIMIT 1",
        [id],
    );

    return result.rows[0] || null;
}

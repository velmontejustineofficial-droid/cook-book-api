import pool from "../../../core/config/database.js";

export async function getAllRecipes() {
    const result = await pool.query(
        "SELECT * FROM recipes ORDER BY created_at DESC",
    );

    return result.rows;
}

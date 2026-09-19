import pool from "./database.js";

let initializationPromise;

export async function initializeDatabase() {
    if (!initializationPromise) {
        initializationPromise = (async () => {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS recipes (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            title VARCHAR(255) NOT NULL UNIQUE,
            description TEXT NOT NULL,
            ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            CONSTRAINT recipes_ingredients_array CHECK (
                jsonb_typeof(ingredients) = 'array'
            )
        )
            `);

            await pool.query(`
        INSERT INTO recipes (title, description, ingredients)
        VALUES
            (
                'Adobo',
                'A Filipino dish of meat braised in soy sauce, vinegar, garlic, and peppercorns.',
                '["chicken", "soy sauce", "vinegar", "garlic", "bay leaves", "black peppercorns"]'::jsonb
            ),
            (
                'Pakbet',
                'A Filipino vegetable dish cooked with pork, shrimp paste, and a mix of local vegetables.',
                '["pork", "shrimp paste", "bitter melon", "eggplant", "okra", "squash", "tomato"]'::jsonb
            )
        ON CONFLICT (title) DO NOTHING
            `);

            console.log("Database tables initialized");
        })();
    }

    return initializationPromise;
}

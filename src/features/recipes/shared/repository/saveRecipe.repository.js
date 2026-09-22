export async function saveRecipe(client, recipeData) {
  const query = `
    INSERT INTO recipes (title, description, category, time, image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, title, description, category, time, image, created_at, updated_at;
  `;

  const values = [
    recipeData.title,
    recipeData.description || null,
    recipeData.category || null,
    recipeData.time || null,
    recipeData.image || null,
  ];

  const result = await client.query(query, values);
  return result.rows[0];
}
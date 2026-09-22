export async function updateRecipe(client, id, recipeData) {
  const query = `
    UPDATE recipes
    SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      category = COALESCE($3, category),
      time = COALESCE($4, time),
      image = COALESCE($5, image),
      updated_at = NOW()
    WHERE id = $6
    RETURNING id, title, description, category, time, image, updated_at;
  `;

  const values = [
    recipeData.title || null,
    recipeData.description || null,
    recipeData.category || null,
    recipeData.time || null,
    recipeData.image || null,
    id,
  ];

  const result = await client.query(query, values);
  return result.rows[0] || null;
}
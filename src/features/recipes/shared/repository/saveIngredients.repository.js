
export async function saveIngredients(client, recipeId, ingredients) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return []
  }

  const query = `
    INSERT INTO recipe_ingredients (recipe_id, name, amount)
    VALUES ($1, $2, $3)
    RETURNING name, amount
  `
  
  const savedIngredients = []

  for (const item of ingredients) {
    const name = typeof item === 'string' ? item : item.name
    const amount = typeof item === 'string' ? null : item.amount || null

    const result = await client.query(query, [recipeId, name, amount])
    savedIngredients.push(result.rows[0])
  }

  return savedIngredients
}
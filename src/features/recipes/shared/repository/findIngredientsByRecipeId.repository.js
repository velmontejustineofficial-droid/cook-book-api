export async function findIngredientsByRecipeId(client, recipeId) {
  const query = `
    SELECT * 
    FROM recipe_ingredients 
    WHERE recipe_id = $1 
    ORDER BY id ASC;
  `;
  
  const result = await client.query(query, [recipeId]);
  return result.rows;
}
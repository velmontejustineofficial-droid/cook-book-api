export async function deleteIngredientsByRecipeId(client, recipeId) {
  const query = `DELETE FROM recipe_ingredients WHERE recipe_id = $1;`;
  await client.query(query, [recipeId]);
}
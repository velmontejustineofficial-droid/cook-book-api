export async function deleteStepsByRecipeId(client, recipeId) {
  const query = `DELETE FROM recipe_steps WHERE recipe_id = $1;`;
  await client.query(query, [recipeId]);
}
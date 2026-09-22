export async function findStepsByRecipeId(client, recipeId) {
  const query = `
    SELECT 
      id,
      recipe_id,
      step_number,
      instruction
    FROM recipe_steps
    WHERE recipe_id = $1
    ORDER BY step_number ASC;
  `;

  const result = await client.query(query, [recipeId]);
  return result.rows;
}
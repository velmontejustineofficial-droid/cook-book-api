export async function findAllRecipes(client) {
  const query = `
    SELECT 
      id, 
      title, 
      description, 
      category, 
      time, 
      image, 
      created_at, 
      updated_at
    FROM recipes
    ORDER BY created_at DESC;
  `;

  const result = await client.query(query);
  return result.rows;
}
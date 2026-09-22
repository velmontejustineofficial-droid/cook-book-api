export async function deleteRecipe(client, id) {
  const query = `
    DELETE FROM recipes
    WHERE id = $1
    RETURNING id, title;
  `;

  const result = await client.query(query, [id]);
  
  // Magbabalik ng deleted recipe (o null kapag walang nahanap na ID)
  return result.rows[0] || null;
}
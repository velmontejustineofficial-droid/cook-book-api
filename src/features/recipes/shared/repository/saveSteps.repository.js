export async function saveSteps(client, recipeId, steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return []
  }

  const query = `
    INSERT INTO recipe_steps (recipe_id, step_number, instruction)
    VALUES ($1, $2, $3)
    RETURNING step_number, instruction
  `
  
  const savedSteps = []

  for (let i = 0; i < steps.length; i++) {
    const stepNumber = i + 1
    const instruction = steps[i]

    const result = await client.query(query, [recipeId, stepNumber, instruction])
    savedSteps.push(result.rows[0])
  }

  return savedSteps
}
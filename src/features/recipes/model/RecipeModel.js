const RecipeModel = (title, description, ingredients) => {

  if (!title) {
    throw new Error('Recipe title is required');
  }
  if (!description) {
    throw new Error('Recipe description is required');
  }
  if (!Array.isArray(ingredients)) {
    throw new Error('Ingredients must be an array');
  }

  return {
    title: title || '',
    description: description || '',
    ingredients: ingredients || [],
    createdAt: new Date(),
  };
};

export default RecipeModel;
const RecipeModel = (title, description, ingredients, category = 'Filipino', time = '—', image = null, ownerId = 'community') => {

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
    category,
    time,
    image,
    ownerId,
    createdAt: new Date(),
  };
};

export default RecipeModel;
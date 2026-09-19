import RecipeModel from '../model/RecipeModel.js';

export async function createRecipe(data) {

    return RecipeModel(data.title, data.description, data.ingredients);
}


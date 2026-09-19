import RecipeModel from "../model/RecipeModel.js";

export async function updateRecipe(id, data) {
    if (!id) {
        throw new Error("Recipe id is required");
    }

    const recipe = RecipeModel(
        data.title,
        data.description,
        data.ingredients,
    );

    return {
        id,
        ...recipe,
        updatedAt: new Date(),
    };
}

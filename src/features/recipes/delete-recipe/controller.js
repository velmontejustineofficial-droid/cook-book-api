import { errorResponse, successResponse } from "../../../core/http/responses/response.js";
import { deleteRecipe } from "./usecase.js";

export async function deleteRecipeController(req, res) {
    try {
        const recipe = await deleteRecipe(req.params.id, req.body.ownerId);

        if (!recipe) {
            return errorResponse(res, "Recipe not found or you do not own it", 404);
        }

        return successResponse(res, recipe, "Recipe deleted successfully");
    } catch (error) {
        return errorResponse(res, "Failed to delete recipe", 400, error.message);
    }
}

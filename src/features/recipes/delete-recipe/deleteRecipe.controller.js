import { errorResponse, successResponse } from "../../../core/http/responses/response.js";
import { deleteRecipeService } from "./deleteRecipe.service.js";

export async function deleteRecipeController(req, res) {
    try {
        const recipe = await deleteRecipeService(req.params.id);

        if (!recipe) {
            return errorResponse(res, "Recipe not found or you do not own it", 404);
        }

        return successResponse(res, recipe, "Recipe deleted successfully");
    } catch (error) {
        return errorResponse(res, "Failed to delete recipe", 400, error.message);
    }
}

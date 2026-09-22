import { successResponse, errorResponse } from '../../../core/http/responses/response.js';
import { getAllRecipesService } from './getAllRecipes.service.js';

export async function getAllRecipesController(req, res) {
  try {
    // 1. Tawagin ang service layer para makuha ang listahan ng recipes
    const recipes = await getAllRecipesService();

    // 2. Ibalik ang tagumpay na response (200 OK)
    return successResponse(res, recipes, "Recipes retrieved successfully", 200);

  } catch (error) {
    // 3. Handling kung magkaroon ng database o server error (500 Internal Server Error)
    return errorResponse(res, "Failed to retrieve recipes", 500, error.message);
  }
}
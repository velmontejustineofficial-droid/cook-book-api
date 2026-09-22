import { successResponse, errorResponse } from '../../../core/http/responses/response.js';
import { getIngredientsByRecipeIdService } from './getIngredientsByRecipeId.service.js';

export async function getIngredientsByRecipeIdController(req, res) {
  try {
    // Dahil '/ingredients/:id' ang nasa router, 'id' ang kunin sa req.params!
    const { id } = req.params; 

    const ingredients = await getIngredientsByRecipeIdService(id);

    return successResponse(res, ingredients, "Ingredients retrieved successfully", 200);
  } catch (error) {
    return errorResponse(res, "Failed to retrieve ingredients", 500, error.message);
  }
}
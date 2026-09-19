import { errorResponse } from "../responses/response.js";

export function notFound(req, res) {
    return errorResponse(
        res,
        `Route not found: ${req.method} ${req.originalUrl}`,
        404,
    );
}

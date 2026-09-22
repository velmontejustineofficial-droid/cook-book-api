export function successResponse(res, data = null, message = "Request successful", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(res, message = "Something went wrong", statusCode = 500, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    // Kung ang 'errors' na ipinasa ay isang Error instance, kunin ang message nito
    errors: errors instanceof Error ? errors.message : errors,
    timestamp: new Date().toISOString(),
  });
}
// utils/response.util.js

/**
 * Generate a standardized API response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Whether the request was successful
 * @param {string} message - Response message
 * @param {object} [data] - Optional data object
 */
export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  const response = { success, message };
  if (data) response.data = data;
  res.status(statusCode).json(response);
};

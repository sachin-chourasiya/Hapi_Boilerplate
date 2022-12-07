const { isEmpty } = require('lodash');
const ErrorHandler = require('../utils/ErrorHandler');
const BaseController = require('./BaseController');
const User = require('../models/user');

/**
 * This controller contains all the handlers for /auth route.
 */
class AuthController extends BaseController {
  /**
   * This method will verify the user after decoding jwt token present in header or query params
   * It is used as the validate function in hapi-jwt2-auth
   * @param {Object} decoded  : decoded jwt token with payload
   * @param {*} request
   * @param {*} h
   */
  static async validateUserToken(decoded, request, h) {
    try {
      /* find routes to skip user validation and return true */
      const skipValidationForRoutes =
        process.env.SKIP_USER_VALIDATION_ON_ROUTES.split(',');
      if (skipValidationForRoutes.includes(request.path)) {
        return { isValid: true };
      }

      const user = await super.find(User, { email: decoded.email });
      if (isEmpty(user)) {
        request.logger.error(`User not found `);
        return {
          isValid: false,
          response: h
            .response({
              error: 'User does not exists',
              message: 'User Not found',
              statusCode: 404,
            })
            .code(404),
        };
      } else {
        request.user = user;
        request.logger.info(`Successfully validate the user`);
        return { isValid: true };
      }
    } catch (error) {
      request.logger.error(
        `Getting in AuthController.validateUserToken :${error}`,
      );
      return ErrorHandler.error(error);
    }
  }
}

module.exports = AuthController;

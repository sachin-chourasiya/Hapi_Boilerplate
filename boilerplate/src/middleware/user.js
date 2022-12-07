const ErrorHandler = require('../utils/ErrorHandler');

/**
 * This method is responsible to check admin role
 * Get user role from request and check admin role exist or not.
 * Its work like middleware
 * pre is emit before handler method
 */
const admin = {
  assign: 'ADMIN',
  method: async (request, h) => {
    try {
      /**
       * Write code here for check admin role of user
       */
      return h.continue;
    } catch (err) {
      global.logger().error('Error in user.middleware.admin', err);
      return ErrorHandler.error(err);
    }
  },
};

/**
 * This method is responsible to check developer role
 * Get user role from request and check developer role exist or not.
 * Its work like middleware
 * pre is emit before handler method
 */
const developer = {
  assign: 'DEVELOPER',
  method: async (request, h) => {
    try {
      /**
       * Write code here for check developer role of user
       */
      return h.continue;
    } catch (err) {
      global.logger().error('Error in user.middleware.developer', err);
      return ErrorHandler.error(err);
    }
  },
};

module.exports = {
  admin,
  developer,
};

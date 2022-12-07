const ErrorHandler = require('../utils/ErrorHandler');
const UserService = require('../services/user');
const { get } = require('lodash');

const userService = new UserService();


// const serviceSave = new ();
class BaseController {
  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} modal
   * @return {*} result
   */
  static async findById(modal, id, select = '') {
    try {

      global
        .logger()
        .info(
          `BaseController.findById method called with modal:${modal.modelName}`,
        );
      const result = await modal.findById(id, select).lean();
      return result;
    } catch (error) {
      global.logger().error('Error in BaseController.findById', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} modal
   * @return {*} result
   */
  static async find(modal, where, options = {}) {
    try {
      global
        .logger()
        .info(
          `BaseController.find method called with modal:${modal.modelName}`,
        );
      let result;
      if (options.populate) {
        const populate = options.populate;
        delete options.populate;
        result = await modal.find(where, options).populate(populate).lean();
      } else {
        result = await modal.find(where, options).lean();
      }
      return result;
    } catch (error) {
      modal.logger().error('Error in BaseController.find', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async save(Modal, data) {
    try {

      Modal.logger.info(
        `BaseController.create method called with modal`,
      );

      const result = await userService.save(Modal.payload);
      return data.response({
       message: "Insert successfully"
      })
    } catch (error) {
      Modal.logger.error('Error in BaseController.create', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async updateOne(request, h) {
    try {

      const payload = request.payload;
      const userDetail = userService.findByUserId(payload.userId);
      const userId = get(payload, 'userId', userDetail.userId);
      const email = get(payload, 'email', userDetail.email);
      const number = get(payload, 'number', userDetail.number);
      const name = get(payload, 'name', userDetail.name);
      // global
      //   .logger()
      //   .info(
      //     `BaseController.update method called with modal:${modal.modelName}`,
      //   );
      if (request.payload.userId === undefined) {
        return h.response({ message: "Please fill id" });
      }
      const result = await userService.update(userId, {
        email,
        number,
        name
      });
      if (result.modifiedCount === 0) {
        return h.response({ message: "Id not found ! please fill valid user Id" });
      }
      return h.response({ result: result, message: "up-to-date" });
    } catch (error) {
      // global.logger().error('Error in BaseController.updateOne', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async updateMany(modal, where, data) {
    try {
      // global
      //   .logger()
      //   .info(
      //     `BaseController.update method called with modal:${modal.modelName}`,
      //   );
      await modal.updateMany(where, data, {
        new: true,
        safe: true,
        multi: true,
      });
      const result = modal.find(where);
      return result;
    } catch (error) {
      // global.logger().error('Error in BaseController.updateMany', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async deleteOne(modal, h) {
    try {
      // global
      //   .logger()
      //   .info(
      //     `BaseController.deleteOne method called with modal:${modal.modelName}`,
      //   );
      const userId = modal.query.userId || modal.payload.userId;
      
      const result = await userService.deleteByUserId(userId);
      if (result.deletedCount === 0) {
        return h.response({ message: "data not found " })
      }
      return h.response({ message: "data deleted successfully" });
    } catch (error) {
      // global.logger().error('Error in BaseController.deleteOne', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async deleteMany(modal, where) {
    try {
      global
        .logger()
        .info(
          `BaseController.deleteMany method called with modal:${modal.modelName}`,
        );
      await modal.deleteMany(where);
      const result = modal.find(where);
      return result;
    } catch (error) {
      global.logger().error('Error in BaseController.deleteMany', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async pagination(request, h) {
    try {
      // global
      //   .logger()
      //   .info(
      //     `BaseController.pagination method called with modal:${modal.modelName}`,
      //   );

      const query = await userService.fetch(request);
      return h.response({
        statusCode: 200,
        message: 'records fetched successfully',
        data: query
      });
      /*
      if (options.sort) {
        for (const item in options.sort) {
          options.sort[item] = parseInt(options.sort[item]);
        }
        query.push({ $sort: options.sort });
      }

      if (lookups.length > 0) {
        lookups.forEach((element) => {
          query.push(element);
        });
      }
      query.push(
        {
          $group: {
            _id: null,
            // get a count of every result that matches until now
            count: { $sum: 1 },
            // keep our results for the next operation
            results: { $push: '$$ROOT' },
          },
        },
        // and finally trim the results to within the range given by start/endRow
        {
          $project: {
            count: 1,
            rows: { $slice: ['$results', options.offset, options.limit] },
          },
        },
      );

      const [result] = await modal.aggregate(query);
      // return where.response(query)
      return {
        docs: result ? result.rows : [],
        total: result ? result.count : 0,
        limit: options.limit,
        offset: options.offset,
      };*/
    } catch (error) {
      // global.logger().error('Error in BaseController.pagination', error);
      return ErrorHandler.error(error);
    }
  }
}
module.exports = BaseController;

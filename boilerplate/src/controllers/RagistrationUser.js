const ErrorHandler = require('../utils/ErrorHandler');
const RagistrationServices = require('../services/ragistration');

const RagistrationService = new RagistrationServices();


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
      global.logger().error('Error in BaseController.find', error);
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
        
        const result = await RagistrationService.save(Modal.payload);
      return data.response({
        statuscode: 200,
        message:"Save",
        data:result
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
  static async updateOne(modal, where, data, isUpsert = false) {
    try {
      global
        .logger()
        .info(
          `BaseController.update method called with modal:${modal.modelName}`,
        );
      const result = await modal.findOneAndUpdate(where, data, {
        new: true,
        safe: true,
        multi: true,
        upsert: isUpsert,
        setDefaultsOnInsert: isUpsert,
      });
      return result;
    } catch (error) {
      global.logger().error('Error in BaseController.updateOne', error);
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
      global
        .logger()
        .info(
          `BaseController.update method called with modal:${modal.modelName}`,
        );
      await modal.updateMany(where, data, {
        new: true,
        safe: true,
        multi: true,
      });
      const result = modal.find(where);
      return result;
    } catch (error) {
      global.logger().error('Error in BaseController.updateMany', error);
      return ErrorHandler.error(error);
    }
  }

  /**
   * Get data by given query
   * @param {Modal query} DB query
   * @param {DB modal} data
   * @return {*} result
   */
  static async deleteOne(modal, where) {
    try {
      global
        .logger()
        .info(
          `BaseController.deleteOne method called with modal:${modal.modelName}`,
        );
      const result = await modal.findOneAndDelete(where);
      return result;
    } catch (error) {
      global.logger().error('Error in BaseController.deleteOne', error);
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
  static async pagination(modal, where, options, lookups) {
    try {
      global
        .logger()
        .info(
          `BaseController.pagination method called with modal:${modal.modelName}`,
        );

      const query = [{ $match: where }];

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

      return {
        docs: result ? result.rows : [],
        total: result ? result.count : 0,
        limit: options.limit,
        offset: options.offset,
      };
    } catch (error) {
      global.logger().error('Error in BaseController.pagination', error);
      return ErrorHandler.error(error);
    }
  }
}
module.exports = BaseController;

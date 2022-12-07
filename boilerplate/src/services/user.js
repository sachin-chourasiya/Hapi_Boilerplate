const User = require('../models/user');

class UserService {

  async save(user) {
    await User.create(user);
  }

  async fetch(request) {
    const queryBuilder = await request.parsedQuery;

    const { where, options } = queryBuilder || {};
    // options.limit = 5;
    return await User.paginate(where, options);
  }

  async update(userId, user) {
    const uId = { userId: userId };
    return await User.updateOne(uId, user);
  }

  async findByUserId(userId) {
    return await User.findOne({ userId: userId });
  }

  async deleteByUserId(userId) {
    const idUser = {userId:userId}
    return await User.deleteOne(idUser);
  }
}

module.exports = UserService;

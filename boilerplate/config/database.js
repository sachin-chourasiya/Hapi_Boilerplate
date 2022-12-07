const mongoose = require('mongoose');

class Database {
  /**
   * Stablish connection with mongodb using mongoose
   * @param {String} Database url
   */
  static async connect(URL = process.env.DB_URL) {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Mongoose Connection state', mongoose.connection.readyState);
      console.info('Database Connected', { time: new Date() });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Close connection with mongodb using mongoose
   */
  static async disconnect() {
    try {
      await mongoose.connection.close();
      console.info('Database Disconnected', { time: new Date() });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Database;

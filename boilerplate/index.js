'use strict';

const { start, init } = require('./server');
const Database = require('./config/database');

(async function () {
  await init();
  await start();
  await Database.connect();
})();

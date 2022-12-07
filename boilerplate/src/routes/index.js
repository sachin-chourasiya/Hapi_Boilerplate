/* API for health check */
// const plugin 
const routes = [
  {
    plugin: require('./user'),
    routes: {
      prefix: `/users`
    }
  },
  
];
module.exports = routes;
const controllerRoute = require('../controllers/BaseController');
module.exports = {
  plugin: {
    async register (server, options) {
      server.route([
        {
          method: 'POST',
          path: '/',
          options: {
            auth:false,
            plugins: {
            },
            tags: ['api', 'fetch-project'],
            pre: [],
            handler: controllerRoute.save,
            description: 'To fetch project'
          }
        },
        {
          method: 'GET',
          path: '/',
          options: {
            auth:false,
            plugins: {
            },
            tags: ['api', 'fetch-project'],
            pre: [],
            handler: controllerRoute.pagination,
            description: 'To fetch project'
          }
        },
        {
          method: 'PATCH',
          path: '/',
          options: {
            auth:false,
            plugins: {
            },
            tags: ['api', 'fetch-project'],
            pre: [],
            handler: controllerRoute.updateOne,
            description: 'To fetch project'
          }
        },
        {
          method: 'DELETE',
          path: '/delete',
          options: {
            auth:false,
            plugins: {
            },
            tags: ['api', 'fetch-project'],
            pre: [],
            handler: controllerRoute.deleteOne,
            description: 'To fetch project'
          }
        }
      ]);
    },
    version: "v1",
    name: 'users'
  }
};
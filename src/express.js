const http = require('http'),
  methods = require('methods'),
  Layer = require('./layer');

class MyExpress {
  constructor () {
    this.handlers = [];
    this.init();
  }

  init () {
    methods.forEach((method) => {
      this[method] = (fn) => {
        this.handlers.push(new Layer(method, fn))
      }
    });
  }

  handle (req, res) {
    this.handlers.forEach((handler) => {
      handler.handle_request(req, res);
    })
  }

  listen (port, callback) {
    const server = http.createServer(this);
    callback ? callback() : '';
    return server.listen(port);
  }
}

module.exports = () => {
  const myExpress = new MyExpress();
  const app = (req, res, next) => {
    myExpress.handle(req, res, next);
  };
  app['__proto__']['__proto__'] = myExpress;
  return app;
};
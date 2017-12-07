const http = require('http'),
  Router = require('./router');


class MyExpress {
  constructor () {
    this.init();
  }

  init () {
    this.router = new Router();
  }

  handle (req, res) {
    this.router.dispatch(req, res);
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
  app.listen = myExpress.listen;
  app['__proto__']['__proto__'] = myExpress.router;
  return app;
};
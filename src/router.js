const methods = require('methods'),
  Layer = require('./layer');

class Router {

  constructor () {
    this.stacks = [];
    this.methods = {};
    this.init();
  }

  init () {
    methods.forEach((method) => {
      this[method] = (...fns) => {
        fns.forEach(fn => {
          let layer = new Layer(method, fn);
          this.stacks.push(layer);
          this.methods[method.toLowerCase()] = true;
        })
      }
    })
  }

  dispatch (req, res) {
    let stackIndex = 0;
    let stacks = this.stacks;
    const next = () => {
      let currentLayer = stacks[stackIndex++];
      if (currentLayer.handle_method(req)) {
        currentLayer.handle_request(req, res, next);
      } else {
        next();
      }
    };
    next();
  }
}

module.exports = Router;
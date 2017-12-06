class Layer {

  constructor (method,fn) {
    this.method = method;
    this.fn = fn;
  }

  handle_method(req){
    return req.method.toLowerCase() === this.method.toLowerCase();
  }

  handle_request(req,res,next){
    if (!this.handle_method(req)) {
      return;
    }
    try {
      this.fn(req, res, next);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Layer;




class Router{

  constructor () {
    this.stacks = [];
    this.methods = {};
  }

  handleMethod(method){
    return !!this.methods[method.toLowerCase()];
  }
}
const http = require('http'),
	methods = require('methods'),
	layer = require('./router'),
	_ = require('lodash');

const obj = Object.create(null);
obj.listen = function(port) {
	const server = http.createServer(this);
	return server.listen(port);
};

obj.init = ()=>{
	this.handlers = [];
	methods.forEach((method)=>{
		console.log(method);
		this[method] = (fn)=>{
			this.handlers.push(new layer(method,fn))
		}
	});
};

obj.handle = (req,res)=>{
	this.handlers.forEach((handler)=>{
		handler.handle_request(req,res)
	})
}

module.exports =  () =>{
	const app = (req, res) => {
		app.handle(req,res)
	};
	_.merge(app, obj);
	app.init();
	return app;
}
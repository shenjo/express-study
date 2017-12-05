const layer = (method, fn) => {
	this.method = method;
	this.fn = fn;
};

layer.handle_method = (req) => {
	return req.method.toLowerCase() === this.method.toLowerCase();
};

layer.handle_request = (req, res, next) => {
	if (!this.handle_method(req)) {
		return;
	}
	try {
		this.fn(req, res, next);
	} catch (err) {
		throw err;
	}
};




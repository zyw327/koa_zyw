var Response = require("./response");
var Request = require("./request");
class Controller{
	constructor(ctx, next, viewPath){
		this.ctx = ctx;
		this.next = next;
		this.viewPath = viewPath;
	}

	_init(){

	}

	request(){
		return new Request(this.ctx.request);
	}

	response(){
		return new Response(this.ctx.response);
	}

	getMethod(){
		return this.ctx.request.method;
	}

	getHeader(){
		return this.ctx.request.header;
	}

	async render(params){
		params = params || {};
		await this.ctx.render("views/" + this.viewPath, params);
	}

	setCookie(key, value){
		return this.ctx.cookies.set(key, value, { signed: true });
	}
}

module.exports = Controller;
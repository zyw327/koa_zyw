var Url = require("./url");

class App{
	constructor(){
		this._isMutiModule = false;
		this._module = 'index';
		this._controller = 'index';
		this._action = 'index';
	}

	parseUrl(url){
		if (!url) {
			return ;
		}
		let urlObj = new Url(url);
		url = urlObj.parse();
		url = url.substr(1);
		url = url.split("/");
		
		if (this._isMutiModule) {
			this._setModule(url[0]);
			this._setController(url[1]);
			this._setAction(url[2]);
		} else {
			this._setController(url[0]);
			this._setAction(url[1]);
		}
	}

	_setModule(module) {
		if (module) {
			this._module = module;
		} else {
			this._module = 'index';
		}
	}

	_setController(controller) {
		if (controller) {
			this._controller = controller;
		} else {
			this._controller = 'index';
		}
	}

	_setAction(action){
		if (action) {
			this._action = action;
		} else {
			this._action = 'index';
		}
	}

	controller(){
		return this._toFirstUpperCase(this._controller.toLowerCase());
	}

	action(){
		return this._action.toLowerCase();
	}

	_toFirstUpperCase(str)
	{
		if (str.length < 1) {
			new Error("不能为空串！");
			return ;
		}
		if (str.length > 1) {
			return str[0].toUpperCase() + str.substr(1);
		} else {
			return str[0].toUpperCase()
		}
	}

	async run(ctx, next){
		//ctx.cookies.set('name', 'tobi', { signed: true });
  		//ctx.body = 'Hello World';
  		let url = ctx.url;
  		this.parseUrl(url);
  		let Controller = require('../../app/controller/' + this.controller() + "Controller");
  		let controller = new Controller(ctx, next, this.controller() + "/" + this.action());
  		//console.log(ctx);
  		await controller[this.action()]();
	}
	
}
module.exports = App;
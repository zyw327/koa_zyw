const Url = require('./url');
/**
 * 应用
 */
class App {
	/**
	 * 初始化
	 * 构造函数
	 */
	constructor() {
		this._isMutiModule = false;
		this._module = 'index';
		this._controller = 'index';
		this._action = 'index';
	}
	/**
	 * 解析请求Url
	 * @param {String} url
	 */
	parseUrl(url) {
		if (!url) {
			return;
		}
		let urlObj = new Url(url);
		url = urlObj.parse();
		url = url.substr(1);
		url = url.split('/');
		if (this._isMutiModule) {
			this._setModule(url[0]);
			this._setController(url[1]);
			this._setAction(url[2]);
		} else {
			this._setController(url[0]);
			this._setAction(url[1]);
		}
	}

	/**
	 * 设置是否多模块
	 * @param {Boolean} module
	 */
	_setModule(module) {
		if (module) {
			this._module = module;
		} else {
			this._module = 'index';
		}
	}

	/**
	 * 设置控制器
	 * @param {String} controller
	 */
	_setController(controller) {
		if (controller) {
			this._controller = controller;
		} else {
			this._controller = 'index';
		}
	}

	/**
	 * 设置控制器方法
	 * @param {String} action
	 */
	_setAction(action) {
		if (action) {
			this._action = action;
		} else {
			this._action = 'index';
		}
	}

	/**
	 * 生成控制器
	 * @return {String}
	 */
	controller() {
		return this._toFirstUpperCase(this._controller.toLowerCase());
	}

	/**
	 * 生成控制器方法
	 * @return {String}
	 */
	action() {
		return this._action.toLowerCase();
	}

	/**
	 * 首字母写
	 * @param {String} str
	 * @return {String}
	 */
	_toFirstUpperCase(str) {
		if (str.length < 1) {
			new Error('不能为空串！');
			return;
		}
		if (str.length > 1) {
			return str[0].toUpperCase() + str.substr(1);
		} else {
			return str[0].toUpperCase();
		}
	}

	/**
	 * 执行请求
	 * @param {Contenxt} ctx
	 * @param {Next} next
	 */
	async run(ctx, next) {
		// ctx.cookies.set('name', 'tobi', { signed: true });
		// ctx.body = 'Hello World';
		let url = ctx.url;
		console.log(url);
		this.parseUrl(url);
		let Controller = require('../../app/controller/' + this.controller() + 'Controller');
		let controller = new Controller(ctx, next, this.controller() + '/' + this.action());
		// console.log(ctx);
		await controller[this.action()]();
	}
}
module.exports = App;

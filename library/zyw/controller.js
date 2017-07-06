const Response = require('./response');
const Request = require('./request');
/**
 * Controller
 */
class Controller {
	/**
	 * 构造函数
	 * @param {Context} ctx
	 * @param {Object} next
	 * @param {String} viewPath
	 */
	constructor(ctx, next, viewPath) {
		this.ctx = ctx;
		this.next = next;
		this.viewPath = viewPath;
	}

	/**
	 * 初始化
	 */
	_init() {

	}

	/**
	 * 请求
	 * @return {Request}
	 */
	request() {
		return new Request(this.ctx.request);
	}

	/**
	 * 响应
	 * @return {Response}
	 */
	response() {
		return new Response(this.ctx.response);
	}

	/**
	 * 请求方法
	 * @return {String}
	 */
	getMethod() {
		return this.ctx.request.method;
	}

	/**
	 * 请求头
	 * @return {Object}
	 */
	getHeader() {
		return this.ctx.request.header;
	}

	/**
	 * 请求头
	 * @param {Object} params
	 */
	async render(params) {
		params = params || {};
		await this.ctx.render('views/' + this.viewPath, params);
	}

	/**
	 * 请求头
	 * @param {String} key
	 * @param {String} value
	 * @return {Object}
	 */
	setCookie(key, value) {
		return this.ctx.cookies.set(key, value, {signed: true});
	}
}
module.exports = Controller;

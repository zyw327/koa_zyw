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
        return true;
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
     * 重定向
     * @param {String} url
     * @return {Boolean}
     */
    redirect(url) {
        return this.ctx.redirect(url);
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

    /**
     * 获取Cookie
     * @param {String} key
     * @return {Object}
     */
    getCookie(key) {
        return this.ctx.cookies.get(key, {signed: true});
    }

    /**
     * 获取请求的URl
     * @return {String}
     */
    getUrl() {
        return this.ctx.url;
    }

    /**
     * next
     * @param {String} msg 
     */
    async next(msg) {
        await this.next(msg);
    }
}
module.exports = Controller;

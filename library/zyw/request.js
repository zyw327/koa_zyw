/**
 * Request
 */
class Request {
    /**
     * 构造函数初始化
     * @param {Object} req
     */
    constructor(req) {
        this.req = req;
    }

    /**
     * 获取get传递的参数
     * @param {String} key
     * @param {String} defaultValue
     * @return {String}
     */
    get(key, defaultValue) {
        if (!this.req.query) {
            return defaultValue;
        }
        if (!key) {
            return this.req.query;
        }
        if (this.req.query[key]) {
            return this.req.query[key];
        }
        return defaultValue;
    }

    /**
     * 获取post传递的参数
     * @param {String} key
     * @param {String} defaultValue
     * @return {String}
     */
    post(key, defaultValue) {
        if (!this.req.body) {
            return defaultValue;
        }
        if (!key) {
            return this.req.body;
        }
        if (this.req.body[key]) {
            return this.req.body[key];
        }
        return defaultValue;
    }

    /**
     * 获取客户端ip
     * @return {String}
     */
    getIp() {
        return this.req.ip;
    }
}

module.exports = Request;

/**
 * 响应
 */
class Response {
    /**
     * 构造函数初始化
     * @param {Object} res
     */
    constructor(res) {
        this.res = res;
    }

    /**
     * 重定向
     * @param {String} url
     */
    redirect(url) {

    }

    /**
     * 输出json
     * @param {Object} json
     */
    json(json) {
        this.res.set('Content-Type', 'application/json');
        this.res.body = json;
    }
}

module.exports = Response;

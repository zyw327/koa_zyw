const httpServer = require('http');
const queryString = require('querystring');
/**
 * http请求
 */
class Http {
	/**
	 * 构造函数
	 */
	constructor() {
		this.params = {};
		this.isPost = false;
		this.req = null;
		this.hostname = '';
		this.port = 80;
		this.urlPath = '';
		this.protocol = 'http:';
		this.timeout = 10000;
		this.headers = {};
	}

	/**
	 * [setParams description]
	 * @param {Object} [params] {key:value}
	 */
	setParams(params) {
		this.params = queryString.stringify(params);
	}

	/**
	 * 设置主机名
	 * @param {String} hostname
	 */
	setHostName(hostname) {
		this.hostname = hostname;
	}

	/**
	 * 设置path
	 * @param {String} path
	 */
	setUrlPath(path) {
		this.urlPath = path;
	}
	/**
	 * 设置请求类型
	 * @param {Boolean} isPost
	 */
	setIsPost(isPost) {
		this.isPost = isPost;
	}

	/**
	 * 设置请求端口
	 * @param {Number} port
	 */
	setPort(port) {
		this.port = port;
	}

	/**
	 * 设置请求协议
	 * @param {String} protocol
	 */
	setProtocol(protocol) {
		this.protocol = protocol;
	}

	/**
	 * 设置请求超时时间
	 * @param {Number} timeout
	 */
	setTimeout(timeout) {
		this.timeout = timeout;
	}

	/**
	 * [setHeader description]
	 * @param {[Object]} headers [description]
	 */
	setHeader(headers) {
		this.headers = headers;
	}
	/**
	 * sendRequest
	 * @return {object}
	 */
	sendRequest() {
		let options = {
			protocol: this.protocol,
			hostname: this.hostname,
			port: this.port,
			path: this.urlPath,
			method: 'GET',
			timeout: this.timeout,
			headers: this.headers
		};
		if (this.isPost) {
			options.method = 'POST';
			if (!options.headers['Content-Type']) {
				options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}
			options.path = this.urlPath;
			options.headers['Content-Length'] = Buffer.byteLength(this.params);
		} else {
			options.path = this.urlPath + '?' + this.params;
		}
		return new Promise((resolve, reject)=>{
			this._request(options).then((res)=>{
				this._getResponse(res).then((chunk)=>{
					resolve(chunk.toString());
				});
			}).catch((msg)=>{
				reject(msg);
			});
			this._requestStatus().then((err)=>{
				reject(err);
			});
		});
	}

	/**
	 * 获取响应
	 * @param {Object} res
	 * @return {Promise}
	 */
	_getResponse(res) {
		return new Promise((resolve, reject)=>{
			// res.setEncoding('utf8');
			res.on('data', (chunk) => {
				resolve(chunk);
			});
		});
	}

	/**
	 * 获取请求状态
	 * @return {Promise}
	 */
	_requestStatus() {
		return new Promise((resolve, reject)=>{
			this.req.on('error', (e) => {
				resolve(e);
			});
			if (this.isPost) {
				this.req.write(this.params);
			}
			this.req.end();
		});
	}

	/**
	 * 请求
	 * @param {Object} options
	 * @return {Promise}
	 */
	_request(options) {
		return new Promise((resolve, reject)=>{
			this.req = httpServer.request(options, (res)=>{
				if (res) {
					resolve(res);
				} else {
					reject('请求失败');
				}
			});
		});
	}
}

module.exports = Http;

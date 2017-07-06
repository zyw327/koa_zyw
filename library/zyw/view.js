/**
 * 视图层
 */
class View {
	/**
	 * 构造函数
	 */
	constructor() {
		this._path = '';
		this._basePath = '';
	}

	/**
	 * 设置视图存储路径
	 * @param {String} basepath 统一存储路径
	 */
	setBasePath(basepath) {
		this._basePath = basepath;
	}

	/**
	 * 设置视图位置
	 * @param {String} path
	 */
	setPath(path) {
		this._path = path;
	}

	/**
	 * 视图
	 * @return {View}
	 */
	view() {
		return views('/', {map: {html: 'koa-ejs'}});
	}
}
module.exports = View;

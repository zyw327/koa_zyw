const Mysql = require('../../library/zyw/mysql.js');
const config = require('../configs/config');
/**
 * 表模型
 */
class Table {
	/**
	 * 构造函数
	 */
	constructor() {
		this.db = new Mysql(config.mysql);
	}

	/**
	 * 设置db
	 */
	async setDb(db) {
		await this.db.setDb(db);
	}
	/**
	 * 查询
	 * @param {Number} page
	 * @param {Number} pagesize
	 * @param {Object} where
	 * @param {String} order
	 * @param {String} group
	 * @return {Promise}
	 */
	query(page, pagesize, where, order, group) {
		let select = this.db.select(this.table);
		if (where) {
			select = select.where(where);
		}

		if (order) {
			select = select.order(order);
		}

		if (group) {
			select = select.group(group);
		}

		if (page) {
			select = select.limit((page - 1) * pagesize, pagesize);
		}
		return new Promise((resolve, reject)=>{
			select.featchAll().then((results)=>{
				resolve(results);
			}).catch((err)=>{
				reject(err);
			});
		});
	}

	/**
	 * 统计
	 * @param {Sting} field
	 * @param {Object} where
	 * @param {String} order
	 * @param {String} group
	 * @return {Promise}
	 */
	count(field, where, order, group) {
		let select = this.db.select(this.table, 'count(' + field + ') as count');
		if (where) {
			select = select.where(where);
		}

		if (order) {
			select = select.order(order);
		}

		if (group) {
			select = select.group(group);
		}

		return new Promise((resolve, reject)=>{
			select.featchAll().then((results)=>{
				resolve(results);
			}).catch((err)=>{
				reject(err);
			});
		});
	}
	/**
	 * 获取sql
	 * @param {Number} page
	 * @param {Number} pagesize
	 * @param {Object} where
	 * @param {String} order
	 * @param {String} group
	 * @return {String}
	 */
	getSql(page, pagesize, where, order, group) {
		let select = this.db.select(this.table);
		if (where) {
			select = select.where(where);
		}

		if (order) {
			select = select.order(order);
		}

		if (group) {
			select = select.group(group);
		}

		if (page) {
			select = select.limit((page - 1) * pagesize, pagesize);
		}
		return select.__toString();
	}

	/**
	 * 数据插入
	 */
	async insert(data, table) {
		table = this.table || table;
		let result = await this.db.insert(this.table, data).save();
		if (result instanceof Array && result.length > 0) {
			result = result[0].insertId;
		} else {
			result = 0;
		}
		return result;
	}

	/**
	 * 获取db
	 * @return {Promise}
	 */
	async getDb() {
		return await this.db.getDb();
	}
}

module.exports = Table;

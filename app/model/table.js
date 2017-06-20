var Mysql = require("../../library/zyw/mysql.js");

class Table{
	constructor(){
		this.db = new Mysql()
	}

	query(page, pagesize, where, order, group){
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


	count(field, where, order, group){
		let select = this.db.select(this.table, "count(" + field + ") as count");
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

	getSql(page, pagesize, where, order, group){
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
}

module.exports = Table;
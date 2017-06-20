var Select = require("./select");

class Mysql extends Select{
	constructor(){
		super();
	}

	/**
	 * [insert description]
	 * @param  {[String]} table [tableName]
	 * @param  {[Object]} data  [{field:value}]
	 * @return {[type]}       [description]
	 */
	insert(table, data){
		this._init();
		let insertStr = '';
		if (data && (data instanceof Array)) {
			insertStr = this._parseMutiInsetData(data);
		} else {
			let tmp = this._parseOneInsetData(data);
			insertStr = tmp[0] + tmp[1];
		}
		this.sql = "INSERT INTO " + table + " " + insertStr;
		return this;
	}

	/**
	 * [插入一条数据]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	_parseOneInsetData(data){
		let fields = '';
		let values = '';
		for(var key in data){
			fields += key + ",";
			values += "'" + data[key] + "',"
		}
		fields = fields.substr(0, fields.length - 1);
		values = values.substr(0, values.length - 1);
		return ["(" + fields + ")values", "(" + values + ")"];
	}

	_parseMutiInsetData(data){
		let fields = '';
		let values = '';

		for(var i in data){
			let tmp = this._parseOneInsetData(data[i]);
			fields = tmp[0];
			values += tmp[1] + ",";
		}

		return fields + values.substr(0, values.length - 1);
	}

	/**
	 * [update description]
	 * @param  {[type]} table [description]
	 * @param  {[Object]} data  {field:value}
	 * @param  {[type]} cond  [description]
	 * @return {[type]}       [description]
	 */
	update(table, data){
		this._init();
		let set = '';
		for(var key in data) {
			set += key + "='" + data[key] + "',";
		}
		set = set.substr(0, set.length - 1);
		this.sql = "UPDATE " + table + " SET " + set;
		return this;
	}

	_parseUpdateData(data){

	}

	/**
	 * [delete description]
	 * @param  {[type]} table [description]
	 * @param  {[type]} cond  [description]
	 * @return {[type]}       [description]
	 */
	delete(table, cond){
		this._init();
		//let where = this._parseWhere(cond);
		this.sql = "DELETE FROM " + table;
		return this;
	}

	save(){
		this.__toString();
		return new Promise((resolve, reject)=>{
			this.query(this.sql).then((results)=>{
				resolve(results);
			}).catch((err)=>{
				reject(err);
			});
		});
	}
}

module.exports = Mysql;
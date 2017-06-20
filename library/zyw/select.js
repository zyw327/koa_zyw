var config = require("../../app/config/config");

class Select{
	constructor(){
		this.db = config("mysql");
		this.sql = '';
		this.wheres = '';
		this.joins = '';
		this.joinFields = '';
		this.orders = '';
		this.groups = '';
		this.limits = '';
	}

	_init(){
		this.sql = '';
		this.wheres = '';
		this.joins = '';
		this.joinFields = '';
		this.orders = '';
		this.groups = '';
		this.limits = '';
	}

	query(sql){
		return new Promise((resolve, reject) => {
			this.db.query(sql, (error, result, fields) => {
				if (error) {
					reject(error);
					return '';
				}
				resolve([result, fields]);
			});
		});
	}

	select(table, fields){
		this._init();
		if (fields instanceof Array) {
			fields = fields.join(",");
		} else if (!fields) {
			 fields = "*";
		}
		this.sql = "select " + fields + " {%s} " + " from " + table;
		return this;
	}

	/**
	 * [join description]
	 * @param  {[String]} joinTable [description]
	 * @param  {[array|String]} jonFields [description]
	 * @param  {[String]} joinWay   [option]:["LEFT", "RIGHT", "INNER"]
	 * @param {[object]} [joinCond] {field:value,_logic:['=', 'and']}
	 * @return {[type]}           [description]
	 */
	join(joinTable, joinFields, joinWay, joinCond){
		joinFields = joinFields || "";
		this.joins += " " + joinWay + " JOIN " + joinTable + " ON " ;
		let tmp = this._parseWhere(joinCond, true);
		let countCand = 0;
		if (joinCond instanceof Array) {
			countCand = joinCond.length - 1;
			tmp = tmp.substr(0, tmp.length - (joinCond[countCand]._logic?(joinCond[countCand]._logic[1]?joinCond[countCand]._logic[1].length:3):3));
		} else {
			tmp = tmp.substr(0, tmp.length - (joinCond._logic?(joinCond._logic[1]?joinCond._logic[1].length:3):3));
		}
		this.joins += " " + tmp;
		if (joinFields instanceof Array) {
			joinFields = joinFields.join(",");
		}
		this.joinFields += joinFields;
		return this;
	}

	/**
	 * [where description]
	 * @param  {[array|object]} cond {field:value,_logic:['=', 'and']}|[{field:value,_logic:['=', 'and']},{field:value,_logic:['=', 'and']}]
	 * @param  {[type]}      [description]
	 * @return {[type]}      [description]
	 */
	where(cond){
		this.wheres += this._parseWhere(cond);
		return this;
	}

	_parseWhere(cond, isJoin){
		let tmpStr = '';
		if (!(cond instanceof Array)) {
			tmpStr += this._parseWhereObj(cond, isJoin);
		} else {
			tmpStr += " (";
			for (var i in cond) {
				tmpStr += this._parseWhereObj(cond[i], isJoin);
			}
			tmpStr = tmpStr.substr(0, tmpStr.length - (cond[i]._logic ? (cond[i]._logic[1] ? cond[i]._logic[1].length : 3) : 3));
			tmpStr += ") " + (cond[i]._logic ? (cond[i]._logic[1] ? cond[i]._logic[1] : "AND") : "AND");
		}
		return tmpStr;
	}

	_parseWhereObj(cond, isJoin){
		isJoin = isJoin || false;
		let tmpStr = '';
		for (var key in cond) {
			if (key != "_logic") {
				tmpStr += " " + key + " " + (cond._logic ? (cond._logic[0] ? cond._logic[0] : "=") : "=");
				tmpStr += " " + (isJoin?cond[key]:this.db.escape(cond[key])) + " " + (cond._logic ? (cond._logic[1] ? cond._logic[1] : "AND") : "AND");
			}
		}
		return tmpStr;
	}

	limit(offset, count){
		this.limits = offset + ', ' + count;
		return this;
	}

	order(orders){
		this.orders = orders;
		return this;
	}

	group(groups){
		this.groups = groups;
		return this;
	}

	__toString(){
		if (this.joinFields != '') {
			this.sql = this.sql.replace("{%s}", "," + this.joinFields);
		} else {
			this.sql = this.sql.replace("{%s}", "");
		}
		
		this.sql += this.joins;
		if (this.wheres) {
			this.sql += " where " + this.wheres.substr(0, this.wheres.length - 3);
		}

		if (this.orders) {
			this.sql += " order by " + this.orders;
		}

		if (this.groups) {
			this.sql += " group by " + this.groups;
		}

		if (this.limits) {
			this.sql += " limit " + this.limits;
		}
		return this.sql;
	}

	featchOne(){
		this.limit(0, 1);
		this.__toString();
		return new Promise((resolve, reject)=>{
			this.query(this.sql).then((results) => {
				resolve(results);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	featchAll(){
		this.__toString();
		return new Promise((resolve, reject)=>{
			this.query(this.sql).then((results) => {
				resolve(results);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	close(){
		pool.end((err)=>{
		  console.log(err);
		});
	}
}

module.exports = Select;
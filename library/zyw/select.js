// const mysql = require('mysql');
const Connection = require('./mysql/connection');
const Transaction = require('./mysql/transaction');
/**
 * 数据查询封装
 */
class Select {
    /**
     * 构造函数
     * @param {Object} config db配置
     */
    constructor(config) {
        this.db = this.createDb(config);
        this.transaction = Transaction(this.db);
        this.sql = '';
        this.wheres = '';
        this.joins = '';
        this.joinFields = '';
        this.orders = '';
        this.groups = '';
        this.limits = '';
    }

    /**
     * 创建db操作
     * @param {Object} config 配置
     * @return {Pool}
     */
    createDb(config) {
        if (!this.db) {
            let connection = Connection.pools(config);
            return connection;
        }
    }

    /**
     * 设置db
     * @param {Object} db
     */
    setDb(db) {
        this.db = db;
    }
    /**
     * 初始化
     */
    _init() {
        this.sql = '';
        this.wheres = '';
        this.joins = '';
        this.joinFields = '';
        this.orders = '';
        this.groups = '';
        this.limits = '';
    }

    /**
     * 执行
     * @param {String} sql
     * @return {Promise}
     */
    async query(sql) {
        if (this.transaction.getIsInTransaction()) {
            return await this.transaction.query(sql);
        }
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

    /**
     * 开启事务
     */
    async beginTransaction() {
        await this.transaction.beginTransaction();
    }
    /**
     * 开启事务
     */
    async commit() {
        return await this.transaction.commit();
    }
    /**
     * 开启事务
     */
    async rollBack() {
        await this.transaction.rollBack();
    }
    /**
     * 查询语句
     * @param {String} table
     * @param {String|Array} fields
     * @return {Select}
     */
    select(table, fields) {
        this._init();
        if (fields instanceof Array) {
            fields = fields.join(',');
        } else if (!fields) {
            fields = '*';
        }
        this.sql = 'select ' + fields + ' {%s} ' + ' from ' + table;
        return this;
    }

    /**
     * [join description]
     * @param  {String} joinTable [description]
     * @param  {array|String} joinFields [description]
     * @param  {String} joinWay   [option]:['LEFT', 'RIGHT', 'INNER']
     * @param {object} [joinCond] {field:value,_logic:['=', 'and']}
     * @return {type}           [description]
     */
    join(joinTable, joinFields, joinWay, joinCond) {
        joinFields = joinFields || '';
        this.joins += ' ' + joinWay + ' JOIN ' + joinTable + ' ON ';
        let tmp = this._parseWhere(joinCond, true);
        let countCand = 0;
        if (joinCond instanceof Array) {
            countCand = joinCond.length - 1;
            tmp = tmp.substr(0, tmp.length - (joinCond[countCand]._logic?(joinCond[countCand]._logic[1]?joinCond[countCand]._logic[1].length:3):3));
        } else {
            tmp = tmp.substr(0, tmp.length - (joinCond._logic?(joinCond._logic[1]?joinCond._logic[1].length:3):3));
        }
        this.joins += ' ' + tmp;
        if (joinFields instanceof Array) {
            joinFields = joinFields.join(',');
        }
        if (/[^\s]{1,}/.test(joinFields)) {
            this.joinFields += ',' + joinFields;
        } else {
            this.joinFields += joinFields;
        }
        return this;
    }

    /**
     * [where description]
     * @param  {array|object} cond {field:value,_logic:['=', 'and']}|[{field:value,_logic:['=', 'and']},{field:value,_logic:['=', 'and']}]
     * @param  {type}      [description]
     * @return {type}      [description]
     */
    where(cond) {
        this.wheres += this._parseWhere(cond);
        return this;
    }

    /**
     * 解析Where条件
     * @param {Object} cond
     * @param {Boolean} isJoin
     * @return {String}
     */
    _parseWhere(cond, isJoin) {
        let tmpStr = '';
        if (!(cond instanceof Array)) {
            tmpStr += this._parseWhereObj(cond, isJoin);
        } else {
            let i = 0;
            tmpStr += ' (';
            for ( i in cond) {
                if (cond.hasOwnProperty(i)) {
                    tmpStr += this._parseWhereObj(cond[i], isJoin);
                }
            }
            tmpStr = tmpStr.substr(0, tmpStr.length - (cond[i]._logic ? (cond[i]._logic[1] ? cond[i]._logic[1].length : 3) : 3));
            tmpStr += ') ' + (cond[i]._logic ? (cond[i]._logic[1] ? cond[i]._logic[1] : 'AND') : 'AND');
        }
        return tmpStr;
    }

    /**
     * 解析where条件
     * @param {Object} cond
     * @param {Boolean} isJoin
     * @return {String}
     */
    _parseWhereObj(cond, isJoin) {
        isJoin = isJoin || false;
        let tmpStr = '';
        for (let key in cond) {
            if (key != '_logic') {
                tmpStr += ' ' + key + ' ' + (cond._logic ? (cond._logic[0] ? cond._logic[0] : '=') : '=');
                if (cond._logic && cond._logic[0] && cond._logic[0].toLowerCase() == 'in') {
                    tmpStr += ' ' + (isJoin?cond[key]: '(' + cond[key] + ')') + ' ' + (cond._logic ? (cond._logic[1] ? cond._logic[1] : 'AND') : 'AND');
                } else {
                    tmpStr += ' ' + (isJoin?cond[key]: this.db.escape(cond[key]) ) + ' ' + (cond._logic ? (cond._logic[1] ? cond._logic[1] : 'AND') : 'AND');
                }
            }
        }
        return tmpStr;
    }

    /**
     * limit
     * @param {Number} offset
     * @param {Number} count
     * @return {Select}
     */
    limit(offset, count) {
        this.limits = offset + ', ' + count;
        return this;
    }

    /**
     * 排序
     * @param {String} orders
     * @return {Select}
     */
    order(orders) {
        this.orders = orders;
        return this;
    }

    /**
     * 分组
     * @param {String} groups
     * @return {Select}
     */
    group(groups) {
        this.groups = groups;
        return this;
    }

    /**
     * 生成Sql
     * @return {String}
     */
    __toString() {
        if (this.joinFields != '') {
            this.sql = this.sql.replace('{%s}', '' + this.joinFields);
        } else {
            this.sql = this.sql.replace('{%s}', '');
        }
        this.sql += this.joins;
        if (this.wheres) {
            this.sql += ' where ' + this.wheres.substr(0, this.wheres.length - 3);
        }

        if (this.orders) {
            this.sql += ' order by ' + this.orders;
        }

        if (this.groups) {
            this.sql += ' group by ' + this.groups;
        }

        if (this.limits) {
            this.sql += ' limit ' + this.limits;
        }
        return this.sql;
    }
    /**
     * 取得一条数据
     * @return {Promise}
     */
    fetchOne() {
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

    /**
     * 取得所有数据
     * @return {Promise}
     */
    fetchAll() {
        this.__toString();
        return new Promise((resolve, reject)=>{
            this.query(this.sql).then((results) => {
                resolve(results);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * 关闭连接
     */
    close() {
        pool.end((err)=>{
            console.log(err);
        });
    }

    escape(value) {
        if (!/[^\s]{1,}/.test(value)) {
            return value;
        }
        value = this.db.escape(value);
        // if (typeof(value) == 'string') {
        //     value = value.replace(/(''){1,}/g, "");
        // }
        // console.log(value);
        return value;
        // if (typeof(value) == 'string') {
        //     value = value.replace(/[\\]{1,}/g, "\\'");
        //     value = value.replace(/[']{1,}/g, "\\'");
        // }
        // return value;
    }
}

module.exports = Select;

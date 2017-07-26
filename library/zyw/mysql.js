const Select = require('./select');
/**
 * 数据库CURD
 */
class Mysql extends Select {
    /**
     * 构造函数
     * @param {Object} config 配置
     */
    constructor(config) {
        super(config);
    }

    /**
     * [insert description]
     * @param  {[String]} table [tableName]
     * @param  {[Object]} data  [{field:value}]
     * @return {[type]}       [description]
     */
    insert(table, data) {
        this._init();
        let insertStr = '';
        if (data && (data instanceof Array)) {
            insertStr = this._parseMutiInsetData(data);
        } else {
            let tmp = this._parseOneInsetData(data);
            insertStr = tmp[0] + tmp[1];
        }
        this.sql = 'INSERT INTO ' + table + ' ' + insertStr;
        return this;
    }

    /**
     * [插入一条数据]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    _parseOneInsetData(data) {
        let fields = '';
        let values = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                fields += key + ',';
                values += '' + this.escape(data[key]) + ',';
            }
        }
        fields = fields.substr(0, fields.length - 1);
        values = values.substr(0, values.length - 1);
        return ['(' + fields + ')values', '(' + values + ')'];
    }

    /**
     * 解析多条插入
     * @param {Object|Array} data
     * @return {String}
     */
    _parseMutiInsetData(data) {
        let fields = '';
        let values = '';
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                let tmp = this._parseOneInsetData(data[i]);
                fields = tmp[0];
                values += tmp[1] + ',';
            }
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
    update(table, data) {
        this._init();
        let set = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                set += key + '=\'' + data[key] + '\',';
            }
        }
        set = set.substr(0, set.length - 1);
        this.sql = 'UPDATE ' + table + ' SET ' + set;
        return this;
    }

    // _parseUpdateData(data) {

    // }

    /**
     * [delete description]
     * @param  {[type]} table [description]
     * @param  {[type]} cond  [description]
     * @return {[type]}       [description]
     */
    delete(table, cond) {
        this._init();
        // let where = this._parseWhere(cond);
        this.sql = 'DELETE FROM ' + table;
        return this;
    }

    /**
     * 执行插入更新删除
     * @return {Promise}
     */
    save() {
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

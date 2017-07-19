const mysql = require('mysql');
let conn = undefined;
/**
 * 数据库连接
 */
class Connection {
    /**
     * 构造函数
     * @param {Object} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * 获取连接池
     * @return {Promise}
     */
    getPools() {
        let pool = mysql.createPool({
            connectionLimit: this.config.connectionLimit,
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            debug: this.config.debug,
            multipleStatements: this.config.multipleStatements
        });
        return pool;
    }
}

module.exports = function(config) {
    if (!conn) {
         conn = new Connection(config).getPools();
    }
    return conn;
};

const mysql = require('mysql');
let pools = undefined;
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
     * 获取连接
     * @return {Promise}
     */
    getConnection() {
        return new Promise((resolve, reject) => {
            this.getPools().getConnection((err, conn) => {
                if (err) {
                    return reject(err);
                }
                return resolve(conn);
            });
        });
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
exports.pools = (config) => {
    if (!pools) {
        pools = new Connection(config).getPools();
    }
    return pools;
};


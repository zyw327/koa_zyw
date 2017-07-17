const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'me',
//   password: 'secret',
//   database: 'my_db'
// });
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
//   if (error) throw error;
//   connection.release();
//   console.log('The solution is: ', results[0].solution);
// });
// connection.end();
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
     * 获取连接句柄
     * @return {Mysql}
     */
    get() {
        return mysql.createConnection({
            connectionLimit: this.config.connectionLimit,
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            debug: this.config.debug,
            multipleStatements: this.config.multipleStatements
        });
    }
}

module.exports = Connection;

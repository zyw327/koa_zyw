let transaction = undefined;
let queueSql = undefined;
/**
 * 事务执行
 */
class Transaction {
    /**
     * 构造函数
     * @param {Object} pools
     */
    constructor(pool) {
        this.pool = pool;
        this.isInTransaction = false;
    }
    /**
     * 执行sql语句
     * @param {String} sql 
     */
    query(sql) {
        queueSql.push(sql);
    }

    /**
     * 
     * @param {Object} conn 
     * @param {String} sql 
     */
    _query(conn, sql) {
        return new Promise((resolve, reject) => {
            conn.query(sql, (error, result, fields) => {
                if (error) {
                    reject(error);
                    return '';
                }
                resolve(result);
            });
        });
    }

    /**
     * 获取连接
     */
    getConnection() {
        return new Promise((resolve, reject)=>{
            this.pool.getConnection((err, conn) => {
                if (err) {
                    return reject(err);
                }
                resolve(conn);
            });
        });
    }

    /**
     * 开启事务 
     */
    beginTransaction() {
        this.isInTransaction = true;
        queueSql = [];
    }

    _beginTransaction(conn) {
        return new Promise((resolve, reject)=>{
            conn.beginTransaction(function(err) {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    /**
     * 提交
     */
    async commit() {
        let conn = await this.getConnection();
        let result = [];
        try {
            await this._beginTransaction(conn);
            for(let sql of queueSql) {
                result.push(await this._query(conn, sql));
            }
            await this._commit(conn);
            return result;
        } catch (error) {
            await this._rollBack(conn);
            throw new Error(error);
        }
    }

    _commit(conn) {
        return new Promise((resolve, reject) => {
            conn.commit(function(err) {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
            conn.release();
            this.isInTransaction = false;
        });
    }
    /**
     * 回滚操作
     */
    _rollBack(conn) {
        return new Promise((resolve, reject) => {
            conn.rollback();
            resolve(true);
            conn.release();
            this.isInTransaction = false;
        });
    }

    /**
     * 回滚操作
     */
    rollBack() {
        return true;
    }

    /**
     * 设置事务状态
     * @param {Boolean} isInTransaction 
     */
    setIsInTransaction(isInTransaction) {
        this.isInTransaction = isInTransaction;
    }

    /**
     * 获取事务状态
     */
    getIsInTransaction() {
        return this.isInTransaction;
    }
}

module.exports = function(pool) {
    if (!transaction) {
        transaction = new Transaction(pool);
    }
    return transaction;
};

# koa_zyw
## node版本要大于7.6
## 基于koa的mvc设计

## request操作类
### get与post数据的获取<br>
    <code>request().post(); // 获取post请求的数据</code><br>
    <code>request().get(); // 获取get请求的数据</code>
## response操作类
## 配置文件
```json
    {
        "mysql": {
            "connectionLimit": 2,
            "host": "host",
            "user": "username",
            "password": "password",
            "database": "db",
            "debug": false,
            "multipleStatements": true
        },
        "mail": {
            "host": "host",
            "port": 25,
            "secure": false, // upgrade later with STARTTLS
            "auth": {
                "user": "email_addr",
                "pass": "email_passwd"
            }
        },
        "server": {
            "port": "3005"
        },
        "mongo": {
            "user": "",
            "password": "",
            "database": ""
        },
        "redis": {
            "host": "host",
            "port": "6379",
            "detect_buffers": false,
            "connect_timeout": 3600000,
            "retry_strategy": 5,
            "password": "password",
            "db": "2"
        }
    };
```
## 数据库mysql的连贯操作
```javascript
    let db = new Mysql(config.mysql);
```
### mysql事务
```javascript
    try{
        await db.beginTransaction();
        await db.insert({name: "111111111"});
        await db.insert({name: "2111111"});
        let res = await db.commit(); //返回执行结果插入会返回插入id
        return res;
    }catch(e) {
        await this.activity.db.rollBack();
        return false;
    }
```
## redis连接操作

# koa_zyw
## node版本要大于7.6
## 基于koa的mvc设计

## request操作类
### get与post数据的获取<br>
```javascript
    request().post(); // 获取post请求的数据
    request().get(); // 获取get请求的数据
```
## response操作类
```javascript
    response().json(); //输出json到浏览器
```
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
            "secure": false,
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
```javascript
    redis = new RedisClient(config.redis);
```
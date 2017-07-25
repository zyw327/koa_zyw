module.exports = (function() {
    let env = process.env.NODE_ENV;
    let config = {
        mysql: {
            connectionLimit: 2,
            host: 'host',
            user: 'username',
            password: 'password',
            database: 'db',
            debug: false,
            multipleStatements: true
        },
        mail: {
            host: 'host',
            port: 25,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: 'email_addr',
                pass: 'email_passwd'
            }
        },
        server: {
            port: '3005'
        },
        mongo: {
            user: '',
            password: '',
            database: ''
        },
        redis: {
            host: 'host',
            port: '6379',
            detect_buffers: false,
            connect_timeout: 3600000,
            retry_strategy: 5,
            password: 'password',
            db: '2'
        }
    };
    if (env == 'production') {
        return config;
    } else if (env == 'development') {
        config.server.port = '3006';
        config.mysql = {
            connectionLimit: 2,
                host: 'host',
                user: 'username',
                password: 'password',
                database: 'db',
                debug: false,
                multipleStatements: true
        };
        return config;
    } else {
        return config;
    }
})();

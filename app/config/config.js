var mysql = require('mysql');
module.exports = function (type) {

	switch(type) {
		case "mysql":
			return mysql.createPool({
				  connectionLimit : 2,
				  host            : 'host',
				  user            : 'username',
				  password        : 'passwd',
				  database        : 'database',
				  debug           : false,
				  multipleStatements: true
			});
			break;
		case "mail":
			return {
			    host: 'smtp.email.com',
			    port: 25,
			    secure: false, // upgrade later with STARTTLS
			    auth: {
			        user: 'email_addr',
			        pass: 'email_passwd'
			    }
			};
			break;
	}
	return false;
}
const mysql = require('mysql2/promise');
// const pool = mysql.createPool(process.env.DB_CONNECTION_URL);
const options = {
	host: process.env.DB_URL,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}
const pool = mysql.createPool(options);

module.exports = pool;
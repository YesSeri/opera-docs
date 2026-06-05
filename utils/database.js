const mysql = require('mysql2/promise');

const requiredEnvVars = ['DB_URL', 'DB_USER', 'DB_NAME', 'DB_PASS'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
	throw new Error(`Missing required database environment variables: ${missingEnvVars.join(', ')}`);
}

const options = {
	host: process.env.DB_URL,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: Number(process.env.DB_PORT || 3306),
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}
const pool = mysql.createPool(options);

module.exports = pool;

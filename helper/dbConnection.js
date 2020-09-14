const mysql = require('mysql2');
const connection  = mysql.createPool(process.env.DB_CONNECTION_URL);

module.exports = connection;
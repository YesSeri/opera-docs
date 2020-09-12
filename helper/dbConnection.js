const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DB_CONNECTION_URL)

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to DB')
});

module.exports = connection;
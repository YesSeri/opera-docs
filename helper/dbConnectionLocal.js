const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.LOCAL_DB_CONNECTION_URL)

connection.connect(function(err) {
    if (err) console.error(err);
    console.log('Connected to DB')
});

module.exports = connection;
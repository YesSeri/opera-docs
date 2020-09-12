const mysql = require('mysql2');
    // connection = mysql.createConnection(process.env.LOCAL_DB_CONNECTION_URL)
// const connection = mysql.createConnection(process.env.DB_CONNECTION_URL)
const connection  = mysql.createPool(process.env.DB_CONNECTION_URL);
//   var pool  = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'example.org',
//     user            : 'bob',
//     password        : 'secret',
//     database        : 'my_db'
//   });

// connection.connect(function(err) {
//     if (err) console.error(err);
//     console.log('Connected to DB')
// });

module.exports = connection;
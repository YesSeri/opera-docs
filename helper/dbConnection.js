const mysql = require('mysql2');
let connection = ''
if (process.env.NODE_ENV !== 'production') {
    connection = mysql.createConnection(process.env.LOCAL_DB_CONNECTION_URL)
} else {

    connection = mysql.createConnection(process.env.DB_CONNECTION_URL)
}


connection.connect(function(err) {
    if (err) console.error(err);
    console.log('Connected to DB')
});

module.exports = connection;
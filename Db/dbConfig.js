
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cbwqzpst_luke'
})

connection.connect()

module.exports = connection;
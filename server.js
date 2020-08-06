const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
  multipleStatements: true,
});

mysqlConnection.connect(err => {
  if (!err) {
    console.log('Connect');
  } else {
    console.log('Connection Failed');
  }
});

app.listen(3000);

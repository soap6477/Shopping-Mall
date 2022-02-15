"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({
    user: 'root',
    password: 'node',
    database: 'mall',
    multipleStatements: true // 다중 쿼리 가능
});

db.connect();

module.exports = db;
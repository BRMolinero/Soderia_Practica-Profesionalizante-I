const mysql = require('mysql2');
const config = require('../config/dbConfig');

const pool = mysql.createPool(config);

const promisePool = pool.promise();

module.exports = promisePool;

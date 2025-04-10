
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'crm_system',
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  } else {
    console.log('MySQL db connected successsfully');
  }
});

module.exports = db;

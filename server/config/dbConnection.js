const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});

db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected to MySQL Server!");
    connection.release();
});

module.exports = db;
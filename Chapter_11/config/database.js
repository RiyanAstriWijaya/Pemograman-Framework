const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Ganti dengan password MySQL Anda
  database: "tugas11", // Nama database
});

module.exports = pool.promise();

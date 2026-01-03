const mysql = require("mysql2");

if (!process.env.MYSQL_PUBLIC_URL) {
  throw new Error("❌ MYSQL_PUBLIC_URL is missing");
}

const pool = mysql.createPool({
  uri: process.env.MYSQL_PUBLIC_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool.promise();

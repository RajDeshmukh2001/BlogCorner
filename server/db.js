import mysql from 'mysql2';

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLPASSWORD}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const db = mysql.createConnection(urlDB);

export default db;
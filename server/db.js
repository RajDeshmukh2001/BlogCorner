import mysql from 'mysql';

const urlDB = `mysql://root:bhVatF8dN4WJ4I2IBIpi@containers-us-west-62.railway.app:5887/railway`;

const db = mysql.createConnection(urlDB);

export default db;
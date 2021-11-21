const sql = require('mssql');
const config = require('./dbconfig');

const getData = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('select * from dbo.AIRWAYS');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getData };

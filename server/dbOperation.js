const sql = require('mssql');
const config = require('./dbconfig');

const getData = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query('select RuteTerbeli from dbo.LAYANAN');
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getData };

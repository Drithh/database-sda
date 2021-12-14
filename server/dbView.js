const sql = require('mssql');
const config = require('./dbconfig');

const getView = async (idView) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM VIEW' + idView);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getView };

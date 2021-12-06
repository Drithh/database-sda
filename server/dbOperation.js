const sql = require('mssql');
const config = require('./dbconfig');

const getTableName = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        "SELECT NAME FROM PENERBANGAN.sys.objects WHERE type_desc = 'USER_TABLE'"
      );
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

const getTable = async (tableName) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM ' + tableName);
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTableName, getTable };

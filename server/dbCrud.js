const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const getTableName = async () => {
  try {
    const result = await pool.query(
      `SELECT table_name FROM information_schema.tables
      WHERE table_schema = \'public\' AND table_type = \'BASE TABLE\';`
    );
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const getTable = async (tableName) => {
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const insertRow = async (tableName, props) => {
  try {
    let keys = [];
    let values = [];
    Object.keys(props).forEach((key) => {
      keys.push(key);
      values.push("'" + props[key] + "'");
    });

    await pool.query(
      `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${values.join(
        ','
      )})`
    );
  } catch (err) {
    throw err.message;
  }
};

const deleteRow = async (tableName, props) => {
  try {
    let key = Object.keys(props)[0];
    let value = "'" + Object.values(props)[0] + "'";

    await pool.query(`DELETE FROM ${tableName} WHERE ${key} = ${value}`);
  } catch (err) {
    throw err.message;
  }
};

const updateRow = async (tableName, props) => {
  try {
    let primaryKey = Object.keys(props[1])[0];
    let primaryValue = "'" + Object.values(props[1])[0] + "'";
    let valueChanged = [];
    for (const newKey in props[0]) {
      if (props[0][newKey] !== props[1][newKey] && newKey !== 'tableData') {
        valueChanged.push(`${newKey} = '${props[0][newKey]}'`);
      }
    }
    await pool.query(
      `UPDATE ${tableName} SET ${valueChanged.join(
        ','
      )} WHERE ${primaryKey} = ${primaryValue}`
    );
  } catch (err) {
    throw err.message;
  }
};

module.exports = { getTableName, getTable, insertRow, deleteRow, updateRow };

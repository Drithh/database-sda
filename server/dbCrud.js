const { Client, Pool } = require('pg');
const client = new Client();
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
});

const getTableName = async () => {
  try {
    // const pool = await client.connect(config);
    const result = await pool.query(
      'SELECT NAME FROM ' +
        config.database +
        ".sys.objects WHERE type_desc = 'USER_TABLE'"
    );
    return result.recordset;
  } catch (err) {
    console.log(err);
  }
};

const getTable = async (tableName) => {
  try {
    // const pool = await client.connect(config);
    const result = await pool.query('SELECT * FROM ' + tableName);
    return result.recordset;
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
    // const pool = await client.connect(config);
    await pool.query(
      'INSERT INTO ' +
        tableName +
        ' (' +
        keys.join(',') +
        ') VALUES (' +
        values.join(',') +
        ')'
    );
  } catch (err) {
    throw err.message;
  }
};

const deleteRow = async (tableName, props) => {
  try {
    let key = Object.keys(props)[0];
    let value = "'" + Object.values(props)[0] + "'";

    // const pool = await client.connect(config);
    await pool.query(
      'DELETE FROM ' + tableName + ' WHERE ' + key + '=' + value
    );
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
      if (props[0][newKey] !== props[1][newKey]) {
        valueChanged.push(newKey + '=' + "'" + props[0][newKey] + "'");
      }
    }

    // const pool = await client.connect(config);
    await pool.query(
      'UPDATE ' +
        tableName +
        ' SET ' +
        valueChanged.join(',') +
        ' WHERE ' +
        primaryKey +
        '=' +
        primaryValue
    );
  } catch (err) {
    throw err.message;
  }
};

module.exports = { getTableName, getTable, insertRow, deleteRow, updateRow };

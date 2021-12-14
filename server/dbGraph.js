const sql = require('mssql');
const config = require('./dbconfig');

const getTotalHasil = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('EXEC totalGDP');
    return result.recordsets;
  } catch (err) {
    console.log(err);
  }
};

const getPotensi = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM topPotensi');
    let arrayResult = [];

    let array = Array.from(
      new Set(Array.from(result.recordsets[0].map((item) => item.name)))
    );
    let object = [];
    array.forEach((item) => {
      obj = {};
      obj['name'] = item;
      object.push(obj);
    });
    result.recordsets.forEach((element) => {
      element.forEach((item) => {
        object.forEach((obj) => {
          if (obj.name === Object.values(item)[0]) {
            let namaPulau = String(Object.values(item)[2]).replace(/\s+/g, '');
            obj[namaPulau] = parseInt(Object.values(item)[1]);
          }
        });
      });
    });
    return object;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTotalHasil, getPotensi };

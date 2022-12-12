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

const getTotalHasil = async () => {
  try {
    const result = await pool.query('SELECT * from totalgdp()');
    const array = {};
    result.rows.forEach((element) => {
      if (array[element.type] === undefined) {
        array[element.type] = [
          {
            name: element.name,
            value: parseInt(element.value),
          },
        ];
      } else {
        array[element.type].push({
          name: element.name,
          value: parseInt(element.value),
        });
      }
    });
    return array;
  } catch (err) {
    console.log(err);
  }
};

const getPotensi = async () => {
  try {
    const result = await pool.query('SELECT * FROM topPotensi');
    let array = Array.from(new Set(result.rows.map((item) => item.name)));
    let object = array.map((item) => {
      return { name: item };
    });

    result.rows.forEach((element) => {
      object.forEach((obj) => {
        if (obj.name === Object.values(element)[0]) {
          let namaPulau = String(Object.values(element)[2]).replace(/\s+/g, '');
          obj[namaPulau] = parseInt(Object.values(element)[1]);
        }
      });
    });
    return object;
  } catch (err) {
    console.log(err);
  }
};

const getHasil5Tahun = async () => {
  try {
    const result = await pool.query('SELECT * FROM hasil5Tahun');

    let array = Array.from(new Set(result.rows.map((item) => item.tahun)));
    let object = array.map((item) => {
      return { time: item };
    });
    result.rows.forEach((element) => {
      object.forEach((obj) => {
        if (obj.time === Object.values(element)[1]) {
          obj[Object.values(element)[0]] = parseInt(Object.values(element)[2]);
        }
      });
    });

    return object;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTotalHasil, getPotensi, getHasil5Tahun };

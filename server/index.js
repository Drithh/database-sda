const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbOperation = require('./dbOperation');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get/table-name', (req, res) => {
  dbOperation.getTableName().then((result) => {
    res.send(result.map((tableName) => Object.values(tableName)[0]));
  });
});

app.get('/api/get/table/:tableName', (req, res) => {
  dbOperation.getTable(req.params.tableName).then((result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

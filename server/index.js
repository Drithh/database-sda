const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbOperation = require('./dbOperation');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get/table-name', (req, res) => {
  dbOperation.getTableName().then((result) => {
    res.send(result.map((tableName) => Object.values(tableName)[0]));
  });
});

app.get('/get/table/:tableName', (req, res) => {
  dbOperation.getTable(req.params.tableName).then((result) => {
    res.send(result);
  });
});

app.post('/post/insert/:tableName', (req, res) => {
  dbOperation
    .insertRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/post/delete/:tableName', (req, res) => {
  dbOperation
    .deleteRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/post/update/:tableName', (req, res) => {
  dbOperation
    .updateRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(8081, () => {
  console.log('Server started on port 8081');
});

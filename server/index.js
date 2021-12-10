const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbOperation = require('./dbOperation');
const https = require('https');

const httpsOptions = {
  cert: fs.readFileSync('/root/cert.pem'),
  key: fs.readFileSync('/root/key.pem'),
};

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

app.post('/api/post/insert/:tableName', (req, res) => {
  dbOperation
    .insertRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/post/delete/:tableName', (req, res) => {
  dbOperation
    .deleteRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/post/update/:tableName', (req, res) => {
  dbOperation
    .updateRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

https.createServer(httpsOptions, app).listen(8081);

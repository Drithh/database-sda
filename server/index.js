const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbCrud = require('./dbCrud');
const dbGraph = require('./dbGraph');
const dbView = require('./dbView');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get/table-name', (req, res) => {
  dbCrud.getTableName().then((result) => {
    res.send(result.map((tableName) => Object.values(tableName)[0]));
  });
});

app.get('/get/table/:tableName', (req, res) => {
  dbCrud.getTable(req.params.tableName).then((result) => {
    res.send(result);
  });
});

app.post('/post/insert/:tableName', (req, res) => {
  dbCrud
    .insertRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/post/delete/:tableName', (req, res) => {
  dbCrud
    .deleteRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/post/update/:tableName', (req, res) => {
  dbCrud
    .updateRow(req.params.tableName, req.body)
    .then(() => {
      res.send('1');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/get/totalHasil', (req, res) => {
  dbGraph.getTotalHasil().then((result) => {
    res.send(result);
  });
});

app.get('/get/topPotensi', (req, res) => {
  dbGraph.getPotensi().then((result) => {
    res.send(result);
  });
});

app.get('/get/hasil5Tahun', (req, res) => {
  dbGraph.getHasil5Tahun().then((result) => {
    res.send(result);
  });
});

app.get('/get/view/:id', (req, res) => {
  dbView.getView(req.params.id).then((result) => {
    res.send(result);
  });
});

app.listen(8081, () => {
  console.log('Server started on port 8081');
});

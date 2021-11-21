const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbOperation = require('./dbOperation');

dbOperation.getData().then((res) => {
  console.log(res);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

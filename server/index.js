const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbOperation = require('./dbOperation');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
  dbOperation.getData().then((result) => {
    res.send(result);   
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

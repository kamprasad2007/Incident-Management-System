'use strict';

var express = require('express');

// Constants
const { PORT = 4000, HOST = '0.0.0.0' } = process.env

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Testing');
});


app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
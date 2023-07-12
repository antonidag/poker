'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, '0.0.0.0' , () => {
  console.log(`Running on http://0.0.0.0:3000`);
});



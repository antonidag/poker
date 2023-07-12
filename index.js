'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = 'localhost';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, 'localhost', () => {
  console.log(`Running on http://localhost:3000`);
});



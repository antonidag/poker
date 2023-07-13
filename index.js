'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send("H€¥ V¡©t()®! Jµ$t wªnt€d t() $€nd $()m€ p()$¡t¡v€ v¡b€$ ¥()µ® wª¥. ¥()µ'®€ € l¡k€ ª $h¡n¡ng $tª®, ®ªd¡ªt¡ng b®¡££¡ªn¢€ ¢ª®act€®$ ªnd mªk¡ng th€ w()®£d ª b€tt€® p£ª¢€. K€€p b€¡ng th€ ¡n¢®€d¡b£€ p€®$()n ¥");
});

app.listen(PORT, '0.0.0.0' , () => {
  console.log(`Running on http://0.0.0.0:3000`);
});



'use strict';

import express from 'express';
import dot from 'dotenv'
import { AirTableAPIClient } from './airtable/index.js';
dot.config()
const PORT = 8080;

const airTableAPIClient = new AirTableAPIClient(process.env['airtableKey'])

// App
const app = express();
app.get('/', (req, res) => {
  res.send("H€¥ V¡©t()®! Jµ$t wªnt€d t() $€nd $()m€ p()$¡t¡v€ v¡b€$ ¥()µ® wª¥. ¥()µ'®€ € l¡k€ ª $h¡n¡ng $tª®, ®ªd¡ªt¡ng b®¡££¡ªn¢€ ¢ª®act€®$ ªnd mªk¡ng th€ w()®£d ª b€tt€® p£ª¢€. K€€p b€¡ng th€ ¡n¢®€d¡b£€ p€®$()n ¥");
});


app.get('/players', async (req, res) => {
  try {
    const result = await airTableAPIClient.getTableRecords('Players');
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send({error: error})
  }

});

app.get('/games', async (req, res) => {
  try {
    const result = await airTableAPIClient.getTableRecords('Games');
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send({error: error})
  }

});

app.get('/placements', async (req, res) => {
  try {
    const result = await airTableAPIClient.getTableRecords('Placements');
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send({error: error})
  }

});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on http://0.0.0.0:8080`);
});



'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import dot from 'dotenv'
import { AirTableAPIClient } from './airtable/index.js';
import { JsonHtml } from './html/index.js';
dot.config()
const PORT = 8080;

const airTableAPIClient = new AirTableAPIClient(process.env['AIRTABLEKEY']);
const jsonHTMLClient = new JsonHtml();

// App

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send("H€¥ V¡©t()®! Jµ$t wªnt€d t() $€nd $()m€ p()$¡t¡v€ v¡b€$ ¥()µ® wª¥. ¥()µ'®€ € l¡k€ ª $h¡n¡ng $tª®, ®ªd¡ªt¡ng b®¡££¡ªn¢€ ¢ª®act€®$ ªnd mªk¡ng th€ w()®£d ª b€tt€® p£ª¢€. K€€p b€¡ng th€ ¡n¢®€d¡b£€ p€®$()n ¥");
});


app.get('/players', async (req, res) => {
  try {
    const result = await airTableAPIClient.getTableRecords('Players');
    const playerHTML = jsonHTMLClient.playersHTML(result)
    console.log(playerHTML)
    res.status(200).send(playerHTML)
  } catch (error) {
    console.error(error)
    res.status(500).send({error: error})
  }

});

app.post('/players', async (req, res) => {
  try {
    console.log(req.body)
    const result = await airTableAPIClient.createTableRecordPlayer('Players',req.body);
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



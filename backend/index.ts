import express from 'express';
import fs from "fs";
import { getPlayerPlacements, getPlayerStatistics, getTotalWinnerPot } from './src/gamehistorydata';

const app = express()
const PORT = 3000

const addEndpoint = (endPointName: string, execute: Function) => {
  console.log(`Endpoint [get]: localhost:${PORT}/${endPointName}`)
  app.get(`/${endPointName}`, function (req, res) {
    const parms = req.query;
    console.log(parms);
    res.send(execute(parms))
  })
}

const addFileEndpoint = (endPointName: string) => {
  console.log(`Endpoint [get,post]: localhost:${PORT}/${endPointName}`)
  app.get(`/${endPointName}`, function (req, res) {
    res.sendFile(`data/${endPointName}.json`, { root: '.' })
  })
  app.post(`/${endPointName}`, function (req, res) {
    const rawData = fs.readFileSync(`data/${endPointName}`);
    let data = JSON.parse(rawData.toString());
    data.push(req.body);
    //Read from file
    fs.writeFile(`data/${endPointName}.json`, JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log('Results Received');
    });
    res.send('OK')
  })
}
const mediaEndpoint = (endpointName: string) => {
  console.log(`Endpoint [get,post]: localhost:${PORT}/${endpointName}?id={filename}`)
  app.get(`/${endpointName}`, function (req, res) {
    var mediaFileName = req.query.id
    res.sendFile(`data/media/${mediaFileName}`, { root: '.' })
  })
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json())

//Endpoints
const files = fs.readdirSync('./data/');
files.forEach(file => {
  if (file.includes('.json')) {
    var fileNameWithoutExtension = file.split(".")[0]
    addFileEndpoint(fileNameWithoutExtension)
  }

});

mediaEndpoint("media")
addFileEndpoint('')
addEndpoint('stats/players', getPlayerStatistics)
addEndpoint('stats/placements', getPlayerPlacements)
addEndpoint('stats/totalwinnerpot',getTotalWinnerPot)

app.listen(PORT, () => {
  console.log(`Backend end-points running at: localhost:${PORT}`)
})
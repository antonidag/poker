const express = require('express')
const app = express()
const fs = require("fs")
var cors = require('cors')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json())

//Endpoints
endpoint("player", () => {})
endpoint("game", () => { })
endpoint("gamehistory", () => { })
endpoint("placmentpoints", () => { })
mediaEndpoint("media")

var PORT = 3000

app.listen(PORT, () => {
  console.log(`Backend end-points running at: localhost:${PORT}`)
})


function endpoint(name, validate) {

  app.get(`/${name}`, function (req, res) {
    res.sendFile(`data/${name}.json`, { root: '.' })
  })
  app.post(`/${name}`, function (req, res) {
    validate(req.body);

    let rawData = fs.readFileSync(`data/${name}.json`);
    let data = JSON.parse(rawData);
    data.push(req.body);
    //Read from file
    fs.writeFile(`data/${name}.json`, JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log('Results Received');
    });
    res.send('OK')
  })
}
function mediaEndpoint(name, validate) {

  app.get(`/${name}`, function (req, res) {
    var mediaFileName = req.query.id
    res.sendFile(`data/media/${mediaFileName}`, { root: '.' })
  })
}
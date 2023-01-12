// const express = require('express')
// const app = express()
// const port = 8080

// addRoute("ranking")
// addRoute("players")
// addRoute("createplayer")
// addRoute("gameshistory")



// app.listen(port,() => {
//   console.log(`Example app listening on port http://localhost:${port}/gameshistory`)
// })


// function addRoute(pageName){
//   app.get(`/${pageName}`, (req, res) => {
//     res.sendFile(`page/${pageName}.html`,{root: "."})
//   })
//   app.get(`/${pageName}`, (req, res) => {
//     res.sendFile(`page/scripts/${pageName}.js`,{root: "."})
//   })
// }

var liveServer = require('live-server');

var params = {
	port: 8080, // Set the server port. Defaults to 8080.
	host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	root: "./page/", // Set root directory that's being served. Defaults to cwd.
	open: true, // When false, it won't load your browser by default.
	//ignore: 'scss,my/templates', // comma-separated string for paths to ignore
	//file: "ranking.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
	wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
	//mount: [['/components', './node_modules']], // Mount a directory to a route.
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
	//middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
liveServer.start(params);
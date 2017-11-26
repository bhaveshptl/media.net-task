var express = require('express');
var path = require('path');
// const WebSocket = require('ws');

// var WEB_SOCKET_URL = "ws://stocks.mnet.website";

//Init App Instance
var app = express();

//Get webapck details
var webpackconfig = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

//Consume webapck config json
var webpackcompiler = webpack(webpackconfig);
//Use middleware
app.use(webpackDevMiddleware(webpackcompiler, {
    noInfo: true,
    publicPath: webpackconfig.output.publicPath
}));

//Maintain Routes
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use(express.static('../dist'));

var filename = path.resolve(__dirname, '..', 'index.html');
app.get('/', function (req, res) {
    res.sendFile(filename);
});

// var ws;
// var WebSocketServer = require('ws').Server;
// var wss = new WebSocket.Server({ port: 1234 });
// wss.on('connection', function () {
//     ws = new WebSocket(WEB_SOCKET_URL);
//     ws.onmessage = (event) => {
//         wss.clients.forEach((clients) => {
//             clients.send(event.data);
//         });
//     }
// });

//Server Listening....
var port = process.env.PORT || 5000;
app.listen(port, function (error) {
    if (error) throw err;
})
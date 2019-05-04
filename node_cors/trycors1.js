var express = require('express');
var server = express();
var cors = require('cors');
var bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.get('/endpoint', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

server.use(cors());

server.listen(3005, () => {
  console.log('Listenning at http://localhost:3000' )
})
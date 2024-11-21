require('dotenv').config();

// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const server = express();
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

// config
require('./config/db'); // db connection
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(multerMid.single('file'))

// routes
server.use('/mobile/user', require('./routes/mobile/user.router.js'));
server.use('/mobile/product', require('./routes/mobile/product.router.js'));
server.use('/mobile/food', require('./routes/mobile/food.router.js'));
server.use('/mobile/question', require('./routes/mobile/question.router.js'));
server.get('/health', (req, res) => {
  return res.send('success!');
});
server.use(express.static(__dirname + '/public'));
server.get('/', (req, res) => {
  return res.sendFile(__dirname+'/public/index.html');
});

server.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

// Port
const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Server listening at ${port}`));

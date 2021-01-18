require('dotenv').config();
const express = require('express');
const connectDb = require("./db/conn");
const cors = require('cors');

const middlewares = require('./middlewares.js');
const api = require('./api');

let app = express();
//app.set('trust proxy', 1);
app.use(express.json());

app.use(cors());

//app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
//app.use('/public', express.static(__dirname + '/../public'));
app.use('/api', api);

let port = process.env.PORT || 3003;


app.listen(port, function() {
  console.log(`Server running on port ${port}...`);
  connectDb();
});

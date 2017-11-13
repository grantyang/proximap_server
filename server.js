var express = require('express');
var request = require('request');
var app = express();
var port = 5000;

require('dotenv').config();

app.use(function(req, res, next) {
  // Any client can get this information, I dont care what URL they are on
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get('/fsquare/explore', function(req, res) {
  let updated_qs = Object.assign(
    {},
    {
      client_secret: process.env.FSQUARE_SECRET,
      client_id: process.env.FSQUARE_ID,
      v: '20170801'
    },
    req.query
  );
  request(
    {
      url: 'https://api.foursquare.com/v2/venues/explore', // + req.pathname,
      qs: updated_qs
    },
    (err, response, body) => {
      if (err) {
        console.log('error');
        return;
      }
      res.json(JSON.parse(body));
    }
  );
});

app.listen(port);

console.log('API server started on: ' + port);

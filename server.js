var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authApi = require('./authApi');



var app = express();
app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json({}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mongoose.connect(process.env.MONGODB_URI, function(err){
  if(err) console.log(err);
}); 
authApi(app); // use auth api

app.listen(app.get('port'), function(err){
  if (err) {
    console.error(err);
    return;
  }
  console.log('Listening on port' + app.get('port'));
});

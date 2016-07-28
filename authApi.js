var buildAuthorizationUrl = require('shopify-prime').buildAuthorizationUrl;
var authorize = require('shopify-prime').authorize;
var User = require('./models/user');
var axios = require('axios');
var serverConstants = require('./constants').serverConstants;
// var helpers = require('./utils/helpers');

var baseURL = 'http://shopifydesktopserver.herokuapp.com';

module.exports = function(app){
  app.post('/api/webhook', function(request, response){
    console.log(request.body, request.data, request.params);
    response.status(200).json({data:'cool'});
  });


  app.get('/', function(request, response) {
      response.status(200).json({data: 'Yes its working'});
  }); 

  app.post('/test', function(req, res){
    res.status(200).json({ data: 'done' });
  });

  app.post('/auth/login', function(req, res){
    User.findOne({storeName: req.body.url + '.myshopify.com'}, function(err, store){
      res.status(200).json(store);
    });
  });

  app.post('/auth/shopifyRedirect', function(req, res){
    var shopURL = 'https://' + req.body.url + '.myshopify.com';
    var redirectUrl = baseURL + '/auth/shopifyRedirect';
    var permissions =
    ['read_orders',
    'read_content',
    'read_customers',
    'read_products',
    'read_fulfillments',
    'write_orders',
    'write_content',
    'write_customers',
    'write_products',
    'write_fulfillments'];
    buildAuthorizationUrl(permissions, shopURL, process.env.SHOPIFYAPIKEY, redirectUrl)
    .then(function(response){ res.status(200).json(response); });
  });

  app.get('/auth/shopifyRedirect', function(request, response){
    var code = request.query.code;
    var shop = request.query.shop;

    authorize(code, shop, process.env.SHOPIFYAPIKEY, process.env.SHOPIFYSHAREDSECRET)
    .then(function(authResponse){
      User.findOrCreate({
        storeName: shop,
        accessToken: authResponse,
        webhooksSetUp: false
      }, function(err, data){
        if (err) console.log(err); // eslint-disable-line

        var currInstance = axios.create({
          baseURL: `https://${shop}/admin`,
          headers: { 'X-Shopify-Access-Token': authResponse }
        });

        if(data.webhooksSetUp){
          response.sendFile(__dirname + '/utils/closeWindow.html');
        } else {

          var functionsToRun = [];

          for(var i = 0; i< serverConstants.length;i++){
            functionsToRun.push(currInstance.post('/webhooks.json',{
                "webhook":{
                  "topic": serverConstants[i],
                  "address": `${baseURL}/api/webhook`,
                  "format": 'json'
                }
            }));
          }

          Promise.all(functionsToRun)
          .then(function(data){
            // console.log(data);
            User.update({storeName: shop, accessToken: authResponse}, {$set: {webhooksSetUp: true}}, function(err, data){
              if(!err) response.sendFile(__dirname + '/utils/closeWindow.html');
            });
          })
          .catch(function(err){
            if(err) console.log(err);
          });
        }
      });
    })
    .catch(function(err){ response.status(400).json(err); });
  });
};


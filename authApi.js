var buildAuthorizationUrl = require('shopify-prime').buildAuthorizationUrl;
var authorize = require('shopify-prime').authorize;
var User = require('./models/user');
var apiKey = require('./config_shopify').apiKey;
var sharedSecret = require('./config_shopify').sharedSecret;

module.exports = function(app){
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
    var redirectUrl = 'http://localhost:3000/auth/shopifyRedirect';
    var permissions =
    ['read_orders',
    'read_content',
    'read_customers',
    'read_products',
    'read_analytics'];
    buildAuthorizationUrl(permissions, shopURL, apiKey, redirectUrl)
    .then(function(response){ res.status(200).json(response); });
  });

  app.get('/auth/shopifyRedirect', function(request, response){
    var code = request.query.code;
    var shop = request.query.shop;

    authorize(code, shop, apiKey, sharedSecret)
    .then(function(authResponse){
      User.findOrCreate({
        storeName: shop,
        accessToken: authResponse
      }, function(err){
        if (err) console.log(err); // eslint-disable-line
        response.sendFile(__dirname + '/utils/closeWindow.html');
      });
    })
    .catch(function(err){ response.status(400).json(err); });
  });
};


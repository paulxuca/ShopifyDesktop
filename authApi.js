import { buildAuthorizationUrl, authorize } from 'shopify-prime';
import { apiKey, sharedSecret } from './config_shopify';
import User from './models/user';


export default (app) => {
  app.post('/test', (req, res) => {
    res.status(200).json({ data: 'done' });
  });

  app.post('/auth/login', (req, res) => {
    User.findOne({ storeName: `${req.body.url}.myshopify.com` }, (err, store) => {
      res.status(200).json(store);
    });
  });

  app.post('/auth/shopifyRedirect', (req, res) => {
    const shopURL = `https://${req.body.url}.myshopify.com`;
    const redirectUrl = 'http://localhost:3000/auth/shopifyRedirect';
    const permissions =
    ['read_orders',
    'read_content',
    'read_customers',
    'read_products',
    'read_analytics'];
    buildAuthorizationUrl(permissions, shopURL, apiKey, redirectUrl)
    .then(response => { res.status(200).json(response); });
  });

  app.get('/auth/shopifyRedirect', (request, response) => {
    const { code, shop } = request.query;
    authorize(code, shop, apiKey, sharedSecret)
    .then(authResponse => {
      User.findOrCreate({
        storeName: shop,
        accessToken: authResponse
      }, (err) => {
        if (err) console.log(err); // eslint-disable-line
        response.sendFile(`${__dirname}/utils/closeWindow.html`);
      });
    })
    .catch(err => { response.status(400).json(err); });
  });
};


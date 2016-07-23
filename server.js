import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authApi from './authApi';


const app = express();
app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json({}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if(err) console.log(err);
});
authApi(app); // use auth api

const server = app.listen(app.get('port'), 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening on port ${app.get('port')}`);
});

process.on('SIGTERM', () => {
  console.log('Stopping deev server');
  server.close(() => {
    process.exit(0);
  });
});

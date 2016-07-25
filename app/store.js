if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config/configureStore.production'); //eslint-disable-line
} else {
  module.exports = require('./config/configureStore.development'); // eslint-disable-line
}

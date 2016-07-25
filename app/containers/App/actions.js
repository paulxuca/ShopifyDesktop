import jsonStorage from 'electron-json-storage';
import axios from 'axios';
const { BrowserWindow } = require('electron').remote;

import { mergeObjects } from '../../utils/Shopify/helpers';
import {
  LOGIN_SHOP,
  LOGIN_SHOP_SUCCESS,
  LOGIN_SHOP_ERROR,
  CREDENTIALS_CHECK,
  CREDENTIALS_CHECK_VALID,
  CREDENTIALS_CHECK_INVALID,
  authServerURL
} from './constants';


function loginShop(data) {
  return dispatch => { //eslint-disable-line
    return new Promise((resolve, reject) => {
      dispatch(loginShopStart());
      axios({ method: 'post', url: `${authServerURL}/auth/shopifyRedirect`, data: { url: data } })
      .then(response => {
        let confirmationWindow = new BrowserWindow({ width: 800, height: 600, frame: false, alwaysOnTop: true }); //eslint-disable-line
        confirmationWindow.loadURL(response.data);
        confirmationWindow.on('closed', () => {
          confirmationWindow = null;
          axios({ method: 'post', url: `${authServerURL}/auth/login`, data: { url: data } })
          .then(loginResponse => {
            const { storeName, accessToken } = loginResponse.data;
            const writeToDisk = {
              storeName,
              accessToken
            };
            mergeObjects('userKeys', writeToDisk)
            .then(() => { if (data) resolve(dispatch(loginShopSucess(writeToDisk))); })
            .catch((err) => { if (err) reject(err); });
          })
          .catch(err => {
            if (err) dispatch(loginShopError(err));
            reject(err);
          });
        });
      });
    });
  };
}

function checkCredentials() {
  return dispatch => { //eslint-disable-line
    return new Promise((resolve, reject) => {
      dispatch(checkCredentialsStart());
      jsonStorage.get('userKeys', (err, data) => {
        if (err) return reject(dispatch(checkCredentialsInvalid(err.toString())));
        if (!data.accessToken || !data.storeName) return reject(dispatch(checkCredentialsInvalid('NO_KEYS_FOUND')));
        if (data.accessToken && data.storeName) return resolve(dispatch(checkCredentialsValid(data)));
      });
    });
  };
}


function loginShopStart() {
  return {
    type: LOGIN_SHOP
  };
}


function loginShopSucess(payload) {
  return {
    type: LOGIN_SHOP_SUCCESS,
    payload
  };
}

function loginShopError(payload) {
  return {
    type: LOGIN_SHOP_ERROR,
    payload
  };
}



function checkCredentialsStart() {
  return {
    type: CREDENTIALS_CHECK
  };
}

function checkCredentialsValid(data) {
  return {
    type: CREDENTIALS_CHECK_VALID,
    payload: data
  };
}

function checkCredentialsInvalid(errors) {
  return {
    type: CREDENTIALS_CHECK_INVALID,
    payload: errors
  };
}


export default {
  checkCredentials,
  loginShop
};

import axios from 'axios';
import { storeNewestID, grabNewestID } from './helpers';
import _ from 'lodash';

function grabChunkCount(instance, dataType, sinceId) {
  let params = { //eslint-disable-line
    status: 'any'
  };
  if (sinceId) {
    params.since_id = sinceId;
  }

  return new Promise((resolve, reject) => {
    instance.get(`/${dataType}/count.json`, { params: { status: 'any', since_id: sinceId } })
    .then(res => {
      if (res.data.count !== 0) {
        resolve(Math.ceil(res.data.count / 250));
      } else {
        resolve(0);
      }
    })
    .catch(err => { reject(err); });
  });
}


function fetchChunk(chunk, instance, dataType, since) {
  return new Promise((resolve, reject) => {
    instance.get(`/${dataType}.json`,
    { params: {
      page: chunk,
      status: 'any',
      limit: 250,
      since_id: since }
  })
    .then(res => resolve(res.data[`${dataType}`]))
    .catch(err => reject(err));
  });
}

export async function fetchType(dataType, accessToken, storeName) {
  let functionsToRun = []; //eslint-disable-line
  const shopifyInstance = axios.create({
    baseURL: `https://${storeName}/admin`,
    headers: { 'X-Shopify-Access-Token': accessToken }
  }); // creating an instance of the shopify api for each
  const newestID = await grabNewestID(dataType); // grab the newestID of the latest fetch
  const count = await grabChunkCount(shopifyInstance, dataType, newestID);
  if (count === 0) return;
  let i = 0;
  for (;i < count; i++) { // Creating an array of functions to map and promise all
    functionsToRun.push(fetchChunk(i + 1, shopifyInstance, dataType, newestID));
  }
  const res = await Promise.all(functionsToRun);
  if (res) {
    if (dataType !== 'products') {
      await storeNewestID(dataType, res[0][0].id);
    } else {
      await storeNewestID(dataType, _.maxBy(_.flatten(res), item => item.id).id);
    }
  }
  return res;
}

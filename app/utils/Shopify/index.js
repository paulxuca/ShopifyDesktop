import _ from 'lodash';
import { numberDataTypes, booleanDataTypes, DataDefaults, iteration } from './constants';
import { fetchType } from './fetch';
const remote = require('electron').remote;


function checkForTable(table) {
  return new Promise((resolve, reject) => {
    remote.getGlobal('sql').get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`, (err, res) => { // eslint-disable-line
      if (err != null) return resolve(false);
      if (!res) return resolve(false);
      if (res) return resolve(true);
      if (!err && !res)reject(Error('Checking for Table Failed.'));
    });
  });
}

function grabColumnsFromResult(data, dataType) {
  const columns = Object.keys(data);
  const returnedColumns = [];
  // console.log(numberDataTypes);
  let iter = 0;
  for (; iter < columns.length; iter++) {
    if (numberDataTypes.hasOwnProperty(columns[iter])) {
      returnedColumns.push(`${columns[iter]} INT`);
    } else if (booleanDataTypes.hasOwnProperty(columns[iter])) {
      returnedColumns.push(`${columns[iter]} BOOLEAN`);
    } else {
      returnedColumns.push(`${columns[iter]} TEXT`);
    }
  }
  if (dataType === 'orders' && returnedColumns.length !== 60) {
    returnedColumns.push('status TEXT');
  }
  return (`(${returnedColumns.join(', ')})`);
}

function createTable(dataType, columns) {
  remote.getGlobal('sql').run(`CREATE TABLE ${dataType} ${columns}`);
}

function constructDataToBeInserted(data, dataType) {
  // const returnedString = [];
  const newObj = _.clone(DataDefaults[dataType]);
  for (var prop in data) { //eslint-disable-line
    if (typeof data[prop] === 'object') {
      newObj[prop] = escape(JSON.stringify(data[prop]));
    } else if (typeof data[prop] === 'boolean') {
      if (data[prop]) {
        newObj[prop] = 1;
      } else {
        newObj[prop] = 0;
      }
    } else if (typeof data[prop] === 'number') {
      newObj[prop] = data[prop];
    } else {
      newObj[prop] = data[prop].replace(/"/g, "'"); //eslint-disable-line
    }
  }
  return (_.toArray(newObj).map((elem) => { return '"' + elem + '"'; }).join(',')); //eslint-disable-line
}

function prepareChunkToBeInserted(table, data) {
  let pieceIter = 0;
  for (;pieceIter < data.length; pieceIter++) {
    const toBeInserted = constructDataToBeInserted(data[pieceIter], table);
    remote.getGlobal('sql').run(`INSERT INTO ${table} VALUES (${toBeInserted})`, (err) => {
      if (err) console.log(err, toBeInserted);
    }); //eslint-disable-line
  }
}

function insertDataIntoTable(table, data) {
  return new Promise((resolve) => {
    let chunkIter = 0;
    for (;chunkIter < data.length; chunkIter++) {
      prepareChunkToBeInserted(table, data[chunkIter]);
    }
    resolve(`Done storing all ${table} data.`);
  });
}

export async function fetchData(accessToken, storeName) {
  for (let i = 0; i < iteration.length; i++) {
    try {
      const currType = iteration[i];
      const fetchedData = await fetchType(currType, accessToken, storeName);
      if (fetchedData) {
        const tableExists = await checkForTable(currType);
        if (!tableExists) {
          const dataToBeGrabbedFrom = _.maxBy(fetchedData[0], (data) => { return Object.keys(data).length; }); //eslint-disable-line
          const columns = grabColumnsFromResult(dataToBeGrabbedFrom, currType);
          await createTable(currType, columns);
        }
        await insertDataIntoTable(currType, fetchedData);
      }
    } catch (err) {
      console.log(err);
    }
  }
}


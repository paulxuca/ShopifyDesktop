const jsonStorage = require('electron-json-storage');

function mergeObjects(file, newObj) {
  return new Promise((resolve, reject) => {
    jsonStorage.get(file, (readError, data) => {
      if (readError) reject(readError);
      const merged = Object.assign(data, newObj);
      jsonStorage.set(file, merged, (writeError) => {
        if (writeError) reject(writeError);
        resolve('Done Storing and merging user file.');
      });
    });
  });
}

function storeNewestID(dataType, newID) {
  return new Promise((resolve, reject) => {
    const newObj = {};
    newObj[`newest_${dataType}`] = newID;
    mergeObjects('userKeys', newObj)
    .then(() => {
      resolve(`Done Storing Newest Id for ${dataType}`);
    })
    .catch((writeError) => {
      if (writeError) reject(writeError);
    });
  });
}

function grabNewestID(dataType) {
  return new Promise((resolve, reject) => {
    jsonStorage.get('userKeys', (err, data) => {
      if (data[`newest_${dataType}`]) return resolve(data[`newest_${dataType}`]);
      resolve(null);
      if (err) reject(err);
    });
  });
}



export default {
  mergeObjects,
  grabNewestID,
  storeNewestID
};

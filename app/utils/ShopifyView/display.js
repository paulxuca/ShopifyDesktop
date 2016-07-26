import _ from 'lodash';
const remote = require('electron').remote;

import { shallowMerge } from '../sharedHelpers';
import constantsObject from './constants';

function parseQuery(string) {
  const splitQuery = string.split(/AND|SORT|WHERE/i);
  return splitQuery.map((elem) => { return `${elem} COLLATE NOCASE`; }).join(' AND ');
}

function selectData(view, params, action, query) {
  return new Promise((resolve, reject) => {
    /* Watcher for Pagination
    requires a pointer_value: pointer selector
    and pointer_name

     */
    let offsetValue;
    const queryString = (query) ? `WHERE ${parseQuery(query)}` : '';

    if (params[view] && params[view].offset) {
      offsetValue = params[`${view}_pointer`].pointer_value.offset;
    } else {
      offsetValue = 0;
    }

    if (action === 'next') {
      offsetValue = (params[`${view}_pointer`].pointer_value.offset + 1);
    } else if (action === 'prev') {
      offsetValue = (params[`${view}_pointer`].pointer_value.offset - 1);
    }

    // if (action && !query) {
    //   pointer = pagination(action, params[`${view}_pointer`].pointer_value);
    //   queryString = '';
    // }

    // if (query) {
    //   queryString = ` WHERE ${query} COLLATE NOCASE`;
    // }

    remote.getGlobal('sql').all(`SELECT * FROM ${view} ${queryString} LIMIT ${constantsObject.PAGE_LIMIT} OFFSET ${offsetValue * 100}`,
    (err, res) => {
      if (err) reject(err); // reject promise if there was an error

      const pointerParams = {};
      pointerParams[`${view}_pointer`] = {
        pointer_value: {
          offset: (action) ? offsetValue : 0,
          lastPage: (res.length < 100)
        }
      };

      // Filtering keys based on Type of data
      let iter = 0;
      const filteredList = [];
      for (;iter < res.length; iter++) {
        filteredList.push(_.pick(res[iter], constantsObject[view]));
      }

      // if (action && action === 'prev') _.reverse(filteredList); // reversing array because it's SQL

      // // Updating Pointer to end of page
      // // const pointerParams = {};
      // pointerParams[`${view}_pointer`] = {
      //   pointer_value: {
      //     start: filteredList[0].id,
      //     end: filteredList[res.length - 1].id,
      //     last_page: (res.length < 100)
      //   }
      // };

      const newParams = shallowMerge(params, pointerParams);
      // resolving params because of updating pointer potentially
      resolve({ res: filteredList.splice(0, res.length - 1), params: newParams });
    });
  });
}


export default {
  selectData
};

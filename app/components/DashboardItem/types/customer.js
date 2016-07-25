import React from 'react';
import { jsonStringToObject } from './helpers';

export function generateCustomer(properties, onClickFunction) {
  const addressData = (properties.default_address !== 'null') ?
   jsonStringToObject(properties.default_address) : { city: '', country_code: '' };


  if (addressData !== null) {
    // need to verify data exists before rendering new type of list

    const lastOrderSpan = (properties.last_order_name !== 'null') ?
    (<span>
      <span className="icon icon-ccw" style={{ marginLeft: 7 }}>
      </span>
      {properties.last_order_name}
    </span>) :
    null;

    return (
      <li className="list-group-item" onClick={onClickFunction}>
        <div className="media-body">
          <p className="list-item-id capitalize">
            <strong>
            {`${properties.first_name} ${properties.last_name}`}
            </strong>
          </p>
          <p className="list-item-details">
            <span className="icon icon-location"></span>
            <span className="capitalize">
              {addressData.city}, {addressData.country_code}
            </span>
            <span className="icon icon-basket"></span>
            <span>{`${properties.orders_count}`}</span>
          </p>
        </div>
        <p className="list-item-moreInfo">
          <span className="icon icon-bag"></span>
            ${properties.total_spent}
            {lastOrderSpan}
        </p>
      </li>);
  }
  return null;
}

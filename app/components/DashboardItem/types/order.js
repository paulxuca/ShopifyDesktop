import React from 'react';
import moment from 'moment';
import { jsonStringToObject, checkDateToday } from './helpers';

export function generateOrder(properties, onClickFunction) {
  const userData = (properties.customer) ?
    jsonStringToObject(properties.customer) : { first_name: '', last_name: '' };

  const dateMoment = moment(properties.created_at);
  const dateSpan = checkDateToday(dateMoment) ?
    dateMoment.format('hh:mm a') :
    dateMoment.format('MMM D');
  const fulfilledSpan = (properties.fulfillments !== []) ?
    <span className="badges">Fulfilled</span> :
    '';
  const financialStatusSpan = (properties.financial_status) ?
    properties.financial_status.replace(/_/g, ' ') :
    '';
  const totalPriceSpan = (properties.total_price) ?
    properties.total_price.toFixed(2) :
    '';

  return (
    <li className="list-group-item" onClick={onClickFunction}>
      <div className="media-body">
        <p className="list-item-id"><strong>Order Number {properties.name}</strong></p>
        <p className="list-item-details">
          <span>
            {dateSpan}
          </span>
          <span className="icon icon-user"></span>
          <span className="capitalize">
          {userData.first_name} {userData.last_name}
          </span>
          <span className="display-block">
          {financialStatusSpan} {fulfilledSpan}
          </span>
        </p>
      </div>
      <p className="list-item-moreInfo">
        <span className="icon icon-bag"></span>
          ${totalPriceSpan}
      </p>
    </li>);
}

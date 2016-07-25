import React from 'react';
import { jsonStringToObject } from './helpers';

export function generateProducts(properties, onClickFunction) {
  const variantData = properties.variants ? jsonStringToObject(properties.variants) : null;
  const imageData = properties.image ? jsonStringToObject(properties.image) : null;

  if (variantData && imageData) {
    const variantCount = variantData.reduce((total, each) => { return total + each.inventory_quantity; }
      , 0);
    const variantSpan = (variantCount > 0) ?
    `${variantCount} available in ${variantData.length} variants` :
    'N/A';
    return (
      <li className="list-group-item" onClick={onClickFunction}>
        <div className="media-body">
          <div style={{ backgroundImage: `url(${imageData.src})` }} className="product-image" />
          <div className="product-information">
            <p>{properties.title}</p>
            <p>{properties.product_type}</p>
            <p>{properties.vendor}</p>
            <p>{variantSpan}</p>
          </div>
        </div>
      </li>);
  }
  return null;
}

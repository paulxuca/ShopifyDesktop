import React from 'react';
import { jsonStringToObject } from './helpers';

export function generateProducts(properties, onClickFunction) {
  const variantData = properties.variants ? jsonStringToObject(properties.variants) : null;
  const imageData = properties.image ? jsonStringToObject(properties.image) : null;

  if (variantData && imageData) {
    const variantCount = variantData.reduce((total, each) => { return total + each.inventory_quantity; }
      , 0);
    const variantSpan = (variantCount > 0) ?
      <p><span className="highlight-warning">{`${variantCount}`}</span> {`available in ${variantData.length} variants`}</p> :
      <p>N/A</p>;
    return (
      <li className="list-group-item product" onClick={onClickFunction}>
        <div className="media-body">
          <div style={{ backgroundImage: `url(${imageData.src}), url(https://placeholdit.imgix.net/~text?txtsize=33&w=350&h=150)` }} className="product-image" />
          <div className="product-information">
            <p>{properties.title}</p>
            <p>{properties.product_type}</p>
            <p>{properties.vendor}</p>
            {variantSpan}
          </div>
        </div>
      </li>);
  }
  return null;
}

import * as React from 'react';
import './Business.css';
import { MappedBusiness } from '../../util/types';
/// <reference path="react.d.ts" />
/* this is just test of using typescript in react
it should not use Business.js file while .tsx is imported in BusinessList.js */

type BusinessType ={
    key: any,
    business: MappedBusiness,
}

const Business = (props: BusinessType) => {
  return (
    <div className="Business">
      <div className="image-container">
        <img src={props.business.imageSrc} alt="The venue" />
      </div>
      <h2>{props.business.name}</h2>
      <div className="Business-information">
        <div className="Business-address">
          <p>{props.business.address}</p>
          <p>{props.business.city}</p>
          <p>
            {props.business.state} {props.business.zipCode}
          </p>
        </div>
        <div className="Business-reviews">
          <h3>{props.business.category}</h3>
          <h3 className="rating">{props.business.rating} stars</h3>
          <p>{props.business.reviewCount} reviews</p>
        </div>
      </div>
    </div>
  );
};

export default Business;
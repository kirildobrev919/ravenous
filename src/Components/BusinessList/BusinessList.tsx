import React from "react";
import "./BusinessList.css";
import Business from "../Business/Business";
import { MappedBusiness } from "../../util/types";

type BusinesListType = {
  businesses: MappedBusiness[];
};

const BusinessList = (props: BusinesListType) => {
  const businessesArr = props.businesses;

  const getListOfBusineses = () => {
    let list;
    if (businessesArr && businessesArr.length !== 0) {
      list = props.businesses.map((business) => {
        return <Business key={business.id} business={business} />;
      });
    } else {
      list = undefined;
    }
    return list;
  };

  return <div className="BusinessList">{getListOfBusineses()}</div>;
};

export default BusinessList;

import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
    render() {
        debugger;
        const businessesArr = this.props.businesses;
        let list;
        if (businessesArr && businessesArr.length != 0 ) {
            list = this.props.businesses.map(business => {
                return <Business key={business.id} business={business} />;
            })
        } else {
            list = undefined;
        }

        return (
            <div className="BusinessList">
                {list}
            </div>
        )
    }
}

export default BusinessList;
import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

 class BusinessList extends React.Component{
    render(){
        debugger;
        return (
            <div className="BusinessList">
                {
                    this.props.businesses.map(business => {
                      return <Business key={business.id} business={business}/>;
                    })
                }
            </div>            
        )
    }
}

export default BusinessList;
import React, { useState } from 'react';
import './App.css';
import BusinesList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import * as Yelp from '../../util/Yelp';
import { SortByOptionValue, MappedBusiness } from '../../util/types';

const App = () => {
  const [businesses, setBusinesses] = useState<MappedBusiness[] | undefined>();

  const searchYelp = async (term: string, location: string, sortBy: SortByOptionValue ) => {
    try {
      const result = await Yelp.search({term, location, sortBy});
      setBusinesses(result);
    } catch (err) {
      console.log('Error catched:');
      console.log(err);
      alert('Ooops, something went wrong. Probably we dont have info for that location.');
    }
  }

  const handleResult = () => {
    let notUndefined;
    if (businesses) {
      if (businesses.length > 0) {
        notUndefined = <BusinesList businesses={businesses} />
      } else {
        notUndefined = <h1 style={{ textAlign: 'center' }}>Sorry we don't have information for this location</h1>
      }
    } else {
      notUndefined = <h1 style={{ textAlign: 'center' }}>Sorry unknown location</h1>
    }

    return notUndefined;
  }

  return (
    <div className="App">
      <h1>Place Finder</h1>
      <SearchBar searchYelp={searchYelp} />
      {handleResult()}
    </div>
  );
}

export default App;

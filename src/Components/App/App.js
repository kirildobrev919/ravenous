import React from 'react';
import './App.css';
import BusinesList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      businesses: []
    }

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    debugger;
    try {
      Yelp.search(term, location, sortBy).then(businesses => {
        this.setState({ businesses: businesses });
      });
    } catch (err) {
      console.log(err);
      alert('Ooops, something went wrong. Probably we dont have info for that location.');
    }
  }

  render() {
    let notUndefined;
    if (this.state.businesses !== undefined) {
      notUndefined = <BusinesList businesses={this.state.businesses} />
    }else{
      notUndefined = <h1 style={{textAlign:'center'}}>Sorry we don't have information for this location</h1>
    }

    return (
      <div className="App">
        <h1>Place Finder</h1>
        <SearchBar searchYelp={this.searchYelp} />
        {notUndefined}
      </div>
    );
  }
}

export default App;

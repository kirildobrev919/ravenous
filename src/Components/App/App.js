import React from 'react';
//import logo from './logo.svg';
//import logo from './favicon.ico';
import './App.css';
import BusinesList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar />
      <BusinesList />
    </div>
  );
}

export default App;

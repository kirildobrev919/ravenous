import React, { useState } from "react";
import "./SearchBar.css";
import {
  SortByOptionKey,
  SortByOptionValue,
  sortByOptions,
} from "../../util/types";

type SearchBarType = {
  searchYelp: (term: string, location: string, sortBy: SortByOptionValue) => {};
};

const SearchBar = (props: SearchBarType) => {
  const [term, setTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortByOptionValue>("best_match");

  const sortByOptionKeys = Object.keys(sortByOptions) as SortByOptionKey[];

  const getSortByClass = (sortByOption: string) => {
    if (sortByOption === sortBy) {
      return "active";
    } else {
      return "";
    }
  };

  const handleSortByChange = (sortByOption: SortByOptionValue) => {
    setSortBy(sortByOption);
  };

  const handleTermChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTerm(event.target.value);
  };

  const handleLocationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event: { preventDefault: () => void }) => {
    console.log("Running search in Yelp");
    props.searchYelp(term, location, sortBy);
    event.preventDefault();
  };

  //li elements for search options in search bar
  const renderSortByOptions = () => {
    return (
      <ul>
        {sortByOptionKeys.map((key) => {
          const value: SortByOptionValue = sortByOptions[key];
          return (
            <li
              key={value}
              onClick={() => handleSortByChange(value)} // important: pass a function
              className={getSortByClass(value)}
            >
              {key}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className="SearchBar-fields">
        <input onChange={handleTermChange} placeholder="Search Businesses" />
        <input onChange={handleLocationChange} placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <button type="button" onClick={handleSearch}>
          Let&apos;s Go
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

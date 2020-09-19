import React, { useState } from 'react';
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'

function Search() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <h2>Search</h2>
      <SearchBar setSearchValue={setSearchValue}></SearchBar>
      <SearchResults searchValue={searchValue}></SearchResults>
    </>
  );
}

export default Search;

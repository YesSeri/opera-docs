import React, { useState } from 'react';
import SearchResults from './search/SearchResults'
import SearchBar from './search/SearchBar'

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

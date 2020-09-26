import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
// This is just a container for the search
function Search() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <SearchBar setSearchValue={setSearchValue}></SearchBar>
      <SearchResults searchValue={searchValue}></SearchResults>
    </>
  );
}

export default Search;

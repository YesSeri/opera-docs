import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Banner from './Banner';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Banner></Banner>
      <SearchBar setSearchValue={setSearchValue}></SearchBar>
      <SearchResults searchValue={searchValue}></SearchResults>
    </>
  );
}

export default Search;

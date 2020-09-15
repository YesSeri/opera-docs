import React, { useState } from 'react';
import SearchResults from './search/SearchResults'
import SearchBar from './search/SearchBar'

function Home() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <h2>Home</h2>
      <SearchBar setSearchValue={setSearchValue}></SearchBar>
      <SearchResults searchValue={searchValue}></SearchResults>
    </>
  );
}

export default Home;

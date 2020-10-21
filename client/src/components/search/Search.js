import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import { Helmet } from 'react-helmet'
// This is just a container for the search
function Search() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Helmet>
        <title>
          Search for Arias, Ensembles, Recitatives and Ouvertures
        </title>
      </Helmet>
      <SearchBar setSearchValue={setSearchValue}></SearchBar>
      <SearchResults searchValue={searchValue}></SearchResults>
    </>
  );
}

export default Search;

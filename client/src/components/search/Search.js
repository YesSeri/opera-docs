import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import Banner from './Banner';
import Container from 'react-bootstrap/Container';
import { search } from './SearchResultsHelper';
import { StyledSearch } from '../css/styComp';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  return (
      <Container fluid className="searchContainer">
        <h1>Search</h1>
        <Banner></Banner>
        <SearchBar setSearchValue={setSearchValue}></SearchBar>
        <SearchResults searchValue={searchValue}></SearchResults>
      </Container>
  );
}

export default Search;

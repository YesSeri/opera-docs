import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';
import { Helmet } from 'react-helmet';
// This is just a container for the search
function Search() {
	const [searchValue, setSearchValue] = useState('');
	return (
		<>
			<Helmet>
				<title>
					operadocs - Search for Arias, Ensembles, Recitatives and Ouvertures
				</title>
			</Helmet>
			<SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
			<SearchResults searchValue={searchValue} />
		</>
	);
}

export default Search;

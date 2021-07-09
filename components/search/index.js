import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
// This is just a container for the search
function Search({ data }) {
	const [searchValue, setSearchValue] = useState('');
	return (
		<>
			<SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
			{data && <SearchResults searchValue={searchValue} data={data} />}
		</>
	);
}

export default Search;

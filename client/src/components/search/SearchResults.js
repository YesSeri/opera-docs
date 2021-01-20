import React, { useState, useEffect } from 'react';
import {
	optionsPieces,
	optionsOperas,
	optionsComposers,
	search,
} from './SearchResultsHelper';
import { getApiData } from '../utils/utilFunctions';
import TopResult from './TopResult';
import OtherResults from './OtherResults';
import './searchResults.css';

// I have to make three seperate searches. One for each category, composer, opera and piece. Here I define what the options for the searches should be. It doesn't need to be sorted, because I will have to combine the three lists myself into one big, and compare the search scores of the big array to discover which order of matching.

export default function SearchResults({ searchValue }) {
	const [pieces, setPieces] = useState(null);
	const [operas, setOperas] = useState(null);
	const [composers, setComposers] = useState(null);
	const [results, setResults] = useState(null);
	useEffect(() => {
		const piecesSource = getApiData(`/api/search/`, setPieces); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		const operasSource = getApiData(`/api/operas/`, setOperas); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		const composersSource = getApiData(`/api/composers/`, setComposers); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			piecesSource.cancel(
				'Component was unmounted, axios search request is cancelled.'
			);
			operasSource.cancel(
				'Component was unmounted, axios opera request is cancelled.'
			);
			composersSource.cancel(
				'Component was unmounted, axios composer request is cancelled.'
			);
		};
	}, []);

	useEffect(() => {
		if (searchValue.length > 2) {
			//Don't search if search if only one char. It is pointless, the results dont make sense.
			const allArray = [];
			if (pieces)
				allArray.push(search(pieces, 'piece', optionsPieces, searchValue));
			if (operas)
				allArray.push(search(operas, 'opera', optionsOperas, searchValue));
			if (composers)
				allArray.push(
					search(composers, 'composer', optionsComposers, searchValue)
				);
			setResults(sortArrays(allArray[0], allArray[1], allArray[2]));
		} else {
			setResults(null);
		}
	}, [searchValue, pieces, operas, composers]);

	function sortArrays(arr1, arr2, arr3) {
		// Sort the array so the objects with the best search scores are first.
		let result = [...(arr1 || []), ...(arr2 || []), ...(arr3 || [])];
		return result.sort((a, b) => a.score - b.score);
	}
	return (
		<div className="resultsContainer">
			{results ? <TopResult topResult={results[0]} /> : null}
			{results ? <OtherResults results={results} /> : null}
		</div>
	);
}

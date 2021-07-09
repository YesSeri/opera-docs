import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import diacritics from 'diacritics';
import { TopResultPane, ResultPane, ResultsContainer, Link } from './styled'

const urlCreator = (path, id) => `/${path}/${id}`

const SearchValue = ({ searchValue, data }) => {
	const fuse = useGetFuses(data);
	const [results, setResults] = useState(null);

	useEffect(() => {
		function getSortedTopsMatches() {
			// Searches through all the pieces and returns relevant results, unsorted
			const allResults = fuse.search(searchValue);
			// This creates one big array from the three searched arrays and if the array is empty then it adds and empty array.
			const filteredResults = allResults.filter(el => el.score < 0.6)
			const sortedResults = filteredResults.sort((a, b) => a.score - b.score);
			// One main result and 18 subresults. 18 is divisible by 3 and 2, which is neat for presentation.
			return sortedResults.slice(0, 19);
		}
		if (searchValue.length < 2) {
			setResults(null);
			return
		}
		const arr = getSortedTopsMatches()
		const linkTitleArr = arr.map(({ item }) => {
			const { id, title, category } = item
			return { title, link: urlCreator(category, id) }
		})
		setResults(linkTitleArr)
	}, [searchValue, fuse])
	return (
		// An array of length 0 still evaluates to true, so we need to do this double check.
		results && results.length !== 0 &&
		<ResultsContainer>
			<TopResultPane>
				<Result result={results[0]} />
			</TopResultPane>
			{results.slice(1).map(result =>
				<ResultPane>
					<Result key={result.link} result={result} />
				</ResultPane>
			)}
		</ResultsContainer>
		// 	: null
	)
};

function Result({ result }) {
	return (
		<Link href={result.link}>
			{result.title}
		</Link>
	)
}

function getFn() {
	// The getFn option, is that it should remove diacritics, when searching.
	return diacritics.remove(Fuse.config.getFn.apply(this, arguments));
}

const options = {
	getFn,
	includeScore: true,
	shouldSort: false,
	ignoreLocation: true,
	keys: ['title'],
}

const useGetFuses = (data) => {
	const [fuse, setFuse] = useState(null);
	useEffect(() => {
		if (data) {
			setFuse(new Fuse(data, options))
		}
	}, [data])
	return fuse
}
export default SearchValue;

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Fuse from 'fuse.js';
import diacritics from 'diacritics';
import {
    createPieceUrl,
    createComposerUrl,
    createOperaUrl,
} from '../utils/utilFunctions';

import { TopResultPane, ResultPane, ResultsContainer, Link } from './styled'
const SearchValue = ({ searchValue }) => {
    const [pieceFuse, operaFuse, composerFuse] = useGetFuses(); // Fuse JS indexes the data and makes it searchable.
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (pieceFuse && operaFuse && composerFuse) {
            setLoading(false);
        }
    }, [pieceFuse, operaFuse, composerFuse])

    useEffect(() => {
        function getSortedTopsMatches() {
            // Searches through all the pieces and returns relevant results, unsorted
            const pieces = pieceFuse.search(searchValue);
            const operas = operaFuse.search(searchValue);
            const composers = composerFuse.search(searchValue);
            // This creates one big array from the three searched arrays and if the array is empty then it adds and empty array.
            const allResults = [...(pieces || []), ...(operas || []), ...(composers || [])]
            const sortedResults = allResults.sort((a, b) => a.score - b.score);
            // One main result and 18 subresults. 18 is divisible by 3 and 2, which is neat for presentation.
            return sortedResults.slice(0, 19);
        }
        if (loading || searchValue.length < 3) return
        const arr = getSortedTopsMatches()
        const equalizedArr = arr.map(({ item }) => {
            const { last_name, opera_id, opera, piece_id, title } = item
            if (item.type === 'piece') {
                const link = createPieceUrl(last_name, opera_id, opera, piece_id, title);
                return { text: item.title, link }
            }
            else if (item.type === 'opera') {
                const link = createOperaUrl(last_name, opera_id, opera);
                return { text: item.opera, link }
            }
            else if (item.type === 'composer') {
                const link = createComposerUrl(last_name);
                return { text: item.last_name, link }
            }
            return ""
        })
        setResults(equalizedArr)
    }, [searchValue, loading, composerFuse, operaFuse, pieceFuse])
    return (
        // An array of length 0 still evaluates to true, so we need to do this double check.
        results && results.length !== 0 ?
            <ResultsContainer>
                <TopResult result={results[0]} />
                {results.slice(1).map(result =>
                    <Result key={result.link} result={result} />
                )}
            </ResultsContainer>
        : null
    )
};

function TopResult({ result }) {
    return (
        <TopResultPane>
            <Link href={result?.link}>
                {result?.text}
            </Link>
        </TopResultPane>
    )
}
function Result({ result }) {
    return (
        <ResultPane>
            <Link href={result?.link}>
                {result?.text}
            </Link>
        </ResultPane>
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
    location: true,
}
const pieceOptions = {
    ...options,
    keys: ['title'],
};
const operaOptions = {
    ...options,
    keys: ['opera'],
};

const composerOptions = {
    ...options,
    keys: ['last_name', 'first_name'],
};

const useGetFuses = () => {
    const [pieces, operas, composers] = useGetInfo();
    const [pieceFuse, setPieceFuse] = useState(null);
    const [operaFuse, setOperaFuse] = useState(null);
    const [composerFuse, setComposerFuse] = useState(null);
    useEffect(() => {
        if (pieces) {
            setPieceFuse(new Fuse(pieces, pieceOptions))
        }
    }, [pieces])
    useEffect(() => {
        if (operas) {
            setOperaFuse(new Fuse(operas, operaOptions))
        }
    }, [operas])
    useEffect(() => {
        if (composers) {
            setComposerFuse(new Fuse(composers, composerOptions))
        }
    }, [composers])
    return [pieceFuse, operaFuse, composerFuse]
}
const useGetInfo = () => {
    const [pieces, setPieces] = useState(null);
    const [operas, setOperas] = useState(null);
    const [composers, setComposers] = useState(null);
    useEffect(() => {
        const pieceSource = axios.CancelToken.source();
        const operaSource = axios.CancelToken.source();
        const composerSource = axios.CancelToken.source();
        const fetchPieces = async () => {
            const response = await axios
                .get('/api/search', {
                    cancelToken: pieceSource.token,
                })
            setPieces(response.data.map(el => ({ ...el, type: 'piece' })));
        }
        const fetchOperas = async () => {
            const response = await axios
                .get('/api/operas', {
                    cancelToken: operaSource.token,
                })
            setOperas(response.data.map(el => ({ ...el, type: 'opera' })));

        }
        const fetchComposers = async () => {
            const response = await axios
                .get('/api/composers', {
                    cancelToken: composerSource.token,
                })
            setComposers(response.data.map(el => ({ ...el, type: 'composer' })));
        }
        fetchPieces();
        fetchOperas();
        fetchComposers();
        return () => {
            pieceSource.cancel(
                'Component was unmounted, axios piece request is cancelled.'
            );
            operaSource.cancel(
                'Component was unmounted, axios piece request is cancelled.'
            );
            composerSource.cancel(
                'Component was unmounted, axios piece request is cancelled.'
            );
        }
    }, [])
    return [pieces, operas, composers]
}


export default SearchValue;

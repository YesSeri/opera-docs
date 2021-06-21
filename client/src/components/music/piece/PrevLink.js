import React, { useEffect, useState } from 'react'
import { createPieceUrl, getApiData } from '../../utils/utilFunctions'
import { Link } from './linkStyle';

const PrevLink = ({ id }) => {
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const source = getApiData(`/api/pieces/prev/${id}`, setData);
        return () => {
            source.cancel('Component was unmounted, axios request is cancelled.');
        };
    }, []);
    useEffect(() => {
        if (data) {
            const { last_name, opera_id, opera, id, title } = data;
            setUrl(createPieceUrl(last_name, opera_id, opera, id, title))
        }
    }, [data])

    return url && <Link href={url}>Prev</Link>
}

export default PrevLink

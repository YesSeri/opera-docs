import React, { useEffect, useState } from 'react'
import { createPieceUrl, getApiData } from '../../utils/utilFunctions'
import { Link } from './linkStyle';

const NextLink = ({ id }) => {
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const source = getApiData(`/api/pieces/next/${id}`, setData);
        return () => {
            source.cancel('Component was unmounted, axios request is cancelled.');
        };
    }, [id]);
    useEffect(() => {
        if (data) {
            const { last_name, opera_id, opera, id, title } = data;
            setUrl(createPieceUrl(last_name, opera_id, opera, id, title))
        }
    }, [data])

    return url && <Link href={url}>Next</Link>
}

export default NextLink

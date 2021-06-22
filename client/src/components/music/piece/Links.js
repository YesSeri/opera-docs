import React, { useEffect, useState } from 'react'
import { createPieceUrl, getApiDataV2 } from '../../utils/utilFunctions'
import { Link, Container } from './linkStyle';

const Links = (props) => {
    const [prevUrl, setPrevUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);

    useEffect(() => {
        async function fetchData(dir, setUrl) {
            const { response, source } = await getApiDataV2(`/api/pieces/${dir}/${props.id}`, setUrl);
            return source;
        }
        const prevSource = fetchData('prev', setPrevUrl);
        const nextSource = fetchData('next', setNextUrl);
        return () => {
            prevSource.cancel('Component was unmounted, axios request is cancelled.');
            nextSource.cancel('Component was unmounted, axios request is cancelled.');
        };
    }, [props.id]);

    return (prevUrl && nextUrl ? <Container>
        <Link href={prevUrl}>Prev</Link>
        <Link href={nextUrl}>Next</Link>
    </Container> : null)
}

export default Links
import React from 'react'
import { Link, Container } from './linkStyle';
import { useGetUrl } from './useGetUrl';

const PrevLink = ({ id }) => {
	const url = useGetUrl(id, 'prev');
	return (
		url && <Link href={url}>Prev</Link>
	)
}

const NextLink = ({ id }) => {
	const url = useGetUrl(id, 'next');
	return (
		url && <Link href={url}>Next</Link>
	)
}
const Links = ({ id }) => {
	return (
		<Container>
			<div>
				<PrevLink id={id} />
				<NextLink id={id} />
			</div>
		</Container>
	)
}

export { Links }
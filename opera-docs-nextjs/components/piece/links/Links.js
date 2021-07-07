import React from 'react'
import { Link, Container } from './linkStyle';

const urlCreator = (id) => {
	return '/pieces/' + id;
}
const PrevLink = ({ id }) => {
	const url = urlCreator(id)
	return (
		id && <Link href={url}>Prev</Link>
	)
}

const NextLink = ({ id }) => {
	const url = urlCreator(id)
	return (
		id && <Link href={url}>Next</Link>
	)
}
const Links = ({ prevId, nextId }) => {
	return (
		<Container>
			<div>
				<PrevLink id={prevId} />
				<NextLink id={nextId} />
			</div>
		</Container>
	)
}

export { Links }
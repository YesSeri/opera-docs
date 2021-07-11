import React from 'react'
import { LinkContainer, Link, Container } from './linkStyle';

const urlCreator = (id) => {
	return '/pieces/' + id;
}
const PrevLink = ({ id }) => {
	const url = urlCreator(id)
	return (
		id && <LinkContainer><Link href={url}>Prev</Link></LinkContainer>
	)
}

const NextLink = ({ id }) => {
	const url = urlCreator(id)
	return (
		id && <LinkContainer><Link href={url}>Next</Link></LinkContainer>
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
import React from 'react';
import { Container, Item, Pane, Inner } from './styled'

const topText = `The Platform for finding opera sheet music online`;
const leftText = `Search for the opera, composer or song you want to find.`;
const rightText = `Alternatively, find your scores by choosing a specific composer or opera.`;
export default function Banner() {
	return (
		<Container>
			<Inner>
				<Item>{topText}</Item>
				<Pane>
					{leftText}
				</Pane>
				<Pane>
					{rightText}
				</Pane>
			</Inner>
		</Container>
	);
}

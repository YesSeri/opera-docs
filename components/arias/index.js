import React from 'react';
import { CustomPane, ResultsContainerSingle, Item, LastItem, Container } from './styled'

const urlCreator = (path, id) => `/${path}/${id}`
function Arias({ data }) {
	const AriasInfo = () => {
		//p.id title o.id opera c.id c.lastname, c.firstname
		const arias = data.map(
			({ pieceId, pieceTitle, operaId, operaTitle, composerId, lastName, firstName }) => {
				const pieceUrl = urlCreator('pieces', pieceId)
				const operaUrl = urlCreator('operas', operaId)
				const composerUrl = urlCreator('composers', composerId)
				return (
					<CustomPane key={pieceId}>
						<Item href={pieceUrl}>{pieceTitle}</Item>
						<Item href={operaUrl}>{operaTitle}</Item>
						<LastItem
							href={composerUrl}
						>{`${lastName}, ${firstName}`}</LastItem>
					</CustomPane>
				)
			}
		);
		return arias;
	};
	return (
		<Container>
			<ResultsContainerSingle>
				<AriasInfo />
			</ResultsContainerSingle>
		</Container>
	);
}

export default Arias;

import React from 'react';
import { CustomPane, CustomContainer, Link, Container, HorizontalDivider } from './styled'

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
						<Link href={pieceUrl}>{pieceTitle}</Link>
						<Link href={operaUrl}>{operaTitle}</Link>
						<Link
							href={composerUrl}
						>{`${lastName}, ${firstName}`}</Link>
					</CustomPane>
				)
			}
		);
		return arias;
	};
	return (
		<Container>
			<CustomContainer>
				<AriasInfo />
			</CustomContainer>
		</Container>
	);
}

export default Arias;

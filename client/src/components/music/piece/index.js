import React, { useState, useEffect } from 'react';
import Frame from '../../frame';
import { getApiData } from '../../utils/utilFunctions';
import { Helmet } from 'react-helmet';
import { Title, Container, Item } from './styled'
import PrevLink from './PrevLink'
import NextLink from './NextLink'
import Synopsis from './Synopsis';

function Piece(props) {
	const [data, setData] = useState(null);
	useEffect(() => {
		const { pieceIdName } = props.match.params;
		const id = pieceIdName.replace(/(^\d+)(.+$)/i, '$1');
		const source = getApiData(`/api/pieces/${id}`, setData);
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, [props.match.params]);
	const PieceInfo = () => {
		const { title, opera, type, first_name, last_name, description, file_title, id } = data;
		let renderPiece = '';
		console.log({ id })
		if (title) {
			renderPiece = (
				<>
					<Helmet>
						<title>
							operadocs - Score for {title} from {opera}
						</title>
					</Helmet>
					<Title >{title}</Title>
					<Synopsis description={description} />
					<div style={{ justifyContent: 'center', display: 'flex' }}>
						<PrevLink id={id} />
						<NextLink id={id} />
					</div>
					<Container>
						<Item>
							<b>Type: </b> {type.charAt(0).toUpperCase() + type.slice(1)}
						</Item>
						<Item>
							<b>Opera: </b>
							{opera}
						</Item>
						<Item>
							<b> Composer: </b>
							{last_name}, {first_name}
						</Item>
						<Item>
							<b> Link: </b>
							{data ? (
								<a
									href={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${file_title}`}
								>
									here
								</a>
							) : null}
						</Item>
					</Container>
				</>
			);
		}
		return renderPiece;
	};

	return (
		data && <div>
			<PieceInfo />
			<Frame
				downloadLink={`https://singcademy.com/wp-content/uploads/pdfsToBeAccessed/${data.file_title}`}
			/>
		</div>
	);
}

export default Piece;

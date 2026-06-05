import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
import Opera from '../../components/operas/id'


export async function getStaticPaths() {
	const query = `SELECT * FROM operas`;
	const data = await queryGetData(query);
	const paths = data.map(el => {
		return { params: { id: el.id + "" } }
	})
	return {
		paths
		,
		fallback: false,
	}

}
// Find all pieces in the opera
export async function getStaticProps({ params }) {
	const query = `SELECT p.id, p.title, p.type, p.next_id, p.prev_id, o.name, opera_id, c.last_name
					FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
					INNER JOIN composers as c ON o.composer_id = c.id
					WHERE o.id = ?;`;
	const pieces = await queryGetData(query, params.id);

	if (pieces.length === 0) {
		return { notFound: true }
	}

	const piecesById = new Map(pieces.map((piece) => [piece.id, piece]));
	const firstPiece = pieces.find((piece) => piece.prev_id === null) || pieces[0];
	const piecesInOpera = [];
	const seenIds = new Set();
	let current = firstPiece;

	while (current && !seenIds.has(current.id)) {
		piecesInOpera.push(current);
		seenIds.add(current.id);

		if (current.next_id === null) {
			break;
		}

		current = piecesById.get(current.next_id);
	}

	const unorderedPieces = pieces.filter((piece) => !seenIds.has(piece.id));

	return {
		props: { data: [...piecesInOpera, ...unorderedPieces] }
	}
}

export default function OperaWithId({ data }) {
	const operaTitle = data[0].name;
	return (
		<>
			<Head>
				<title>{`ariavault - sheet music for all pieces in ${operaTitle}`}</title>
			</Head>
			<Opera data={data} />
		</>
	);
}

import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
import Piece from '../../components/piece'

const PieceWithId = ({ data }) => {
	return (
		<>
			<Head>
				<title>
					operadocs - vocal score, sheet music for {data.title} from {data.opera} by {data.last_name}, {data.first_name}
				</title>
			</Head>
			<Piece data={data} />
		</>
	)
}

export async function getStaticPaths() {
	const query = `SELECT id FROM pieces`;
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
	const query = `SELECT p.id, p.title, p.description, p.file_title, p.placement, p.type, 
                o.name as opera, o.id as opera_id, c.first_name, c.last_name 
                FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
                INNER JOIN composers as c ON o.composer_id = c.id WHERE p.id = ?;`;
	const [data] = await queryGetData(query, params.id);
	const { placement, opera_id } = data;
	const nextPos = placement + 1;
	const prevPos = placement - 1;
	const posQuery = `SELECT p.id FROM pieces as p 
                INNER JOIN operas as o ON p.opera_id = o.id 
                WHERE o.id = ? AND p.placement = ?`;
	const [prev] = await queryGetData(posQuery, [opera_id, prevPos]);
	const [next] = await queryGetData(posQuery, [opera_id, nextPos]);
	const completeData = { ...data, prevId: prev?.id ?? false, nextId: next?.id ?? false }
	return {
		props: { data: completeData }
	}
}



export default PieceWithId
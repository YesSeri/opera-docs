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
	const query = `SELECT p.id, p.title, p.description, p.file_title, 
					p.type, p.next_id, p.prev_id,
					o.name as opera, o.id as opera_id, c.first_name, c.last_name 
					FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
					INNER JOIN composers as c ON o.composer_id = c.id WHERE p.id = ?;`;
	const [data] = await queryGetData(query, params.id);
	const { prev_id, next_id } = data;
	const completeData = { ...data, prevId: prev_id ?? false, nextId: next_id ?? false }
	return {
		props: { data: completeData }
	}
}



export default PieceWithId
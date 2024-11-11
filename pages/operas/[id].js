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
					WHERE o.id = ? AND prev_id IS NULL;`;
	let [current] = await queryGetData(query, params.id);
	const piecesInOpera = [current];

	// To stop infinte loop, if I make a mistake in DB.
	let i = 0;
	while (true) {
		const query = `SELECT p.id, p.title, p.type, p.next_id, p.prev_id, o.name, opera_id, c.last_name
					FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
					INNER JOIN composers as c ON o.composer_id = c.id
					WHERE p.id = ?;`;
		const [data] = await queryGetData(query, current.next_id);
		piecesInOpera.push(data);
		if (data.next_id === null || i > 120) {
			break;
		}
		current = data;
		i++;
	}
	return {
		props: { data: piecesInOpera }
	}
}

export default function OperaWithId({ data }) {
	const operaTitle = data[0].name;
	return (
		<>
			<Head>
				<title>ariavault - sheet music for all pieces in {operaTitle}</title>
			</Head>
			<Opera data={data} />
		</>
	);
}

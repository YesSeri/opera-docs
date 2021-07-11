import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
import Arias from '../../components/arias';

export async function getStaticProps() {
	const query = `SELECT p.id as pieceId, p.title as pieceTitle, o.id as operaId, o.name as operaTitle, 
				c.id composerId, c.last_name as lastName, c.first_name as firstName
                FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
                INNER JOIN composers as c ON o.composer_id = c.id WHERE type = 'aria' ORDER BY pieceTitle`;
	const data = await queryGetData(query);
	return {
		props: {
			data
		}
	}
}

function AriasPage({ data }) {
	return (
		<>
			<Head>
				<title>operadocs - show all arias</title>
			</Head>
			<Arias data={data} /> 
		</>
	);
}

export default AriasPage;
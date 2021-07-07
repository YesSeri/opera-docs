import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
import Composers from '../../components/composers/'

export async function getStaticProps() {
	const query = `SELECT DISTINCT c.last_name, c.first_name, c.id
                  FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
                  INNER JOIN composers as c ON o.composer_id = c.id
                  ORDER BY c.last_name`
	const data = await queryGetData(query);
	return {
		props: {
			data
		}
	}
}

function ComposersPage({ data }) {
	return (
		<>
			<Head>
				<title>operadocs - show all composers</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Composers data={data}/>
		</>
	);
}

export default ComposersPage;
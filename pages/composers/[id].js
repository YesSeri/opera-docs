import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
import Composer from '../../components/composers/id'


export async function getStaticPaths() {
	const query = `SELECT DISTINCT c.id FROM operas as o 
                  INNER JOIN composers as c ON o.composer_id = c.id
                  ORDER BY c.last_name`;
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
// Find all operas by a composer.
export async function getStaticProps({ params }) {
	const query = `SELECT o.name as opera, o.id as opera_id, c.first_name, c.last_name 
                  FROM operas as o INNER JOIN composers as c 
                  ON o.composer_id = c.id WHERE c.id = ?
				  ORDER BY o.name`;

	const data = await queryGetData(query, params.id);
	return {
		props: { data }
	}
}

export default function OperaWithId({ data }) {
	const { first_name, last_name } = data[0]
	return (
		<>
			<Head>
				<title>operadocs - operas by {first_name} {last_name}</title>
			</Head>
			<Composer data={data} />

		</>
	);
}

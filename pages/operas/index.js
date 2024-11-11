import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
import Operas from '../../components/operas';

export async function getStaticProps() {
	const query = `SELECT o.name as opera, o.id as opera_id, c.last_name FROM operas as o 
     INNER JOIN composers as c 
     ON c.id = o.composer_id 
     ORDER BY opera`;
	const data = await queryGetData(query);

	return {
		props: {
			data
		}
	}
}

function OperasPage({ data }) {
	return (
		<>
			<Head>
				<title>ariavault - show all operas</title>
			</Head>
			<Operas data={data} />
		</>
	);
}

export default OperasPage;
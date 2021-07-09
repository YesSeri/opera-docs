import React from 'react'
import Head from 'next/head'
import queryGetData from '../../utils/queryGetData'
// import Arias from '../../components/arias';

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

function AriasPage({ data }) {
	return (
		<>
			<Head>
				<title>operadocs - all arias</title>
			</Head>
			{/* <Arias data={data} />  */}
		</>
	);
}

export default AriasPage;
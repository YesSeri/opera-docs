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
  const query = `SELECT p.id, p.title, p.type, p.placement, o.name, opera_id, c.last_name
  FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
  INNER JOIN composers as c ON o.composer_id = c.id
     WHERE o.id = ? ORDER BY p.placement ASC;`;
  const data = await queryGetData(query, params.id);

  //   ({ last_name, opera_id, name, title, id, type }) => {
  return {
    props: { data }
  }
}

export default function OperaWithId({ data }) {
  const operaTitle = data[0].name;
  return (
    <>
      <Head>
        <title>operadocs - sheet music for all pieces in {operaTitle}</title>
      </Head>
      <Opera data={data} />
    </>
  );
}

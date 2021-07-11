import Head from 'next/head'
import queryGetData from '../utils/queryGetData'
import Search from '../components/search'

// This is what is searched for, and the what is needed to create link
// piece: keys: ['title'], id
// opera: keys: ['opera'], id
// comoposer: keys: ['last_name', 'first_name'], id

async function queryData(query) {
    return await queryGetData(query);
}

async function getData() {
    const tempPieceData = await queryData(`SELECT id, title FROM pieces`)
    const pieceData = tempPieceData.map(({ id, title }) => ({ id, title, category: 'pieces' }))
    const tempOperaData = await queryData(`SELECT id, name as title FROM operas`)
    const operaData = tempOperaData.map(({ id, title }) => ({ id, title, category: 'operas' }))
    const tempComposerData = await queryData(`SELECT DISTINCT c.id as id, c.last_name, c.first_name
                  FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
                  INNER JOIN composers as c ON o.composer_id = c.id`)
    const composerData = tempComposerData.map(({ id, last_name, first_name }) => ({ id, title: `${first_name} ${last_name}`, category: 'composers' }))

    return [ ...pieceData, ...operaData, ...composerData ]

}

export async function getStaticProps() {
    const data = await getData();

    return {
        props: {
            data
        }
    }
}

export default function Home({ data }) {
    return (
        <div>
            <Search data={data} />
        </div>
    )
}
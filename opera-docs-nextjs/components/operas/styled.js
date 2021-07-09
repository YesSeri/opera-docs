import styled from 'styled-components'
import { ResultPane, ResultsContainer} from '../../utils/sharedStyles'

// const ResultPane = styled.div`
//  	font-size: 1.2em;
//     padding: 0 3px;
//     border-radius: 10px;
//     border: solid #ddd 1px;
//     display: grid;
//     align-content: center;
//     padding: 10px;
// `

const Link = styled.a`
    font-size: 1.1rem;
`

// const ResultsContainer = styled.div`
//     display:grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     max-width:1200px;
//     margin:auto;
//     @media screen and (max-width: 1000px) {
//         grid-template-columns: 1fr 1fr;
//     }
//     @media screen and (max-width: 600px) {
//         grid-template-columns: 1fr;
//     }
// `

const Title = styled.h1`
    padding-top: 20px;
`
export { ResultsContainer, ResultPane, Title, Link }
import styled from 'styled-components'

// .resultsContainer .topResult {
// 	font-size: 2.7em;
// 	border-radius: 20px;
// }
// .resultsContainer .topResult:hover {
// 	color: #33e;
// }
// .resultsContainer .bottomRow {
// 	border-radius: 5px;
// }
// .resultsContainer .otherResult {
// 	min-height: 100%;
// 	height: 100%;
// }
// .resultsContainer .otherResult:hover {
// 	color: #33e;
// }

const ResultPane = styled.div`
    text-align:center;
 	min-height: 100%;
 	height: 100%;
`
const TopResultPane = styled(ResultPane)`
 	font-size: 2.7em;
 	border-radius: 20px;
    &:hover{
        color: #33e;
    } 	
`
const ResultsContainer = styled.div`

`
const Link = styled.a`

`
export { TopResultPane, ResultPane, ResultsContainer, Link }
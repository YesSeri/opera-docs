import styled from 'styled-components'
import { ResultPane, ResultsContainer} from '../../utils/sharedStyles'

const Link = styled.a`
    font-size: 1.1rem;
`
const Title = styled.h1`
    padding-top: 20px;
` 
const PieceList = styled(ResultPane)`
	width:100%;
`
export { ResultsContainer, ResultPane, Title, Link, PieceList }
import styled from 'styled-components/macro'
import Container from 'react-bootstrap/Container';
import { ResultPane, ResultsContainer } from '../../sharedStyles'

const TopResultPane = styled(ResultPane)`
 	font-size: 2.7em;
    width: 100%;
    &:hover{
        color: #33e;
    } 	
	${({ theme }) => theme.mediumSize('font-size: 2.4em;')}
	${({ theme }) => theme.smallSize('font-size: 2.1em;')}
`

const Link = styled.a`

`

const SearchContainer = styled(Container)`
	padding-top:10px;
	max-width: 600px;
`;

export { TopResultPane, ResultPane, ResultsContainer, Link, SearchContainer }
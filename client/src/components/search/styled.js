import styled from 'styled-components'
import Container from 'react-bootstrap/Container';

const ResultPane = styled.div`
    text-align: center;
 	font-size: 1.2em;
    width: 33%;
    @media screen and (max-width: 1000px) {
 	font-size: 1.1em;
        width: 50%;
    }
    @media screen and (max-width: 600px) {
 	font-size: 1.0em;
        width: 100%;
    }
`
const TopResultPane = styled(ResultPane)`
 	font-size: 2.7em;
    width: 100%;
    padding-bottom: 10px;

    &:hover{
        color: #33e;
    } 	
    @media screen and (max-width: 1000px) {
        font-size: 2.4em;
    }
    @media screen and (max-width: 600px) {
        font-size: 2.1em;
    }
`
const ResultsContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    max-width:1200px;
    margin:auto;
    
`
const Link = styled.a`

`

const SearchContainer = styled(Container)`
	padding-top:10px;
	max-width: 600px;
`;

export { TopResultPane, ResultPane, ResultsContainer, Link, SearchContainer }
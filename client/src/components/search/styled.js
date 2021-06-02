import styled from 'styled-components/macro'
import Container from 'react-bootstrap/Container';

const ResultPane = styled.div`
    text-align: center;
 	font-size: 1.2em;
    padding: 0 3px;
    flex: 1 1 1;
    width:33.33%;
    border-radius: 10px;
    border-top: solid #ddd 1px;
    border-right: solid #ddd 1px;
    border-left: solid #ddd 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-last-child(-n+3){
        border: solid #ddd 1px;
    }
    @media screen and (max-width: 1000px) {
        &:nth-last-child(-n+2){
            border: solid #ddd 1px;
        }
        font-size: 1.1em;
        width: 50%;
    }
    @media screen and (max-width: 600px) {
        &:nth-last-child(){
            border: solid #ddd 1px;
        }
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
    justify-content: center;
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
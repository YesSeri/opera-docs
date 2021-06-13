import styled from "styled-components/macro";
import { ResultPane as RPane, ResultsContainer } from '../../../sharedStyles/styles'

const Container = styled.div`
    display: flex;
	justify-content: center;
    text-align: center;
`
const Link = styled.a`
    font-size: 1.1rem;
    width:25%;
`
const Item = styled.span`
    font-size: 1.1rem;
    width:25%;
    text-transform:capitalize;
`

const ResultPane = styled(RPane)`
    width: 100%;
    justify-content: space-evenly;
`

export { Container, ResultPane, ResultsContainer, Link, Item }
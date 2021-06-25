import styled from "styled-components/macro";
import { ResultPane as RPane, ResultsContainer } from '../../../sharedStyles'

const Container = styled.div`
    display: flex;
	justify-content: center;
    text-align: center;
`
const Link = styled.a`
    font-size: 1.1rem;
    width:25%;

	${({ theme }) => theme.mediumSize('width: 100%;')}
`
const Item = styled.span`
    font-size: 1.1rem;
    width:10%;
    text-transform:capitalize;
	${({ theme }) => theme.mediumSize('width: 100%;')}
`

const ResultPane = styled(RPane)`
    width: 100%;
    justify-content: space-evenly;
    max-width: 1400px;
	${({ theme }) => theme.mediumSize(
        `flex-wrap:wrap;
        font-size: 1.1em;
        width: 100%;`
    )}
`

export { Container, ResultPane, ResultsContainer, Link, Item }
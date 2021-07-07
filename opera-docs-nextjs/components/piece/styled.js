import styled from "styled-components";
import { Title } from '../../utils/sharedStyles'

const SynopsisContainer = styled.div`
	display:flex;
	flex-wrap:wrap;
	justify-content: center;
	align-items:center;
`

const Container = styled.div`
    display:flex;
    background-color: ${({ theme }) => theme.color.second};
    padding: 1em 0;
    border-radius: 15px 15px 0 0;
    ${({ theme }) => theme.responsiveWidth}
	${({ theme }) => theme.mediumSize(`
        flex-wrap: wrap;
        border-radius: 0;
        padding: 0.2em 0;
    `)}
`
const Item = styled.div`
    width: 25%;
    text-align:center;

	${({ theme }) => theme.mediumSize(`
        padding: 0.3em 0;
        width:100%;
    `)}
`
const Description = styled.div`
    padding: 1em 1.2em;
    margin: 1em auto;
    width:50%;
    background-color: ${({ theme }) => theme.color.second};
    border-radius: 25px;
	${({ theme }) => theme.largeSize(`
        width: 80%;
    `)}
	${({ theme }) => theme.mediumSize(`
        padding: 1em 0.2em;
        width: 100%;
        border-radius: 0;
    `)}
`

export { Title, Container, Item, Description, SynopsisContainer }
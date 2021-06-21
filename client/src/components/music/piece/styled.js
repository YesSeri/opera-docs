import styled from "styled-components/macro";
import { Title } from '../../../sharedStyles/styles'

const Container = styled.div`
    display:flex;
    background-color: #eee;
    @media screen and (max-width: 900px) {
        flex-wrap: wrap;
    }
`
const Item = styled.div`
    width: 25%;
    text-align:center;

    @media screen and (max-width: 900px) {
        padding: 0.3em 0;
        width:100%;
    }
`
const Description = styled.div`
    padding: 1em 1.2em;
    margin: 1em auto;
    width:50%;
    background-color: #eee;
    border-radius: 25px;
    @media screen and (max-width: 900px) {
        padding: 1em 0.2em;
        width: 100%;
        border-radius: 0;
    }

`

export { Title, Container, Item, Description }
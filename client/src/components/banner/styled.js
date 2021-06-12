import styled from "styled-components/macro";

const Container = styled.div`
display: flex;
	justify-content: center;
	background-color: #6a1a1b;
	color: #fff;
	padding: 20px;
	margin-bottom: 10px;
    text-align:center;
`
const Item = styled.div`
	font-size: 1.5rem;
    width:100%;
`
const Pane = styled.div`
    width:50%;
	font-size: 1.1rem;
    padding:10px;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`
const Inner = styled.div`
    display:flex;
    max-width:1000px;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
`

export { Container, Item, Pane, Inner }
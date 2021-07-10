import styled from "styled-components";
import { Container } from '../../utils/sharedStyles'
import Link from 'next/link'

const CustomPane = styled.div`
	display:grid;
	grid-template-columns: 1fr;
    font-size: 1.2em;
    border-radius: 10px;
    border: solid #ddd 1px;
	max-width:500px;
	
	& > * {
		padding:0.5em 0;
	}

	& > *:not(:first-child) {
		font-size: 0.8em;
	} 
	& > *:not(:last-child) {
		border-bottom: 1px solid #ddd;
	} 
`

const CustomContainer = styled.div`
	display:grid;
	grid-row-gap: 10px;
	justify-content:center;
	${({ theme }) => theme.responsiveWidth} 
`

const HorizontalDivider = styled.div`
	border-right: solid 2px #ddd;
`
export { CustomPane, CustomContainer, Link, Container, HorizontalDivider }
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
	display:flex;
	justify-content:center;
	padding-bottom:1em;
	& > div{
		display:flex;
		justify-content: space-around;
		border-radius: 10px;
		padding:0.4em 0;
		background-color: ${({ theme }) => theme.color.second};
		${({ theme }) => theme.mediumSize(`
			min-width:10em;
		`)}
	}
`

const LinkContainer = styled.div`
		padding: 0 1em;
`
export { LinkContainer, Link, Container }
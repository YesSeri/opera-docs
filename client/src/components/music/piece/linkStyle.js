import styled from 'styled-components'

const Link = styled.a`
	margin: 0 0.5em;
`
const Container = styled.div`
	display:flex;
	justify-content:center;
	padding-bottom:1em;
	div{
		border-radius: 10px;
		padding:1em;
		background-color: ${({ theme }) => theme.color.second};
		${({ theme }) => theme.mediumSize(`
			min-width:10em;
			padding:0.1em;
		`)}
	}
`
export { Link, Container }
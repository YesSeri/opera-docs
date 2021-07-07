import styled from 'styled-components';

const Link = styled.a`
	font-size: 4em;
	text-align:center;
	${({ theme }) => theme.smallSize('font-size: 3em;')}
    color: white;
    text-decoration: none;
	&:hover {
		color: white; 
		text-decoration:none; 
	}
`

const Container = styled.div`
	text-align:center;
	padding-bottom: 0.3em;
	cursor: pointer;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	margin-bottom: 10px;
	background-color: #111;
	color: white;
	${({ theme }) => theme.smallSize('margin-bottom: 5px;')}
`

export { Container, Link }
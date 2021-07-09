import styled from 'styled-components';

const Link = styled.a`
	font-size: 4em;
	${({ theme }) => theme.smallSize('font-size: 3em;')}
    color: white;
    text-decoration: none;
	&:hover {
		color: white; 
		text-decoration:none; 
	}
`

const Container = styled.div`
	padding-bottom: 0.3em;
	margin-top: -0.7em;
	cursor: pointer;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	margin-bottom: 10px;
	background-color: #111;
	color: white;
	${({ theme }) => theme.smallSize('margin-bottom: 5px;')}
`

export { Container, Link }
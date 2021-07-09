import styled from 'styled-components'

const NavWrapper = styled.div`
	user-select: none;
	width:100%;
	a {
		font-size: 1.5rem;
		color: black;
		padding: 0 0.2em;
		border-radius: 10px;
		margin: 0 1em;
		${({ theme }) => theme.smallSize('margin: 0 0.3em;')}
	}
	a:not(.active):hover {
		background-color: #333;
		color: white;
	}
	.active,
	.active:hover {
		background-color: #222;
		color: white;
	}
	.closeFooter {
		cursor: pointer;
	}
`
const ResultPane = styled.div`
    font-size: 1.2em;
    border-radius: 10px;
    border: solid #ddd 1px;
    padding: 10px;
	width:33%;
	${({ theme }) => theme.mediumSize(`
        font-size: 1.1em;
		width:50%;
    `)}
    ${({ theme }) => theme.smallSize(`
        font-size: 1.0em;
		width:100%;
    `)} 

`

const ResultsContainer = styled.div`
	display:flex;
	flex-wrap:wrap;
	padding:5px;
	${({ theme }) => theme.responsiveWidth}
	/* display:grid;
	grid-template-columns: 1fr 1fr 1fr;

	${({ theme }) => theme.mediumSize(`
        font-size: 1.1em;
		grid-template-columns: 1fr 1fr ;
    `)}
    ${({ theme }) => theme.smallSize(`
        font-size: 1.0em;
		grid-template-columns: 1fr;
    `)} */
`


const Title = styled.h1`
    padding-top: 20px;
`
export { ResultsContainer, ResultPane, Title, NavWrapper }
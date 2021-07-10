import styled from 'styled-components'

const Container = styled.div`
	padding-top:1em;
`

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
const BorderDiv = styled.div`
    font-size: 1.2em;
    border-radius: 10px;
    border: solid #ddd 1px;
    padding: 10px;
`
const ResponsiveContainer = styled.div`
	${({ theme }) => theme.mediumSize(`
    `)}
    ${({ theme }) => theme.smallSize(`
    `)}
	${({ theme }) => theme.responsiveWidth} 
`
const ResultPane = styled(BorderDiv)`
`

const ResultsContainer = styled(ResponsiveContainer)`
	display:grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr 1fr;
	${({ theme }) => theme.mediumSize(`
		grid-template-columns: 1fr 1fr;
    `)}
	${({ theme }) => theme.smallSize(`
		grid-template-columns: 1fr;
    `)}
`

const ResultPaneSingle = styled(BorderDiv)`
	margin-bottom: 10px;
	width:100%;
`

const ResultsContainerSingle = styled(ResponsiveContainer)`
	display:flex;
	flex-wrap:wrap;
	max-width:500px;
`

const Title = styled.h1`
    padding-top: 20px;
`
export { ResultsContainer, ResultPane, ResultsContainerSingle, ResultPaneSingle, Title, NavWrapper, Container }
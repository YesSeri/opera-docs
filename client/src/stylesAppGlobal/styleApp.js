import styled from 'styled-components/macro';

export const Wrapper = styled.div`

	display: flex;
	min-height: 100vh;
	flex-direction: column;
	justify-content: space-between;

	.siteContainer {
		text-align: center;
	}
	.logoContainer {
		cursor: pointer;
	}
	.siteContainer .logoContainer h1 {
		font-size: 4em;
		background-color: #111;
		color: white;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		padding-bottom: 5px;
	}
`
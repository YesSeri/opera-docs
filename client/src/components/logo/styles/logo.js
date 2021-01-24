import styled from 'styled-components/macro';

export const Text = styled.h1`
	font-size: 4em;
	text-align:center;
	@media (max-width: 600px){
		font-size: 3em;
	}
`

export const Container = styled.div`
  cursor: pointer;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
	margin-bottom: 10px;
  background-color: #111;
  color: white;
	@media (max-width: 600px){
		margin-bottom: 5px;
	}
`

export const Wrapper = styled.div`
	.siteContainer {
		text-align: center;
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

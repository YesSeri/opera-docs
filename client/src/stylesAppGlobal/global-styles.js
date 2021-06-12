import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyles = createGlobalStyle`
	html, body {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing:grayscale;
		background-color: #fff;
		font-size: 16px;
	}
	html {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	*, *:before, *:after {
		-webkit-box-sizing: inherit;
		-moz-box-sizing: inherit;
		box-sizing: inherit;
	}
`
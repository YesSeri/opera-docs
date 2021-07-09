import React from 'react'
import styled from 'styled-components'

// color: #000;
// background: #fff;
// font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
// height: 100vh;
// text-align: center;
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;

const Container = styled.div`
	color:#000;
	background:#fff;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	height: 30vh;
`
const CustomH1 = styled.h1`
	display:inline-block;
	border-right:1px solid rgba(0, 0, 0,.3);
	margin:0;
	margin-right:20px;
	padding:10px 23px 10px 0;
	font-size:24px;
	font-weight:500;
	vertical-align:top;
`

const CustomDiv = styled.div`
	display:inline-block;
	text-align:left;
	line-height:49px;
	height:49px;
	vertical-align:middle;
`

const CustomH2 = styled.h2`
	font-size:14px;
	font-weight:normal;
	line-height:inherit;
	margin:0;
	padding:0;
`
const errorPage = () => {
	return (
		<Container>
			<div>
				<CustomH1>
					404
				</CustomH1>
				<CustomDiv>
					<CustomH2>
						This page could not be found.
					</CustomH2>
				</CustomDiv>
			</div>
		</Container>
	)
}

export default errorPage

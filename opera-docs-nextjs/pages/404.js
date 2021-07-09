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
		// <div>
		// 	<CustomH1 style={{ display: 'inline-block', borderRight: '1px solid rgba(0, 0, 0,.3)', margin: '0', marginRight: '20px', padding: '10px 23px 10px 0', fontSize: '24px', fontWeight: '500', verticalAlign: 'top' }}>
		// 		404
		// 	</CustomH1>
		// 	<div style={{ display: "inline-block", textAlign: "left", lineHeight: "49px", height: "49px", verticalAlign: "middle" }}>
		// 		<h2 style={{ fontSize: '14px', fontWeight: 'normal', lineHeight: 'inherit', margin: '0', padding: '0' }}>
		// 			This page could not be found.
		// 		</h2>
		// 	</div>

		// </div>
		// <div style="color:#000;background:#fff;font-family:-apple-system, BlinkMacSystemFont, Roboto, &quot;Segoe UI&quot;, &quot;Fira Sans&quot;, Avenir, &quot;Helvetica Neue&quot;, &quot;Lucida Grande&quot;, sans-serif;height:100vh;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center"><div><style>body { margin: 0 }</style><h1 style="display:inline-block;border-right:1px solid rgba(0, 0, 0,.3);margin:0;margin-right:20px;padding:10px 23px 10px 0;font-size:24px;font-weight:500;vertical-align:top">404</h1><div style="display:inline-block;text-align:left;line-height:49px;height:49px;vertical-align:middle"><h2 style="font-size:14px;font-weight:normal;line-height:inherit;margin:0;padding:0">This page could not be found<!-- -->.</h2></div></div></div>

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

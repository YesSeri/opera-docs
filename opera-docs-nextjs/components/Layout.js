import React from 'react'
import Banner from './banner'
import Logo from './logo'
import Navbar from './navbar'
import Footer from './footer'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  width:100vw;
  display:grid;
  align-content: space-between;
  margin:auto;
`

const Layout = ({ children }) => {
  return (
    <Container>
      <div>
        <Logo />
        <Banner />
        <Navbar />
        {children}
      </div>
      <Footer />
    </Container>
  )
}

export default Layout

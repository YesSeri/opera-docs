import styled from 'styled-components'; // Styled components is used to style css in react. A classname used in one place only gets used in that place and its subcomponents.

export const StyledResults = styled.div`
  .topResult {
    font-size: 36px;
    border-radius: 20px;
    &:hover {
      color: #22e;
    }
  }
  .bottomRow {
    border-radius: 5px;
  }
  .otherResult {
    min-height: 100%;
    height: 100%;
    &:hover {
      color: #22e;
    }
  }
`;

export const StyledFooter = styled.div`
  #footerContainer{
    bottom: 0;
    width: 100%;
  }
  #closeFooter{
    cursor: pointer;
  }

`
export const StyledNavbar = styled.div`
  a {
    font-size: 1.3rem;
    color: #000;
    background-color: white; 
  }
  .active{
    background-color:#111;
    color:white;
    padding: 5px 8px;
    border-radius: 10px;
}
.active:hover{
    background-color:#333;
    color:white;
    padding: 5px 8px;
    border-radius: 10px;
}
`;

export const StyledIframe = styled.div`
  object {
    height: 100vh;
    width: 100%;
  }
  iframe {
    height: 100vh;
    width: 100%;
  }
`;
export const StyledBanner = styled.div`
  .bannerContainer {
    justify-content: center;
    background-color: #6a1a1b;
    color: #fff;
    padding:20px;
    margin-bottom:10px;
  }
  .centered {
    float: none;
    margin: 0 auto;
  }

  .topRow {
    max-width: 1000px;
    margin: 0 auto;
    font-size: 1.5rem;
  }
  .bottomRow {
    max-width: 1000px;
    margin: 0 auto;
    align-content: center;
    font-size: 1.1rem;
  }
`;

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

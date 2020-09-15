import styled from 'styled-components';
export const LinkGrid = styled.div`
  .linkContainer > div {
    display: grid;
    grid-template-columns: 3fr 1fr 2fr;
    grid-column-gap: 0.5em;
    justify-content: space-around;
  }
  .linkContainer {
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    background-color: #fff;
    display: grid;
    grid-row-gap: 0.5em;
    margin: auto;
    max-width: 40%;
    border-radius: 20px;
    padding: 10px;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`;

export const StyledResults = styled.div`
  .topResult{
    font-size: 36px;
    border-radius: 20px;
    &:hover {
      color: tomato;  
    }
  }
  }
`;

export const StyledHeading = styled.div`
  div {
    background-color: 'black';
    color: 'white';
    border-bottom-left-radius: '20px';
    border-bottom-right-radius: '20px';
  }
`;
export const StyledIframe = styled.div`
  iframe {
    height: 99vh;
    width: 95vw;
  }
`;

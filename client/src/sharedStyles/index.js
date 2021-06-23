// Rounded border item.
import styled from 'styled-components/macro'

const ResultPane = styled.div`
    text-align: center;
 	font-size: 1.2em;
    padding: 0 3px;
    flex: 1 1 1;
    width:33.33%;
    border-radius: 10px;
    border: solid #ddd 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    @media screen and (max-width: 1000px) {
        font-size: 1.1em;
        width: 50%;
    }
    @media screen and (max-width: 600px) {
        font-size: 1.0em;
        width: 100%;
    }
`

const NavWrapper = styled.div`
  user-select: none;
  a {
    font-size: 1.5rem;
    color: #000;
    padding: 5px 8px;
    border-radius: 10px;
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
const ResultsContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    max-width:1200px;
    margin:auto;
`

const Title = styled.h1`
    padding-top: 20px;
	text-align: center;
`
export { ResultsContainer, ResultPane, Title, NavWrapper }
import styled from 'styled-components'

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
export { NavWrapper }
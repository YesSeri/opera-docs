import React from 'react';
import { Link } from 'react-router-dom';
import { StyledLinks } from './css/styComp';
function NavBar({ filename }) {
  return (
    <StyledLinks>
      <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/operas">Operas</Link>
        <span> | </span>
        <Link to="/composers">Composers</Link>
        <span> | </span>
        <Link to="/pieces">Pieces</Link>
        <span> | </span>
        <Link to="/about">About</Link>
      </nav>
    </StyledLinks>
  );
}

export default NavBar;

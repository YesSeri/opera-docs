import React from 'react';
import {Link} from 'react-router-dom'

function NavBar({ filename }) {
  return (
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
  );
}

export default NavBar;

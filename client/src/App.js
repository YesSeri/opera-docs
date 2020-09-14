import React from 'react';
import './App.css';
import Composers from './components/musicRelated/Composers';
import Composer from './components/musicRelated/Composer';
import Operas from './components/musicRelated/Operas';
import Opera from './components/musicRelated/Opera';
import Pieces from './components/musicRelated/Pieces';
import Piece from './components/musicRelated/Piece';
import About from './components/info/About';
import Home from './components/Home';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  const spanColor = '#F1FAEE'
  return (
    <Router>
      <div>
        <div style={{fontSize: '1.3em', }}className="navContainer">
          <h1>mysqldocs</h1>
          <nav style={{fontSize: '1.5em'}}>
            <Link to="/">Home</Link>
            <span style={{color: spanColor}}> | </span>
            <Link to="/operas">Operas</Link>
            <span style={{color: spanColor}}> | </span>
            <Link to="/composers">Composers</Link>
            <span style={{color: spanColor}}> | </span>
            <Link to="/pieces">Pieces</Link>
            <span style={{color: spanColor}}> | </span>
            <Link to="/about">About</Link>
          </nav>
        </div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/composers" component={Composers} />
          <Route path="/composer" component={Composer} />
          <Route path="/operas" component={Operas} />
          <Route path="/opera" component={Opera} />
          <Route path="/pieces" component={Pieces} />
          <Route path="/piece" component={Piece} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Home}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

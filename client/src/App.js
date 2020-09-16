import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Composers from './components/musicRelated/Composers';

import NavBar from './components/NavBar';
import Composer from './components/musicRelated/Composer';
import Operas from './components/musicRelated/Operas';
import Opera from './components/musicRelated/Opera';
import Pieces from './components/musicRelated/Pieces';
import Piece from './components/musicRelated/Piece';
import About from './components/About';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className='siteContainer'>
        <h1 style={{fontSize: '4em', backgroundColor: '#111', color: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>mysqldocs</h1>
        <NavBar></NavBar>
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
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

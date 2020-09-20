import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Composers from './components/musicRelated/Composers';

import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar';
import Composer from './components/musicRelated/Composer';
import Operas from './components/musicRelated/Operas';
import Opera from './components/musicRelated/Opera';
import Arias from './components/musicRelated/Arias';
import Piece from './components/musicRelated/Piece';
import About from './components/About';
import Search from './components/search/Search';
import Banner from './components/Banner';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className='siteContainer'>
        <h1 style={{fontSize: '4em', backgroundColor: '#022', color: 'white', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>mysqldocs</h1>
        <NavBar></NavBar>
      <Banner />
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/composers/" exact component={Composers} />
          <Route path="/arias/" exact component={Arias} />
          <Route path="/operas/" exact component={Operas} />
          <Route path="/:lastName/:operaId/:pieceIdName" component={Piece} />
          <Route path="/:lastName/:operaIdName" component={Opera} />
          <Route path="/:lastName/" component={Composer} />
          <Route exact path="/" component={Search}></Route>
        </Switch>
      </div>
    </Router>
  );
}

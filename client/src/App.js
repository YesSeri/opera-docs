import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Composers from './components/musicRelated/Composers';

import NavBar from './components/NavBar';
import Composer from './components/musicRelated/Composer';
import Operas from './components/musicRelated/Operas';
import Opera from './components/musicRelated/Opera';
import Arias from './components/musicRelated/Arias';
import Piece from './components/musicRelated/Piece';
import About from './components/About';
import Search from './components/search/Search';
import Banner from './components/Banner';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const history = createBrowserHistory();

ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID);
console.log(process.env.REACT_APP_GOOGLE_TRACKING_ID);
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});

export default function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Router history={history}>
      <div className="siteContainer">
        <h1
          style={{
            fontSize: '4em',
            backgroundColor: '#111',
            color: 'white',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        >
          mysqldocs
        </h1>
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

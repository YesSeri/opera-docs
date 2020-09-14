import React from 'react';
import './App.css';
import Composers from './components/Composers';
import Composer from './components/Composer';
import Operas from './components/Operas';
import Opera from './components/Opera';
import Posts from './components/Posts';
import Post from './components/Post';
import Home from './components/Home';
import { NavBar } from './components/NavBar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <div className="navContainer">
        <>
            <NavBar />
        </>
          <nav>
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/operas">Operas</Link>
            <span> | </span>
            <Link to="/composers">Composers</Link>
            <span> | </span>
            <Link to="/posts">Posts</Link>
          </nav>
        </div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/composers" component={Composers} />
          <Route path="/composer" component={Composer} />
          <Route path="/operas" component={Operas} />
          <Route path="/opera" component={Opera} />
          <Route path="/posts" component={Posts} />
          <Route path="/post" component={Post} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

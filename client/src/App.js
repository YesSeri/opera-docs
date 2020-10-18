import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/musicRelated/music.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Composers from './components/musicRelated/Composers';
import Composer from './components/musicRelated/Composer';
import Operas from './components/musicRelated/Operas';
import Opera from './components/musicRelated/Opera';
import Arias from './components/musicRelated/Arias';
import Piece from './components/musicRelated/Piece';
import Search from './components/search/Search';
import About from './components/About';
import Contact from './components/contact/Contact';
import { useLocation, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID);
function usePageViews() {
  let location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);
}
export default function App() {
  usePageViews();
  return (
    <div id="wrapper">
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
      <Banner />
      <NavBar />
      <Switch>
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/composers" exact component={Composers} />
        <Route path="/arias" exact component={Arias} />
        <Route path="/operas" exact component={Operas} />
        <Route path="/:lastName/:operaId/:pieceIdName" component={Piece} />
        <Route path="/:lastName/:operaIdName" component={Opera} />
        <Route path="/:lastName" component={Composer} />
        <Route exact path="/" component={Search}></Route>
      </Switch>
    </div>
      <Footer />
</div>
  );
}

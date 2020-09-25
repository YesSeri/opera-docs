import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import { useLocation } from 'react-router-dom';
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
    </div>
      <Footer />
</div>
  );
}

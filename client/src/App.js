import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { About, Contact, Footer, Search, Arias, Piece, Composer, Composers, Opera, Operas } from './components'
import Header from './container/header'
// import CookieConsent from 'react-cookie-consent';
// import Cookies from 'universal-cookie';
import { useLocation, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Wrapper } from './stylesAppGlobal/styleApp'

// const cookies = new Cookies();

const InitReactGA = () => {
	ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_ID);
};

// if (cookies.get('CookieConsent')) {
InitReactGA();
// }

function usePageViews() {
	let location = useLocation();
	useEffect(() => {
		// if (cookies.get('CookieConsent')) {
		ReactGA.pageview(location.pathname);
		// }
	}, [location]);
}
export default function App() {
	usePageViews();

	return (
		<Wrapper>
			<div>
				<Header />
				<Switch>
					<Route path="/about" exact component={About} />
					<Route path="/contact" exact component={Contact} />
					<Route path="/composers" exact component={Composers} />
					<Route path="/arias" exact component={Arias} />
					<Route path="/operas" exact component={Operas} />
					<Route path="/:lastName/:operaId/:pieceIdName" component={Piece} />
					<Route path="/:lastName/:operaIdName" component={Opera} />
					<Route path="/:lastName" component={Composer} />
					<Route path="/" exact component={Search}></Route>
					<Route path="/" exact component={Search}></Route>
				</Switch>
			</div>
			<Footer />
			{/* <CookieConsent
        enableDeclineButton
        buttonText="I accept"
        onAccept={() => {
          CookieAccepted();
        }}
        onDecline={() => {
          console.log('Cookies disabled');
        }}
      >
        This website uses cookies and google analytics to enhance the user
        experience.
      </CookieConsent> */}
		</Wrapper>
	);
}

// const CookieAccepted = () => {
//   window.location.reload();
// };

import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import { Home, Signin, Signup } from './pages';

function App() {
	return (
		<>
			<Router>
				<Route exact path='/' component={Home} />{' '}
				<Switch>
					<Route path={ROUTES.SIGN_IN} component={Signin} />{' '}
					<Route path={ROUTES.SIGN_UP} component={Signup} />{' '}
				</Switch>
			</Router>{' '}
		</>
	);
}

export default App;

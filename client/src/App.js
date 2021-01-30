import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import { Home, Signin, Signup } from './pages';

//Redux
import { Provider } from 'react-redux';

import store from './store';

function App() {
	return (
		<>
			<Provider store={store}>
				<Router>
					<Route exact path='/' component={Home} />{' '}
					<Switch>
						<Route path={ROUTES.SIGN_IN} component={Signin} />{' '}
						<Route path={ROUTES.SIGN_UP} component={Signup} />{' '}
					</Switch>
				</Router>{' '}
			</Provider>
		</>
	);
}

export default App;

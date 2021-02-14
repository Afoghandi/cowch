import React, { Fragment, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import PrivateRoute from './helpers/routes';

import { Home, Signin, Signup, Browse } from './pages';

//Redux
import { Provider } from 'react-redux';
import { loadUser, loadToken } from './actions/auth';

import store from './store';

const App = () => {
	useEffect(() => {
		store.dispatch(loadToken());
		store.dispatch(loadUser());
	}, []);

	return (
		<Fragment>
			<Provider store={store}>
				<Router>
					<Route exact path='/' component={Home} />{' '}
					<Switch>
						<Route path={ROUTES.SIGN_IN} component={Signin} />{' '}
						<Route path={ROUTES.SIGN_UP} component={Signup} />{' '}
						<PrivateRoute path={ROUTES.BROWSE} component={Browse} />{' '}
					</Switch>
				</Router>{' '}
			</Provider>
		</Fragment>
	);
};

export default App;

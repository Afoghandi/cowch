import React, { Fragment, useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import PrivateRoute from './helpers/routes';

import { Home, Signin, Signup, Browse } from './pages';

//Redux
import { Provider } from 'react-redux';
import { loadUser, loadToken } from './actions/auth';

import store from './store';

const App = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
const initialiseAuth = async()=>{
	store.dispatch(loadToken());
	await store.dispatch(loadUser());
	setLoading(false);
}
		initialiseAuth();
		
	}, []);
if(loading) return <div>Loading....</div>
	return (
		
			<Provider store={store}>
				<Router>
				<Fragment>
					<Route exact path='/' component={Home} />{' '}
					<Switch>
						<Route path={ROUTES.SIGN_IN} component={Signin} />{' '}
						<Route path={ROUTES.SIGN_UP} component={Signup} />{' '}
						<PrivateRoute path={ROUTES.BROWSE} component={Browse} />{' '}
					</Switch>
					</Fragment>
				</Router>{' '}
			</Provider>
		
	);
};

export default App;

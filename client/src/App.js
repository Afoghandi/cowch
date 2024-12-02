import React, { Fragment, useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as ROUTES from './constants/routes';

import PrivateRoute from './helpers/routes';

import { Home, Signin, Signup, Browse } from './pages';

import LoadingSpinner from './components/loading/index';
//Redux
import { Provider } from 'react-redux';
import { loadUser, loadToken } from './actions/auth';

import store from './store';
import AlertMessage from './containers/alertMessage';
import setAuthToken from './utils/setAuthToken';

const App = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
const initialiseAuth = async()=>{
	const token =localStorage.getItem('token')|| sessionStorage.getItem('token')
	if(token){
		
		setAuthToken(token)
	}
	store.dispatch(loadToken());
	await store.dispatch(loadUser());
	setLoading(false);
}
		initialiseAuth();
		
	}, []);
if(loading) return <LoadingSpinner/>
	return (
		
			<Provider store={store}>
				<Router basename="/cowch" >
				<Fragment>
					<AlertMessage/>
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

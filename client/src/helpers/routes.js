import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !loading ? (
				<Redirect to='/signin' />
			) : (
				<Component {...props} />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

/*export function IsUserRedirect({
	isAuthenticated,
	loggedInPath,
	children,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={() => {
				if (!isAuthenticated) {
					return children;
				}
				if (isAuthenticated) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath,
							}}
						/>
					);
				}
				return null;
			}}
		/>
	);
}

export function ProtectedRoute({ isAuthenticated, children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (isAuthenticated) {
					return children;
				}
				if (!isAuthenticated) {
					return (
						<Redirect
							to={{
								pathname: 'signin',
								state: { from: location },
							}}
						/>
					);
				}
			}}
		/>
	);
}*/

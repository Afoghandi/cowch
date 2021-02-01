import React from 'react';

import { Route, Redirect } from 'react-router-dom';

export function IsUserRedirect({
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
}

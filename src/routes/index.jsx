import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../views/homePage/homePage';
import Authentication from '../views/authentication';

const routes = () => (
	<BrowserRouter>
		<Switch>
			<Route
				path="/products"
				component={App}
			/>
			<Route
				exact path="/"
				component={Authentication}
			/>
		</Switch>
	</BrowserRouter>
);

export default routes;

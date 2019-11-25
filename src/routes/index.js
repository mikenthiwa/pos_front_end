import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../views/homePage/homePage";

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route
                exact path="/"
                component={App}
            />
        </Switch>
    </BrowserRouter>
);

export default routes

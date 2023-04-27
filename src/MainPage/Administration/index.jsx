/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Users from "./users"


const Uiinterfaceroute = ({ match }) => (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
      <Route path={`${match.url}/users`} component={Users} />
    </Switch>
);

export default Uiinterfaceroute;

/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Users from "./users"
import Careers from "./careers"
import CareerDetails from './careerDetails';


const Uiinterfaceroute = ({ match }) => (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
      <Route path={`${match.url}/users`} component={Users} />
      <Route path={`${match.url}/careers`} component={Careers} />
      <Route path={`${match.url}/careerDetails`} component={CareerDetails} />
    </Switch>
);

export default Uiinterfaceroute;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AllEmployees from './allemployees';
import Group from "./group";
import Contacts from './contacts';
import Review from './review';
import Status from "./status";
import Profile from './Profile'

const EmployeesRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/allemployees`} />
    <Route path={`${match.url}/allemployees`} component={AllEmployees} />
    <Route path={`${match.url}/profile/:id`} component={Profile} />
    <Route path={`${match.url}/group`} component={Group} />
    <Route path={`${match.url}/contacts`} component={Contacts} />
    <Route path={`${match.url}/review`} component={Review} />
    <Route path={`${match.url}/status`} component={Status} />
  </Switch>
);

export default EmployeesRoute;

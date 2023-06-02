import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import AllEmployees from './allemployees';
import AllEmployeesList from './employeeslist';
import Group from "./group";
import Contacts from './contacts';
import Review from './review';

const EmployeesRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/allemployees`} />
    <Route path={`${match.url}/allemployees`} component={AllEmployees} />
    <Route path={`${match.url}/employees-list`} component={AllEmployeesList} />
    <Route path={`${match.url}/group`} component={Group} />
    <Route path={`${match.url}/contacts`} component={Contacts} />
    <Route path={`${match.url}/review`} component={Review} />
  </Switch>
);

export default EmployeesRoute;

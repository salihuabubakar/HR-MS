import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import AllEmployees from './allemployees';
import AllEmployeesList from './employeeslist';
import Department from './department';
import Designation from './designation';

const EmployeesRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/allemployees`} />
    <Route path={`${match.url}/allemployees`} component={AllEmployees} />
    <Route path={`${match.url}/employees-list`} component={AllEmployeesList} />
    <Route path={`${match.url}/departments`} component={Department} />
    <Route path={`${match.url}/designations`} component={Designation} />
  </Switch>
);

export default EmployeesRoute;

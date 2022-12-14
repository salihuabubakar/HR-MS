import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import EmployeeProfile from "./employeeprofile"
import ClientProfile from "./clientprofile"
import AddminProfile from './AddminProfile';


const subscriptionroute = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/employee-profile`}
    />
    <Route path={`${match.url}/employee-profile`} component={EmployeeProfile} />
    <Route path={`${match.url}/client-profile`} component={ClientProfile} />
    <Route path={`${match.url}/AddminProfile`} component={AddminProfile} />
  </Switch>
);

export default subscriptionroute;

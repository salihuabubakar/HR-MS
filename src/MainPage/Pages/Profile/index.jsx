import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Profile from "./profile"
// import ProfileSetting from "./profile-settings"


const subscriptionroute = ({ match }) => (
  <Switch>
    <Redirect
      exact
      from={`${match.url}/`}
      to={`${match.url}/profile`}
    />
    <Route path={`${match.url}/profile`} component={Profile} />
    {/* <Route path={`${match.url}/profile-settings`} component={ProfileSetting} /> */}
  </Switch>
);

export default subscriptionroute;

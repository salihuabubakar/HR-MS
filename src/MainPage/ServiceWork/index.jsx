/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import ServiceWorker from "./serviceWorker";
import Borough from "./borough";
import SocialWorker from "./social-worker";
import Visitor from "./visitor";

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/service-worker`} />
    <Route path={`${match.url}/service-worker`} component={ServiceWorker} />
    <Route path={`${match.url}/borough`} component={Borough} />
    <Route path={`${match.url}/social-worker`} component={SocialWorker} />
    <Route path={`${match.url}/visitor`} component={Visitor} />
  </Switch>
);

export default ServiceRoute;

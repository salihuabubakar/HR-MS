/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import ServiceWorker from "./serviceWorker";

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/service-worker`} />
    <Route path={`${match.url}/service-worker`} component={ServiceWorker} />
  </Switch>
);

export default ServiceRoute;

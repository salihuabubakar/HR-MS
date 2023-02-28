/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import ServiceWorker from "./serviceWorker";
import ServiceWorkerTable from "./serviceWorkerTable";
import ServiceWorkerProfile from "./serviceWorkerProfile";

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/service-worker`} />
    <Route path={`${match.url}/service-worker`} component={ServiceWorker} />
    <Route
      path={`${match.url}/service-worker-table`}
      component={ServiceWorkerTable}
    />
    <Route
      path={`${match.url}/service-worker-profile`}
      component={ServiceWorkerProfile}
    />
  </Switch>
);

export default ServiceRoute;

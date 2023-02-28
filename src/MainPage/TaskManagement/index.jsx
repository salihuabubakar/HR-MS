/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import TaskManager from "./taskManager";

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/task-manager`} />
    <Route path={`${match.url}/task-manager`} component={TaskManager} />
  </Switch>
);

export default ServiceRoute;

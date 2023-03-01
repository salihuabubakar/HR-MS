/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import TaskManager from "./taskManager";
import TaskManagerTable from "./taskManagerTable";
import TaskManagerDetails from "./taskDetails"

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/task-manager`} />
    <Route path={`${match.url}/task-manager`} component={TaskManager} />
    <Route path={`${match.url}/task-manager-table`} component={TaskManagerTable} />
    <Route path={`${match.url}/task-manager-detail`} component={TaskManagerDetails} />
  </Switch>
);

export default ServiceRoute;

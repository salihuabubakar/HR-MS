/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch} from "react-router-dom";
import TaskManagerTable from "./task-manager-table";
import TaskManagerDetails from "./task-details"

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/task-manager-table`} />
    <Route path={`${match.url}/task-manager-table`} component={TaskManagerTable} />
    <Route path={`${match.url}/task-manager-detail/:id`} component={TaskManagerDetails} />
  </Switch>
);

export default ServiceRoute;

/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Shift from "./shift";
import ShiftScheduling from "./shift-scheduling";
import House from "./house"

const ShiftScheduleRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/shift`} />
    <Route path={`${match.url}/shift`} component={Shift} />
    <Route path={`${match.url}/shift-scheduling/:id`} component={ShiftScheduling} />
    <Route path={`${match.url}/house`} component={House} />
  </Switch>
);

export default ShiftScheduleRoute;

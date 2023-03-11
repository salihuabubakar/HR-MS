/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import ShiftList from "./shiftlist";
import ShiftScheduling from "./shiftscheduling";
import House from "./house"

const ShiftScheduleRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/shift-list`} />
    <Route path={`${match.url}/shift-list`} component={ShiftList} />
    <Route path={`${match.url}/shift-scheduling`} component={ShiftScheduling} />
    <Route path={`${match.url}/house`} component={House} />
  </Switch>
);

export default ShiftScheduleRoute;

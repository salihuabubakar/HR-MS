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
    {/* The `<Route>` component is defining a route for the path `${match.url}/shift-scheduling/:id}`.
    When this route is matched, it will render the `ShiftScheduling` component. The `:id` in the
    path is a dynamic parameter that can be accessed within the `ShiftScheduling` component. It
    allows for different shift scheduling pages to be rendered based on the value of the `id`
    parameter in the URL.*/}
    <Route path={`${match.url}/shift-scheduling/:id`} component={ShiftScheduling} />
    <Route path={`${match.url}/house`} component={House} />
  </Switch>
);

export default ShiftScheduleRoute;

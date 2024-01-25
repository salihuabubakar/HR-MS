/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Accomodations from "./accomodations";
import HouseDetails from "./house-details";

const AccomodationRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/accomodations`} />
    <Route path={`${match.url}/accomodations`} component={Accomodations} />
    <Route path={`${match.url}/house-details/:id`} component={HouseDetails} />
  </Switch>
);

export default AccomodationRoute;

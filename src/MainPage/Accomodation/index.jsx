/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Accomodations from "./accomodations";
import HouseDetails from "./HouseDetails";

const AccomodationRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/accomodations`} />
    <Route path={`${match.url}/accomodations`} component={Accomodations} />
    <Route path={`${match.url}/HouseDetails`} component={HouseDetails} />
  </Switch>
);

export default AccomodationRoute;

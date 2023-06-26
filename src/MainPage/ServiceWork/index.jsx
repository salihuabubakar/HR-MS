/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import ServiceWorker from "./serviceWorker";
import Borough from "./borough";
import SocialWorker from "./social-worker";
import Visitor from "./visitor";
import Complaint from "./complaint";
import Request from "./request";
import Incident from "./incident";
import Misper from "./misper";

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/service-worker`} />
    <Route path={`${match.url}/service-worker`} component={ServiceWorker} />
    <Route path={`${match.url}/borough`} component={Borough} />
    <Route path={`${match.url}/social-worker`} component={SocialWorker} />
    <Route path={`${match.url}/visitor`} component={Visitor} />
    <Route path={`${match.url}/complaint`} component={Complaint} />
    <Route path={`${match.url}/request`} component={Request} />
    <Route path={`${match.url}/incident`} component={Incident} />
    <Route path={`${match.url}/misper`} component={Misper} />
  </Switch>
);

export default ServiceRoute;

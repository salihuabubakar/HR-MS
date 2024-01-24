/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import ServiceWorker from "./serviceworker";
import Borough from "./borough";
import SocialWorker from "./social-worker";
import Visitor from "./visitor";
import Complaint from "./complaint";
import Request from "./request";
import Incident from "./incident";
import Misper from "./misper";
import DocumentType from "./document-type";
import LegalStatus from "./legal-status";
import GpType from "./gp-type";
import Profile from "./profile";
import Gp from "./general-practice";
import Solicitor from "./solicitor";
import School from "./school";

const ServiceRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/service-worker`} />
    <Route path={`${match.url}/service-worker`} component={ServiceWorker} />
    <Route path={`${match.url}/profile/:id`} component={Profile} />
    <Route path={`${match.url}/borough`} component={Borough} />
    <Route path={`${match.url}/social-worker`} component={SocialWorker} />
    <Route path={`${match.url}/visitor`} component={Visitor} />
    <Route path={`${match.url}/complaint`} component={Complaint} />
    <Route path={`${match.url}/request`} component={Request} />
    <Route path={`${match.url}/incident`} component={Incident} />
    <Route path={`${match.url}/misper`} component={Misper} />
    <Route path={`${match.url}/document-type`} component={DocumentType} />
    <Route path={`${match.url}/legal-status`} component={LegalStatus} />
    <Route path={`${match.url}/gp-type`} component={GpType} />
    <Route path={`${match.url}/general-practice`} component={Gp} />
    <Route path={`${match.url}/solicitor`} component={Solicitor} />
    <Route path={`${match.url}/school`} component={School} />
  </Switch>
);

export default ServiceRoute;

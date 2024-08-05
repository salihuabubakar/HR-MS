import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Users from "./users";
import Careers from "./careers";
import CareerDetails from './career-details';
import { isAdmin, isManager } from '../../utils/helperFucntions';
import Error404 from '../Pages/ErrorPage/error404';

const ManagerRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/careers`} component={Careers} />
    <Route path={`${match.url}/career-details/:id`} component={CareerDetails} />
  </Switch>
);

const AdminRoutes = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
    <Route path={`${match.url}/users`} component={Users} />
    <ManagerRoutes match={match} />
  </Switch>
)

const ErrorRoutes = () => (
  <Switch>
    <Redirect to="/error-404" />
    <Route path="/error-404" component={Error404} />
  </Switch>
);

const Uiinterfaceroute = ({ match }) => {
  return (
    <>
      {
        isAdmin() ? 
          <AdminRoutes match={match}/>
        : isManager() ?
          <ManagerRoutes match={match} />
        : <ErrorRoutes />
      }
    </>
  )
};

export default Uiinterfaceroute;

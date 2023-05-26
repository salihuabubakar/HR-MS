import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// Authentication
import LoginPage from "./loginpage";
import RegistrationPage from "./RegistrationPage";
import ForgotPassword from "./forgotpassword";

// Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import Settinglayout from "./Sidebar/Settinglayout";
// Error Page
import Error404 from "../MainPage/Pages/ErrorPage/error404";
import Error500 from "../MainPage/Pages/ErrorPage/error500";

const App = ({ match, location }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/register" component={RegistrationPage} />
      <PrivateRoute path="/app" component={DefaultLayout} />
      <PrivateRoute path="/settings" component={Settinglayout} />
      <Route path="/error-404" component={Error404} />
      <Route path="/error-500" component={Error500} />
      <Route component={Error404} />
    </Switch>
  );
};

export default App;

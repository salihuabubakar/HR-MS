import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
//Authendication
import LoginPage from "./loginpage";
import RegistrationPage from "./RegistrationPage";
import ForgotPassword from "./forgotpassword";

//Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import Settinglayout from "./Sidebar/Settinglayout";

//Error Page
import Error404 from "../MainPage/Pages/ErrorPage/error404";
import Error500 from "../MainPage/Pages/ErrorPage/error500";

import "Assets/css/font-awesome.min.css";

const App = ({ match, location }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    // Check if user is not logged in and on the main URL
    if (!isLoggedIn && location.pathname === "/") {
      setRedirectToLogin(true);
    }
  }, [isLoggedIn, location.pathname]);

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={LoginPage} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/register" component={RegistrationPage} />
      {isLoggedIn ? (
        <>
          <Route path="/app" component={DefaultLayout} />
          <Route path="/settings" component={Settinglayout} />
        </>
      ) : (
        <>
          <Redirect to="/login" />
        </>
      )}
      <Route path="/error-404" component={Error404} />
      <Route path="/error-500" component={Error500} />
    </Switch>
  );
};

export default App;

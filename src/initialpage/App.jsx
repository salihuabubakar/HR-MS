import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//Main App
import DefaultLayout from "./Sidebar/DefaultLayout";
import Settinglayout from "./Sidebar/Settinglayout"
import "react-toastify/dist/ReactToastify.css";
import "Assets/css/font-awesome.min.css";
import "semantic-ui-css/semantic.min.css";
import { LoadSpinner } from "../_components/modelbox/Addemployee.style";
import { useGlobalState } from "../context/GlobalState";
//Authendication
import { checkTokenExpiration } from "../utils/auth/checkJwtExpiration";
const LoginPage = lazy(() => import('./loginpage'));
const ForgotPassword = lazy(() => import('./forgotpassword'));
const ResetPassword = lazy(() => import('./resetpassword'));

//Error Page
const Error404 = lazy(() => import("../MainPage/Pages/ErrorPage/error404"));
const Error500 = lazy(() => import("../MainPage/Pages/ErrorPage/error500"));


const App = () => {
  const ProtectedRoute = ({ isTokenNotExpired }) => {
    if(!isTokenNotExpired) {
      return (
        <>
          <Route path="/app" component={DefaultLayout} />
          <Route path="/settings" component={Settinglayout} />
        </>
      )
    }
    return <Redirect from="/" to="/login" />;
  }
  return (
    <>
      <Suspense fallback={
        <LoadSpinner>
          <div className="loader">
            Loading....
          </div>
        </LoadSpinner>
      }>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:id/:token" component={ResetPassword} />
          <ProtectedRoute 
            isTokenNotExpired={checkTokenExpiration()}
          />
          <Route path="/error-404" component={Error404} />
          <Route path="/error-500" component={Error500} />
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default App;

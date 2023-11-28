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
//Authendication
const LoginPage = lazy(() => import('./loginpage'));
const RegistrationPage = lazy(() => import('./RegistrationPage'));
const ForgotPassword = lazy(() => import('./forgotpassword'));

//Error Page
const Error404 = lazy(() => import("../MainPage/Pages/ErrorPage/error404"));
const Error500 = lazy(() => import("../MainPage/Pages/ErrorPage/error500"));


const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const ProtectedRoute = ({ isAuthenticated }) => {
    if(isAuthenticated) {
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
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/register" component={RegistrationPage} />
          <ProtectedRoute 
            isAuthenticated={isLoggedIn}
          />
          <Route path="/error-404" component={Error404} />
          <Route path="/error-500" component={Error500} />
        </Switch>
      </Suspense>
      <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
    </>
  );
};

export default App;

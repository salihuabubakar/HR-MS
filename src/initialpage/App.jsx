import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// We will create these two pages in a moment
//Authendication
import LoginPage from './loginpage'
import RegistrationPage from './RegistrationPage'
import ForgotPassword from './forgotpassword'
import OTP from './otp'
import LockScreen from './lockscreen'
import ApplyJobs from './ApplyJob';

//Main App
import DefaultLayout from './Sidebar/DefaultLayout';
import Settinglayout from './Sidebar/Settinglayout';
import Tasklayout from './Sidebar/tasklayout';
import Emaillayout from './Sidebar/emaillayout';
import chatlayout from './Sidebar/chatlayout';

import uicomponents from '../MainPage/UIinterface/components';
//Error Page
import Error404 from '../MainPage/Pages/ErrorPage/error404';
import Error500 from '../MainPage/Pages/ErrorPage/error500';


// import 'Assets/css/font-awesome.min.css';


 const App = ({ match, location }) => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn Before Check", isLoggedIn);

  const InitialPath = ({ component: Component, authUser, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        if (authUser && isLoggedIn !== null) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );

  const user = localStorage.getItem("email");

   if (location.pathname === '/') {
     if (user === null && isLoggedIn === null) {
       return <Redirect to={"/login"} />;
     } else {
       return <Redirect to={"/app/main/dashboard"} />;
     }
   }

   return (
     <Switch>
       <InitialPath
         path={`${match.url}app`}
         authUser={user}
         component={DefaultLayout}
       />
       <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
       <Route path="/login" component={LoginPage} />
       <Route path="/forgotpassword" component={ForgotPassword} />
       <Route path="/register" component={RegistrationPage} />
       <Route path="/otp" component={OTP} />
       <Route path="/lockscreen" component={LockScreen} />
       <Route path="/applyjob" component={ApplyJobs} />
       <Route path="/app" component={DefaultLayout} />
       <Route path="/settings" component={Settinglayout} />
       <Route path="/tasks" component={Tasklayout} />
       <Route path="/email" component={Emaillayout} />
       <Route path="/conversation" component={chatlayout} />
       <Route path="/ui-components" component={uicomponents} />
       <Route path="/error-404" component={Error404} />
       <Route path="/error-500" component={Error500} />
     </Switch>
   );
 };
    
   
export default App;

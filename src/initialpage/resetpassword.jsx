import React, { useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import HeaderLogo from "../assets/img/Header-logo.png";
import { useGlobalState } from "../context/GlobalState";
import { forgot_password } from '../utils/sendToServer';

const ResetPassword = () => {
  const [isDarkMode] = useGlobalState("isDarkMode");
  const { id, token } = useParams();
  console.table([{id, token}])

  const [forgotPasswordState, dispatchForgotPasswordPayload] = useReducer(forgot_password, []);

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchForgotPasswordPayload({ type: "add", payload: {password: password} });
  }
  return (
    <>
      <Helmet>
        <title>Reset Password - Peepal Tree HRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div style={{ backgroundColor: `${isDarkMode ? '#110C08' : 'white'}`}} className="account-content h-screen justify-center flex">
        <div className="container">
          {/* Account Logo */}
          <div className="flex items-center justify-center">
            <img
              src={
                HeaderLogo
              }
              style={{ width: "25%" }}
              alt=""
            />
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title text-orange-500">Reset Password?</h3>
              <p className="account-subtitle">
                Enter a new password
              </p>
              {/* Account Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    className="form-control" 
                    type='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    className="btn btn-primary account-btn"
                    type="submit"
                  >
                    Update Password
                  </button>
                </div>
              </form>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default ResetPassword;

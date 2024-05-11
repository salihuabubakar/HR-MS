import React, { useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import HeaderLogo from "../assets/img/Header-logo.png";
import { useGlobalState } from "../context/GlobalState";
import { forgot_password } from '../utils/sendToServer';

const ForgotPassword = () => {
  const [isDarkMode] = useGlobalState("isDarkMode");

  const [forgotPasswordState, dispatchForgotPasswordPayload] = useReducer(forgot_password, []);

  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchForgotPasswordPayload({ type: "add", payload: {username: username} });
    setUsername("");
  }
  return (
    <>
      <Helmet>
        <title>Forgot Password - Peepal Tree HRMS</title>
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
              <h3 className="account-title text-orange-500">Forgot Password?</h3>
              <p className="account-subtitle">
                Enter your email to get a password reset link
              </p>
              {/* Account Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    className="form-control" 
                    type='email' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    className="btn btn-primary account-btn"
                    type="submit"
                  >
                    Create Link
                  </button>
                </div>
                <div className="account-footer">
                  <p className='text-muted'>
                    Remember your password? <Link to="/login">Login</Link>
                  </p>
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



export default ForgotPassword;

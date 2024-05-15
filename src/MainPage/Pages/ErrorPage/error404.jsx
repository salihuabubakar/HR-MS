import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../../context/GlobalState';

const Error404 = () => {
  const [isDarkMode] = useGlobalState("isDarkMode", isDarkMode);
  return (
    <>
        <Helmet>
          <title>Error 404</title>
          <meta name="description" content="404 Page"/>					
        </Helmet>
      <div className="error-box">
        <h1>404</h1>
        <h3 style={{color: `${isDarkMode ? '#625F5C' : '#141B34'}`}}><i className="fa fa-warning" /> Oops! Page not found!</h3>
        <p style={{color: `${isDarkMode ? '#625F5C' : '#141B34'}`}}>The page you requested was not found.</p>
        <Link to="/app/main/dashboard" className="btn btn-custom">Back to Home</Link>
      </div>
    </>
  );
}

export default Error404;

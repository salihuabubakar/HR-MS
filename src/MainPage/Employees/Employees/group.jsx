import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import "../../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import Designations from "./designation";
import Department from "./department";
import Organisation from "./organisation";
import Status from "./status";

const Group = () => {
  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Group - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Group</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Group</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-6">
              <Department />
            </div>
            <div className="col-sm-6">
              <Designations />
            </div>
            <div className="col-sm-6">
              <Organisation />
            </div>
            <div className="col-sm-6">
              <Status />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Group);

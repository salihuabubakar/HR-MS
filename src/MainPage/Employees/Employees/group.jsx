import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import "../../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import Role from "./role";
import Department from "./department";
import Organisation from "./organisation";
import Status from "./status";
import { useRoleFetching, useDepartmentFetching } from "../../../utils/employeeCustomFetchHook";
import { add_update_delete_role, add_update_delete_department } from "../../../utils/sendToServer";

const Group = () => {
  const { roleData, roleError, isRoleLoading } = useRoleFetching();
  const { departmentData, isDepartmentDataLoading, departmentError } =
    useDepartmentFetching();
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
              <Department
                departmentData={departmentData}
                isDepartmentDataLoading={isDepartmentDataLoading}
                departmentError={departmentError}
                add_update_delete_department={add_update_delete_department}
              />
            </div>
            <div className="col-sm-6">
              <Role
                roleData={roleData}
                roleError={roleError}
                isRoleLoading={isRoleLoading}
                add_update_delete_role={add_update_delete_role}
                departmentData={departmentData}
              />
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

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";

const SelectDept = () => {
  const [menu, setMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  }, []);

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Employee - HRMS Admin Template</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Departments</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Departments</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Department Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <a href="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          {/* Search Filter */}
          <div className="row staff-grid-row">
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to="/app/employee/shift-scheduling">
                    Web Development
                  </Link>
                </h4>
                <div className="small text-muted">Number of staffs: 20</div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to="/app/employee/shift-scheduling">
                    Application Development
                  </Link>
                </h4>
                <div className="small text-muted">Number of staffs: 20</div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to="/app/employee/shift-scheduling">IT Management</Link>
                </h4>
                <div className="small text-muted">Number of staffs: 20</div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to="/app/employee/shift-scheduling">
                    Accounts Management
                  </Link>
                </h4>
                <div className="small text-muted">Number of staffs: 20</div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to="/app/employee/shift-scheduling">
                    Support Management
                  </Link>
                </h4>
                <div className="small text-muted">Number of staffs: 20</div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
              <div className="profile-widget">
                <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                  <Link to="/app/employee/shift-scheduling"> Marketing</Link>
                </h4>
                <div className="small text-muted">Number of staffs: 20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDept;
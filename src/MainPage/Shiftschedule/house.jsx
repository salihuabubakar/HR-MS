import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { initHouse, savedHouseReducer } from "../../utils/localStorage";
import HouseImg from "../../assets/img/house.png";
import DefaultImage from "../../assets/img/placeholder.jpg";

const SelectDept = () => {
  const [menu, setMenu] = useState(false);
  const [house] = useReducer(savedHouseReducer, [], initHouse);
  const [houseList, setHouseList] = useState();
  useEffect(() => {
    setHouseList(house);
  }, [house]);

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
          <title>Select House - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Houses</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Houses</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-6">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">House Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <a href="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          {/* Search Filter */}
          <div className="row staff-grid-row">
            {houseList?.length > 0
              ? houseList?.map((house) => {
                  const { id, image, houseName, employee, managerName } = house;
                  return (
                    <div
                      key={id}
                      className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    >
                      <div className="profile-widget">
                        <Link
                          to={{
                            pathname: "/app/shiftschedule/shift-scheduling",
                            state: { id: id },
                          }}
                          className="avatar"
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "#00000000",
                            height: "100%",
                            marginRight: "40px",
                          }}
                        >
                          <img
                            style={{
                              borderRadius: "5px",
                              width: "80px",
                              height: "80px",
                            }}
                            alt=""
                            src={image ? image : DefaultImage}
                          />
                        </Link>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <Link
                            to={{
                              pathname: "/app/shiftschedule/shift-scheduling",
                              state: { id: id },
                            }}
                          >
                            {houseName}
                          </Link>
                        </h4>
                        <p className="small text-muted">
                          House Manager: {managerName}
                        </p>
                        <div className="small text-muted">
                          {"Number of staffs: " + employee?.length}
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No house available."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDept;

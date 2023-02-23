import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
} from "../../../Entryfile/imagepath";
import SmileImg from "../../../assets/img/smile.png";
import { useParams, useLocation } from "react-router-dom";
import { useGlobalState, setGlobalState } from "../../../context/GlobalState";
import { initHouse, savedHouseReducer } from "../../../utils/localStorage";
import HouseImg from "../../../assets/img/house.png";

const houseProfile = () => {
  const location = useLocation();
  const houseID = location?.state?.id;
  const serviceWorkerIndex = location?.state?.index;
  const [houseDetails] = useReducer(savedHouseReducer, [], initHouse);

  useEffect(() => {
    localStorage.setItem("house", JSON.stringify(houseDetails));
  }, [houseDetails]);

  const [house, setResident] = useState();
  useEffect(() => {
    setResident(houseDetails);
  }, [houseDetails]);

  const selectedHouse = house?.find((house) => house?.id === houseID);

  const HouseId = selectedHouse?.id;
  const HouseName = selectedHouse?.houseName;
  const totalHouseEmployees = selectedHouse?.employee;
  const managerName = selectedHouse?.managerName;

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={() => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Employee Profile - HRMS admin Template</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">House Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/serviceWork/serviceWorker">House</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="tab-content">
            {/* Profile Info Tab */}
            <div
              id="emp_profile"
              className="pro-overview tab-pane fade show active"
            >
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <div className="">
                        <div className="profile-img">
                          <a>
                            <img
                              style={{ width: "80px" }}
                              alt=""
                              src={HouseImg}
                            />
                          </a>
                        </div>
                      </div>
                      <h3 className="card-title">House information</h3>
                      <ul className="personal-info">
                        <li>
                          <div className="title">House name</div>
                          <div className="text">{HouseName}</div>
                        </li>
                        <li>
                          <div className="title">Manager</div>
                          <div className="text">{managerName}</div>
                        </li>
                        <li>
                          <div className="title">Number of employees</div>
                          <div className="text">
                            {totalHouseEmployees?.length
                              ? totalHouseEmployees?.length
                              : "0"}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">List of employees</h3>
                      {totalHouseEmployees ? totalHouseEmployees?.map(
                        (employees, index) => {
                          const { label, value } = employees;
                          return (
                            <React.Fragment key={value}>
                              <ul className="personal-info">
                                <li>
                                  <div className="text">{label}</div>
                                </li>
                              </ul>
                            </React.Fragment>
                          );
                        }
                      ) : "Ops! No employees in the house."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Info Tab */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default houseProfile;

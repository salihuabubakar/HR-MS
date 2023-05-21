import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import {
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Avatar_16,
} from "../../Entryfile/imagepath";
import SmileImg from "../../assets/img/smile.png";
import { useParams, useLocation } from "react-router-dom";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import { initHouse, savedHouseReducer } from "../../utils/localStorage";
import HouseImg from "../../assets/img/house.png";
import DefaultImage from "../../assets/img/placeholder.jpg";

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
  const image = selectedHouse?.image;
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
          <title>Accomodation Profile - HRMS admin Template</title>
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
                    <Link to="/app/accomodation/accomodations">House</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="tab-content">
            {/* Profile Info Tab */}
            <div>
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <div className="">
                        <div className="profile-img">
                          <a>
                            <img
                              className="inline-block"
                              style={{
                                borderRadius: "5px",
                                width: "80px",
                                height: "80px",
                              }}
                              alt=""
                              src={image ? image : DefaultImage}
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
                      {totalHouseEmployees
                        ? totalHouseEmployees?.map((employees, index) => {
                            const { label, value, image } = employees;
                            return (
                              <React.Fragment key={value}>
                                <ul className="personal-info">
                                  <li>
                                    <span className="text">
                                      <img
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          borderRadius: "50px",
                                        }}
                                        alt=""
                                        src={image ? image : DefaultImage}
                                      />{" "}
                                      {label}
                                    </span>
                                  </li>
                                </ul>
                              </React.Fragment>
                            );
                          })
                        : "Ops! No employees in the house."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Info Tab */}
          </div>
          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <a
                      href="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      Service Worker
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#document_upload"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Document Upload
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
                      <h3 className="card-title">
                        Service Workers{" "}
                        <a className="edit-icon">
                          <i className="fa fa-pencil" />
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Info Tab */}
            {/* Document Upload Tab */}
            <div className="tab-pane fade" id="document_upload">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title m-b-20">Uploaded files</h5>
                  <ul className="files-list">
                    <li>
                      <div className="files-cont">
                        <div className="file-type">
                          <span className="files-icon">
                            <i className="fa fa-file-pdf-o" />
                          </span>
                        </div>
                        <div className="files-info">
                          <span className="file-name text-ellipsis">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              AHA Selfcare Mobile Application Test-Cases.xls
                            </a>
                          </span>
                          <span className="file-author">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              John Doe
                            </a>
                          </span>{" "}
                          <span className="file-date">May 31st at 6:53 PM</span>
                          <div className="file-size">Size: 14.8Mb</div>
                        </div>
                        <ul className="files-action">
                          <li className="dropdown dropdown-action">
                            <a
                              href=""
                              className="dropdown-toggle btn btn-link"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="material-icons">more_horiz</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="">
                                Download
                              </a>
                              <a
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#share_files"
                              >
                                Share
                              </a>
                              <a className="dropdown-item" href="">
                                Delete
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="files-cont">
                        <div className="file-type">
                          <span className="files-icon">
                            <i className="fa fa-file-pdf-o" />
                          </span>
                        </div>
                        <div className="files-info">
                          <span className="file-name text-ellipsis">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              AHA Selfcare Mobile Application Test-Cases.xls
                            </a>
                          </span>
                          <span className="file-author">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              Richard Miles
                            </a>
                          </span>{" "}
                          <span className="file-date">May 31st at 6:53 PM</span>
                          <div className="file-size">Size: 14.8Mb</div>
                        </div>
                        <ul className="files-action">
                          <li className="dropdown dropdown-action">
                            <a
                              href=""
                              className="dropdown-toggle btn btn-link"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="material-icons">more_horiz</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="">
                                Download
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#share_files"
                              >
                                Share
                              </a>
                              <a className="dropdown-item" href="">
                                Delete
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Document Upload Tab */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default houseProfile;

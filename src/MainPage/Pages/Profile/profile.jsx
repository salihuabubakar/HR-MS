import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import AddFileUploadModal from '../../../_components/modelbox/AddFileUploadModal';
import { useGlobalState, setGlobalState } from '../../../context/GlobalState';
import DefaultImage from "../../../assets/img/placeholder.jpg";
import { DivContainer } from '../../TaskManagement/style';
import { useProfileFetching } from '../../../utils/employeeCustomFetchHook';

const Profile = () => {

  const { profileInfo, isProfileInfoLoading, isProfileInfoError } = useProfileFetching();

  useEffect(() => {
    console.table([profileInfo])
  }, [profileInfo]);

  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };


  return (
    <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={() => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Profile - Peepal Tree HRMS</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Profile</h3>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <a>
                          <img alt="" src={DefaultImage} />
                        </a>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              First Name
                            </h3>
                            <h6 className="text-muted">Role</h6>
                            <div className="staff-id">
                              Employee ID
                            </div>
                            <div className="small doj text-muted">
                              {/* Date of Join : 1st oct 2022 */}
                              Date of Join
                            </div>
                            {/* <div className="staff-msg"><Link onClick={()=>localStorage.setItem("minheight","true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <a>phone</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                <a>Email</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">{"dOB"}</div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">{"address"}</div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">
                                Gender
                              </div>
                            </li>
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  {/* <div className="avatar avatar-xs">
                                    <img src={Avatar_16} alt="" />
                                  </div> */}
                                </div>
                                <a>Abdul</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="pro-edit">
                      <a onClick={handleEditAcct} className="edit-icon">
                        <i className="fa fa-pencil" />
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
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
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#emp_tasks"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Tasks
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
                        Personal Informations{" "}
                          <a className="edit-icon">
                            <i className="fa fa-pencil" />
                          </a>
                      </h3>
                              <ul
                                style={{
                                  cursor: "pointer",
                                }}
                                className="personal-info"
                              >
                                <li>
                                  <div className="title">Religion</div>
                                  <div className="text">religion</div>
                                </li>
                                <li>
                                  <div className="title">
                                    Employment of spouse
                                  </div>
                                  <div className="text">
                                    employeeSpouseEmployment
                                  </div>
                                </li>
                                <li>
                                  <div className="title">No. of children</div>
                                  <div className="text">noChildren</div>
                                </li>
                              </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Emergency Contact{" "}
                        <a
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Relationship</th>
                              <th>Phone</th>
                              <th>Optional Phone</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                                    <tr>
                                      <td>name</td>
                                      <td>relationship</td>
                                      <td>primaryPhone</td>
                                      <td>optionalPhone
                                      </td>
                                      <td
                                        className="text-end edit-icon"
                                      >
                                        <i className="fa fa-pencil" />
                                      </td>
                                    </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Bank information</h3>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Bank name</div>
                          <div className="text">ICICI Bank</div>
                        </li>
                        <li>
                          <div className="title">Bank account No.</div>
                          <div className="text">159843014641</div>
                        </li>
                        <li>
                          <div className="title">IFSC Code</div>
                          <div className="text">ICI24504</div>
                        </li>
                        <li>
                          <div className="title">PAN No</div>
                          <div className="text">TC000Y56</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Family Informations{" "}
                        <a
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Relationship</th>
                              <th>Date of Birth</th>
                              <th>Phone</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                                            <tr>
                                              <td>name</td>
                                              <td>relationship</td>
                                              <td>dateOfBirth</td>
                                              <td>phone</td>
                                              <td
                                                className="text-end edit-icon"
                                              >
                                                <i className="fa fa-pencil" />
                                              </td>
                                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Education Informations{" "}
                        <a className="edit-icon">
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                                        <li>
                                          <div className="experience-user">
                                            <div className="before-circle" />
                                          </div>
                                          <div className="experience-content">
                                            <div className="timeline-content">
                                              <a className="name">
                                                institution
                                                <span
                                                  className="edit-icon"
                                                >
                                                  <i className="fa fa-pencil" />
                                                </span>
                                              </a>
                                              <div>qualification</div>
                                              <span className="time">
                                                startingDate - completeDate
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Experience Informations{" "}
                        <a className="edit-icon">
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                                        <li>
                                          <div className="experience-user">
                                            <div className="before-circle" />
                                          </div>
                                          <div className="experience-content">
                                            <div className="timeline-content">
                                              <a className="name">
                                                companyName
                                                <span
                                                  className="edit-icon"
                                                >
                                                  <i className="fa fa-pencil" />
                                                </span>
                                              </a>
                                              <div>jobPosition</div>
                                              <span className="time">
                                                location
                                              </span>
                                              <span className="time">
                                                periodFrom - periodTo
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Info Tab */}
            {/* Tasks Tab */}
            <div className="tab-pane fade" id="emp_tasks">
              <div className="row">
                            <>
                              <div
                                className="col-lg-6 col-sm-12 col-md-6 col-xl-4"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h4 className="project-title">
                                      <Link
                                        onClick={(e) => e.preventDefault()}
                                        to="#"
                                      >
                                        taskTitle
                                      </Link>
                                    </h4>
                                    <p className="text-muted">description</p>
                                    <small className="block text-ellipsis m-b-15">
                                      <span className="text-xs">
                                        Task Type:{" "}
                                      </span>
                                      <span
                                        style={{
                                          color: "#fff",
                                          padding: "5px",
                                          borderRadius: "4px",
                                        }}
                                        // className="text-muted"
                                      >
                                        taskType
                                      </span>{" "}
                                    </small>

                                    <small className="block text-ellipsis m-b-15">
                                      <span className="text-xs">
                                        Task Priority:{" "}
                                      </span>
                                      <span
                                        style={{
                                          color: "#fff",
                                          padding: "5px",
                                          borderRadius: "4px",
                                        }}
                                        // className="text-muted"
                                      >
                                        taskPriority.label
                                      </span>{" "}
                                    </small>

                                    <small className="block text-ellipsis m-b-15">
                                      <span className="text-xs">
                                        Task Status:{" "}
                                      </span>
                                      <span
                                        style={{
                                          color: "#fff",
                                          padding: "5px",
                                          borderRadius: "4px",
                                        }}
                                        // className="text-muted"
                                      >
                                        "--"
                                      </span>{" "}
                                    </small>

                                    <small className="block text-ellipsis m-b-15">
                                      <span className="text-xs">
                                        Date Created:{" "}
                                      </span>
                                      <span className="text-muted">
                                        dateCreated
                                      </span>{" "}
                                    </small>

                                    <small className="block text-ellipsis m-b-15">
                                      <span className="text-xs">
                                        Task Manager:{" "}
                                      </span>
                                      <span className="text-muted">
                                        manager
                                      </span>{" "}
                                    </small>

                                    <small className="block text-ellipsis m-b-15">
                                      <span className="text-xs">
                                        Time Allocated:{" "}
                                      </span>
                                      <span className="text-muted">
                                        timeAllocated hr
                                      </span>{" "}
                                    </small>
                                    <div className="project-members m-b-15">
                                      <div>Team:</div>
                                      <ul className="team-members">
                                        <li>
                                          <a
                                            data-bs-toggle="tooltip"
                                            title='label'
                                          >
                                            <img
                                              alt=""
                                              src={DefaultImage}
                                            />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <p className="m-b-5">
                                      Progress
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
              </div>
            </div>
            {/* /Tasks Tab */}
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </DivContainer>
  );
}
export default Profile;

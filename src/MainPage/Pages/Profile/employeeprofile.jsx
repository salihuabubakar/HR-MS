import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import {Avatar_02,Avatar_05,Avatar_09,Avatar_10,Avatar_16 } from '../../../Entryfile/imagepath'
import { useParams, useLocation } from "react-router-dom";
import AddProfileInfo from './components/AddProfileInfo';
import AddPersonalInfo from '../../../_components/modelbox/AddPersonalInfo';
import AddExpModal from '../../../_components/modelbox/AddExpModal';
import AddFamilyMemberModal from '../../../_components/modelbox/AddFamilyMemberModal';
import { useGlobalState, setGlobalState } from '../../../context/GlobalState';
import {
  initProfileInfo,
  savedProfileInfoReducer,
  initUserAccount,
  savedUserAccountReducer,
  initEduInfo,
  savedEduInfoReducer,
  initExpInfo,
  savedExpInfoReducer,
  initFamilyMemberInfo,
  savedFamilyMemberReducer
} from "../../../utils/localStorage";
import AddEmergencyContact from '../../../_components/modelbox/AddEmergencyContact';
import AddEducationInformation from '../../../_components/modelbox/AddEducationInformation';

const EmployeeProfile = () => {

  const location = useLocation();
  const employeeId = location?.state?.id;
  const emIndex = location?.state?.index;
  const emid = location?.state?.id;
  const [eduInformationIndex, setEduInformationIndex] = useState(0);
  const [expInformationIndex, setExpInformationIndex] = useState(0);
  const [familyMembInformationIndex, setFamilyMembExpInformationIndex] = useState(0);
  const [fieldIndex, setFieldIndex] = useState(0);
  const [expfieldIndex, setExpFieldIndex] = useState(0);
  const [familyMembfieldIndex, setFamilyMembFieldIndex] = useState(0);
  const [showProfileModal] = useGlobalState("showProfileModal");
  const [showPersonalInfoModal] = useGlobalState("showPersonalInfoModal");
  const [showEmergencyContactModal] = useGlobalState(
    "showEmergencyContactModal"
  );
  const [showEducationInformationModal] = useGlobalState("showEducationInformationModal");
  const [showExperienceModal] = useGlobalState("showExperienceModal");
  const [showFamilyMenberModal] = useGlobalState("showFamilyMenberModal");

  const [userAcct, dispatchUserAcct] = useReducer(
    savedUserAccountReducer,
    [],
    initUserAccount
  );

  useEffect(() => {
    localStorage.setItem("userAccount", JSON.stringify(userAcct));
  }, [userAcct]);
  useEffect(() => {
    if (!showProfileModal) {
      setGlobalState("selectedUserAccount", "");
    }
  }, [showProfileModal]);

  const [employeeAccts, setEmployeeAccts] = useState();
  useEffect(() => {
    setEmployeeAccts(userAcct);
  }, [userAcct]);

  const [eduInfo, dispatchEduInfo] = useReducer(
    savedEduInfoReducer,
    [],
    initEduInfo
  );

  useEffect(() => {
    localStorage.setItem("eduInfo", JSON.stringify(eduInfo));
  }, [eduInfo]);
  useEffect(() => {
    if (!showEducationInformationModal) {
      setGlobalState("selectedEducationalInfo", "");
    }
  }, [showEducationInformationModal]);

  const [eduArray, setEduArray] = useState();
  useEffect(() => {
    setEduArray(eduInfo);
  }, [eduInfo]);


  const [expInfo, dispatchExpInfo] = useReducer(
    savedExpInfoReducer,
    [],
    initExpInfo
  );

  useEffect(() => {
    localStorage.setItem("expInfo", JSON.stringify(expInfo));
  }, [expInfo]);
  useEffect(() => {
    if (!showExperienceModal) {
      setGlobalState("selectedExperienceModal", "");
    }
  }, [showExperienceModal]);

  const [expArray, setExpArray] = useState();
  useEffect(() => {
    setExpArray(expInfo);
  }, [expInfo]);


  const [familyMemb, dispatchFamilyMemb] = useReducer(
    savedFamilyMemberReducer,
    [],
    initFamilyMemberInfo
  );

  useEffect(() => {
    localStorage.setItem("familyMemb", JSON.stringify(familyMemb));
  }, [familyMemb]);
  useEffect(() => {
    if (!showFamilyMenberModal) {
      setGlobalState("selectedFamilyMemberInfo", "");
    }
  }, [showFamilyMenberModal]);

  const [familyMembArray, setFamilyMembArray] = useState();
  useEffect(() => {
    setFamilyMembArray(familyMemb);
  }, [familyMemb]);

  const [acctIdToEdit, setAcctIdToEdit] = useState("");


  const selectedEmployee = employeeAccts?.find(
    (staff) => staff?.id === employeeId
  );

  const userAcctDb = () => {
    return setGlobalState("selectedUserAccount", userAcct);
  }

  const handleEditAcct = () => {
    setGlobalState("showProfileModal", true);
    userAcctDb();
  };

  const handlePersonalInfo = () => {
    setGlobalState("showPersonalInfoModal", true);
    userAcctDb();
  };

  const handleEmergencyContact = () => {
    setGlobalState("showEmergencyContactModal", true);
    userAcctDb();
  }

  const handleEducationInfo = () => {
    setGlobalState("showEducationInformationModal", true);
  }

  const editEduInfo = (fieldsIndex, index) => {
    setGlobalState("showEducationInformationModal", true);
    setGlobalState("selectedEducationalInfo", eduInfo);
    setEduInformationIndex(index);
    setFieldIndex(fieldsIndex);
  };

  const handleExp = () => {
    setGlobalState("showExperienceModal", true);
  };

  const editEpxInfo = (fieldsIndex, index) => {
    setGlobalState("showExperienceModal", true);
    setGlobalState("selectedExperienceModal", expInfo);
    setExpInformationIndex(index);
    setExpFieldIndex(fieldsIndex);
  };

  const handleAddFamilyMember = () => {
    setGlobalState("showFamilyMenberModal", true)
  };

  const editFamilyMemberInfo = (fieldsIndex, index) => {
    setGlobalState("showFamilyMenberModal", true);
    setGlobalState("selectedFamilyMemberInfo", familyMemb);
    setFamilyMembExpInformationIndex(index);
    setFamilyMembFieldIndex(fieldsIndex);
  };

  const emId = selectedEmployee?.id;
  const image = selectedEmployee?.profileInfo?.image;
  const firstName = selectedEmployee?.firstName;
  const lastName = selectedEmployee?.lastName;
  const email = selectedEmployee?.email;
  const phoneNo = selectedEmployee?.phoneNo;
  const dOB = selectedEmployee?.profileInfo?.dOB;
  const state = selectedEmployee?.profileInfo?.state;
  const address = selectedEmployee?.profileInfo?.address;
  const passPortNo = selectedEmployee?.personalInfo?.passPortNo;
  const passportExpiryDate = selectedEmployee?.personalInfo?.passportExpiryDate;
  const religion = selectedEmployee?.personalInfo?.religion;
  const emSpouse = selectedEmployee?.personalInfo?.emSpouse;
  const noChildren = selectedEmployee?.personalInfo?.noChildren;
  const country = selectedEmployee?.profileInfo?.country;
  const primaryName = selectedEmployee?.emergencyContact?.primary?.primaryName;
  const primaryPhone1 = selectedEmployee?.emergencyContact?.primary?.primaryPhone1;
  const primaryPhone2 = selectedEmployee?.emergencyContact?.primary?.primaryPhone2;
  const primaryRelationship = selectedEmployee?.emergencyContact?.primary?.primaryRelationship;
  const secondaryName = selectedEmployee?.emergencyContact?.secondary?.secondaryName;
  const secondaryRelationship = selectedEmployee?.emergencyContact?.secondary?.secondaryRelationship;
  const secondaryPhone1 = selectedEmployee?.emergencyContact?.secondary?.secondaryPhone1;
  const secondaryPhone2 = selectedEmployee?.emergencyContact?.secondary?.secondaryPhone2;


  useEffect( ()=>{
    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
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
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ul>
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
                        <a href="#">
                          <img alt="" src={image} />
                        </a>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {firstName + " " + lastName}
                            </h3>
                            <h6 className="text-muted">UI/UX Design Team</h6>
                            <small className="text-muted">Web Designer</small>
                            <div className="staff-id">
                              Employee ID : FT-0001
                            </div>
                            <div className="small doj text-muted">
                              Date of Join : 1st oct 2022
                            </div>
                            {/* <div className="staff-msg"><Link onClick={()=>localStorage.setItem("minheight","true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <a href="">{phoneNo}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                <a href="">{email}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">{dOB}</div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">{address}</div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">Male</div>
                            </li>
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  <div className="avatar avatar-xs">
                                    <img src={Avatar_16} alt="" />
                                  </div>
                                </div>
                                <a>Abdul</a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <a onClick={handleEditAcct} className="edit-icon">
                        <i className="fa fa-pencil" />
                      </a>
                    </div>
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
                      href="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Projects
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Bank &amp; Statutory{" "}
                      <small className="text-danger">(Admin Only)</small>
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
                        <a className="edit-icon" onClick={handlePersonalInfo}>
                          <i className="fa fa-pencil" />
                        </a>
                      </h3>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Passport No.</div>
                          <div className="text">{passPortNo}</div>
                        </li>
                        <li>
                          <div className="title">Passport Exp Date.</div>
                          <div className="text">{passportExpiryDate}</div>
                        </li>
                        <li>
                          <div className="title">Tel</div>
                          <div className="text">
                            <a href="">{phoneNo}</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Nationality</div>
                          <div className="text">{country}</div>
                        </li>
                        <li>
                          <div className="title">Religion</div>
                          <div className="text">{religion}</div>
                        </li>
                        <li>
                          <div className="title">Marital status</div>
                          <div className="text">Singles</div>
                        </li>
                        <li>
                          <div className="title">Employment of spouse</div>
                          <div className="text">{emSpouse}</div>
                        </li>
                        <li>
                          <div className="title">No. of children</div>
                          <div className="text">{noChildren}</div>
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
                          onClick={handleEmergencyContact}
                        >
                          <i className="fa fa-pencil" />
                        </a>
                      </h3>
                      <h5 className="section-title">Primary</h5>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Name</div>
                          <div className="text">{primaryName}</div>
                        </li>
                        <li>
                          <div className="title">Relationship</div>
                          <div className="text">{primaryRelationship}</div>
                        </li>
                        <li>
                          <div className="title">Phone </div>
                          <div className="text">
                            {primaryPhone1}, {primaryPhone2}
                          </div>
                        </li>
                      </ul>
                      <hr />
                      <h5 className="section-title">Secondary</h5>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Name</div>
                          <div className="text">{secondaryName}</div>
                        </li>
                        <li>
                          <div className="title">Relationship</div>
                          <div className="text">{secondaryRelationship}</div>
                        </li>
                        <li>
                          <div className="title">Phone </div>
                          <div className="text">
                            {secondaryPhone1}, {secondaryPhone2}
                          </div>
                        </li>
                      </ul>
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
                          onClick={handleAddFamilyMember}
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
                            {familyMembArray?.map((family, index) => {
                              const {
                                id,
                                emIndex,
                                emid,
                                inputFields,
                              } = family;
                              if (emid == emId) {
                                return (
                                  <React.Fragment key={id}>
                                    {inputFields?.map((fields, fieldsIndex) => {
                                      const {
                                        name,
                                        relationship,
                                        dateOfBirth,
                                        phone,
                                      } = fields;
                                      return (
                                        <tr key={fieldsIndex}>
                                          <td>{name}</td>
                                          <td>{relationship}</td>
                                          <td>{dateOfBirth}</td>
                                          <td>{phone}</td>
                                          <td
                                            onClick={() =>
                                              editFamilyMemberInfo(
                                                fieldsIndex,
                                                index
                                              )
                                            }
                                            className="text-end edit-icon"
                                          >
                                            <i className="fa fa-pencil" />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </React.Fragment>
                                );
                              }
                            })}
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
                        <a onClick={handleEducationInfo} className="edit-icon">
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {eduArray?.map((eduDetails, index) => {
                            const { id, inputFields, emIndex, emid } =
                              eduDetails;
                            if (emid == emId) {
                              return (
                                <React.Fragment key={id}>
                                  {inputFields?.map((fields, fieldsIndex) => {
                                    const {
                                      completeDate,
                                      degree,
                                      institution,
                                      startingDate,
                                    } = fields;
                                    return (
                                      <li key={fieldsIndex}>
                                        <div className="experience-user">
                                          <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <a className="name">
                                              {institution}
                                              <span
                                                className="edit-icon"
                                                onClick={() =>
                                                  editEduInfo(
                                                    fieldsIndex,
                                                    index
                                                  )
                                                }
                                              >
                                                <i className="fa fa-pencil" />
                                              </span>
                                            </a>
                                            <div>{degree}</div>
                                            <span className="time">
                                              {startingDate} - {completeDate}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            }
                          })}
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
                        <a onClick={handleExp} className="edit-icon">
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {expArray?.map((eduDetails, index) => {
                            const { id, inputFields, emIndex, emid } =
                              eduDetails;
                            if (emid == emId) {
                              return (
                                <React.Fragment key={id}>
                                  {inputFields?.map((fields, fieldsIndex) => {
                                    const {
                                      companyName,
                                      location,
                                      jobPosition,
                                      periodFrom,
                                      periodTo,
                                    } = fields;
                                    return (
                                      <li key={fieldsIndex}>
                                        <div className="experience-user">
                                          <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <a className="name">
                                              {companyName}
                                              <span
                                                className="edit-icon"
                                                onClick={() =>
                                                  editEpxInfo(
                                                    fieldsIndex,
                                                    index
                                                  )
                                                }
                                              >
                                                <i className="fa fa-pencil" />
                                              </span>
                                            </a>
                                            <div>{jobPosition}</div>
                                            <span className="time">
                                              {location}
                                            </span>
                                            <span className="time">
                                              {periodFrom} - {periodTo}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </React.Fragment>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Info Tab */}
            {/* Projects Tab */}
            <div className="tab-pane fade" id="emp_projects">
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="dropdown profile-action">
                        <a
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          className="action-icon dropdown-toggle"
                        >
                          <i className="material-icons">more_vert</i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a
                            data-bs-target="#edit_project"
                            data-bs-toggle="modal"
                            href="#"
                            className="dropdown-item"
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </a>
                          <a
                            data-bs-target="#delete_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-trash-o m-r-5" /> Delete
                          </a>
                        </div>
                      </div>
                      <h4 className="project-title">
                        <Link to="/app/projects/projects-view">
                          Office Management
                        </Link>
                      </h4>
                      <small className="block text-ellipsis m-b-15">
                        <span className="text-xs">1</span>{" "}
                        <span className="text-muted">open tasks, </span>
                        <span className="text-xs">9</span>{" "}
                        <span className="text-muted">tasks completed</span>
                      </small>
                      <p className="text-muted">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. When an unknown printer took a
                        galley of type and scrambled it...
                      </p>
                      <div className="pro-deadline m-b-15">
                        <div className="sub-title">Deadline:</div>
                        <div className="text-muted">17 Apr 2019</div>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Project Leader :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="Jeffery Lalor">
                              <img alt="" src={Avatar_16} />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Team :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="John Doe">
                              <img alt="" src={Avatar_02} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Richard Miles">
                              <img alt="" src={Avatar_09} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="John Smith">
                              <img alt="" src={Avatar_10} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Mike Litorus">
                              <img alt="" src={Avatar_05} />
                            </a>
                          </li>
                          <li>
                            <a className="all-users">+15</a>
                          </li>
                        </ul>
                      </div>
                      <p className="m-b-5">
                        Progress{" "}
                        <span className="text-success float-end">40%</span>
                      </p>
                      <div className="progress progress-xs mb-0">
                        <div
                          style={{ width: "40%" }}
                          data-bs-toggle="tooltip"
                          role="progressbar"
                          className="progress-bar bg-success"
                          data-original-title="40%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="dropdown profile-action">
                        <a
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          className="action-icon dropdown-toggle"
                        >
                          <i className="material-icons">more_vert</i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a
                            data-bs-target="#edit_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </a>
                          <a
                            data-bs-target="#delete_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-trash-o m-r-5" /> Delete
                          </a>
                        </div>
                      </div>
                      <h4 className="project-title">
                        <Link to="/app/projects/projects-view">
                          Project Management
                        </Link>
                      </h4>
                      <small className="block text-ellipsis m-b-15">
                        <span className="text-xs">2</span>{" "}
                        <span className="text-muted">open tasks, </span>
                        <span className="text-xs">5</span>{" "}
                        <span className="text-muted">tasks completed</span>
                      </small>
                      <p className="text-muted">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. When an unknown printer took a
                        galley of type and scrambled it...
                      </p>
                      <div className="pro-deadline m-b-15">
                        <div className="sub-title">Deadline:</div>
                        <div className="text-muted">17 Apr 2019</div>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Project Leader :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="Jeffery Lalor">
                              <img alt="" src={Avatar_16} />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Team :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="John Doe">
                              <img alt="" src={Avatar_02} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Richard Miles">
                              <img alt="" src={Avatar_09} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="John Smith">
                              <img alt="" src={Avatar_10} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Mike Litorus">
                              <img alt="" src={Avatar_05} />
                            </a>
                          </li>
                          <li>
                            <a className="all-users">+15</a>
                          </li>
                        </ul>
                      </div>
                      <p className="m-b-5">
                        Progress{" "}
                        <span className="text-success float-end">40%</span>
                      </p>
                      <div className="progress progress-xs mb-0">
                        <div
                          style={{ width: "40%" }}
                          data-bs-toggle="tooltip"
                          role="progressbar"
                          className="progress-bar bg-success"
                          data-original-title="40%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="dropdown profile-action">
                        <a
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          className="action-icon dropdown-toggle"
                        >
                          <i className="material-icons">more_vert</i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a
                            data-bs-target="#edit_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </a>
                          <a
                            data-bs-target="#delete_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-trash-o m-r-5" /> Delete
                          </a>
                        </div>
                      </div>
                      <h4 className="project-title">
                        <Link to="/app/projects/projects-view">
                          Video Calling App
                        </Link>
                      </h4>
                      <small className="block text-ellipsis m-b-15">
                        <span className="text-xs">3</span>{" "}
                        <span className="text-muted">open tasks, </span>
                        <span className="text-xs">3</span>{" "}
                        <span className="text-muted">tasks completed</span>
                      </small>
                      <p className="text-muted">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. When an unknown printer took a
                        galley of type and scrambled it...
                      </p>
                      <div className="pro-deadline m-b-15">
                        <div className="sub-title">Deadline:</div>
                        <div className="text-muted">17 Apr 2019</div>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Project Leader :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="Jeffery Lalor">
                              <img alt="" src={Avatar_16} />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Team :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="John Doe">
                              <img alt="" src={Avatar_02} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Richard Miles">
                              <img alt="" src={Avatar_09} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="John Smith">
                              <img alt="" src={Avatar_10} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Mike Litorus">
                              <img alt="" src={Avatar_05} />
                            </a>
                          </li>
                          <li>
                            <a className="all-users">+15</a>
                          </li>
                        </ul>
                      </div>
                      <p className="m-b-5">
                        Progress{" "}
                        <span className="text-success float-end">40%</span>
                      </p>
                      <div className="progress progress-xs mb-0">
                        <div
                          style={{ width: "40%" }}
                          data-bs-toggle="tooltip"
                          role="progressbar"
                          className="progress-bar bg-success"
                          data-original-title="40%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="dropdown profile-action">
                        <a
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          className="action-icon dropdown-toggle"
                        >
                          <i className="material-icons">more_vert</i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a
                            data-bs-target="#edit_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </a>
                          <a
                            data-bs-target="#delete_project"
                            data-bs-toggle="modal"
                            className="dropdown-item"
                          >
                            <i className="fa fa-trash-o m-r-5" /> Delete
                          </a>
                        </div>
                      </div>
                      <h4 className="project-title">
                        <Link to="/app/projects/projects-view">
                          Hospital Administration
                        </Link>
                      </h4>
                      <small className="block text-ellipsis m-b-15">
                        <span className="text-xs">12</span>{" "}
                        <span className="text-muted">open tasks, </span>
                        <span className="text-xs">4</span>{" "}
                        <span className="text-muted">tasks completed</span>
                      </small>
                      <p className="text-muted">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. When an unknown printer took a
                        galley of type and scrambled it...
                      </p>
                      <div className="pro-deadline m-b-15">
                        <div className="sub-title">Deadline:</div>
                        <div className="text-muted">17 Apr 2019</div>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Project Leader :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="Jeffery Lalor">
                              <img alt="" src={Avatar_16} />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="project-members m-b-15">
                        <div>Team :</div>
                        <ul className="team-members">
                          <li>
                            <a data-bs-toggle="tooltip" title="John Doe">
                              <img alt="" src={Avatar_02} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Richard Miles">
                              <img alt="" src={Avatar_09} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="John Smith">
                              <img alt="" src={Avatar_10} />
                            </a>
                          </li>
                          <li>
                            <a data-bs-toggle="tooltip" title="Mike Litorus">
                              <img alt="" src={Avatar_05} />
                            </a>
                          </li>
                          <li>
                            <a className="all-users">+15</a>
                          </li>
                        </ul>
                      </div>
                      <p className="m-b-5">
                        Progress{" "}
                        <span className="text-success float-end">40%</span>
                      </p>
                      <div className="progress progress-xs mb-0">
                        <div
                          style={{ width: "40%" }}
                          data-bs-toggle="tooltip"
                          role="progressbar"
                          className="progress-bar bg-success"
                          data-original-title="40%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Projects Tab */}
            {/* Bank Statutory Tab */}
            <div className="tab-pane fade" id="bank_statutory">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title"> Basic Salary Information</h3>
                  <form>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Salary basis <span className="text-danger">*</span>
                          </label>
                          <select className="select">
                            <option>Select salary basis type</option>
                            <option>Hourly</option>
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Salary amount{" "}
                            <small className="text-muted">per month</small>
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">$</span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Type your salary amount"
                              defaultValue={0.0}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">Payment type</label>
                          <select className="select">
                            <option>Select payment type</option>
                            <option>Bank transfer</option>
                            <option>Check</option>
                            <option>Cash</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="card-title"> PF Information</h3>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            PF contribution
                          </label>
                          <select className="select">
                            <option>Select PF contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            PF No. <span className="text-danger">*</span>
                          </label>
                          <select className="select">
                            <option>Select PF contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee PF rate
                          </label>
                          <select className="select">
                            <option>Select PF contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Additional rate{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select className="select">
                            <option>Select additional rate</option>
                            <option>0%</option>
                            <option>1%</option>
                            <option>2%</option>
                            <option>3%</option>
                            <option>4%</option>
                            <option>5%</option>
                            <option>6%</option>
                            <option>7%</option>
                            <option>8%</option>
                            <option>9%</option>
                            <option>10%</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">Total rate</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="N/A"
                            defaultValue="11%"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee PF rate
                          </label>
                          <select className="select">
                            <option>Select PF contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Additional rate{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select className="select">
                            <option>Select additional rate</option>
                            <option>0%</option>
                            <option>1%</option>
                            <option>2%</option>
                            <option>3%</option>
                            <option>4%</option>
                            <option>5%</option>
                            <option>6%</option>
                            <option>7%</option>
                            <option>8%</option>
                            <option>9%</option>
                            <option>10%</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">Total rate</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="N/A"
                            defaultValue="11%"
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="card-title"> ESI Information</h3>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            ESI contribution
                          </label>
                          <select className="select">
                            <option>Select ESI contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            ESI No. <span className="text-danger">*</span>
                          </label>
                          <select className="select">
                            <option>Select ESI contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Employee ESI rate
                          </label>
                          <select className="select">
                            <option>Select ESI contribution</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">
                            Additional rate{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <select className="select">
                            <option>Select additional rate</option>
                            <option>0%</option>
                            <option>1%</option>
                            <option>2%</option>
                            <option>3%</option>
                            <option>4%</option>
                            <option>5%</option>
                            <option>6%</option>
                            <option>7%</option>
                            <option>8%</option>
                            <option>9%</option>
                            <option>10%</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label className="col-form-label">Total rate</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="N/A"
                            defaultValue="11%"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="submit-section">
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /Bank Statutory Tab */}
          </div>
        </div>
        {/* /Page Content */}

        {/* Profile Modal */}
        {showProfileModal && (
          <>
            <AddProfileInfo
              dispatchUserAcct={dispatchUserAcct}
              userAcct={userAcct}
              emIndex={emIndex}
            />
          </>
        )}
        {/* /Profile Modal */}

        {/* Personal Info Modal */}
        {showPersonalInfoModal && (
          <>
            <AddPersonalInfo
              dispatchUserAcct={dispatchUserAcct}
              userAcct={userAcct}
              emIndex={emIndex}
            />
          </>
        )}
        {/* /Personal Info Modal */}

        {/* Emergency Conatact Modal */}
        {showEmergencyContactModal && (
          <>
            <AddEmergencyContact
              dispatchUserAcct={dispatchUserAcct}
              userAcct={userAcct}
              emIndex={emIndex}
            />
          </>
        )}
        {/* /Emergency Conatact Modal */}

        {/* Educational Modal */}
        {showEducationInformationModal && (
          <>
            <AddEducationInformation
              dispatchEduInfo={dispatchEduInfo}
              emIndex={emIndex}
              eduInformationIndex={eduInformationIndex}
              emid={emid}
              fieldIndex={fieldIndex}
            />
          </>
        )}
        {/* /Educational Modal */}

        {/* Experience Modal */}
        {showExperienceModal && (
          <>
            <AddExpModal
              dispatchExpInfo={dispatchExpInfo}
              emIndex={emIndex}
              expInformationIndex={expInformationIndex}
              emid={emid}
              expfieldIndex={expfieldIndex}
            />
          </>
        )}
        {/* /Experience Modal */}

        {/* Family Info Modal */}
        {showFamilyMenberModal && (
          <>
            <AddFamilyMemberModal
              dispatchFamilyMemb={dispatchFamilyMemb}
              emIndex={emIndex}
              familyMembInformationIndex={familyMembInformationIndex}
              emid={emid}
              familyMembfieldIndex={familyMembfieldIndex}
            />
          </>
        )}
        {/* /Family Info Modal */}
      </div>
    </div>
  );
  }
export default EmployeeProfile;

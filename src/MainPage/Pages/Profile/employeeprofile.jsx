import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import {Avatar_02,Avatar_05,Avatar_09,Avatar_10,Avatar_16 } from '../../../Entryfile/imagepath'
import { useLocation } from "react-router-dom";
import AddProfileInfo from './components/AddProfileInfo';
import AddPersonalInfo from '../../../_components/modelbox/AddPersonalInfo';
import AddExpModal from '../../../_components/modelbox/AddExpModal';
import AddFamilyMemberModal from '../../../_components/modelbox/AddFamilyMemberModal';
import AddFileUploadModal from '../../../_components/modelbox/AddFileUploadModal';
import { useGlobalState, setGlobalState } from '../../../context/GlobalState';
import {
  initUserAccount,
  savedUserAccountReducer,
  initEduInfo,
  savedEduInfoReducer,
  initExpInfo,
  savedExpInfoReducer,
  initFamilyMemberInfo,
  savedFamilyMemberReducer,
  initEmergencyContactInfo,
  savedEmergencyContectInfoReducer,
  initFileUpload,
  savedFileUploadReducer,
  initPersonalInfo,
  savedPersonalInfoReducer,
} from "../../../utils/localStorage";
import AddEmergencyContact from '../../../_components/modelbox/AddEmergencyContact';
import AddEducationInformation from '../../../_components/modelbox/AddEducationInformation';
import DefaultImage from "../../../assets/img/placeholder.jpg";
import DeleteModal from '../../../_components/modelbox/DeleteModal';

const EmployeeProfile = () => {
  const [deleteModal] = useGlobalState("deleteModal");
  const location = useLocation();
  const selectedEmployeeId = location?.state?.id;
  const [eduInformationIndex, setEduInformationIndex] = useState(0);
  const [expInformationIndex, setExpInformationIndex] = useState(0);
  const [fileUploadIndex, setFileUploadIndex] = useState(0);
  const [familyMembInformationIndex, setFamilyMembExpInformationIndex] =
    useState(0);
  const [fieldIndex, setFieldIndex] = useState(0);
  const [expfieldIndex, setExpFieldIndex] = useState(0);
  const [fileUploadfieldIndex, setFileUploadfieldIndex] = useState(0);
  const [familyMembfieldIndex, setFamilyMembFieldIndex] = useState(0);
  const [showProfileModal] = useGlobalState("showProfileModal");
  const [showPersonalInfoModal] = useGlobalState("showPersonalInfoModal");
  const [showEmergencyContactModal] = useGlobalState(
    "showEmergencyContactModal"
  );
  const [showEducationInformationModal] = useGlobalState(
    "showEducationInformationModal"
  );
  const [showExperienceModal] = useGlobalState("showExperienceModal");
  const [showFamilyMenberModal] = useGlobalState("showFamilyMenberModal");
  const [showFileUploadModal] = useGlobalState("showFileUploadModal");

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

  const [familyMemberInfo, dispatchFamilyMemberInfo] = useReducer(
    savedFamilyMemberReducer,
    [],
    initFamilyMemberInfo
  );

  useEffect(() => {
    localStorage.setItem("familyMemberInfo", JSON.stringify(familyMemberInfo));
  }, [familyMemberInfo]);
  useEffect(() => {
    if (!showFamilyMenberModal) {
      setGlobalState("selectedFamilyMemberInfo", "");
    }
  }, [showFamilyMenberModal]);

  const [familyMembArray, setFamilyMembArray] = useState();
  useEffect(() => {
    setFamilyMembArray(familyMemberInfo);
  }, [familyMemberInfo]);

  const [emergencyContactInfo, dispatchEmergencyContactInfo] = useReducer(
    savedEmergencyContectInfoReducer,
    [],
    initEmergencyContactInfo
  );
  useEffect(() => {
    localStorage.setItem(
      "emergencyContactInfo",
      JSON.stringify(emergencyContactInfo)
    );
  }, [emergencyContactInfo]);
  useEffect(() => {
    if (!showEmergencyContactModal) {
      setGlobalState("selectedEmergencyContact", "");
    }
  }, [showEmergencyContactModal]);

  const [emergencyContactList, setEmergencyContactList] = useState();
  useEffect(() => {
    setEmergencyContactList(emergencyContactInfo);
  }, [emergencyContactInfo]);

  const [personalInfo, dispatchPersonalInfo] = useReducer(
    savedPersonalInfoReducer,
    [],
    initPersonalInfo
  );

  useEffect(() => {
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
  }, [personalInfo]);
  useEffect(() => {
    if (!showPersonalInfoModal) {
      setGlobalState("selectedPersonalInfo", "");
    }
  }, [showPersonalInfoModal]);

  const [personalInfoList, setPersonalInfoList] = useState();
  useEffect(() => {
    setPersonalInfoList(personalInfo);
  }, [personalInfo]);

  const [acctIdToEdit, setAcctIdToEdit] = useState("");

  const selectedEmployee = employeeAccts?.find(
    (staff) => staff?.id === selectedEmployeeId
  );

  const userAcctDb = () => {
    return setGlobalState("selectedUserAccount", userAcct);
  };

  const handleEditAcct = () => {
    setGlobalState("showProfileModal", true);
    userAcctDb();
  };

  const handlePersonalInfo = () => {
    setGlobalState("showPersonalInfoModal", true);
  };

  const handlePersonalInfoEdit = (index) => {
    setGlobalState("showPersonalInfoModal", true);
    setGlobalState("selectedPersonalInfo", personalInfo);
    setIndexToEdit(index)
  };

  const handleEducationInfo = () => {
    setGlobalState("showEducationInformationModal", true);
  };

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

  const handleOpeneFileUpload = () => {
    setGlobalState("showFileUploadModal", true);
  };

  const handleFileUploadEdit = (fieldsIndex, index) => {
    setGlobalState("showFileUploadModal", true);
    setGlobalState("selectedFileUpload", files);
    setFileUploadIndex(index);
    setFileUploadfieldIndex(fieldsIndex);
  };

  const handleAddFamilyMember = () => {
    setGlobalState("showFamilyMenberModal", true);
  };

  const handleAddEmergencyContact = () => {
    setGlobalState("showEmergencyContactModal", true);
  };

  const editFamilyMemberInfo = (fieldsIndex, index) => {
    setGlobalState("showFamilyMenberModal", true);
    setGlobalState("selectedFamilyMemberInfo", familyMemberInfo);
    setFamilyMembExpInformationIndex(index);
    setFamilyMembFieldIndex(fieldsIndex);
  };

  const editEmergencyContactInfo = (index) => {
    setGlobalState("showEmergencyContactModal", true);
    setGlobalState("selectedEmergencyContact", emergencyContactInfo);
    setIndexToEdit(index);
  };

  const image = selectedEmployee?.photo;
  const firstName = selectedEmployee?.firstName;
  const lastName = selectedEmployee?.lastName;
  const email = selectedEmployee?.email;
  const phoneNo = selectedEmployee?.phoneNumber;
  const employeeNumber = selectedEmployee?.employeeNumber;
  const gender = selectedEmployee?.gender;
  const role = selectedEmployee?.role;
  const hireDate = selectedEmployee?.hireDate;

  const [files, dispatchFiles] = useReducer(
    savedFileUploadReducer,
    [],
    initFileUpload
  );

  useEffect(() => {
    localStorage.setItem("fileUploaded", JSON.stringify(files));
  }, [files]);
  useEffect(() => {
    if (!showFileUploadModal) {
      setGlobalState("selectedFileUpload", "");
    }
  }, [showFileUploadModal]);

  const [filesList, setFilesList] = useState();
  useEffect(() => {
    setFilesList(files);
  }, [files]);

  // SelectedFile
  const selectedEmployeeDocument = filesList?.find(
    (file) => file?.uniqueID === selectedEmployeeId
  );
  const selectedEmployeeDocumentId = selectedEmployeeDocument?.uniqueID;

  // SelectedEducation
  const selectedEmployeeEducation = eduArray?.find(
    (qaulification) => qaulification?.employeeId === selectedEmployeeId
  );
  const selectedEmployeeEducationId = selectedEmployeeEducation?.employeeId;

  // SelectedExperience
  const selectedEmployeeExperience = expArray?.find(
    (experience) => experience?.employeeId === selectedEmployeeId
  );
  const selectedEmployeeExperienceId = selectedEmployeeExperience?.employeeId;

  // SelectedFamily
  const selectedEmployeeFamilyMember = familyMembArray?.find(
    (fam) => fam?.employeeId === selectedEmployeeId
  );
  const selectedEmployeeFamilyMemberId =
    selectedEmployeeFamilyMember?.employeeId;

  // SelectedEmergencyContact
  const selectedEmployeeEmergencyContact = emergencyContactList?.find(
    (contact) => contact?.employeeId === selectedEmployeeId
  );
  const selectedEmployeeContactId =
    selectedEmployeeEmergencyContact?.employeeId;

  // SelectedPersonalInfo
  const selectedEmployeePersonalInfo = personalInfoList?.find(
    (personal) => personal?.employeeId === selectedEmployeeId
  );
  const selectedEmployeePersonalInfoId =
    selectedEmployeePersonalInfo?.employeeId;

  const [indexToEdit, setIndexToEdit] = useState(0);

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
                <h3 className="page-title">Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/employee/allemployees">All Employees</Link>
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
                        <a>
                          <img alt="" src={image ? image : DefaultImage} />
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
                            <h6 className="text-muted">{role}</h6>
                            <div className="staff-id">
                              Employee ID : {employeeNumber}
                            </div>
                            <div className="small doj text-muted">
                              {/* Date of Join : 1st oct 2022 */}
                              Date of Join: {hireDate}
                            </div>
                            {/* <div className="staff-msg"><Link onClick={()=>localStorage.setItem("minheight","true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <a>{phoneNo}</a>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                <a>{email}</a>
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
                                {gender == "male"
                                  ? "Male"
                                  : gender == "female"
                                  ? "Female"
                                  : "Other"}
                              </div>
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
                        {personalInfoList?.length > 0 ? null : (
                          <a className="edit-icon" onClick={handlePersonalInfo}>
                            <i className="fa fa-pencil" />
                          </a>
                        )}
                      </h3>
                      {personalInfoList?.length > 0 &&
                      selectedEmployeePersonalInfoId === selectedEmployeeId ? (
                        personalInfoList?.map((data, index) => {
                          const {
                            employeeId,
                            id,
                            religion,
                            noChildren,
                            employeeSpouseEmployment,
                          } = data;
                          if (employeeId == selectedEmployeeId) {
                            return (
                              <ul
                                onClick={() => handlePersonalInfoEdit(index)}
                                style={{
                                  cursor: "pointer",
                                }}
                                key={id}
                                className="personal-info"
                              >
                                <li>
                                  <div className="title">Religion</div>
                                  <div className="text">{religion}</div>
                                </li>
                                <li>
                                  <div className="title">
                                    Employment of spouse
                                  </div>
                                  <div className="text">
                                    {employeeSpouseEmployment}
                                  </div>
                                </li>
                                <li>
                                  <div className="title">No. of children</div>
                                  <div className="text">{noChildren}</div>
                                </li>
                              </ul>
                            );
                          }
                        })
                      ) : (
                        <p>No personal information added yet.</p>
                      )}
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
                          onClick={handleAddEmergencyContact}
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
                            {emergencyContactList?.length > 0 &&
                            selectedEmployeeContactId === selectedEmployeeId ? (
                              emergencyContactList?.map((family, index) => {
                                const {
                                  id,
                                  employeeId,
                                  name,
                                  relationship,
                                  primaryPhone,
                                  optionalPhone,
                                } = family;
                                if (employeeId == selectedEmployeeId) {
                                  return (
                                    <tr key={id}>
                                      <td>{name}</td>
                                      <td>{relationship}</td>
                                      <td>{primaryPhone}</td>
                                      <td>
                                        {optionalPhone ? optionalPhone : "--"}
                                      </td>
                                      <td
                                        onClick={() =>
                                          editEmergencyContactInfo(index)
                                        }
                                        className="text-end edit-icon"
                                      >
                                        <i className="fa fa-pencil" />
                                      </td>
                                    </tr>
                                  );
                                }
                              })
                            ) : (
                              <p>No employee emergency contact added yet.</p>
                            )}
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
                            {familyMembArray?.length > 0 &&
                            selectedEmployeeFamilyMemberId ===
                              selectedEmployeeId ? (
                              familyMembArray?.map((family, index) => {
                                const { id, employeeId, inputFields } = family;
                                if (employeeId == selectedEmployeeId) {
                                  return (
                                    <React.Fragment key={id}>
                                      {inputFields?.map(
                                        (fields, fieldsIndex) => {
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
                                        }
                                      )}
                                    </React.Fragment>
                                  );
                                }
                              })
                            ) : (
                              <p>No employee family information added yet.</p>
                            )}
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
                          {eduArray?.length > 0 &&
                          selectedEmployeeEducationId === selectedEmployeeId ? (
                            eduArray?.map((eduDetails, index) => {
                              const { id, inputFields, employeeId } =
                                eduDetails;
                              if (employeeId == selectedEmployeeId) {
                                return (
                                  <React.Fragment key={id}>
                                    {inputFields?.map((fields, fieldsIndex) => {
                                      const {
                                        completeDate,
                                        qualification,
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
                                              <div>{qualification}</div>
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
                            })
                          ) : (
                            <p>No qualification information added yet.</p>
                          )}
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
                          {expArray?.length > 0 &&
                          selectedEmployeeExperienceId ===
                            selectedEmployeeId ? (
                            expArray?.map((eduDetails, index) => {
                              const { id, inputFields, employeeId } =
                                eduDetails;
                              if (employeeId == selectedEmployeeId) {
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
                            })
                          ) : (
                            <p>No experience information added yet.</p>
                          )}
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
              </div>
            </div>
            {/* /Tasks Tab */}
            {/* Document Upload Tab */}
            <div className="tab-pane fade" id="document_upload">
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Upload Files{" "}
                        <a
                          onClick={handleOpeneFileUpload}
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {filesList?.length > 0 &&
                          selectedEmployeeDocumentId === selectedEmployeeId ? (
                            filesList?.map((file, index) => {
                              const { id, inputFields, uniqueID } = file;
                              if (uniqueID == selectedEmployeeId) {
                                return (
                                  <React.Fragment key={id}>
                                    {inputFields?.map((fields, fieldsIndex) => {
                                      const {
                                        documentName,
                                        documentNumber,
                                        documentType,
                                        expiryDate,
                                        issueDate,
                                        fileDetails,
                                      } = fields;
                                      return (
                                        <li key={fieldsIndex}>
                                          <div className="experience-user">
                                            <div className="before-circle" />
                                          </div>
                                          <div className="experience-content">
                                            <div className="timeline-content">
                                              <a className="name">
                                                {documentName}
                                                <span
                                                  className="edit-icon"
                                                  onClick={() =>
                                                    handleFileUploadEdit(
                                                      fieldsIndex,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-pencil" />
                                                </span>
                                              </a>
                                              <div>{documentNumber}</div>
                                              <span className="time">
                                                Type: {documentType}
                                              </span>
                                              {issueDate && expiryDate ? (
                                                <span className="time">
                                                  Issue Date: {issueDate} -
                                                  Expiry Date: {expiryDate}
                                                </span>
                                              ) : null}
                                              {fileDetails?.type &&
                                              fileDetails?.type?.startsWith(
                                                "image/"
                                              ) ? (
                                                <img
                                                  className="img-preview"
                                                  src={fileDetails?.data}
                                                  alt="Preview"
                                                />
                                              ) : (
                                                <span className="files-icon">
                                                  <i className="fa fa-file-pdf-o" />
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    })}
                                  </React.Fragment>
                                );
                              }
                            })
                          ) : (
                            <p>No uploaded file(s) yet</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Document Upload Tab */}
          </div>
        </div>
        {/* /Page Content */}

        {/* Profile Modal */}
        {showProfileModal && (
          <>
            <AddProfileInfo
              dispatchUserAcct={dispatchUserAcct}
              userAcct={userAcct}
            />
          </>
        )}
        {/* /Profile Modal */}

        {/* Personal Info Modal */}
        {showPersonalInfoModal && (
          <>
            <AddPersonalInfo
              dispatchPersonalInfo={dispatchPersonalInfo}
              employeeId={selectedEmployeeId}
              indexToEdit={indexToEdit}
            />
          </>
        )}
        {/* /Personal Info Modal */}

        {/* Emergency Conatact Modal */}
        {showEmergencyContactModal && (
          <>
            <AddEmergencyContact
              dispatchEmergencyContactInfo={dispatchEmergencyContactInfo}
              employeeId={selectedEmployeeId}
              indexToEdit={indexToEdit}
            />
          </>
        )}
        {/* /Emergency Conatact Modal */}

        {/* Educational Modal */}
        {showEducationInformationModal && (
          <>
            <AddEducationInformation
              dispatchEduInfo={dispatchEduInfo}
              eduInformationIndex={eduInformationIndex}
              employeeId={selectedEmployeeId}
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
              expInformationIndex={expInformationIndex}
              employeeId={selectedEmployeeId}
              expfieldIndex={expfieldIndex}
            />
          </>
        )}
        {/* /Experience Modal */}
        {/* FileUpload Modal */}
        {showFileUploadModal && (
          <>
            <AddFileUploadModal
              dispatchFiles={dispatchFiles}
              fileUploadIndex={fileUploadIndex}
              uniqueID={selectedEmployeeId}
              fileUploadfieldIndex={fileUploadfieldIndex}
            />
          </>
        )}
        {/* /FileUpload Modal */}

        {/* Family Info Modal */}
        {showFamilyMenberModal && (
          <>
            <AddFamilyMemberModal
              dispatchFamilyMemberInfo={dispatchFamilyMemberInfo}
              familyMembInformationIndex={familyMembInformationIndex}
              employeeId={selectedEmployeeId}
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

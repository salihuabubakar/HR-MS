import React, { useState, useEffect, useReducer, useMemo } from "react";
import moment from "moment";
import DeleteModal from "../../../_components/modelbox/DeleteModal";
import { useGlobalState, setGlobalState } from "../../../context/GlobalState";
import { Wrapper } from "../../ServiceWork/style";
import { BillCard } from "./styles";
import { Link, useLocation } from "react-router-dom";
import {
  useEmployeeAddressFetching,
  useEmployeeEmergencyFetching,
  useEmployeeQualificationFetching,
  useEmployeeExperienceFetching,
  useEmployeeDocumentFetching,
  useEmployeeBankFetching,
  useDataFetching,
} from "../../../utils/employeeCustomFetchHook";
import {
  add_update_delete_employee_address,
  add_update_delete_employee_emergency,
  add_update_delete_employee_qualification,
  add_update_delete_employee_experience,
  add_update_delete_employee_document,
  add_update_delete_employee_bank,
} from "../../../utils/sendToServer";
import AddEmployeeAddress from "../../../_components/modelbox/AddEmployeeAddress";
import AddEmployeeEmergency from "../../../_components/modelbox/AddEmployeeEmergency";
import AddEmployeeQualification from "../../../_components/modelbox/AddEmployeeQualification";
import AddEmployeeExperience from "../../../_components/modelbox/AddEmployeeExperience";
import AddEmployeeDocument from "../../../_components/modelbox/AddEmployeeDocument";
import AddEmployeeBank from "../../../_components/modelbox/AddEmployeeBank";
import { DivContainer } from "../../TaskManagement/style";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Helmet } from "react-helmet";
import axios from "axios";
import { BaseUrl } from "../../../utils/baseUrl";
import NoAvailableData from "../../../_components/noAvailableData";
import { ProgressSpan, ProgressDiv } from "../../../utils/helperFucntions";
import { Popup, Segment  } from "semantic-ui-react";
import { CardWidth } from "./styles";
import { handleFileDownload } from "../../../utils/helperFucntions";
import DisplayFileType from "../../../_components/fileExtension";
import PopUpText from "../../../_components/modelbox/PopUpText";

const Profile = ({
  DefaultImage,
}) => {

  const location = useLocation();
  let getEmployeeId = location?.state?.id;

  const [getSelectedData, setGetSelectedData] = useState();
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployeeSelectedData = async () => {
      try {
        setIsSelectedLoading(true);
        setSkeletonLoading(true);
        const response = await axios.get(
          `${BaseUrl}/employee/detail/${getEmployeeId}?format=json`
        );
        if(isMounted) {
          setGetSelectedData(response.data);
          setIsSelectedLoading(false);
          setSkeletonLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsSelectedLoading(false);
        setSkeletonLoading(false);
      }
    };
    getEmployeeId != null ? fetchEmployeeSelectedData() : null;
    
    return () => {
      isMounted = false;
    };
  }, [getEmployeeId]);

  const [menu, setMenu] = useState(false)
  const toggleMobileMenu = () => {
		setMenu(!menu)
	}

    const [employeeBankError] = useGlobalState("employeeBankError");
    const [employeeEmergencyError] = useGlobalState("employeeEmergencyError");
    const [employeeAddressError] = useGlobalState("employeeAddressError");
    const [employeeQualificationError] = useGlobalState(
      "employeeQualificationError"
    );
    const [employeeExperiencError] = useGlobalState("employeeExperiencError");
    const [employeeDocumentError] = useGlobalState("employeeDocumentError");

    const clearErrorMessage = () => {
      setGlobalState("employeeBankError", "");
      setGlobalState("employeeEmergencyError", "");
      setGlobalState("employeeAddressError", "");
      setGlobalState("employeeQualificationError", "");
      setGlobalState("employeeExperiencError", "");
      setGlobalState("employeeDocumentError", "");
    };

  // Address
  const [employeeAddressState, dispatchEmployeeAddress] = useReducer(
    add_update_delete_employee_address,
    []
  );
  const {
    employeeAddressData,
  } = useEmployeeAddressFetching();
  const [getEmployeeAddressId, setGetEmployeeAddressId] = useState();
  const [employeeAddressIndexToEdit, setEmployeeAddressIndexToEdit] =
    useState();
  const [showEmployeeAddressModal] = useGlobalState("showEmployeeAddressModal");
  const [deleteEmployeeAddressModal] = useGlobalState(
    "deleteEmployeeAddressModal"
  );

  const handleEditEmployeeAddress = (id, index) => {
    setGetEmployeeAddressId(id);
    setEmployeeAddressIndexToEdit(index);
    setGlobalState("selectedEmployeeAddress", employeeAddressData);
    setGlobalState("showEmployeeAddressModal", true);
  };
  const handleDeleteEmployeeAddress = (id) => {
    setGetEmployeeAddressId(id);
    setGlobalState("deleteEmployeeAddressModal", true);
  };

  useEffect(() => {
    if (!showEmployeeAddressModal) {
      setGlobalState("selectedEmployeeAddress", "");
    }
  }, [showEmployeeAddressModal]);

  // Emergency
  const [employeeEmergencyState, dispatchEmployeeEmergency] = useReducer(
    add_update_delete_employee_emergency,
    []
  );
  const {
    employeeEmergencyData,
  } = useEmployeeEmergencyFetching();
  const [getEmployeeEmergencyId, setGetEmployeeEmergencyId] = useState();
  const [employeeEmergencyIndexToEdit, setEmployeeEmergencyIndexToEdit] =
    useState();
  const [showEmployeeEmergencyModal] = useGlobalState(
    "showEmployeeEmergencyModal"
  );
  const [deleteEmployeeEmergencyModal] = useGlobalState(
    "deleteEmployeeEmergencyModal"
  );

  const handleEditEmployeeEmergency = (id, index) => {
    setGetEmployeeEmergencyId(id);
    setEmployeeEmergencyIndexToEdit(index);
    setGlobalState("selectedEmployeeEmergency", employeeEmergencyData);
    setGlobalState("showEmployeeEmergencyModal", true);
  };
  const handleDeleteEmployeeEmergency = (id) => {
    setGetEmployeeEmergencyId(id);
    setGlobalState("deleteEmployeeEmergencyModal", true);
  };

  useEffect(() => {
    if (!showEmployeeEmergencyModal) {
      setGlobalState("selectedEmployeeEmergency", "");
    }
  }, [showEmployeeEmergencyModal]);

  // Qualification
  const [employeeQualificationState, dispatchEmployeeQualification] =
    useReducer(add_update_delete_employee_qualification, []);
  const {
    employeeQualificationData,
  } = useEmployeeQualificationFetching();
  const [getEmployeeQualificationId, setGetEmployeeQualificationId] =
    useState();
  const [
    employeeQualificationIndexToEdit,
    setEmployeeQualificationIndexToEdit,
  ] = useState();
  const [showEmployeeQualificationModal] = useGlobalState(
    "showEmployeeQualificationModal"
  );
  const [deleteEmployeeQualificationModal] = useGlobalState(
    "deleteEmployeeQualificationModal"
  );

  const handleEditEmployeeQualification = (id, index) => {
    setGetEmployeeQualificationId(id);
    setEmployeeQualificationIndexToEdit(index);
    setGlobalState("selectedEmployeeQualification", employeeQualificationData);
    setGlobalState("showEmployeeQualificationModal", true);
  };
  const handleDeleteEmployeeQualification = (id) => {
    setGetEmployeeQualificationId(id);
    setGlobalState("deleteEmployeeQualificationModal", true);
  };

  useEffect(() => {
    if (!showEmployeeQualificationModal) {
      setGlobalState("selectedEmployeeQualification", "");
    }
  }, [showEmployeeQualificationModal]);

  // Experience
  const [employeeExperienceState, dispatchEmployeeExperience] = useReducer(
    add_update_delete_employee_experience,
    []
  );
  const {
    employeeExperienceData,
    isEmployeeExperienceDataLoading,
    employeeExperienceError,
  } = useEmployeeExperienceFetching();
  const [getEmployeeExperienceId, setGetEmployeeExperienceId] = useState();
  const [employeeExperienceIndexToEdit, setEmployeeExperienceIndexToEdit] =
    useState();
  const [showEmployeeExperienceModal] = useGlobalState(
    "showEmployeeExperienceModal"
  );
  const [deleteEmployeeExperienceModal] = useGlobalState(
    "deleteEmployeeExperienceModal"
  );

  const handleEditEmployeeExperience = (id, index) => {
    setGetEmployeeExperienceId(id);
    setEmployeeExperienceIndexToEdit(index);
    setGlobalState("selectedEmployeeExperience", employeeExperienceData);
    setGlobalState("showEmployeeExperienceModal", true);
  };

  const handleDeleteEmployeeExperience = (id) => {
    setGetEmployeeExperienceId(id);
    setGlobalState("deleteEmployeeExperienceModal", true);
  };

  useEffect(() => {
    if (!showEmployeeExperienceModal) {
      setGlobalState("selectedEmployeeExperience", "");
    }
  }, [showEmployeeExperienceModal]);

  // Document
  const [employeeDocumentState, dispatchEmployeeDocument] = useReducer(
    add_update_delete_employee_document,
    []
  );
  const {
    employeeDocumentData,
  } = useEmployeeDocumentFetching();
  const [getEmployeeDocumentId, setGetEmployeeDocumentId] = useState();
  const [employeeDocumentIndexToEdit, setEmployeeDocumentIndexToEdit] =
    useState();
  const [showEmployeeDocumentModal] = useGlobalState(
    "showEmployeeDocumentModal"
  );
  const [deleteEmployeeDocumentModal] = useGlobalState(
    "deleteEmployeeDocumentModal"
  );

  const handleEditEmployeeDocument = (id, index) => {
    setGetEmployeeDocumentId(id);
    setEmployeeDocumentIndexToEdit(index);
    setGlobalState("selectedEmployeeDocument", employeeDocumentData);
    setGlobalState("showEmployeeDocumentModal", true);
  };

  const handleDeleteEmployeeDocument = (id) => {
    setGetEmployeeDocumentId(id);
    setGlobalState("deleteEmployeeDocumentModal", true);
  };

  useEffect(() => {
    if (!showEmployeeDocumentModal) {
      setGlobalState("selectedEmployeeDocument", "");
    }
  }, [showEmployeeDocumentModal]);

  // Bank
  const [employeeBankState, dispatchEmployeeBank] = useReducer(
    add_update_delete_employee_bank,
    []
  );
  const { employeeBankData, isEmployeeBankDataLoading } =
    useEmployeeBankFetching();
  const [getEmployeeBankId, setGetEmployeeBankId] = useState();
  const [employeeBankIndexToEdit, setEmployeeBankIndexToEdit] = useState();
  const [showEmployeeBankModal] = useGlobalState("showEmployeeBankModal");
  const [deleteEmployeeBankModal] = useGlobalState("deleteEmployeeBankModal");

  const handleEditEmployeeBank = (id, index) => {
    setGetEmployeeBankId(id);
    setEmployeeBankIndexToEdit(index);
    setGlobalState("selectedEmployeeBank", employeeBankData);
    setGlobalState("showEmployeeBankModal", true);
  };

  const handleDeleteEmployeeBank = (id) => {
    setGetEmployeeBankId(id);
    setGlobalState("deleteEmployeeBankModal", true);
  };

  useEffect(() => {
    if (!showEmployeeBankModal) {
      setGlobalState("selectedEmployeeBank", "");
    }
  }, [showEmployeeBankModal]);

  const selectedEmployeeId = getSelectedData?.id;
  const first_name = getSelectedData?.first_name;
  const middle_name = getSelectedData?.middle_name;
  const last_name = getSelectedData?.last_name;
  const photo = getSelectedData?.photo;
  const role = getSelectedData?.role;
  const employee_number = getSelectedData?.employee_number;
  const hire_date = getSelectedData?.hire_date;
  const phone_number = getSelectedData?.phone_number;
  const email = getSelectedData?.email;
  const date_of_birth = getSelectedData?.date_of_birth;
  const gender = getSelectedData?.gender;
  const nationality = getSelectedData?.nationality;
  const ni_numbber = getSelectedData?.ni_numbber;
  const marital_status = getSelectedData?.marital_status;
  const employee_bank_accounts = getSelectedData?.employee_bank_accounts;
  const employee_emergency_contacts =
    getSelectedData?.employee_emergency_contacts;
  const employee_addresses = getSelectedData?.employee_addresses;
  const employee_review = getSelectedData?.employee_review;
  const employee_qualifications = getSelectedData?.employee_qualifications;
  const employee_work_experiences = getSelectedData?.employee_work_experiences;
  const department = getSelectedData?.department;
  const organisation = getSelectedData?.organisation;
  const employee_contract = getSelectedData?.employee_contract;
  const employee_leave = getSelectedData?.employee_leave;
  const employee_status = getSelectedData?.employee_status;
  const employee_documents = getSelectedData?.employee_documents;
  const employee_task = getSelectedData?.employee_task;


  const employeeStatus = employee_status?.map(s => {
    if(s.employee === selectedEmployeeId) {
      return s.status
    }
  })

  const { data: allEmployee } = useDataFetching();


// Checks if the uploaded document contain any of this extentions.
  const regex = /(png|jpg|webp|JPG|PNG)/;

  return (
    <>
      <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Employee Profile - Peepal Tree HRMS</title>
            <meta name="description" content="Profile page" />
          </Helmet>
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Profile</h3>
                  <ul className="breadcrumb breadcrumb-nav">
                    <li className="breadcrumb-item">
                      <Link to="/app/employee/allemployees">All Employees</Link>
                    </li>
                    <li className="breadcrumb-item active">Profile</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-view">
                      <div className="profile-img-wrap">
                        {isSelectedLoading || skeletonLoading ? (
                          <div className="skeleton-container1">
                            <div className="skeleton-avatar1"></div>
                          </div>
                        ) : (
                          <>
                            <div className="profile-img">
                              <a className="avatar">
                                <img alt="" src={photo ? photo : DefaultImage} />
                                <span className="status online" />
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="profile-basic">
                        <div className="row">
                          {isSelectedLoading || skeletonLoading ? (
                            <div className="skeleton-container1">
                              <div className="skeleton-content1">
                                <div className="skeleton-line1"></div>
                                <div className="skeleton-line2"></div>
                                <div className="skeleton-line3"></div>
                                <div className="skeleton-line4"></div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="col-md-5">
                                <div className="profile-info-left">
                                  <h3 className="user-name m-t-0 mb-0">{`${first_name} ${middle_name} ${last_name}`}</h3>

                                  <h6 className="text-muted active-online">
                                    <span className="status online" />
                                    {employeeStatus === employeeStatus
                                      ? "Active"
                                      : employeeStatus}
                                  </h6>
                                  <Popup
                                    inline
                                    hoverable
                                    position="bottom center"
                                    delay={{
                                      show: 300,
                                      hide: 800,
                                    }}
                                    content={
                                      <Segment.Group>
                                            <Segment style={{ width: "250px" }}>
                                              <div className="ui column relaxed divided grid">
                                                <div className="column">
                                                  <div className="ui link list">
                                                    <a className="item">{`Date of Join: ${hire_date ? moment(hire_date).format("DD MMM YYYY") : "--"}`}</a>
                                                    <a className="item">{`Role: ${role ? role?.role_name : "--"}`}</a>
                                                    <a className="item">{`Employee ID: ${employee_number ? employee_number : "--"}`}</a>
                                                    <a className="item">{`NI Number: ${ni_numbber ? ni_numbber : "--"}`}</a>
                                                    <a className="item">{`Nationality: ${nationality ? nationality : "--"}`}</a>
                                                    <a className="item">{`Department: ${department?.department_name}`}</a>
                                                  </div>
                                                </div>
                                              </div>
                                            </Segment>
                                      </Segment.Group>
                                    }
                                    trigger={
                                        <a>
                                          View More
                                        </a>
                                    }
                                  />
                                  <h6 style={{ width: "10px", height: "40px" }} className="text-muted"></h6>
                                </div>
                              </div>

                              <div className="col-md-7">
                                <ul className="personal-info">
                                  <li>
                                    <div className="title">Phone:</div>
                                    <div className="text">
                                      <a>{phone_number ? phone_number : "--"}</a>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="title">Email:</div>
                                    <div className="text">
                                      <a>{email ? email : "--"}</a>
                                    </div>
                                  </li>
                                  <Popup
                                    inline
                                    hoverable
                                    position="bottom left"
                                    delay={{
                                      show: 300,
                                      hide: 800,
                                    }}
                                    content={
                                      <Segment.Group>
                                            <Segment style={{ width: "250px" }}>
                                              <div className="ui column relaxed divided grid">
                                                <div className="column">
                                                  <div className="ui link list">
                                                    <a className="item">{`Birthday: ${date_of_birth ? moment(date_of_birth).format("DD MMM YYYY") : "--"}`}</a>
                                                    <a className="item">{`Gender: ${gender ? gender : "--"}`}</a>
                                                    <a className="item">{`Marital Status: ${marital_status ? marital_status : "--"}`}</a>
                                                    <a className="item">{`Organisation: ${organisation?.organisation_name ? organisation?.organisation_name: "--"}`}</a>
                                                  </div>
                                                </div>
                                              </div>
                                            </Segment>
                                      </Segment.Group>
                                    }
                                    trigger={
                                        <a>
                                          View More
                                        </a>
                                    }
                                  />
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
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
                      <a href="#emp_profile" data-bs-toggle="tab" className="nav-link active">
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#emp_tasks" data-bs-toggle="tab" className="nav-link">
                        Tasks
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#document_upload" data-bs-toggle="tab" className="nav-link">
                        Document Upload
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="tab-content">
              {/* Profile Info Tab */}
              <div id="emp_profile" className="pro-overview tab-pane fade show active">
                {isSelectedLoading || skeletonLoading ? (
                  <div className="skeleton-container-profile">
                    <div className="skeleton-content-profile">
                      <div className="skeleton-line-profile"></div>
                      <div className="skeleton-line-profile"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-lg-6">
				                <div className="card">
				              	<div className="card-header">
				              	  <h4 className="card-title mb-0">
                            Emergency Contact {""}
                            <span style={{ color: "red", fontSize: "0.7rem" }}>
                              {employeeEmergencyError?.length > 0 && (
                                <>
                                  Error: {employeeEmergencyError}
                                  <button
                                    onClick={clearErrorMessage}
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "0.8rem",
                                      cursor: "pointer",
                                      color: "black",
                                    }}
                                  >
                                    <i className="fa fa-times" />
                                    Clear Error
                                  </button>
                                </>
                              )}
                            </span>
                            <a
                              className="edit-icon"
                              onClick={() => setGlobalState("showEmployeeEmergencyModal", true)}
                            >
                              <i className="fa fa-plus" />
                            </a>
                          </h4>
				              	</div>
				              	<div className="card-body">
				              	  <div className="table-responsive">
				              		<table className="table table-striped mb-0">
				              		  <thead>
				              			<tr>
                              <th>Name</th>
                              <th>Relationship</th>
                              <th>Phone Number</th>
                              <th>Address</th>
                              <th>Email</th>
                              <th>Post Code</th>
                              <th>Action</th>
				              			</tr>
				              		  </thead>
				              		  <tbody>
                            {employeeEmergencyData?.length > 0
                              ? employeeEmergencyData?.map((emergency, index) => {
                                  const {
                                    id,
                                    employee,
                                    name,
                                    relationship,
                                    phone_number,
                                    address,
                                    email,
                                    post_code,
                                  } = emergency;
                                  if (employee === selectedEmployeeId) {
                                    return (
                                      <React.Fragment key={id}>
                                      <tr style={{ height: "90px" }}>
                                        <td>{name}</td>
                                        <td>{relationship}</td>
                                        <td>{phone_number}</td>
                                        <td>{address}</td>
                                        <td>{email}</td>
                                        <td>{post_code}</td>
                                        <td className="dropdown dropdown-action text-end">
                                          <a
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="material-icons">more_vert</i>
                                          </a>
                                          <div className="dropdown-menu dropdown-menu-right">
                                            <a
                                              className="dropdown-item"
                                              onClick={() => handleEditEmployeeEmergency(id, index)}
                                            >
                                              <i className="fa fa-pencil m-r-5" /> Edit
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              onClick={() => handleDeleteEmployeeEmergency(id)}
                                            >
                                              <i className="fa fa-trash-o m-r-5" /> Delete
                                            </a>
                                          </div>
                                        </td>
				              			          </tr>
                                      </React.Fragment>
                                    );
                                  }
                                })
                              : (
                                <tr>
                                  <td>No Emergency Contact attach to this employee</td>
                                  </tr>
                              )}
				              		  </tbody>
				              		</table>
				              	  </div>
				              	</div>
				                </div>
				              </div>

                      <div className="col-lg-6">
				                <div className="card">
				              	<div className="card-header">
				              	  <h4 className="card-title mb-0">
                            Address {""}
                            <span style={{ color: "red", fontSize: "0.7rem" }}>
                              {employeeAddressError?.length > 0 && (
                                <>
                                  Error: {employeeAddressError}
                                  <button
                                    onClick={clearErrorMessage}
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "0.8rem",
                                      cursor: "pointer",
                                      color: "black",
                                    }}
                                  >
                                    <i className="fa fa-times" />
                                    Clear Error
                                  </button>
                                </>
                              )}
                            </span>
                            <a
                              className="edit-icon"
                              onClick={() => setGlobalState("showEmployeeAddressModal", true)}
                            >
                              <i className="fa fa-plus" />
                            </a>
                          </h4>
				              	</div>
				              	<div className="card-body">
				              	  <div className="table-responsive">
				              		<table className="table table-striped mb-0">
				              		  <thead>
				              			<tr>
                              <th>Street</th>
                              <th>City</th>
                              <th>State</th>
                              <th>Country</th>
                              <th>Postal Code</th>
				              			</tr>
				              		  </thead>
				              		  <tbody>
                            {employeeAddressData?.length > 0
                              ? employeeAddressData?.map((emergency, index) => {
                                  const {
                                    id,
                                    employee,
                                    street,
                                    city,
                                    state,
                                    country,
                                    postal_code,
                                  } = emergency;
                                  if (employee === selectedEmployeeId) {
                                    return (
                                      <React.Fragment key={id}>
                                      <tr style={{ height: "90px" }}>
                                        <td>{street}</td>
                                        <td>{city}</td>
                                        <td>{state}</td>
                                        <td>{country}</td>
                                        <td>{postal_code}</td>
                                        <td className="dropdown dropdown-action text-end">
                                          <a
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="material-icons">more_vert</i>
                                          </a>
                                          <div className="dropdown-menu dropdown-menu-right">
                                            <a
                                              className="dropdown-item"
                                              onClick={() => handleEditEmployeeAddress(id, index)}
                                            >
                                              <i className="fa fa-pencil m-r-5" /> Edit
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              onClick={() => handleDeleteEmployeeAddress(id)}
                                            >
                                              <i className="fa fa-trash-o m-r-5" /> Delete
                                            </a>
                                          </div>
                                        </td>
				              			          </tr>
                                      </React.Fragment>
                                    );
                                  }
                                })
                              : (
                                <tr>
                                  <td>No Address attach to this employee</td>
                                </tr>
                              )}
				              		  </tbody>
				              		</table>
				              	  </div>
				              	</div>
				                </div>
				              </div>

                      <div className="col-md-6 d-flex">
                        <div className="card profile-box flex-fill">
                          <div className="card-header">
				              	    <h4 className="card-title mb-0">
                            Review
                            </h4>
				              	  </div>
                          <div className="card-body">
                            <Wrapper>
                              {employee_review?.length > 0 ? (
                                employee_review.map((contract, index) => {
                                  const {
                                    id,
                                    employee,
                                    review_type,
                                    description,
                                    review_date,
                                    review_status,
                                    review_file,
                                    review_manager,
                                  } = contract;
                                  if (employee === selectedEmployeeId) {
                                    return (
                                      <BillCard style={{position: "relative"}} key={id} className="card bill-card">
                                        <span style={{width: "90%"}}>
                                          <Popup
                                            inline
                                            hoverable
                                            position="bottom left"
                                            delay={{
                                              show: 300,
                                              hide: 800,
                                            }}
                                            content={
                                              <Segment.Group>
                                                <Segment style={{ width: "250px" }}>
                                                  <div className="ui column relaxed divided grid">
                                                    <div className="column">
                                                      <div className="ui link list">
                                                        <a className="item">{`Review Type: ${review_type}`}</a>
                                                        <a className="item">{`Date: ${review_date}`}</a>
                                                        <a className="item">{`Review Manager: ${review_manager}`}</a>
                                                        <a className="item">{`Status: ${review_status}`}</a>
                                                        <a className="item">
                                                        {review_file && "Doc: "}
                                                        {review_file && regex.test(review_file) ? (
                                                          <img
                                                            className="img-preview"
                                                            src={review_file}
                                                            alt="Preview"
                                                          />
                                                        ) : !review_file ? null : (
                                                          <span className="files-icon">
                                                            <DisplayFileType file={review_file} />
                                                          </span>
                                                        )}
                                                        </a>
                                                        {description && (
                                                          <a className="item">Des: <PopUpText text={description}/></a>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Segment>
                                              </Segment.Group>
                                            }
                                            trigger={
                                              <a style={{color: "black"}}>
                                                {review_type}
                                              </a>
                                            }
                                          />
                                        </span>
                                        <span
                                          className="edit-icon"
                                        >
                                          <div className="dropdown dropdown-action text-end">
                                            <a
                                              className="action-icon dropdown-toggle"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <i className="material-icons">more_vert</i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              {review_file && (
                                                <a
                                                  className="dropdown-item"
                                                  onClick={() => handleFileDownload(review_file)}
                                                >
                                                  <i className="fa fa-download m-r-5" /> Download
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </span>
                                      </BillCard>
                                    );
                                  }
                                })
                              ) : (
                                <>Ops! No contract for this employee</>
                              )}
                            </Wrapper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isSelectedLoading || skeletonLoading ? (
                  <div className="skeleton-container-profile">
                    <div className="skeleton-content-profile">
                      <div className="skeleton-line-profile"></div>
                      <div className="skeleton-line-profile"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-md-6 d-flex">
                        <div className="card profile-box flex-fill">
                          <div className="card-header">
				              	    <h4 className="card-title mb-0">
                              Qualifications{" "}
                              <span style={{ color: "red", fontSize: "0.7rem" }}>
                                {employeeQualificationError?.length > 0 && (
                                  <>
                                    Error: {employeeQualificationError}
                                    <button
                                      onClick={clearErrorMessage}
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        color: "black",
                                      }}
                                    >
                                      <i className="fa fa-times" />
                                      Clear Error
                                    </button>
                                  </>
                                )}
                              </span>
                              <a
                                onClick={() => setGlobalState("showEmployeeQualificationModal", true)}
                                className="edit-icon"
                              >
                                <i className="fa fa-plus" />
                              </a>
                            </h4>
				              	  </div>
                          <div className="card-body">
                            <div className="experience-box">
                              <ul className="experience-list">
                                {employeeQualificationData?.map((qualifications, index) => {
                                  const {
                                    id,
                                    employee,
                                    qualification_name,
                                    institute_name,
                                    start_date,
                                    end_date,
                                    description,
                                    qualification_upload,
                                  } = qualifications;
                                  if (employee == selectedEmployeeId) {
                                    return (
                                      <li key={id}>
                                        <div className="experience-user">
                                          <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <a className="name">
                                              Institution Name: {institute_name}
                                              <span
                                                className="edit-icon"
                                                style={{
                                                  background: "none",
                                                  border: "none",
                                                }}
                                              >
                                                <div className="dropdown dropdown-action text-end">
                                                  <a
                                                    className="action-icon dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                  >
                                                    <i className="material-icons">more_vert</i>
                                                  </a>
                                                  <div className="dropdown-menu dropdown-menu-right">
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleFileDownload(qualification_upload)
                                                      }
                                                    >
                                                      <i className="fa fa-download m-r-5" />{" "}
                                                      Download
                                                    </a>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleEditEmployeeQualification(id, index)
                                                      }
                                                    >
                                                      <i className="fa fa-pencil m-r-5" /> Edit
                                                    </a>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleDeleteEmployeeQualification(id)
                                                      }
                                                    >
                                                      <i className="fa fa-trash-o m-r-5" /> Delete
                                                    </a>
                                                  </div>
                                                </div>
                                              </span>
                                            </a>
                                            <div style={{ fontWeight: "900" }}>
                                              Qualification: {qualification_name}
                                            </div>
                                            <div>
                                              Start Date: {start_date} - End Date: {end_date}
                                            </div>
                                            <div>
                                              Description: {description ? description : "--"}
                                            </div>
                                            <div>
                                              File{" "}
                                              {qualification_upload &&
                                              regex.test(qualification_upload) ? (
                                                <img
                                                  className="img-preview"
                                                  src={qualification_upload}
                                                  alt="Preview"
                                                />
                                              ) : !qualification_upload ? (
                                                "--"
                                              ) : (
                                                <span className="files-icon">
                                                  <DisplayFileType file={qualification_upload} />
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </li>
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
                          <div className="card-header">
				              	    <h4 className="card-title mb-0">
                              Experience{" "}
                              <span style={{ color: "red", fontSize: "0.7rem" }}>
                                {employeeExperiencError?.length > 0 && (
                                  <>
                                    Error: {employeeExperiencError}
                                    <button
                                      onClick={clearErrorMessage}
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        color: "black",
                                      }}
                                    >
                                      <i className="fa fa-times" />
                                      Clear Error
                                    </button>
                                  </>
                                )}
                              </span>
                              <a
                                onClick={() => setGlobalState("showEmployeeExperienceModal", true)}
                                className="edit-icon"
                              >
                                <i className="fa fa-plus" />
                              </a>
                            </h4>
				              	  </div>
                          <div className="card-body">
                            <div className="experience-box">
                              <ul className="experience-list">
                                {employeeExperienceData?.map((experience, index) => {
                                  const {
                                    id,
                                    employee,
                                    job_title,
                                    company_name,
                                    start_date,
                                    end_date,
                                    description,
                                    experience_upload,
                                  } = experience;
                                  if (employee == selectedEmployeeId) {
                                    return (
                                      <li key={id}>
                                        <div className="experience-user">
                                          <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <a className="name">
                                              Company Name: {company_name}
                                              <span
                                                className="edit-icon"
                                                style={{
                                                  background: "none",
                                                  border: "none",
                                                }}
                                              >
                                                <div className="dropdown dropdown-action text-end">
                                                  <a
                                                    className="action-icon dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                  >
                                                    <i className="material-icons">more_vert</i>
                                                  </a>
                                                  <div className="dropdown-menu dropdown-menu-right">
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleFileDownload(experience_upload)
                                                      }
                                                    >
                                                      <i className="fa fa-download m-r-5" />{" "}
                                                      Download
                                                    </a>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleEditEmployeeExperience(id, index)
                                                      }
                                                    >
                                                      <i className="fa fa-pencil m-r-5" /> Edit
                                                    </a>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleDeleteEmployeeExperience(id)
                                                      }
                                                    >
                                                      <i className="fa fa-trash-o m-r-5" /> Delete
                                                    </a>
                                                  </div>
                                                </div>
                                              </span>
                                            </a>
                                            <div style={{ fontWeight: "900" }}>
                                              Job Title: {job_title}
                                            </div>
                                            <div>
                                              Start Date: {start_date} - End Date: {end_date}
                                            </div>
                                            <div>
                                              Description: {description ? description : "--"}
                                            </div>
                                            <div>
                                              File:{" "}
                                              {experience_upload &&
                                              regex.test(experience_upload) ? (
                                                <img
                                                  className="img-preview"
                                                  src={experience_upload}
                                                  alt="Preview"
                                                />
                                              ) : !experience_upload ? (
                                                "--"
                                              ) : (
                                                <span className="files-icon">
                                                  <DisplayFileType file={experience_upload} />
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isSelectedLoading || skeletonLoading ? (
                  <div className="skeleton-container-profile">
                    <div className="skeleton-content-profile">
                      <div className="skeleton-line-profile"></div>
                      <div className="skeleton-line-profile"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-md-6 d-flex">
                        <div className="card profile-box flex-fill">
                          <div className="card-header">
				              	    <h4 className="card-title mb-0">
                              Contract
                            </h4>
				              	  </div>
                          <div className="card-body">
                            <Wrapper>
                              {employee_contract?.length > 0 ? (
                                employee_contract.map((contract, index) => {
                                  const {
                                    id,
                                    employee_contract,
                                    contract_owner,
                                    description,
                                    contract_type,
                                    start_date,
                                    end_date,
                                    contract_status,
                                    contract_file,
                                  } = contract;
                                  if (employee_contract === selectedEmployeeId) {
                                    return (
                                      <BillCard style={{position: "relative"}} key={id} className="card bill-card">
                                        <span style={{width: "90%"}}>
                                          <Popup
                                            inline
                                            hoverable
                                            position="bottom left"
                                            delay={{
                                              show: 300,
                                              hide: 800,
                                            }}
                                            content={
                                              <Segment.Group>
                                                <Segment style={{ width: "250px" }}>
                                                  <div className="ui column relaxed divided grid">
                                                    <div className="column">
                                                      <div className="ui link list">
                                                        <a className="item">{`Contract Type: ${contract_type}`}</a>
                                                        <a className="item">{`Start Date: ${start_date}`}</a>
                                                        <a className="item">{`End Date: ${end_date}`}</a>
                                                        <a className="item">{`Contract Status: ${contract_status}`}</a>
                                                        <a className="item">
                                                        {contract_file && "Doc: "}
                                                        {contract_file && regex.test(contract_file) ? (
                                                          <img
                                                            className="img-preview"
                                                            src={contract_file}
                                                            alt="Preview"
                                                          />
                                                        ) : !contract_file ? null : (
                                                          <span className="files-icon">
                                                            <DisplayFileType file={contract_file} />
                                                          </span>
                                                        )}
                                                        </a>
                                                        {description && (
                                                          <a className="item">Des: <PopUpText text={description}/></a>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Segment>
                                              </Segment.Group>
                                            }
                                            trigger={
                                              <a style={{color: "black"}}>
                                                {contract_owner}
                                              </a>
                                            }
                                          />
                                        </span>
                                        <span
                                          className="edit-icon"
                                        >
                                          <div className="dropdown dropdown-action text-end">
                                            <a
                                              className="action-icon dropdown-toggle"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <i className="material-icons">more_vert</i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              {contract_file && (
                                                <a
                                                  className="dropdown-item"
                                                  onClick={() => handleFileDownload(contract_file)}
                                                >
                                                  <i className="fa fa-download m-r-5" /> Download
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </span>
                                      </BillCard>
                                    );
                                  }
                                })
                              ) : (
                                <>Ops! No contract for this employee</>
                              )}
                            </Wrapper>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex">
                        <div className="card profile-box flex-fill">
                          <div className="card-header">
				              	    <h4 className="card-title mb-0">
                            Leave
                            </h4>
				              	  </div>
                          <div className="card-body">
                            <Wrapper>
                              {employee_leave?.length > 0 ? (
                                employee_leave.map((leave, index) => {
                                  const {
                                    id,
                                    employee,
                                    number_of_days,
                                    comments,
                                    authorising_manager,
                                    start_date,
                                    end_date,
                                    status,
                                    supporting_document,
                                    leave_type,
                                    authorised_by,
                                  } = leave;
                                  if (employee === selectedEmployeeId) {
                                    return (
                                      <BillCard style={{position: "relative"}} key={id} className="card bill-card">
                                        <span style={{width: "90%"}}>
                                          <Popup
                                            inline
                                            hoverable
                                            position="bottom left"
                                            delay={{
                                              show: 300,
                                              hide: 800,
                                            }}
                                            content={
                                              <Segment.Group>
                                                <Segment style={{ width: "250px" }}>
                                                  <div className="ui column relaxed divided grid">
                                                    <div className="column">
                                                      <div className="ui link list">
                                                        <a className="item">{`Leave Type: ${leave_type}`}</a>
                                                        <a className="item">{`Number of days: ${number_of_days}`}</a>
                                                        <a className="item">{`Start Date: ${start_date}`}</a>
                                                        <a className="item">{`End Date: ${end_date}`}</a>
                                                        <a className="item">{`Authorising Manager: ${authorising_manager}`}</a>
                                                        <a className="item">{`Status: ${status}`}</a>
                                                        <a className="item">
                                                        {supporting_document && "Doc: "}
                                                        {supporting_document && regex.test(supporting_document) ? (
                                                          <img
                                                            className="img-preview"
                                                            src={supporting_document}
                                                            alt="Preview"
                                                          />
                                                        ) : !supporting_document ? null : (
                                                          <span className="files-icon">
                                                            <DisplayFileType file={supporting_document} />
                                                          </span>
                                                        )}
                                                        </a>
                                                        {comments && (
                                                          <a className="item">Comment: <PopUpText text={comments}/></a>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Segment>
                                              </Segment.Group>
                                            }
                                            trigger={
                                              <a style={{color: "black"}}>
                                                {authorising_manager}
                                              </a>
                                            }
                                          />
                                        </span>
                                        <span
                                          className="edit-icon"
                                        >
                                          <div className="dropdown dropdown-action text-end">
                                            <a
                                              className="action-icon dropdown-toggle"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <i className="material-icons">more_vert</i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              {supporting_document && (
                                                <a
                                                  className="dropdown-item"
                                                  onClick={() => handleFileDownload(supporting_document)}
                                                >
                                                  <i className="fa fa-download m-r-5" /> Download
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </span>
                                      </BillCard>
                                    );
                                  }
                                })
                              ) : (
                                <>Ops! No Leave for this employee</>
                              )}
                            </Wrapper>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
				                <div className="card">
				              	<div className="card-header">
				              	  <h4 className="card-title mb-0">
                          Bank Information {""}
                            <span style={{ color: "red", fontSize: "0.7rem" }}>
                              {employeeBankError?.length > 0 && (
                                <>
                                  Error: {employeeBankError}
                                  <button
                                    onClick={clearErrorMessage}
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "0.8rem",
                                      cursor: "pointer",
                                      color: "black",
                                    }}
                                  >
                                    <i className="fa fa-times" />
                                    Clear Error
                                  </button>
                                </>
                              )}
                            </span>
                            <a
                              className="edit-icon"
                              onClick={() => setGlobalState("showEmployeeBankModal", true)}
                            >
                              <i className="fa fa-plus" />
                            </a>
                          </h4>
				              	</div>
				              	<div className="card-body">
				              	  <div className="table-responsive">
				              		<table className="table table-striped mb-0">
				              		  <thead>
                              <tr>
                                <th>Bank name</th>
                                <th>Account Name</th>
                                <th>Account No</th>
                                <th>Account Type</th>
                                <th>Currency</th>
                                <th>Address</th>
                                <th>Sort Code</th>
                                <th>Swift Code</th>
                                <th>Iban</th>
                                <th>Routing No</th>
                                <th>Date</th>
                                <th>Document</th>
                                <th>Action</th>
                              </tr>
				              		  </thead>
				              		  <tbody>
                            {employeeBankData?.length > 0
                              ? employeeBankData?.map((bank, index) => {
                                  const {
                                    id,
                                    employee,
                                    bank_name,
                                    account_name,
                                    account_number,
                                    account_type,
                                    currency,
                                    bank_address,
                                    sort_code,
                                    swift_code,
                                    iban,
                                    routing_number,
                                    upload_date,
                                    upload_document,
                                  } = bank;
                                  if (employee === selectedEmployeeId) {
                                    return (
                                      <React.Fragment key={id}>
                                      <tr style={{ height: "90px" }}>
                                        <td>{bank_name}</td>
                                        <td>{account_name}</td>
                                        <td>{account_number}</td>
                                        <td>{account_type}</td>
                                        <td>{currency}</td>
                                        <td>{bank_address}</td>
                                        <td>{sort_code}</td>
                                        <td>{swift_code}</td>
                                        <td>{iban}</td>
                                        <td>{routing_number}</td>
                                        <td>{upload_date}</td>
                                        <td>
                                          {upload_document && regex.test(upload_document) ? (
                                            <img
                                              className="img-preview"
                                              src={upload_document}
                                              alt="Preview"
                                            />
                                          ) : !upload_document ? null : (
                                            <span className="files-icon">
                                              <DisplayFileType file={upload_document} />
                                            </span>
                                          )}
                                        </td>
                                        <td className="dropdown dropdown-action text-end">
                                          <a
                                            className="action-icon dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <i className="material-icons">more_vert</i>
                                          </a>
                                          <div className="dropdown-menu dropdown-menu-right">
                                            <a
                                              className="dropdown-item"
                                              onClick={() =>
                                                handleFileDownload(upload_document)
                                              }
                                            >
                                              <i className="fa fa-download m-r-5" /> Download
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              onClick={() => handleEditEmployeeBank(id, index)}
                                            >
                                              <i className="fa fa-pencil m-r-5" /> Edit
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              onClick={() => handleDeleteEmployeeBank(id)}
                                            >
                                              <i className="fa fa-trash-o m-r-5" /> Delete
                                            </a>
                                          </div>
                                        </td>
				              			          </tr>
                                      </React.Fragment>
                                    );
                                  }
                                })
                              : (
                                <tr>
                                  <td>No Bank detail attach to this employee</td>
                                </tr>
                              )}
				              		  </tbody>
				              		</table>
				              	  </div>
				              	</div>
				                </div>
				              </div>
                    </div>
                  </>
                )}
              </div>

              {/* /Profile Info Tab */}
              {/* Tasks Tab */}
              <div className="tab-pane fade" id="emp_tasks">
                <div className="row">
                  {employee_task?.length > 0 ? employee_task?.map((task, index) => {
                    const {
                      id,
                      start_at,
                      end_at,
                      description,
                      employees,
                      managers,
                      priority,
                      concluded,
                      is_paid,
                      name,
                      hours,
                      progress
                    } = task;
                    const employee = allEmployee?.filter(emp => managers.includes(emp.id))
                    if(employees.includes(selectedEmployeeId)) {
                      return (
                        <React.Fragment key={id}>
                          <>
                            <div
                              key={id}
                              className="col-lg-6 col-sm-12 col-md-6 col-xl-4"
                            >
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="project-title">
                                    <Link
                                      onClick={(e) => e.preventDefault()}
                                      to="#"
                                    >
                                      {name}
                                    </Link>
                                  </h4>
                                  <p className="text-muted">{description}</p>
                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">Task Type: </span>
                                    <span
                                      style={{
                                        backgroundColor: is_paid === true ? "#55CE63" : "#ff9b44",
                                        color: "#fff",
                                        padding: "5px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {is_paid === true ? "Paid" : "Non Paid"}
                                    </span>{" "}
                                  </small>
                                    
                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">
                                      Task Priority:{" "}
                                    </span>
                                    <span
                                      style={{
                                        backgroundColor:
                                          (priority === "low" && "red") ||
                                          (priority === "medium" && "#ff9b44") ||
                                          (priority === "high" && "#55CE63"),
                                        color: "#fff",
                                        padding: "5px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {priority}
                                    </span>{" "}
                                  </small>
                                    
                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">Task Status: </span>
                                    <span
                                      style={{
                                        backgroundColor: concluded === true ? "#55CE63" : "#ff9b44",
                                        color: "#fff",
                                        padding: "5px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {concluded === true ? "Concluded" : "In Progress"}
                                    </span>{" "}
                                  </small>
                                      
                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">
                                      Start At:{" "}
                                    </span>
                                    <span className="text-muted">
                                      {start_at ? moment(start_at).format("DD MMM YYYY") : "--"}
                                    </span>{" "}
                                  </small>

                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">
                                      End At:{" "}
                                    </span>
                                    <span className="text-muted">
                                      {end_at ? moment(end_at).format("DD MMM YYYY") : "--"}
                                    </span>{" "}
                                  </small>
                                      
                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">
                                      Task Manager:{" "}
                                    </span>
                                    {employee?.map(e => {
                                        return (
                                          
                                            <img
                                              style={{
                                                width: "25px",
                                                borderRadius: "50px",
                                                backgroundColor: "#00000000",
                                                height: "25px",
                                              }}
                                              key={e.id}
                                              title={`${e.first_name} ${e.middle_name} ${e.last_name}`}
                                              alt=""
                                              src={e.photo}
                                            />
                                        )})
                                    }
                                  </small>
                                      
                                  <small className="block text-ellipsis m-b-15">
                                    <span className="text-xs">
                                      Time Allocated:{" "}
                                    </span>
                                    <span className="text-muted">
                                      {hours
                                        ? hours + "hr"
                                        : "--"}
                                    </span>{" "}
                                  </small>
                                  <div className="project-members m-b-15">
                                    <div>Team:</div>
                                    <ul className="team-members">
                                      <li>
                                        <a data-bs-toggle="tooltip" title={`${first_name} ${middle_name} ${last_name}`}>
                                          <img
                                            alt=""
                                            src={photo ? photo : DefaultImage}
                                          />
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <p className="m-b-5">
                                    Progress
                                    <ProgressSpan progress={progress} />
                                  </p>
                                  <ProgressDiv progress={progress} />
                                </div>
                              </div>
                            </div>
                          </>
                        </React.Fragment>
                      );
                    }
                  }) : <NoAvailableData />}
                </div>
              </div>
              {/* /Tasks Tab */}

              {/* Document Upload Tab */}
              <div className="tab-pane fade" id="document_upload">
                {isSelectedLoading || skeletonLoading ? (
                  <div className="skeleton-container-profile">
                    <div className="skeleton-content-profile">
                      <div className="skeleton-line-profile"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-md-12 d-flex">
                        <div className="card profile-box flex-fill">
                          <div className="card-header">
				              	    <h4 className="card-title mb-0">
                              Document {""}
                              <span style={{ color: "red", fontSize: "0.7rem" }}>
                                {employeeDocumentError?.length > 0 && (
                                  <>
                                    Error: {employeeDocumentError}
                                    <button
                                      onClick={clearErrorMessage}
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        color: "black",
                                      }}
                                    >
                                      <i className="fa fa-times" />
                                      Clear Error
                                    </button>
                                  </>
                                )}
                              </span>
                              <a
                                className="edit-icon"
                                onClick={() => setGlobalState("showEmployeeDocumentModal", true)}
                              >
                                <i className="fa fa-plus" />
                              </a>
                            </h4>
				              	  </div>
                          <div className="card-body">
                            <Wrapper>
                              {employeeDocumentData?.length > 0 ? (
                                employeeDocumentData.map((doc, index) => {
                                  const {
                                    id,
                                    employee,
                                    document_name,
                                    document_number,
                                    issue_date,
                                    expiry_date,
                                    document_type,
                                    document_upload,
                                    status,
                                    verified,
                                  } = doc;
                                  if (employee === selectedEmployeeId) {
                                    return (
                                      <>
                                        <CardWidth key={id} className="card card-width card-file col-6 col-sm-4 col-md-3 col-lg-6 col-xl-3">
                                          <div className="dropdown-file">
                                            <a href="" className="dropdown-link" data-bs-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleEditEmployeeDocument(id, index)
                                                }
                                              >
                                                <i className="fa fa-pencil m-r-5" /> Edit
                                              </a>
                                              {document_upload && (
                                                <a
                                                  className="dropdown-item"
                                                  onClick={() =>
                                                    handleFileDownload(document_upload)
                                                  }
                                                >
                                                  <i className="fa fa-download m-r-5" /> Download
                                                </a>
                                              )}
                                              <a
                                                className="dropdown-item"
                                                onClick={() => handleDeleteEmployeeDocument(id)}
                                              >
                                                <i className="fa fa-trash-o m-r-5" /> Delete
                                              </a>
                                            </div>
                                          </div>
                                          <div className="card-file-thumb">
                                            {document_upload &&
                                              regex.test(document_upload) ? (
                                                <img
                                                  className="img-preview doc-image"
                                                  src={document_upload}
                                                  alt="Preview"
                                                />
                                              ) : !document_upload ? (
                                                <span>No File</span>
                                              ) : (
                                                <DisplayFileType file={document_upload} />
                                            )}
                                          </div>
                                          <div className="card-body">
                                            <h6>
                                              <a href="">
                                                <Popup
                                                  inline
                                                  hoverable
                                                  position="top left"
                                                  delay={{
                                                    show: 300,
                                                    hide: 800,
                                                  }}
                                                  content={
                                                    <Segment.Group>
                                                          <Segment style={{ width: "250px" }}>
                                                            <div className="ui column relaxed divided grid">
                                                              <div className="column">
                                                                <h4>{`Doc Name: ${document_name}`}</h4>
                                                                <div className="ui link list">
                                                                  <a className="item">{`Doc Number: ${document_number}`}</a>
                                                                  <a className="item">{`Issue Date: ${issue_date}`}</a>
                                                                  <a className="item">{`Expiry Date: ${expiry_date}`}</a>
                                                                  <a className="item">{`Doc Type: ${document_type}`}</a>
                                                                  <a className="item">{`Verification: ${verified}`}</a>
                                                                  <a className="item">{`Status: ${status}`}</a>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </Segment>
                                                    </Segment.Group>
                                                  }
                                                  trigger={
                                                      <a style={{color: "black"}}>
                                                        {document_name}
                                                      </a>
                                                  }
                                                />
                                              </a>
                                            </h6>
                                          </div>
                                        </CardWidth>
                                      </>
                                    );
                                  }
                                })
                              ) : (
                                <></>
                              )}
                            </Wrapper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* /Document Upload Tab */}
            </div>
          </div>
        </div>
      </DivContainer>

      {/* Employee Address */}
      {showEmployeeAddressModal && (
        <AddEmployeeAddress
          id={getEmployeeAddressId}
          dispatchEmployeeAddress={dispatchEmployeeAddress}
          employeeAddressIndexToEdit={employeeAddressIndexToEdit}
          employee={getEmployeeId}
        />
      )}
      {deleteEmployeeAddressModal && (
        <DeleteModal
          deleteAction={dispatchEmployeeAddress}
          iDToDelete={getEmployeeAddressId}
          modalTitle={"Employee Address"}
        />
      )}

      {/* Employee Emergency Contact */}
      {showEmployeeEmergencyModal && (
        <AddEmployeeEmergency
          id={getEmployeeEmergencyId}
          dispatchEmployeeEmergency={dispatchEmployeeEmergency}
          employeeEmergencyIndexToEdit={employeeEmergencyIndexToEdit}
          employee={getEmployeeId}
        />
      )}
      {deleteEmployeeEmergencyModal && (
        <DeleteModal
          deleteAction={dispatchEmployeeEmergency}
          iDToDelete={getEmployeeEmergencyId}
          modalTitle={"Emergency"}
        />
      )}

      {/* Employee Qualification */}
      {showEmployeeQualificationModal && (
        <AddEmployeeQualification
          id={getEmployeeQualificationId}
          dispatchEmployeeQualification={dispatchEmployeeQualification}
          employeeQualificationIndexToEdit={employeeQualificationIndexToEdit}
          employee={getEmployeeId}
        />
      )}
      {deleteEmployeeQualificationModal && (
        <DeleteModal
          deleteAction={dispatchEmployeeQualification}
          iDToDelete={getEmployeeQualificationId}
          modalTitle={"Qualification"}
        />
      )}

      {/* Employee Experience */}
      {showEmployeeExperienceModal && (
        <AddEmployeeExperience
          id={getEmployeeExperienceId}
          dispatchEmployeeExperience={dispatchEmployeeExperience}
          employeeExperienceIndexToEdit={employeeExperienceIndexToEdit}
          employee={getEmployeeId}
        />
      )}
      {deleteEmployeeExperienceModal && (
        <DeleteModal
          deleteAction={dispatchEmployeeExperience}
          iDToDelete={getEmployeeExperienceId}
          modalTitle={"Experience"}
        />
      )}

      {/* Employee Document */}
      {showEmployeeDocumentModal && (
        <AddEmployeeDocument
          id={getEmployeeDocumentId}
          dispatchEmployeeDocument={dispatchEmployeeDocument}
          employeeDocumentIndexToEdit={employeeDocumentIndexToEdit}
          employee={getEmployeeId}
        />
      )}
      {deleteEmployeeDocumentModal && (
        <DeleteModal
          deleteAction={dispatchEmployeeDocument}
          iDToDelete={getEmployeeDocumentId}
          modalTitle={"Document"}
        />
      )}

      {/* Employee Bank */}
      {showEmployeeBankModal && (
        <AddEmployeeBank
          id={getEmployeeBankId}
          dispatchEmployeeBank={dispatchEmployeeBank}
          employeeBankIndexToEdit={employeeBankIndexToEdit}
          employee={getEmployeeId}
        />
      )}
      {deleteEmployeeBankModal && (
        <DeleteModal
          deleteAction={dispatchEmployeeBank}
          iDToDelete={getEmployeeBankId}
          modalTitle={"Bank"}
        />
      )}
    </>
  );
};
export default Profile;

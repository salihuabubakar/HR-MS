import React, { useState, useEffect, useReducer, useMemo } from "react";
import moment from "moment";
import DeleteModal from "../../../_components/modelbox/DeleteModal";
import { useGlobalState, setGlobalState } from "../../../context/GlobalState";
import {
  useEmployeeAddressFetching,
  useEmployeeEmergencyFetching,
  useEmployeeQualificationFetching,
  useEmployeeExperienceFetching,
  useEmployeeDocumentFetching,
  useEmployeeBankFetching,
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

const Profile = ({
  getSelectedData,
  DefaultImage,
  isSelectedLoading,
  skeletonLoading,
  getEmployeeId,
}) => {

    const handleFileDownload = (file) => {
      const a = document.createElement("a");
      a.href = file;

      const fileExtension = file.split(".").pop().toLowerCase();

      // Set the MIME type based on the file extension
      let mimeType;
      if (
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "JPG"
      ) {
        mimeType = "image/jpeg";
      } else if (fileExtension === "png" || fileExtension === "PNG") {
        mimeType = "image/png";
      } else if (fileExtension === "pdf") {
        mimeType = "application/pdf";
      } else if (fileExtension === "webp") {
        mimeType = "image/webp";
      } else if (fileExtension === "txt") {
        mimeType = "text/plain";
      } else if (fileExtension === "xls" || fileExtension === "xlsx") {
        mimeType = "application/vnd.ms-excel";
      } else if (fileExtension === "doc" || fileExtension === "docx") {
        mimeType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      } else {
        mimeType = "application/octet-stream"; // Fallback MIME type for unknown file types
      }

      // Set the MIME type of the file
      a.type = mimeType;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

  // Address
  const [employeeAddressState, dispatchEmployeeAddress] = useReducer(
    add_update_delete_employee_address,
    []
  );
  const {
    employeeAddressData,
    isEmployeeAddressDataLoading,
    employeeAddressError,
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
    isEmployeeEmergencyDataLoading,
    employeeEmergencyError,
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
    isEmployeeQualificationDataLoading,
    employeeQualificationError,
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
    isEmployeeDocumentDataLoading,
    employeeDocumentError,
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
  const { employeeBankData, isEmployeeBankDataLoading, employeeBankError } =
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


  const employeeStatus = employee_status?.map(s => {
    if(s.employee === selectedEmployeeId) {
      return s.status
    }
  })

// Checks if the uploaded document contain any of this extentions.
  const regex = /(png|jpg|webp|JPG|PNG)/;

  return (
    <>
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
                        <a>
                          <img alt="" src={photo ? photo : DefaultImage} />
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

                            <h6
                              style={{ display: "flex" }}
                              className="text-muted"
                            >
                              <div
                                style={{
                                  borderRadius: "50%",
                                  height: "10px",
                                  width: "10px",
                                  backgroundColor: "lightgreen",
                                  marginRight: "5px",
                                }}
                              ></div>
                              {employeeStatus == Number(employeeStatus)
                                ? "Active"
                                : employeeStatus}
                            </h6>
                            <h6 className="text-muted">
                              Role: {role ? role?.role_name : "--"}
                            </h6>
                            <div className="small doj text-muted">
                              Employee ID :{" "}
                              {employee_number ? employee_number : "--"}
                            </div>
                            <div className="small doj text-muted">
                              NI Number : {ni_numbber ? ni_numbber : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Date of Join:{" "}
                              {hire_date
                                ? moment(hire_date).format("DD MMM YYYY")
                                : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Nationality: {nationality ? nationality : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Department: {department?.department_name}
                            </div>
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
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">
                                {date_of_birth
                                  ? moment(date_of_birth).format("DD MMM YYYY")
                                  : "--"}
                              </div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">
                                {gender ? gender : "--"}
                              </div>
                            </li>
                            <li>
                              <div className="title">Marital Status:</div>
                              <div className="text">
                                {marital_status ? marital_status : "--"}
                              </div>
                            </li>
                            <li>
                              <div className="title">Organisation:</div>
                              <div className="text">
                                {organisation?.organisation_name
                                  ? organisation?.organisation_name
                                  : "--"}
                              </div>
                            </li>
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
                <a
                  href="#emp_profile"
                  data-bs-toggle="tab"
                  className="nav-link active"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a href="#emp_tasks" data-bs-toggle="tab" className="nav-link">
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
                <div className="col-md-12 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Bank Information{" "}
                        <a
                          className="edit-icon"
                          onClick={() =>
                            setGlobalState("showEmployeeBankModal", true)
                          }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
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
                            </tr>
                          </thead>
                          <tbody>
                            {employeeBankData?.length > 0 ? (
                              employeeBankData?.map((bank, index) => {
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
                                if (employee == selectedEmployeeId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
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
                                        {upload_document &&
                                        regex.test(upload_document) ? (
                                          <img
                                            className="img-preview"
                                            src={upload_document}
                                            alt="Preview"
                                          />
                                        ) : !upload_document ? null : (
                                          <span className="files-icon">
                                            <i className="fa fa-file-pdf-o" />
                                          </span>
                                        )}
                                      </td>
                                      <td className="dropdown dropdown-action text-end">
                                        <a
                                          className="action-icon dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleFileDownload(
                                                upload_document
                                              )
                                            }
                                          >
                                            <i className="fa fa-download m-r-5" />{" "}
                                            Download
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditEmployeeBank(id, index)
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleDeleteEmployeeBank(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              })
                            ) : (
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

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Emergency Contact{" "}
                        <a
                          className="edit-icon"
                          onClick={() =>
                            setGlobalState("showEmployeeEmergencyModal", true)
                          }
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
                              <th>Phone Number</th>
                              <th>Address</th>
                              <th>Email</th>
                              <th>Post Code</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employeeEmergencyData?.length > 0 ? (
                              employeeEmergencyData?.map((emergency, index) => {
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
                                if (employee == selectedEmployeeId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
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
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditEmployeeEmergency(
                                                id,
                                                index
                                              )
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleDeleteEmployeeEmergency(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              })
                            ) : (
                              <tr>
                                <td>
                                  No Emergency Contact attach to this employee
                                </td>
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
                    <div className="card-body">
                      <h3 className="card-title">
                        Address{" "}
                        <a
                          className="edit-icon"
                          onClick={() =>
                            setGlobalState("showEmployeeAddressModal", true)
                          }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
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
                            {employeeAddressData?.length > 0 ? (
                              employeeAddressData?.map((address, index) => {
                                const {
                                  id,
                                  employee,
                                  street,
                                  city,
                                  state,
                                  country,
                                  postal_code,
                                } = address;
                                if (employee == selectedEmployeeId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
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
                                          <i className="material-icons">
                                            more_vert
                                          </i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditEmployeeAddress(
                                                id,
                                                index
                                              )
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleDeleteEmployeeAddress(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              })
                            ) : (
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
                    <div className="card-body">
                      <h3 className="card-title">Review</h3>
                      {employee_review?.map((review, index) => {
                        const {
                          id,
                          employee,
                          review_type,
                          description,
                          review_date,
                          review_status,
                          review_file,
                          review_manager,
                        } = review;
                        if (employee == selectedEmployeeId) {
                          return (
                            <ul key={id} className="personal-info">
                              <li>
                                <div className="title">Review Type</div>
                                <div className="text">{review_type}</div>
                              </li>
                              <li>
                                <div className="title">Description</div>
                                <div className="text">{description}</div>
                              </li>
                              <li>
                                <div className="title">Review Date</div>
                                <div className="text">{review_date}</div>
                              </li>
                              <li>
                                <div className="title">Review Status</div>
                                <div className="text">{review_status}</div>
                              </li>
                              <li>
                                <div className="title">Review Manager</div>
                                <div className="text">
                                  {review_manager != Number(review_manager)
                                    ? review_manager
                                    : "Admin"}
                                </div>
                              </li>
                            </ul>
                          );
                        }
                      })}
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
                    <div className="card-body">
                      <h3 className="card-title">
                        Qualifications{" "}
                        <a
                          onClick={() =>
                            setGlobalState(
                              "showEmployeeQualificationModal",
                              true
                            )
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {employeeQualificationData?.map(
                            (qualifications, index) => {
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
                                          {institute_name}
                                          <span
                                            className="edit-icon"
                                            style={{
                                              background: "none",
                                              border: "none",
                                            }}
                                          >
                                            <div className="dropdown dropdown-action text-end">
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleFileDownload(
                                                    qualification_upload
                                                  )
                                                }
                                              >
                                                <i className="fa fa-download m-r-5" />{" "}
                                                Download
                                              </a>
                                              <a
                                                className="action-icon dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <i className="material-icons">
                                                  more_vert
                                                </i>
                                              </a>
                                              <div className="dropdown-menu dropdown-menu-right">
                                                <a
                                                  className="dropdown-item"
                                                  onClick={() =>
                                                    handleEditEmployeeQualification(
                                                      id,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-pencil m-r-5" />{" "}
                                                  Edit
                                                </a>
                                                <a
                                                  className="dropdown-item"
                                                  onClick={() =>
                                                    handleDeleteEmployeeQualification(
                                                      id
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-trash-o m-r-5" />{" "}
                                                  Delete
                                                </a>
                                              </div>
                                            </div>
                                          </span>
                                        </a>
                                        <div style={{ fontWeight: "900" }}>
                                          {qualification_name}
                                        </div>
                                        <span className="time">
                                          {start_date} - {end_date}
                                        </span>
                                        <div>{description}</div>
                                        <div>
                                          {qualification_upload &&
                                          regex.test(qualification_upload) ? (
                                            <img
                                              className="img-preview"
                                              src={qualification_upload}
                                              alt="Preview"
                                            />
                                          ) : !qualification_upload ? null : (
                                            <span className="files-icon">
                                              <i className="fa fa-file-pdf-o" />
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }
                            }
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
                        Experience{" "}
                        <a
                          onClick={() =>
                            setGlobalState("showEmployeeExperienceModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
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
                                        {company_name}
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
                                              <i className="material-icons">
                                                more_vert
                                              </i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleFileDownload(
                                                    experience_upload
                                                  )
                                                }
                                              >
                                                <i className="fa fa-download m-r-5" />{" "}
                                                Download
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleEditEmployeeExperience(
                                                    id,
                                                    index
                                                  )
                                                }
                                              >
                                                <i className="fa fa-pencil m-r-5" />{" "}
                                                Edit
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleDeleteEmployeeExperience(
                                                    id
                                                  )
                                                }
                                              >
                                                <i className="fa fa-trash-o m-r-5" />{" "}
                                                Delete
                                              </a>
                                            </div>
                                          </div>
                                        </span>
                                      </a>
                                      <div style={{ fontWeight: "900" }}>
                                        {job_title}
                                      </div>
                                      <span className="time">
                                        {start_date} - {end_date}
                                      </span>
                                      <div>{description}</div>
                                      <div>
                                        {experience_upload &&
                                        regex.test(experience_upload) ? (
                                          <img
                                            className="img-preview"
                                            src={experience_upload}
                                            alt="Preview"
                                          />
                                        ) : !experience_upload ? null : (
                                          <span className="files-icon">
                                            <i className="fa fa-file-pdf-o" />
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
                    <div className="card-body">
                      <h3 className="card-title">Contract</h3>
                      {employee_contract?.map((contract, index) => {
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
                        if (employee_contract == selectedEmployeeId) {
                          return (
                            <ul key={id} className="personal-info">
                              <li>
                                <div className="title">Contract Owner</div>
                                <div className="text">{contract_owner}</div>
                              </li>
                              <li>
                                <div className="title">Contract Type</div>
                                <div className="text">{contract_type}</div>
                              </li>
                              <li>
                                <div className="title">Description</div>
                                <div className="text">{description}</div>
                              </li>
                              <li>
                                <div className="title">Start Date</div>
                                <div className="text">{start_date}</div>
                              </li>
                              <li>
                                <div className="title">End Date</div>
                                <div className="text">{end_date}</div>
                              </li>
                              <li>
                                <div className="title">Contract Status</div>
                                <div className="text">{contract_status}</div>
                              </li>
                              <li>
                                <div className="title">Contract File</div>
                                <div className="text">
                                  {contract_file != null ? contract_file : "--"}
                                </div>
                              </li>
                            </ul>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Leave</h3>
                      {employee_leave?.map((leave, index) => {
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
                        if (employee == selectedEmployeeId) {
                          return (
                            <ul key={id} className="personal-info">
                              <li>
                                <div className="title">Authorising Manager</div>
                                <div className="text">
                                  {authorising_manager}
                                </div>
                              </li>
                              <li>
                                <div className="title">Number of days</div>
                                <div className="text">{number_of_days}</div>
                              </li>
                              <li>
                                <div className="title">Comment</div>
                                <div className="text">{comments}</div>
                              </li>
                              <li>
                                <div className="title">Start Date</div>
                                <div className="text">{start_date}</div>
                              </li>
                              <li>
                                <div className="title">End Date</div>
                                <div className="text">{end_date}</div>
                              </li>
                              <li>
                                <div className="title">Leave Status</div>
                                <div className="text">{status}</div>
                              </li>
                              <li>
                                <div className="title">Supporting File</div>
                                <div className="text">
                                  {supporting_document != null
                                    ? supporting_document
                                    : "--"}
                                </div>
                              </li>
                            </ul>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>

                {/* <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Status{" "}
                        
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {employee_status?.map((employee_status, index) => {
                            const {
                              id,
                              employee,
                              status,
                              authorising_manager,
                              comments,
                              start_date,
                              end_date,
                              authorised_by,
                            } = employee_status;
                            if (employee == selectedEmployeeId) {
                              return (
                                <li key={id}>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a className="name">
                                        {authorising_manager}
                                        
                                      </a>
                                      <a style={{ fontWeight: "900" }}>
                                        {status == Number(status)
                                          ? "Active"
                                          : status}
                                      </a>
                                      <div>{comments}</div>
                                      <span className="time">
                                        {start_date} - {end_date}
                                      </span>
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
                </div> */}
              </div>
            </>
          )}
        </div>

        {/* /Profile Info Tab */}
        {/* Tasks Tab */}
        {/* <div className="tab-pane fade" id="emp_tasks">
          <div className="row">
            {taskList?.map((task, index) => {
              const {
                id,
                dateCreated,
                description,
                employee,
                manager,
                resident,
                taskPriority,
                taskStatus,
                taskType,
                taskTitle,
                timeAllocated,
              } = task;
              return (
                <Fragment key={id}>
                  {employee?.map((employee, index) => {
                    const { value, label, role, image } = employee;
                    if (value === selectedEmployeeId) {
                      return (
                        <>
                          <div
                            key={value}
                            className="col-lg-6 col-sm-12 col-md-6 col-xl-4"
                          >
                            <div className="card">
                              <div className="card-body">
                                <h4 className="project-title">
                                  <Link
                                    onClick={(e) => e.preventDefault()}
                                    to="#"
                                  >
                                    {taskTitle}
                                  </Link>
                                </h4>
                                <p className="text-muted">{description}</p>
                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">Task Type: </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        taskType == "Paid Task"
                                          ? "#55CE63"
                                          : "#ff9b44",
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {taskType ? taskType : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Task Priority:{" "}
                                  </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        (taskPriority?.label == "low" &&
                                          "red") ||
                                        (taskPriority?.label == "medium" &&
                                          "#ff9b44") ||
                                        (taskPriority?.label == "highest" &&
                                          "#55CE63"),
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {taskPriority ? taskPriority.label : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">Task Status: </span>
                                  <span
                                    style={{
                                      backgroundColor:
                                        (taskStatus?.label == "not-started" &&
                                          "red") ||
                                        (taskStatus?.label == "started" &&
                                          "#f20d91") ||
                                        (taskStatus?.label == "middle" &&
                                          "#ff9b44") ||
                                        (taskStatus?.label == "rounding-up" &&
                                          "#73AB00") ||
                                        (taskStatus?.label == "completed" &&
                                          "#55CE63"),
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {taskStatus
                                      ? (taskStatus?.label == "not-started" &&
                                          "Not started") ||
                                        (taskStatus?.label == "started" &&
                                          "Started") ||
                                        (taskStatus?.label == "middle" &&
                                          "Middle") ||
                                        (taskStatus?.label == "rounding-up" &&
                                          "Rounding up") ||
                                        (taskStatus?.label == "completed" &&
                                          "Completed")
                                      : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Date Created:{" "}
                                  </span>
                                  <span className="text-muted">
                                    {dateCreated ? dateCreated : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Task Manager:{" "}
                                  </span>
                                  <span className="text-muted">
                                    {manager ? manager : "--"}
                                  </span>{" "}
                                </small>

                                <small className="block text-ellipsis m-b-15">
                                  <span className="text-xs">
                                    Time Allocated:{" "}
                                  </span>
                                  <span className="text-muted">
                                    {timeAllocated
                                      ? timeAllocated + "hr"
                                      : "--"}
                                  </span>{" "}
                                </small>
                                <div className="project-members m-b-15">
                                  <div>Team:</div>
                                  <ul className="team-members">
                                    <li>
                                      <a data-bs-toggle="tooltip" title={label}>
                                        <img
                                          alt=""
                                          src={image ? image : DefaultImage}
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <p className="m-b-5">
                                  Progress
                                  <span
                                    className={
                                      (taskStatus?.label == "not-started"
                                        ? "float-end color-not-started"
                                        : undefined) ||
                                      (taskStatus?.label == "started"
                                        ? "float-end color-started"
                                        : undefined) ||
                                      (taskStatus?.label == "middle"
                                        ? "float-end color-middle"
                                        : undefined) ||
                                      (taskStatus?.label == "rounding-up"
                                        ? "float-end color-rounding-up"
                                        : undefined) ||
                                      (taskStatus?.label == "completed"
                                        ? "float-end color-completed"
                                        : undefined)
                                    }
                                  >
                                    {(taskStatus?.label == "not-started" &&
                                      "0%") ||
                                      (taskStatus?.label == "started" &&
                                        "25%") ||
                                      (taskStatus?.label == "middle" &&
                                        "50%") ||
                                      (taskStatus?.label == "rounding-up" &&
                                        "75%") ||
                                      (taskStatus?.label == "completed" &&
                                        "100%")}
                                  </span>
                                </p>
                                <div className="progress progress-xs mb-0">
                                  <div
                                    className={
                                      (taskStatus?.label == "not-started"
                                        ? " progress-bar bg-not-started"
                                        : undefined) ||
                                      (taskStatus?.label == "started"
                                        ? "progress-bar bg-started"
                                        : undefined) ||
                                      (taskStatus?.label == "middle"
                                        ? "progress-bar bg-middle"
                                        : undefined) ||
                                      (taskStatus?.label == "rounding-up"
                                        ? "progress-bar bg-rounding-up"
                                        : undefined) ||
                                      (taskStatus?.label == "completed"
                                        ? "progress-bar bg-completed"
                                        : undefined)
                                    }
                                    role="progressbar"
                                    data-bs-toggle="tooltip"
                                    title={
                                      (taskStatus?.label == "not-started"
                                        ? "0%"
                                        : undefined) ||
                                      (taskStatus?.label == "started"
                                        ? "25%"
                                        : undefined) ||
                                      (taskStatus?.label == "middle"
                                        ? "50%"
                                        : undefined) ||
                                      (taskStatus?.label == "rounding-up"
                                        ? "75%"
                                        : undefined) ||
                                      (taskStatus?.label == "completed" &&
                                        "100%")
                                    }
                                    style={{
                                      width:
                                        (taskStatus?.label == "not-started" &&
                                          "0%") ||
                                        (taskStatus?.label == "started" &&
                                          "25%") ||
                                        (taskStatus?.label == "middle" &&
                                          "50%") ||
                                        (taskStatus?.label == "rounding-up" &&
                                          "75%") ||
                                        (taskStatus?.label == "completed" &&
                                          "100%"),
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </Fragment>
              );
            })}
          </div>
        </div> */}
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
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Document{" "}
                        <a
                          onClick={() =>
                            setGlobalState("showEmployeeDocumentModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {employeeDocumentData?.map((experience, index) => {
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
                                        Document Number: {document_number}
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
                                              <i className="material-icons">
                                                more_vert
                                              </i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleFileDownload(
                                                    document_upload
                                                  )
                                                }
                                              >
                                                <i className="fa fa-download m-r-5" />{" "}
                                                Download
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleEditEmployeeDocument(
                                                    id,
                                                    index
                                                  )
                                                }
                                              >
                                                <i className="fa fa-pencil m-r-5" />{" "}
                                                Edit
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleDeleteEmployeeDocument(
                                                    id
                                                  )
                                                }
                                              >
                                                <i className="fa fa-trash-o m-r-5" />{" "}
                                                Delete
                                              </a>
                                            </div>
                                          </div>
                                        </span>
                                      </a>
                                      <div style={{ fontWeight: "900" }}>
                                        Document Name: {document_name}
                                      </div>
                                      <span>
                                        Date:{" "}
                                        {moment(issue_date).format(
                                          "DD MMM YYYY"
                                        )}{" "}
                                        -{" "}
                                        {expiry_date &&
                                          moment(expiry_date).format(
                                            "DD MMM YYYY"
                                          )}
                                      </span>
                                      <div>Status: {status}</div>
                                      <div>
                                        Verification:{" "}
                                        {verified === true
                                          ? "Varified"
                                          : "Not varified"}
                                      </div>
                                      <div>Document Type: {document_type}</div>
                                      <div>
                                        {document_upload &&
                                        regex.test(document_upload) ? (
                                          <img
                                            className="img-preview"
                                            src={document_upload}
                                            alt="Preview"
                                          />
                                        ) : !document_upload ? null : (
                                          <span className="files-icon">
                                            <i className="fa fa-file-pdf-o" />
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
        </div>
        {/* /Document Upload Tab */}
      </div>

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

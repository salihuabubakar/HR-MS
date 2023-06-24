import React, { useState, useEffect, useReducer, useMemo } from "react";
import moment from "moment";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  useResidentSchoolFetching,
  useResidentEducationFetching,
  useResidentGpFetching,
  useResidentSolicitorFetching,
  useResidentSocialWorkerFetching,
  useGpTypeFetching,
  useResidentDocumentFetching
} from "../../utils/employeeCustomFetchHook";
import {
  add_update_delete_resident_gp,
  add_update_delete_resident_solicitor,
  add_update_delete_resident_document,
  add_update_delete_resident_school,
  add_update_delete_resident_education
} from "../../utils/sendToServer";
import AddResidentGpModal from "../../_components/modelbox/AddResidentGpModal";
import AddResidentSolicitorModal from "../../_components/modelbox/AddResidentSolicitorModal";
import AddResidentSchoolModal from "../../_components/modelbox/AddResidentSchoolModal";
import AddResidentEducationModal from "../../_components/modelbox/AddResidentEducationModal";
import AddResidentDocumentModal from "../../_components/modelbox/AddResidentDocumentModal";
import { Wrapper } from "./style";
import "../Employees/Employees/style.css";

const Profile = ({
  getSelectedData,
  DefaultImage,
  isSelectedLoading,
  getResidentId,
}) => {
  const [gpError] = useGlobalState("gpError");
  const [solicitorError] = useGlobalState("solicitorError");
  const [residentdocumentError] = useGlobalState("residentdocumentError");
  const [schoolError] = useGlobalState("schoolError");
  const [educationError] = useGlobalState("educationError");
  const clearErrorMessage = () => {
    setGlobalState("gpError", "");
    setGlobalState("solicitorError", "");
    setGlobalState("residentdocumentError", "");
    setGlobalState("schoolError", "");
    setGlobalState("educationError");
  };
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

  // Resident GP
  const [residentGpState, dispatchResidentGp] = useReducer(
    add_update_delete_resident_gp,
    []
  );
  const { residentGpData, isResidentGpDataLoading, residentGpError } =
    useResidentGpFetching();
  const [getResidentGpId, setGetResidentGpId] = useState();
  const [residentGpIndexToEdit, setResidentGpIndexToEdit] = useState();
  const [showResidentGpModal] = useGlobalState("showResidentGpModal");
  const [deleteResidentGpModal] = useGlobalState("deleteResidentGpModal");

  const handleEditResidentGp = (id, index) => {
    setGetResidentGpId(id);
    setResidentGpIndexToEdit(index);
    setGlobalState("selectedResidentGp", residentGpData);
    setGlobalState("showResidentGpModal", true);
  };

  const handleDeleteResidentGp = (id) => {
    setGetResidentGpId(id);
    setGlobalState("deleteResidentGpModal", true);
  };

  useEffect(() => {
    if (!showResidentGpModal) {
      setGlobalState("selectedResidentGp", "");
    }
  }, [showResidentGpModal]);

  // Resident Solicitor
  const [residentSolicitorState, dispatchResidentSolicitor] = useReducer(
    add_update_delete_resident_solicitor,
    []
  );
  const {
    residentSolicitorData,
    isResidentSolicitorDataLoading,
    residentSolicitorError,
  } = useResidentSolicitorFetching();
  const [getResidentSolicitorId, setGetResidentSolicitorId] = useState();
  const [residentSolicitorIndexToEdit, setResidentSolicitorIndexToEdit] =
    useState();
  const [showResidentSolicitorModal] = useGlobalState(
    "showResidentSolicitorModal"
  );
  const [deleteResidentSolicitorModal] = useGlobalState(
    "deleteResidentSolicitorModal"
  );

  const handleEditResidentSolicitor = (id, index) => {
    setGetResidentSolicitorId(id);
    setResidentSolicitorIndexToEdit(index);
    setGlobalState("selectedResidentSolicitor", residentSolicitorData);
    setGlobalState("showResidentSolicitorModal", true);
  };

  const handleDeleteResidentSolicitor = (id) => {
    setGetResidentSolicitorId(id);
    setGlobalState("deleteResidentSolicitorModal", true);
  };

  useEffect(() => {
    if (!showResidentSolicitorModal) {
      setGlobalState("selectedResidentSolicitor", "");
    }
  }, [showResidentSolicitorModal]);

  // Document
const [residentDocumentState, dispatchResidentDocument] = useReducer(
  add_update_delete_resident_document,
  []
);
const {
  residentDocumentData,
  isResidentDocumentDataLoading,
  residentDocumentError,
} = useResidentDocumentFetching();
const [getResidentDocumentId, setGetResidentDocumentId] = useState();
const [residentDocumentIndexToEdit, setResidentDocumentIndexToEdit] =
  useState();
const [showResidentDocumentModal] = useGlobalState("showResidentDocumentModal");
const [deleteResidentDocumentModal] = useGlobalState(
  "deleteResidentDocumentModal"
);

const handleEditResidentDocument = (id, index) => {
  setGetResidentDocumentId(id);
  setResidentDocumentIndexToEdit(index);
  setGlobalState("selectedResidentDocument", residentDocumentData);
  setGlobalState("showResidentDocumentModal", true);
};

const handleDeleteResidentDocument = (id) => {
  setGetResidentDocumentId(id);
  setGlobalState("deleteResidentDocumentModal", true);
};

useEffect(() => {
  if (!showResidentDocumentModal) {
    setGlobalState("selectedResidentDocument", "");
  }
}, [showResidentDocumentModal]);

// School
const [residentSchoolState, dispatchResidentSchool] = useReducer(
  add_update_delete_resident_school,
  []
);
const {
  residentSchoolData,
  isResidentSchoolDataLoading,
  residentSchoolError,
} = useResidentSchoolFetching();
const [getResidentSchoolId, setGetResidentSchoolId] = useState();
const [residentSchoolIndexToEdit, setResidentSchoolIndexToEdit] =
  useState();
const [showResidentSchoolModal] = useGlobalState("showResidentSchoolModal");
const [deleteResidentSchoolModal] = useGlobalState(
  "deleteResidentSchoolModal"
);

const handleEditResidentSchool = (id, index) => {
  setGetResidentSchoolId(id);
  setResidentSchoolIndexToEdit(index);
  setGlobalState("selectedResidentSchool", residentSchoolData);
  setGlobalState("showResidentSchoolModal", true);
};

const handleDeleteResidentSchool = (id) => {
  setGetResidentSchoolId(id);
  setGlobalState("deleteResidentSchoolModal", true);
};

useEffect(() => {
  if (!showResidentSchoolModal) {
    setGlobalState("selectedResidentSchool", "");
  }
}, [showResidentSchoolModal]);

// Education
const [residentEducationState, dispatchResidentEducation] = useReducer(
  add_update_delete_resident_education,
  []
);
const {
  residentEducationData,
  isResidentEducationDataLoading,
  residentEducationError,
} = useResidentEducationFetching();
const [getResidentEducationId, setGetResidentEducationId] = useState();
const [residentEducationIndexToEdit, setResidentEducationIndexToEdit] =
  useState();
const [showResidentEducationModal] = useGlobalState("showResidentEducationModal");
const [deleteResidentEducationModal] = useGlobalState(
  "deleteResidentEducationModal"
);

const handleEditResidentEducation = (id, index) => {
  setGetResidentEducationId(id);
  setResidentEducationIndexToEdit(index);
  setGlobalState("selectedResidentEducation", residentEducationData);
  setGlobalState("showResidentEducationModal", true);
};

const handleDeleteResidentEducation = (id) => {
  setGetResidentEducationId(id);
  setGlobalState("deleteResidentEducationModal", true);
};

useEffect(() => {
  if (!showResidentEducationModal) {
    setGlobalState("selectedResidentEducation", "");
  }
}, [showResidentEducationModal]);




  const selectedResidentId = getSelectedData?.id;
  const first_name = getSelectedData?.first_name;
  const middle_name = getSelectedData?.middle_name;
  const last_name = getSelectedData?.last_name;
  const photo = getSelectedData?.photo;
  const address = getSelectedData?.address;
  const phone_number = getSelectedData?.phone_number;
  const email = getSelectedData?.email;
  const date_of_birth = getSelectedData?.date_of_birth;
  const gender = getSelectedData?.gender;
  const nationality = getSelectedData?.nationality;
  const height = getSelectedData?.height;
  const weight = getSelectedData?.weight;
  const eye_colour = getSelectedData?.eye_colour;
  const hair_colour = getSelectedData?.hair_colour;
  const glasses = getSelectedData?.glasses;
  const tattoos = getSelectedData?.tattoos;
  const piercings = getSelectedData?.piercings;
  const Subject_child_protection = getSelectedData?.subject_protection;
  const legal_status = getSelectedData?.legal_status;
  const Any_comment = getSelectedData?.Any_comment;
  const key_worker = getSelectedData?.key_worker;
  const resident_education = getSelectedData?.resident_education;
  const resident_solicitor = getSelectedData?.resident_solicitor;
  const resident_gp = getSelectedData?.resident_gp;
  const resident_social_worker = getSelectedData?.resident_social_worker;
  const resident_referral = getSelectedData?.resident_referral;
  const resident_appointment = getSelectedData?.resident_appointment;
  const resident_medication = getSelectedData?.resident_medication;
  const resident_medical_condition =
    getSelectedData?.resident_medical_condition;
  const resident_school = getSelectedData?.resident_school;
  const resident_school_timetable = getSelectedData?.resident_school_timetable;
  const resident_school_report = getSelectedData?.resident_school_report;
  const resident_document = getSelectedData?.resident_document;

  const { residentSocialWorkerData } = useResidentSocialWorkerFetching();
  const { gpTypeData } = useGpTypeFetching();

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
                  {isSelectedLoading ? (
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
                    {isSelectedLoading ? (
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
                            <div className="small doj text-muted">
                              Height: {height ? height : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Weight: {weight ? weight : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Eye Colour: {eye_colour ? eye_colour : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Hair Colour: {hair_colour ? hair_colour : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Glasses: {glasses ? glasses : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Tattoos: {tattoos ? tattoos : "--"}
                            </div>
                            <div className="small doj text-muted">
                              Piercing: {piercings ? piercings : "--"}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">
                                <a>{address ? address : "--"}</a>
                              </div>
                            </li>
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
                              <div className="title">Nationality:</div>
                              <div className="text">
                                {nationality ? nationality : "--"}
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
          {isSelectedLoading ? (
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
                        Social Worker{" "}
                        <a
                          className="edit-icon"
                          // onClick={() =>
                          //   setGlobalState("showEmployeeEmergencyModal", true)
                          // }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Social Worker</th>
                              <th>Status</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resident_social_worker?.length > 0 ? (
                              resident_social_worker?.map((worker, index) => {
                                const {
                                  id,
                                  resident,
                                  social_worker,
                                  status,
                                  start_date,
                                  end_date,
                                  description,
                                } = worker;
                                if (resident == selectedResidentId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>
                                        {residentSocialWorkerData?.map(
                                          (rSw) => {
                                            if (rSw.id === social_worker)
                                              return `${rSw.first_name} ${rSw.middle_name} ${rSw.last_name}`;
                                          }
                                        )}
                                      </td>
                                      <td>{status}</td>
                                      <td>{start_date}</td>
                                      <td>{end_date}</td>
                                      <td data-title={description}>
                                        Hover to show
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
                                            // onClick={() =>
                                            //   handleEditEmployeeEmergency(
                                            //     id,
                                            //     index
                                            //   )
                                            // }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleDeleteEmployeeEmergency(
                                            //     id
                                            //   )
                                            // }
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
                                  No Social worker attach to this resident
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
                        Resident Referral{" "}
                        <a
                          className="edit-icon"
                          // onClick={() =>
                          //   setGlobalState("showEmployeeAddressModal", true)
                          // }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Document</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resident_referral?.length > 0 ? (
                              resident_referral?.map((address, index) => {
                                const {
                                  id,
                                  resident,
                                  referral_name,
                                  referral_date,
                                  referral_description,
                                  referral_document,
                                } = address;
                                if (resident == selectedResidentId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>{referral_name}</td>
                                      <td>{referral_date}</td>
                                      <td data-title={referral_description}>
                                        Hover to show
                                      </td>
                                      <td>
                                        {referral_document &&
                                        regex.test(referral_document) ? (
                                          <img
                                            className="img-preview"
                                            src={referral_document}
                                            alt="Preview"
                                          />
                                        ) : !referral_document ? (
                                          "--"
                                        ) : (
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
                                            // onClick={() =>
                                            //   handleEditEmployeeAddress(
                                            //     id,
                                            //     index
                                            //   )
                                            // }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleDeleteEmployeeAddress(id)
                                            // }
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
                                <td>No referrals attach to this resident</td>
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
                        Resident Solicitor{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {solicitorError?.length > 0 && (
                            <>
                              Error: {solicitorError}
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
                          onClick={() =>
                            setGlobalState("showResidentSolicitorModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <Wrapper>
                        {residentSolicitorData?.length > 0 ? (
                          residentSolicitorData.map((solicit, index) => {
                            const {
                              id,
                              resident,
                              solicitor_name,
                              solicitor_description,
                              solicitor_address,
                              solicitor_status,
                              solicitor_postcode,
                              solicitor_phone_number,
                              solicitor_email,
                              solicitor_website,
                            } = solicit;
                            if (resident === selectedResidentId) {
                              return (
                                <div key={id} className="card plain-card">
                                  <div className="text">
                                    Name: <span>{solicitor_name}</span>
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
                                              handleEditResidentSolicitor(
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
                                              handleDeleteResidentSolicitor(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="text">
                                    Email: <span>{solicitor_email}</span>
                                  </div>
                                  <div className="text">
                                    Website:{" "}
                                    <span>
                                      <a
                                        target={"_blank"}
                                        href={solicitor_website}
                                      >
                                        {solicitor_website}
                                      </a>
                                    </span>
                                  </div>
                                  <div className="text">
                                    Phone: <span>{solicitor_phone_number}</span>
                                  </div>
                                  <div className="text">
                                    Address: <span>{solicitor_address}</span>
                                  </div>
                                  <div className="text">
                                    Status: <span>{solicitor_status}</span>
                                  </div>
                                  <div className="text">
                                    Post Code: <span>{solicitor_postcode}</span>
                                  </div>
                                  <div className="text">
                                    Description:{" "}
                                    <span className="c">
                                      {solicitor_description}
                                    </span>
                                  </div>
                                </div>
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

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Resident GP{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {gpError?.length > 0 && (
                            <>
                              Error: {gpError}
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
                          onClick={() =>
                            setGlobalState("showResidentGpModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <Wrapper>
                        {residentGpData?.length > 0 ? (
                          residentGpData.map((gp, index) => {
                            const {
                              id,
                              resident,
                              gp_practice_name,
                              gp_practice_description,
                              gp_practice_address,
                              gp_practice_status,
                              gp_practice_postcode,
                              gp_practice_phone_number,
                              gp_practice_email,
                              gp_practice_website,
                              gp_practice_type,
                            } = gp;
                            if (resident === selectedResidentId) {
                              return (
                                <div key={id} className="card plain-card">
                                  <div className="text">
                                    Name: <span>{gp_practice_name}</span>
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
                                              handleEditResidentGp(id, index)
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleDeleteResidentGp(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="text">
                                    Email: <span>{gp_practice_email}</span>
                                  </div>
                                  <div className="text">
                                    Website:{" "}
                                    <span>
                                      <a
                                        target={"_blank"}
                                        href={gp_practice_website}
                                      >
                                        {gp_practice_website}
                                      </a>
                                    </span>
                                  </div>
                                  <div className="text">
                                    Phone:{" "}
                                    <span>{gp_practice_phone_number}</span>
                                  </div>
                                  <div className="text">
                                    Address: <span>{gp_practice_address}</span>
                                  </div>
                                  <div className="text">
                                    Status: <span>{gp_practice_status}</span>
                                  </div>
                                  <div className="text">
                                    Type:{" "}
                                    <span>
                                      {gpTypeData?.map((_gp) => {
                                        if (_gp.id === gp_practice_type)
                                          return _gp.gp_type_name;
                                      })}
                                    </span>
                                  </div>
                                  <div className="text">
                                    Post Code:{" "}
                                    <span>{gp_practice_postcode}</span>
                                  </div>
                                  <div className="text">
                                    Description:{" "}
                                    <span className="c">
                                      {gp_practice_description}
                                    </span>
                                  </div>
                                </div>
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
                <div className="col-md-12 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Resident Appointment{" "}
                        <a
                          className="edit-icon"
                          // onClick={() =>
                          //   setGlobalState("showEmployeeAddressModal", true)
                          // }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Time</th>
                              <th>Date</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resident_appointment?.length > 0 ? (
                              resident_appointment?.map((app, index) => {
                                const {
                                  id,
                                  resident,
                                  appointment_name,
                                  appointment_time,
                                  appointment_date,
                                  appointment_description,
                                } = app;
                                if (resident == selectedResidentId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>{appointment_name}</td>
                                      <td>{appointment_time}</td>
                                      <td>{appointment_date}</td>
                                      <td data-title={appointment_description}>
                                        Hover to show
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
                                            // onClick={() =>
                                            //   handleEditEmployeeAddress(
                                            //     id,
                                            //     index
                                            //   )
                                            // }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleDeleteEmployeeAddress(id)
                                            // }
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
                                <td>No referrals attach to this resident</td>
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

          {isSelectedLoading ? (
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
                        Resident Education{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {educationError?.length > 0 && (
                            <>
                              Error: {educationError}
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
                          onClick={() =>
                            setGlobalState("showResidentEducationModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {residentEducationData?.map((edu, index) => {
                            const {
                              id,
                              resident,
                              qualification_name,
                              institute_name,
                              start_date,
                              end_date,
                            } = edu;
                            if (resident == selectedResidentId) {
                              return (
                                <li key={id}>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a className="name">
                                        Institute Name: {institute_name}
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
                                                  handleEditResidentEducation(
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
                                                  handleDeleteResidentEducation(
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
                                        Qualification: {qualification_name}
                                      </div>
                                      <div>
                                        Start Date: {start_date} - End Date:{" "}
                                        {end_date}
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
                    <div className="card-body">
                      <h3 className="card-title">
                        Resident School{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {schoolError?.length > 0 && (
                            <>
                              Error: {schoolError}
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
                          onClick={() =>
                            setGlobalState("showResidentSchoolModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          {residentSchoolData?.map((schl, index) => {
                            const {
                              id,
                              resident,
                              status,
                              school,
                              year,
                              grade,
                            } = schl;
                            if (resident == selectedResidentId) {
                              return (
                                <li key={id}>
                                  <div className="experience-user">
                                    <div className="before-circle" />
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a className="name">
                                        School: <span>{school}</span>
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
                                                  handleEditResidentSchool(
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
                                                  handleDeleteResidentSchool(id)
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
                                        Status: {status}
                                      </div>
                                      <div>Year: {year}</div>
                                      <div>Grade: {grade}</div>
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

          {isSelectedLoading ? (
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
                        Resident School Timetable{" "}
                        <a
                          className="edit-icon"
                          // onClick={() =>
                          //   setGlobalState("showEmployeeAddressModal", true)
                          // }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>School</th>
                              <th>Year</th>
                              <th>Timetable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resident_school_timetable?.length > 0 ? (
                              resident_school_timetable?.map((time, index) => {
                                const {
                                  id,
                                  resident,
                                  school,
                                  year,
                                  timetable,
                                } = time;
                                if (resident == selectedResidentId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>
                                        {residentSchoolData?.map((schl) => {
                                          if (schl.id === school)
                                            return schl.school;
                                        })}
                                      </td>
                                      <td>{year}</td>
                                      <td>
                                        {timetable && regex.test(timetable) ? (
                                          <img
                                            className="img-preview"
                                            src={timetable}
                                            alt="Preview"
                                          />
                                        ) : !timetable ? (
                                          "--"
                                        ) : (
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
                                              handleFileDownload(timetable)
                                            }
                                          >
                                            <i className="fa fa-download m-r-5" />{" "}
                                            Download
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleEditEmployeeAddress(
                                            //     id,
                                            //     index
                                            //   )
                                            // }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleDeleteEmployeeAddress(id)
                                            // }
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
                                <td>No timetable attach to this resident</td>
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
                        Resident School Report{" "}
                        <a
                          className="edit-icon"
                          // onClick={() =>
                          //   setGlobalState("showEmployeeAddressModal", true)
                          // }
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-nowrap">
                          <thead>
                            <tr>
                              <th>School</th>
                              <th>Year</th>
                              <th>Timetable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resident_school_report?.length > 0 ? (
                              resident_school_report?.map((time, index) => {
                                const { id, resident, school, year, report } =
                                  time;
                                if (resident == selectedResidentId) {
                                  return (
                                    <tr style={{ height: "90px" }} key={id}>
                                      <td>
                                        {residentSchoolData?.map((schl) => {
                                          if (schl.id === school)
                                            return schl.school;
                                        })}
                                      </td>
                                      <td>{year}</td>
                                      <td>
                                        {report && regex.test(report) ? (
                                          <img
                                            className="img-preview"
                                            src={report}
                                            alt="Preview"
                                          />
                                        ) : !report ? (
                                          "--"
                                        ) : (
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
                                              handleFileDownload(report)
                                            }
                                          >
                                            <i className="fa fa-download m-r-5" />{" "}
                                            Download
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleEditEmployeeAddress(
                                            //     id,
                                            //     index
                                            //   )
                                            // }
                                          >
                                            <i className="fa fa-pencil m-r-5" />{" "}
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            // onClick={() =>
                                            //   handleDeleteEmployeeAddress(id)
                                            // }
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
                                <td>No report attach to this resident</td>
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
                      <h3 className="card-title">Resident Medical Condition</h3>
                      <Wrapper>
                        {resident_medical_condition?.length > 0 ? (
                          resident_medical_condition.map((med, index) => {
                            const {
                              id,
                              resident,
                              medical_condition_name,
                              medical_condition_description,
                              medical_condition_state,
                              medical_condition_document,
                              medical_condition_start_date,
                              medical_condition_end_date,
                            } = med;
                            if (resident === selectedResidentId) {
                              return (
                                <div key={id} className="card plain-card">
                                  <div className="text">
                                    Name: <span>{medical_condition_name}</span>
                                  </div>
                                  <div className="text">
                                    Start Date:{" "}
                                    <span>{medical_condition_start_date}</span>
                                  </div>
                                  <div className="text">
                                    End Date:{" "}
                                    <span>{medical_condition_end_date}</span>
                                  </div>
                                  <div className="text">
                                    Status:{" "}
                                    <span>{medical_condition_state}</span>
                                  </div>
                                  <div className="text">
                                    Description:{" "}
                                    <span className="c">
                                      {medical_condition_description}
                                    </span>
                                  </div>
                                  <div className="text">
                                    Document:{" "}
                                    <span>
                                      {medical_condition_document &&
                                      regex.test(medical_condition_document) ? (
                                        <img
                                          className="img-preview"
                                          src={medical_condition_document}
                                          alt="Preview"
                                        />
                                      ) : !medical_condition_document ? (
                                        "--"
                                      ) : (
                                        <span className="files-icon">
                                          <i className="fa fa-file-pdf-o" />
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>
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

                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Resident Medication</h3>
                      <Wrapper>
                        {resident_medication?.length > 0 ? (
                          resident_medication.map((med, index) => {
                            const {
                              id,
                              resident,
                              medication_name,
                              medication_description,
                              gp,
                              medication_state,
                              medication_document,
                              medication_prescription_date,
                              medication_start_date,
                              medication_end_date,
                              medication_dosage,
                              medication_frequency,
                            } = med;
                            if (resident === selectedResidentId) {
                              return (
                                <div key={id} className="card plain-card">
                                  <div className="text">
                                    Name: <span>{medication_name}</span>
                                  </div>
                                  <div className="text">
                                    Start Date:{" "}
                                    <span>{medication_start_date}</span>
                                  </div>
                                  <div className="text">
                                    End Date: <span>{medication_end_date}</span>
                                  </div>
                                  <div className="text">
                                    Prescription Date:{" "}
                                    <span>{medication_prescription_date}</span>
                                  </div>
                                  <div className="text">
                                    GP:{" "}
                                    <span>
                                      {residentGpData?.map((rGp) => {
                                        if (rGp.id === gp)
                                          return rGp.gp_practice_name;
                                      })}
                                    </span>
                                  </div>
                                  <div className="text">
                                    Dosage: <span>{medication_dosage}</span>
                                  </div>
                                  <div className="text">
                                    Frequency:{" "}
                                    <span>{medication_frequency}</span>
                                  </div>
                                  <div className="text">
                                    Status: <span>{medication_state}</span>
                                  </div>
                                  <div className="text">
                                    Description:{" "}
                                    <span className="c">
                                      {medication_description}
                                    </span>
                                  </div>
                                  <div className="text">
                                    Document:{" "}
                                    <span>
                                      {medication_document &&
                                      regex.test(medication_document) ? (
                                        <img
                                          className="img-preview"
                                          src={medication_document}
                                          alt="Preview"
                                        />
                                      ) : !medication_document ? (
                                        "--"
                                      ) : (
                                        <span className="files-icon">
                                          <i className="fa fa-file-pdf-o" />
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>
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
          {isSelectedLoading ? (
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
                    <div className="card-body">
                      <h3 className="card-title">
                        Document{" "}
                        <span style={{ color: "red", fontSize: "0.7rem" }}>
                          {residentdocumentError?.length > 0 && (
                            <>
                              Error: {residentdocumentError}
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
                          onClick={() =>
                            setGlobalState("showResidentDocumentModal", true)
                          }
                          className="edit-icon"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </h3>
                      <Wrapper>
                        {residentDocumentData?.length > 0 ? (
                          residentDocumentData.map((doc, index) => {
                            const {
                              id,
                              resident,
                              document_name,
                              document_number,
                              issue_date,
                              expiry_date,
                              document_type,
                              document,
                              status,
                              verified,
                            } = doc;
                            if (resident === selectedResidentId) {
                              return (
                                <div key={id} className="card">
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
                                              handleFileDownload(document)
                                            }
                                          >
                                            <i className="fa fa-download m-r-5" />{" "}
                                            Download
                                          </a>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditResidentDocument(
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
                                              handleDeleteResidentDocument(id)
                                            }
                                          >
                                            <i className="fa fa-trash-o m-r-5" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </span>
                                  </a>
                                  <div className="document-name">
                                    Document Name: {document_name}
                                  </div>
                                  <span>
                                    Date:{" "}
                                    {moment(issue_date).format("DD MMM YYYY")} -{" "}
                                    {expiry_date &&
                                      moment(expiry_date).format("DD MMM YYYY")}
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
                                    {document && regex.test(document) ? (
                                      <img
                                        className="img-preview"
                                        src={document}
                                        alt="Preview"
                                      />
                                    ) : !document ? null : (
                                      <span className="files-icon">
                                        <i className="fa fa-file-pdf-o" />
                                      </span>
                                    )}
                                  </div>
                                </div>
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

      {/* Resident Gp */}
      {showResidentGpModal && (
        <AddResidentGpModal
          id={getResidentGpId}
          dispatchResidentGp={dispatchResidentGp}
          residentGpIndexToEdit={residentGpIndexToEdit}
          resident={getResidentId}
        />
      )}
      {deleteResidentGpModal && (
        <DeleteModal
          deleteAction={dispatchResidentGp}
          iDToDelete={getResidentGpId}
          modalTitle={"Resident GP"}
        />
      )}

      {/* Resident Solicitor */}
      {showResidentSolicitorModal && (
        <AddResidentSolicitorModal
          id={getResidentSolicitorId}
          dispatchResidentSolicitor={dispatchResidentSolicitor}
          residentSolicitorIndexToEdit={residentSolicitorIndexToEdit}
          resident={getResidentId}
        />
      )}
      {deleteResidentSolicitorModal && (
        <DeleteModal
          deleteAction={dispatchResidentSolicitor}
          iDToDelete={getResidentSolicitorId}
          modalTitle={"Resident Solicitor"}
        />
      )}

      {/* Resident School */}
      {showResidentSchoolModal && (
        <AddResidentSchoolModal
          id={getResidentSchoolId}
          dispatchResidentSchool={dispatchResidentSchool}
          residentSchoolIndexToEdit={residentSchoolIndexToEdit}
          resident={getResidentId}
        />
      )}
      {deleteResidentSchoolModal && (
        <DeleteModal
          deleteAction={dispatchResidentSchool}
          iDToDelete={getResidentSchoolId}
          modalTitle={"Resident School"}
        />
      )}

      {/* Resident Education */}
      {showResidentEducationModal && (
        <AddResidentEducationModal
          id={getResidentEducationId}
          dispatchResidentEducation={dispatchResidentEducation}
          residentEducationIndexToEdit={residentEducationIndexToEdit}
          resident={getResidentId}
        />
      )}
      {deleteResidentEducationModal && (
        <DeleteModal
          deleteAction={dispatchResidentEducation}
          iDToDelete={getResidentEducationId}
          modalTitle={"Resident Education"}
        />
      )}

      {/* Resident Document */}
      {showResidentDocumentModal && (
        <AddResidentDocumentModal
          id={getResidentDocumentId}
          dispatchResidentDocument={dispatchResidentDocument}
          residentDocumentIndexToEdit={residentDocumentIndexToEdit}
          resident={getResidentId}
        />
      )}
      {deleteResidentDocumentModal && (
        <DeleteModal
          deleteAction={dispatchResidentDocument}
          iDToDelete={getResidentDocumentId}
          modalTitle={"Resident Document"}
        />
      )}
    </>
  );
};
export default Profile;

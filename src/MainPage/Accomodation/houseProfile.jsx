import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { useLocation } from "react-router-dom";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import {
  initHouse,
  savedHouseReducer,
  initFileUpload,
  savedFileUploadReducer,
} from "../../utils/localStorage";
import HouseImg from "../../assets/img/house.png";
import DefaultImage from "../../assets/img/placeholder.jpg";
import "../../_components/style.css";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import AddFileUploadModal from "../../_components/modelbox/AddFileUploadModal";

const houseProfile = () => {

  const [deleteModal] = useGlobalState("deleteModal");
  const [showFileUploadModal] = useGlobalState("showFileUploadModal");

  const location = useLocation();
  const houseID = location?.state?.id;
  const serviceWorkerIndex = location?.state?.index;
  const [houseDetails] = useReducer(savedHouseReducer, [], initHouse);
  const [files, dispatchFiles] = useReducer(
    savedFileUploadReducer,
    [],
    initFileUpload
  );

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
  const totalResidents = selectedHouse?.resident;

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

  const selectedHouseDocument = filesList?.find((file) => file?.uniqueID === houseID);
  const selectedHouseDocumentId = selectedHouseDocument?.uniqueID;
  
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [fileUploadIndex, setFileUploadIndex] = useState(0);
  const [fileUploadfieldIndex, setFileUploadfieldIndex] = useState(0);

  const handleOpeneFileUpload = () => {
    setGlobalState("showFileUploadModal", true);
  };

  const handleFileUploadEdit = (fieldsIndex, index) => {
    setGlobalState("showFileUploadModal", true);
    setGlobalState("selectedFileUpload", files);
    setFileUploadIndex(index);
    setFileUploadfieldIndex(fieldsIndex);
  };

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
                        <li>
                          <div className="title">Number of residents</div>
                          <div className="text">{totalResidents?.length ? totalResidents?.length : "0"}</div>
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
                      Residents
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
                      <h3 className="card-title">Residents</h3>
                      {totalResidents
                        ? totalResidents?.map((resident, index) => {
                            const { label, value, image } = resident;
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
                        : "Ops! No residents in the house."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Profile Info Tab */}
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
                          selectedHouseDocumentId === houseID
                            ? filesList?.map((file, index) => {
                                const { id, inputFields, uniqueID } = file;
                                if (uniqueID == houseID) {
                                  return (
                                    <React.Fragment key={id}>
                                      {inputFields?.map(
                                        (fields, fieldsIndex) => {
                                          const {
                                            documentName,
                                            documentNumber,
                                            documentType,
                                            expiryDate,
                                            issueDate,
                                            fileDetails,
                                          } = fields;

                                          const handleFileDownload = () => {
                                            const dataUrlParts =
                                              fileDetails.data.split(",");
                                            const base64Data = dataUrlParts[1];
                                            const mimeType = dataUrlParts[0]
                                              .split(":")[1]
                                              .split(";")[0];

                                            const byteCharacters =
                                              atob(base64Data);
                                            const byteNumbers = new Array(
                                              byteCharacters.length
                                            );

                                            for (
                                              let i = 0;
                                              i < byteCharacters.length;
                                              i++
                                            ) {
                                              byteNumbers[i] =
                                                byteCharacters.charCodeAt(i);
                                            }

                                            const byteArray = new Uint8Array(
                                              byteNumbers
                                            );
                                            const blob = new Blob([byteArray], {
                                              type: mimeType,
                                            });

                                            const url =
                                              URL.createObjectURL(blob);
                                            const a =
                                              document.createElement("a");
                                            a.href = url;
                                            a.download = fileDetails.name;
                                            document.body.appendChild(a);
                                            a.click();
                                            document.body.removeChild(a);
                                            URL.revokeObjectURL(url);
                                          };

                                          return (
                                            <li key={fieldsIndex}>
                                              <div className="experience-user">
                                                <div className="before-circle" />
                                              </div>
                                              <div className="experience-content">
                                                <div className="timeline-content">
                                                  <a className="name">
                                                    {documentName}
                                                    <div className="dropdown profile-action">
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
                                                            handleFileUploadEdit(
                                                              fieldsIndex,
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
                                                            handleFileDownload(
                                                              index
                                                            )
                                                          }
                                                        >
                                                          <i className="fa fa-download m-r-5" />{" "}
                                                          Download
                                                        </a>
                                                      </div>
                                                    </div>
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
                                        }
                                      )}
                                    </React.Fragment>
                                  );
                                }
                              })
                            : "No uploaded file(s) yet"}
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
        {showFileUploadModal && (
          <>
            <AddFileUploadModal
              dispatchFiles={dispatchFiles}
              fileUploadIndex={fileUploadIndex}
              uniqueID={houseID}
              fileUploadfieldIndex={fileUploadfieldIndex}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default houseProfile;

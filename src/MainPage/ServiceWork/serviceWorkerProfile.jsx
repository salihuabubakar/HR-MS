import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Header from "../../initialpage/Sidebar/header";
import Sidebar from '../../initialpage/Sidebar/sidebar';
import {Avatar_02,Avatar_05,Avatar_09,Avatar_10,Avatar_16 } from '../../Entryfile/imagepath'
import SmileImg from "../../assets/img/smile.png";
import { useLocation } from "react-router-dom";
import DefaultImage from "../../assets/img/placeholder.jpg";
import { useGlobalState, setGlobalState } from '../../context/GlobalState';
import {
  initResident,
  savedResidentReducer,
  initFileUpload,
  savedFileUploadReducer,
} from "../../utils/localStorage";
import DeleteModal from '../../_components/modelbox/DeleteModal';
import AddFileUploadModal from '../../_components/modelbox/AddFileUploadModal';

const serviceWorkerProfile = () => {
  const [deleteModal] = useGlobalState("deleteModal");
  const [showFileUploadModal] = useGlobalState("showFileUploadModal");
  const location = useLocation();
  const serviceWorkerId = location?.state?.id;
  const serviceWorkerIndex = location?.state?.index;
  const [residentAcct] = useReducer(
    savedResidentReducer,
    [],
    initResident
  );

  useEffect(() => {
    localStorage.setItem("resident", JSON.stringify(residentAcct));
  }, [residentAcct]);

  const [resident, setResident] = useState();
  useEffect(() => {
    setResident(residentAcct);
  }, [residentAcct]);

  const selectedResident = resident?.find(
    (resident) => resident?.id === serviceWorkerId
  );

  const residentId = selectedResident?.id;
  const image = selectedResident?.image;
  const residentName = selectedResident?.residentName;

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

  const selectedResidentDocument = filesList?.find(
    (file) => file?.uniqueID === serviceWorkerId
  );
  const selectedResidentDocumentId = selectedResidentDocument?.uniqueID;

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

  const handleFileDelete = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteModal", true);
  };

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
          <title>Resident Profile - Peepal Tree HRMS</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Resident Profile</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/servicework/service-worker">Residents</Link>
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
                              {residentName}
                            </h3>
                            <h6 className="text-muted">UI/UX Design Team</h6>
                            <small className="text-muted">Web Designer</small>
                            <div className="staff-id">
                              Employee ID : {residentId}
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
                                {/* <a href="">{phoneNo}</a> */}
                              </div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                {/* <a href="">{email}</a> */}
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              {/* <div className="text">{dOB}</div> */}
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              {/* <div className="text">{address}</div> */}
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
                      {/* <a onClick={handleEditAcct} className="edit-icon">
                        <i className="fa fa-pencil" />
                      </a> */}
                      <a className="edit-icon">
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
                      <ul className="personal-info">
                        <li>
                          <div className="title">Passport No.</div>
                          <div className="text">{"passPortNo"}</div>
                        </li>
                        <li>
                          <div className="title">Passport Exp Date.</div>
                          <div className="text">{"passportExpiryDate"}</div>
                        </li>
                        <li>
                          <div className="title">Tel</div>
                          <div className="text">
                            <a href="">{"phoneNo"}</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Nationality</div>
                          <div className="text">{"country"}</div>
                        </li>
                        <li>
                          <div className="title">Religion</div>
                          <div className="text">{"religion"}</div>
                        </li>
                        <li>
                          <div className="title">Marital status</div>
                          <div className="text">Singles</div>
                        </li>
                        <li>
                          <div className="title">Employment of spouse</div>
                          <div className="text">{"emSpouse"}</div>
                        </li>
                        <li>
                          <div className="title">No. of children</div>
                          <div className="text">{"noChildren"}</div>
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
                        <a className="edit-icon">
                          <i className="fa fa-pencil" />
                        </a>
                      </h3>
                      <h5 className="section-title">Primary</h5>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Name</div>
                          <div className="text">{"primaryName"}</div>
                        </li>
                        <li>
                          <div className="title">Relationship</div>
                          <div className="text">{"primaryRelationship"}</div>
                        </li>
                        <li>
                          <div className="title">Phone </div>
                          <div className="text">
                            {"primaryPhone1"}, {"primaryPhone2"}
                          </div>
                        </li>
                      </ul>
                      <hr />
                      <h5 className="section-title">Secondary</h5>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Name</div>
                          <div className="text">{"secondaryName"}</div>
                        </li>
                        <li>
                          <div className="title">Relationship</div>
                          <div className="text">{"secondaryRelationship"}</div>
                        </li>
                        <li>
                          <div className="title">Phone </div>
                          <div className="text">
                            {"secondaryPhone1"}, {"secondaryPhone2"}
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
                        <a className="edit-icon">
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
                              <td>{"name"}</td>
                              <td>{"relationship"}</td>
                              <td>{"dateOfBirth"}</td>
                              <td>{"phone"}</td>
                              <td className="text-end edit-icon">
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
                                  {"institution"}
                                  <span className="edit-icon">
                                    <i className="fa fa-pencil" />
                                  </span>
                                </a>
                                <div>{"degree"}</div>
                                <span className="time">
                                  {"startingDate"} - {"completeDate"}
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
                                  {"companyName"}
                                  <span className="edit-icon">
                                    <i className="fa fa-pencil" />
                                  </span>
                                </a>
                                <div>{"jobPosition"}</div>
                                <span className="time">{"location"}</span>
                                <span className="time">
                                  {"periodFrom"} - {"periodTo"}
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
            {/* Projects Tab */}
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
            {/* /Projects Tab */}
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
                          selectedResidentDocumentId === serviceWorkerId
                            ? filesList?.map((file, index) => {
                                const { id, inputFields, uniqueID } = file;
                                if (uniqueID == serviceWorkerId) {
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
              uniqueID={serviceWorkerId}
              fileUploadfieldIndex={fileUploadfieldIndex}
            />
          </>
        )}
      </div>
    </div>
  );
  }
export default serviceWorkerProfile;

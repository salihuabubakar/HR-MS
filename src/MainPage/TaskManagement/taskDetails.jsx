import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import {
  initTask,
  savedTaskReducer,
  initSubTask,
  savedSubTaskReducer,
  initFileUpload,
  savedFileUploadReducer,
} from "../../utils/localStorage";
import SmileImg from "../../assets/img/smile.png";
import DefaultImage from "../../assets/img/placeholder.jpg";
import { useParams, useLocation } from "react-router-dom";
import { Span, DivContainer } from "./style";
import AddSubTask from "../../_components/modelbox/AddSubTask";
import AddTask from "../../_components/modelbox/AddTask";
import { async } from "regenerator-runtime";
import CommentSection from "./component";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import AddFileUploadModal from "../../_components/modelbox/AddFileUploadModal";

const TaskDetails = () => {
    const location = useLocation();
    const selectedTaskId = location?.state?.id;
    const selectedTaskIndex = location?.state?.index;
    const [showTaskModal] = useGlobalState("showTaskModal");
    const [showSubTaskModal] = useGlobalState("showSubTaskModal");
    const [deleteModal] = useGlobalState("deleteModal");
    const [deleteSubTask] = useGlobalState("deleteSubTask");
    const [showFileUploadModal] = useGlobalState("showFileUploadModal");

    const [tasks, dispatchTasks] = useReducer(savedTaskReducer, [], initTask);

    useEffect(() => {
      localStorage.setItem("task", JSON.stringify(tasks));
    }, [tasks]);

    const [taskList, setTaskList] = useState();
    useEffect(() => {
      setTaskList(tasks);
    }, [tasks]);

    const [subTaskTitle, dispatchSubTaskTitle] = useReducer(
      savedSubTaskReducer,
      [],
      initSubTask
    );

    useEffect(() => {
      localStorage.setItem("subTask", JSON.stringify(subTaskTitle));
    }, [subTaskTitle]);
    useEffect(() => {
      if (!showSubTaskModal) {
        setGlobalState("selectedSubTaskInfo", "");
      }
    }, [showSubTaskModal]);

    const [subTaskTitleArray, setSubTaskTitleArray] = useState();
    useEffect(() => {
      setSubTaskTitleArray(subTaskTitle);
    }, [subTaskTitle]);

    const [menu, setMenu] = useState(false);
    const [indexToEdit, setIndexToEdit] = useState(0);
    const [taskIndexToEdit, setTaskIndexToEdit] = useState(0);

    const selectedTask = taskList?.find((task) => task?.id === selectedTaskId);

    const taskId = selectedTask?.id;
    const taskTitle = selectedTask?.taskTitle;
    const taskType = selectedTask?.taskType;
    const taskPriority = selectedTask?.taskPriority?.label;
    const timeAllocated = selectedTask?.timeAllocated;
    const taskDescription = selectedTask?.description;
    const totalAssignedEmployees = selectedTask?.employee;
    const totalAssignedServiceWorkers = selectedTask?.resident;
    const managerName = selectedTask?.manager;
    const taskStatus = selectedTask?.taskStatus?.label;
    const dateCreated = selectedTask?.dateCreated;

    const handleTaskEdit = (index) => {
      setTaskIndexToEdit(index);
      setGlobalState("showTaskModal", true);
      setGlobalState("selectedTaskInfo", tasks);
    }

    const handleSubTaskEdit = (index) => {
      setIndexToEdit(index);
      setGlobalState("showSubTaskModal", true);
      setGlobalState("selectedSubTaskInfo", subTaskTitle);
    };

    const handleSubTaskDelete = (index) => {
      setIndexToEdit(index);
      setGlobalState("deleteSubTask", true);
    };


    const toggleMobileMenu = () => {
      setMenu(!menu);
    };

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

    const selectedTaskDocument = filesList?.find(
      (file) => file?.uniqueID === selectedTaskId
    );
    const selectedTaskDocumentId = selectedTaskDocument?.uniqueID;

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
  return (
    <DivContainer className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Task Details - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Task Details</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/taskmanagement/task-manager-table">
                      All Tasks
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Task Manager</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => handleTaskEdit(selectedTaskIndex)}
                >
                  <i className="fa fa-edit" /> Edit Task
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <div className="project-title">
                    <h5 className="card-title">{taskTitle}</h5>
                  </div>
                  <p>{taskDescription}</p>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }} className="project-task">
                <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#all_tasks"
                      data-bs-toggle="tab"
                      aria-expanded="true"
                    >
                      <span
                        className="action-circle large"
                        style={{ marginRight: "10px" }}
                        title="Add Task"
                        onClick={() => setGlobalState("showSubTaskModal", true)}
                      >
                        <i className="material-icons">add</i>
                      </span>
                      All Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#pending_tasks"
                      data-bs-toggle="tab"
                      aria-expanded="false"
                    >
                      Pending Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#completed_tasks"
                      data-bs-toggle="tab"
                      aria-expanded="false"
                    >
                      Completed Tasks
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane show active" id="all_tasks">
                    <div className="task-wrapper">
                      <div className="task-list-container">
                        <div className="task-list-body">
                          <ul id="task-list">
                            {subTaskTitleArray
                              ? subTaskTitleArray?.map((subtasks, index) => {
                                  const {
                                    id,
                                    taskId: taskIdInSubTask,
                                    subTask,
                                    resident,
                                    dateCreated,
                                    dateUpdated,
                                    checkToComplete,
                                  } = subtasks;
                                  if (taskIdInSubTask == selectedTaskId) {
                                    return (
                                      <li
                                        key={id}
                                        className={
                                          checkToComplete ? "completed" : "task"
                                        }
                                      >
                                        <div className="task-container">
                                          <span className="task-action-btn task-check">
                                            <span
                                              className="action-circle large complete-btn"
                                              title="Mark Complete"
                                            >
                                              <i className="material-icons">
                                                check
                                              </i>
                                            </span>
                                          </span>
                                          <span className="task-label">
                                            <span
                                              style={{ marginRight: "5px" }}
                                            >
                                              {subTask}
                                            </span>
                                            {resident
                                              ? resident?.map(
                                                  (resident, index) => {
                                                    const { label, image } =
                                                      resident;
                                                    return (
                                                      <span
                                                        key={index}
                                                        data-bs-toggle="tooltip"
                                                        title={label}
                                                      >
                                                        <img
                                                          src={
                                                            image
                                                              ? image
                                                              : DefaultImage
                                                          }
                                                          alt="user Image"
                                                          className="resident-image"
                                                        />
                                                      </span>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {dateCreated && dateUpdated ? (
                                              <>
                                                <br />
                                                <span>
                                                  <h6
                                                    style={{
                                                      fontSize: "9px",
                                                      margin: "3px 0 0 0",
                                                    }}
                                                  >
                                                    Date Created: {dateCreated}
                                                  </h6>
                                                  <h6
                                                    style={{
                                                      fontSize: "9px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    last Updated: {dateUpdated}
                                                  </h6>
                                                </span>
                                              </>
                                            ) : null}
                                          </span>
                                          <span className="task-action-btn ">
                                            <span
                                              className="action-circle large"
                                              title="Update"
                                              onClick={() =>
                                                handleSubTaskEdit(
                                                  index,
                                                  dateCreated
                                                )
                                              }
                                            >
                                              <i className="material-icons">
                                                person_add
                                              </i>
                                            </span>
                                            <span
                                              className="action-circle large delete-btn"
                                              title="Delete Task"
                                              onClick={() =>
                                                handleSubTaskDelete(index)
                                              }
                                            >
                                              <i className="material-icons">
                                                delete
                                              </i>
                                            </span>
                                          </span>
                                        </div>
                                      </li>
                                    );
                                  }
                                })
                              : "No sub tasks available"}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="pending_tasks">
                    <div className="task-wrapper">
                      <div className="task-list-container">
                        <div className="task-list-body">
                          <ul id="task-list">
                            {subTaskTitleArray
                              ? subTaskTitleArray?.map((subtasks, index) => {
                                  const {
                                    id,
                                    taskId: taskIdInSubTask,
                                    subTask,
                                    resident,
                                    dateCreated,
                                    dateUpdated,
                                    checkToComplete,
                                  } = subtasks;
                                  if (
                                    checkToComplete != true &&
                                    taskIdInSubTask == selectedTaskId
                                  ) {
                                    return (
                                      <li key={id} className="task">
                                        <div className="task-container">
                                          <span className="task-action-btn task-check">
                                            <span
                                              className="action-circle large complete-btn"
                                              title="Mark Complete"
                                            >
                                              <i className="material-icons">
                                                check
                                              </i>
                                            </span>
                                          </span>
                                          <span className="task-label">
                                            <span
                                              style={{ marginRight: "5px" }}
                                            >
                                              {subTask}
                                            </span>
                                            {resident
                                              ? resident?.map(
                                                  (resident, index) => {
                                                    const { label, image } =
                                                      resident;
                                                    return (
                                                      <span
                                                        key={index}
                                                        data-bs-toggle="tooltip"
                                                        title={label}
                                                      >
                                                        <img
                                                          src={
                                                            image
                                                              ? image
                                                              : DefaultImage
                                                          }
                                                          alt="user Image"
                                                          className="resident-image"
                                                        />
                                                      </span>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {dateCreated && dateUpdated ? (
                                              <>
                                                <br />
                                                <span>
                                                  <h6
                                                    style={{
                                                      fontSize: "9px",
                                                      margin: "3px 0 0 0",
                                                    }}
                                                  >
                                                    Date Created: {dateCreated}
                                                  </h6>
                                                  <h6
                                                    style={{
                                                      fontSize: "9px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    Date Updated: {dateUpdated}
                                                  </h6>
                                                </span>
                                              </>
                                            ) : null}
                                          </span>
                                          <span className="task-action-btn ">
                                            <span
                                              className="action-circle large"
                                              title="Update"
                                              onClick={() =>
                                                handleSubTaskEdit(
                                                  index,
                                                  dateCreated
                                                )
                                              }
                                            >
                                              <i className="material-icons">
                                                person_add
                                              </i>
                                            </span>
                                            <span
                                              className="action-circle large delete-btn"
                                              title="Delete Task"
                                              onClick={() =>
                                                handleSubTaskDelete(index)
                                              }
                                            >
                                              <i className="material-icons">
                                                delete
                                              </i>
                                            </span>
                                          </span>
                                        </div>
                                      </li>
                                    );
                                  }
                                })
                              : "No sub tasks available"}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="completed_tasks">
                    <div className="task-wrapper">
                      <div className="task-list-container">
                        <div className="task-list-body">
                          <ul id="task-list">
                            {subTaskTitleArray
                              ? subTaskTitleArray?.map((subtasks, index) => {
                                  const {
                                    id,
                                    taskId: taskIdInSubTask,
                                    subTask,
                                    resident,
                                    dateCreated,
                                    dateUpdated,
                                    checkToComplete,
                                  } = subtasks;
                                  if (
                                    checkToComplete == true &&
                                    taskIdInSubTask == selectedTaskId
                                  ) {
                                    return (
                                      <li key={id} className="completed">
                                        <div className="task-container">
                                          <span className="task-action-btn task-check">
                                            <span
                                              className="action-circle large complete-btn"
                                              title="Mark Complete"
                                            >
                                              <i className="material-icons">
                                                check
                                              </i>
                                            </span>
                                          </span>
                                          <span className="task-label">
                                            <span
                                              style={{ marginRight: "5px" }}
                                            >
                                              {subTask}
                                            </span>
                                            {resident
                                              ? resident?.map(
                                                  (resident, index) => {
                                                    const { label, image } =
                                                      resident;
                                                    return (
                                                      <span
                                                        key={index}
                                                        data-bs-toggle="tooltip"
                                                        title={label}
                                                      >
                                                        <img
                                                          src={
                                                            image
                                                              ? image
                                                              : DefaultImage
                                                          }
                                                          alt="user Image"
                                                          className="resident-image"
                                                        />
                                                      </span>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {dateCreated && dateUpdated ? (
                                              <>
                                                <br />
                                                <span>
                                                  <h6
                                                    style={{
                                                      fontSize: "9px",
                                                      margin: "3px 0 0 0",
                                                    }}
                                                  >
                                                    Date Created: {dateCreated}
                                                  </h6>
                                                  <h6
                                                    style={{
                                                      fontSize: "9px",
                                                      margin: "0",
                                                    }}
                                                  >
                                                    Date Updated: {dateUpdated}
                                                  </h6>
                                                </span>
                                              </>
                                            ) : null}
                                          </span>
                                          <span className="task-action-btn ">
                                            <span
                                              className="action-circle large"
                                              title="Update"
                                              onClick={() =>
                                                handleSubTaskEdit(
                                                  index,
                                                  dateCreated
                                                )
                                              }
                                            >
                                              <i className="material-icons">
                                                person_add
                                              </i>
                                            </span>
                                            <span
                                              className="action-circle large delete-btn"
                                              title="Delete Task"
                                              onClick={() =>
                                                handleSubTaskDelete(index)
                                              }
                                            >
                                              <i className="material-icons">
                                                delete
                                              </i>
                                            </span>
                                          </span>
                                        </div>
                                      </li>
                                    );
                                  }
                                })
                              : "No sub tasks available"}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CommentSection
                selecetedTaskId={selectedTaskId}
                taskId={taskId}
              />
              <div className="col-md-12 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">
                      Upload Files{" "}
                      <a onClick={handleOpeneFileUpload} className="edit-icon">
                        <i className="fa fa-plus" />
                      </a>
                    </h3>
                    <div className="experience-box">
                      <ul className="experience-list">
                        {filesList?.length > 0 &&
                        selectedTaskDocumentId === selectedTaskId
                          ? filesList?.map((file, index) => {
                              const { id, inputFields, uniqueID } = file;
                              if (uniqueID == selectedTaskId) {
                                return (
                                  <React.Fragment key={id}>
                                    {inputFields?.map((fields, fieldsIndex) => {
                                      const {
                                        documentName,
                                        documentNumber,
                                        documentType,
                                        expiryDate,
                                        issueDate,
                                        documentDescription,
                                        fileDetails,
                                      } = fields;

                                      const handleFileDownload = () => {
                                        const dataUrlParts =
                                          fileDetails.data.split(",");
                                        const base64Data = dataUrlParts[1];
                                        const mimeType = dataUrlParts[0]
                                          .split(":")[1]
                                          .split(";")[0];

                                        const byteCharacters = atob(base64Data);
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

                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
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
                                                {documentDescription}
                                                {/* <span
                                                  className="edit-icon"
                                                  
                                                >
                                                  <i className="fa fa-pencil" />
                                                </span> */}
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
                                              {selectedTaskId ==
                                              uniqueID ? null : (
                                                <span className="time">
                                                  Type: {documentType}
                                                </span>
                                              )}
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
                          : "No uploaded file(s) yet"}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title m-b-15">Project details</h6>
                  <table className="table table-striped table-border">
                    <tbody>
                      <tr>
                        <td>Task Type:</td>
                        <td
                          style={{
                            backgroundColor:
                              taskType == "Paid Task" ? "#55CE63" : "#ff9b44",
                            color: "#fff",
                          }}
                          className="text-end"
                        >
                          {taskType}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Hours:</td>
                        <td className="text-end">{timeAllocated}hr</td>
                      </tr>
                      <tr>
                        <td>Created:</td>
                        <td className="text-end">{dateCreated}</td>
                      </tr>
                      {/* <tr>
                        <td>Deadline:</td>
                        <td className="text-end">12 Jun, 2019</td>
                      </tr> */}
                      <tr>
                        <td>Priority:</td>
                        <td
                          style={{
                            backgroundColor:
                              (taskPriority == "highest" && "#55CE63") ||
                              (taskPriority == "medium" && "#ff9b44") ||
                              (taskPriority == "low" && "#f62d51"),
                            color: "#fff",
                          }}
                          className="text-end"
                        >
                          {taskPriority}
                        </td>
                      </tr>
                      <tr>
                        <td>Created by:</td>
                        <td className="text-end">
                          <Link
                            to="#"
                            onClick={(event) => event.preventDefault()}
                          >
                            {managerName}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Status:</td>
                        <td
                          style={{
                            color: "#fff",
                          }}
                          className={
                            (taskStatus == "not-started"
                              ? " text-end bg-not-started"
                              : undefined) ||
                            (taskStatus == "started"
                              ? "text-end bg-started"
                              : undefined) ||
                            (taskStatus == "middle"
                              ? "text-end bg-middle"
                              : undefined) ||
                            (taskStatus == "rounding-up"
                              ? "text-end bg-rounding-up"
                              : undefined) ||
                            (taskStatus == "completed"
                              ? "text-end bg-completed"
                              : undefined)
                          }
                        >
                          {(taskStatus == "not-started" && "Not started") ||
                            (taskStatus == "started" &&
                              "In-progress(Started)") ||
                            (taskStatus == "middle" && "In-progress(Middle)") ||
                            (taskStatus == "rounding-up" &&
                              "In-progress(Rounding up)") ||
                            (taskStatus == "completed" && "Completed")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="m-b-5">
                    Progress
                    <span
                      className={
                        (taskStatus == "not-started"
                          ? "float-end color-not-started"
                          : undefined) ||
                        (taskStatus == "started"
                          ? "float-end color-started"
                          : undefined) ||
                        (taskStatus == "middle"
                          ? "float-end color-middle"
                          : undefined) ||
                        (taskStatus == "rounding-up"
                          ? "float-end color-rounding-up"
                          : undefined) ||
                        (taskStatus == "completed"
                          ? "float-end color-completed"
                          : undefined)
                      }
                    >
                      {(taskStatus == "not-started" && "0%") ||
                        (taskStatus == "started" && "25%") ||
                        (taskStatus == "middle" && "50%") ||
                        (taskStatus == "rounding-up" && "75%") ||
                        (taskStatus == "completed" && "100%")}
                    </span>
                  </p>
                  <div className="progress progress-xs mb-0">
                    <div
                      className={
                        (taskStatus == "not-started"
                          ? " progress-bar bg-not-started"
                          : undefined) ||
                        (taskStatus == "started"
                          ? "progress-bar bg-started"
                          : undefined) ||
                        (taskStatus == "middle"
                          ? "progress-bar bg-middle"
                          : undefined) ||
                        (taskStatus == "rounding-up"
                          ? "progress-bar bg-rounding-up"
                          : undefined) ||
                        (taskStatus == "completed"
                          ? "progress-bar bg-completed"
                          : undefined)
                      }
                      role="progressbar"
                      data-bs-toggle="tooltip"
                      title={
                        (taskStatus == "not-started" ? "0%" : undefined) ||
                        (taskStatus == "started" ? "25%" : undefined) ||
                        (taskStatus == "middle" ? "50%" : undefined) ||
                        (taskStatus == "rounding-up" ? "75%" : undefined) ||
                        (taskStatus == "completed" && "100%")
                      }
                      style={{
                        width:
                          (taskStatus == "not-started" && "0%") ||
                          (taskStatus == "started" && "25%") ||
                          (taskStatus == "middle" && "50%") ||
                          (taskStatus == "rounding-up" && "75%") ||
                          (taskStatus == "completed" && "100%"),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="card project-user">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Assigned Leader </h6>
                  <ul className="list-box">
                    <li>
                      <Link to="#" onClick={(event) => event.preventDefault()}>
                        <div className="list-item">
                          <div className="list-left">
                            <span className="avatar">
                              <img alt="" src={SmileImg} />
                            </span>
                          </div>
                          <div className="list-body">
                            <span className="message-author">
                              {managerName}
                            </span>
                            <div className="clearfix" />
                            <span className="message-content">Team Leader</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card project-user">
                <div className="card-body">
                  <h6 className="card-title m-b-20">
                    Assigned Team
                    {/* <button
                      type="button"
                      className="float-end btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#assign_user"
                    >
                      <i className="fa fa-plus" /> Update
                    </button> */}
                  </h6>
                  <ul className="list-box">
                    {totalAssignedEmployees
                      ? totalAssignedEmployees?.map((user, index) => {
                          const { value, label, image, role } = user;
                          return (
                            <li key={value}>
                              <Link
                                to=""
                                onClick={(event) => event.preventDefault()}
                              >
                                <div className="list-item">
                                  <div className="list-left">
                                    <span
                                      style={{
                                        borderRadius: "5px",
                                        backgroundColor: "#00000000",
                                        height: "100%",
                                      }}
                                      className="avatar"
                                    >
                                      <img
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        alt=""
                                        src={image ? image : DefaultImage}
                                      />
                                    </span>
                                  </div>
                                  <div className="list-body">
                                    <span className="message-author">
                                      {label}
                                    </span>
                                    <div className="clearfix" />
                                    <span className="message-content">
                                      {role?.label}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })
                      : "No Team assigned"}
                  </ul>
                </div>
              </div>
              <div className="card project-user">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Residents</h6>
                  <ul className="list-box">
                    {totalAssignedServiceWorkers
                      ? totalAssignedServiceWorkers?.map((user, index) => {
                          const { value, label, image } = user;
                          return (
                            <li key={value}>
                              <Link
                                to=""
                                onClick={(event) => event.preventDefault()}
                              >
                                <div className="list-item">
                                  <div className="list-left">
                                    <span
                                      style={{
                                        borderRadius: "5px",
                                        backgroundColor: "#00000000",
                                        height: "100%",
                                      }}
                                      className="avatar"
                                    >
                                      <img
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        alt=""
                                        src={image ? image : DefaultImage}
                                      />
                                    </span>
                                  </div>
                                  <div className="list-body">
                                    <span className="message-author">
                                      {label}
                                    </span>
                                    <div className="clearfix" />
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })
                      : "No Team assigned"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showFileUploadModal && (
          <>
            <AddFileUploadModal
              dispatchFiles={dispatchFiles}
              fileUploadIndex={fileUploadIndex}
              uniqueID={selectedTaskId}
              fileUploadfieldIndex={fileUploadfieldIndex}
              selectedTaskId={selectedTaskId}
            />
          </>
        )}
        {showSubTaskModal && (
          <AddSubTask
            dispatchSubTaskTitle={dispatchSubTaskTitle}
            indexToEdit={indexToEdit}
            subTaskTitle={subTaskTitle}
            taskId={taskId}
            selecetedTaskId={selectedTaskId}
          />
        )}
        {deleteSubTask && (
          <DeleteModal
            deleteAction={dispatchSubTaskTitle}
            indexToDelete={indexToEdit}
            dispatch={subTaskTitle}
            modalTitle={"SubTask"}
          />
        )}
        {showTaskModal && (
          <AddTask
            dispatchTasks={dispatchTasks}
            indexToEdit={taskIndexToEdit}
          />
        )}
      </div>
    </DivContainer>
  );
};

export default TaskDetails;

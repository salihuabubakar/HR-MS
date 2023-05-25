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
import FileUpload from "../../_components/fileUploader";
import fileSize from "file-size";

const TaskDetails = () => {
    const location = useLocation();
    const selecetedTaskId = location?.state?.id;
    const selectedTaskIndex = location?.state?.index;
    const [showTaskModal] = useGlobalState("showTaskModal");
    const [showSubTaskModal] = useGlobalState("showSubTaskModal");
    const [deleteModal] = useGlobalState("deleteModal");
    const [deleteFile] = useGlobalState("deleteFile");

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
    const [dateTimeCreated, setDateTimeCreated] = useState("");

    const selectedTask = taskList?.find((task) => task?.id === selecetedTaskId);

    const taskId = selectedTask?.id;
    const taskTitle = selectedTask?.taskTitle;
    const taskType = selectedTask?.taskType;
    const taskPriority = selectedTask?.taskPriority?.label;
    const timeAllocated = selectedTask?.timeAllocated;
    const taskDescription = selectedTask?.description;
    const totalAssignedEmployees = selectedTask?.employee;
    const managerName = selectedTask?.manager;
    const taskStatus = selectedTask?.taskStatus?.label;
    const dateCreated = selectedTask?.dateCreated;

    console.log("selectedTaskId..", selecetedTaskId);
    console.log("selectedTaskIndex..", selectedTaskIndex);
    console.log("taskId..", taskId);
    console.log("dateTimeCreated..", dateTimeCreated);

    const handleTaskEdit = (index) => {
      setTaskIndexToEdit(index);
      setGlobalState("showTaskModal", true);
      setGlobalState("selectedTaskInfo", tasks);
    }

    const handleSubTaskEdit = (index, dateCreated) => {
      setIndexToEdit(index);
      setDateTimeCreated(dateCreated);
      setGlobalState("showSubTaskModal", true);
      setGlobalState("selectedSubTaskInfo", subTaskTitle);
    };

    const handleSubTaskDelete = (index) => {
      setIndexToEdit(index);
      setGlobalState("deleteModal", true);
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

    const [filesList, setFilesList] = useState();
    useEffect(() => {
      setFilesList(files);
    }, [files]);

    const selectedTaskDocument = filesList?.find(
      (file) => file?.uniqueID === selecetedTaskId
    );
    const selectedTaskDocumentId = selectedTaskDocument?.uniqueID;
    
    const handleFileDelete = (index) => {
      setIndexToEdit(index);
      setGlobalState("deleteFile", true);
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
          <title>Task Details - HRMS Admin</title>
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
                                  if (taskIdInSubTask == selecetedTaskId) {
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
                                    taskIdInSubTask == selecetedTaskId
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
                                    taskIdInSubTask == selecetedTaskId
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
                selecetedTaskId={selecetedTaskId}
                taskId={taskId}
              />
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title m-b-20">Upload files</h5>
                  <FileUpload
                    dispatchFiles={dispatchFiles}
                    uniqueID={selecetedTaskId}
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title m-b-20">Uploaded files</h5>
                  <ul className="files-list">
                    {filesList?.length > 0 &&
                    selectedTaskDocumentId === selecetedTaskId
                      ? filesList?.map((file, index) => {
                          const { name, size, type, data, id, uniqueID } = file;
                          if (uniqueID === selecetedTaskId) {
                            return (
                              <li key={id}>
                                <div className="files-cont">
                                  {type && type.startsWith("image/") ? (
                                    <img
                                      className="img-preview"
                                      src={data}
                                      alt="Preview"
                                    />
                                  ) : (
                                    <>
                                      <div className="file-type">
                                        <span className="files-icon">
                                          <i className="fa fa-file-pdf-o" />
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  <div className="files-info">
                                    <span className="file-name text-ellipsis">
                                      <a
                                        href="#"
                                        onClick={(event) =>
                                          event.preventDefault()
                                        }
                                      >
                                        {name}
                                      </a>
                                    </span>
                                    <div className="file-size">
                                      Size: {fileSize(size).human("si")}
                                    </div>
                                    <div className="file-size">
                                      Type: {type}
                                    </div>
                                  </div>
                                  <ul className="files-action">
                                    <li className="dropdown dropdown-action">
                                      <a
                                        className="dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="material-icons">
                                          more_horiz
                                        </i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item">
                                          <i className="fa fa-download fa-fw m-r-5" />
                                          Download
                                        </a>
                                        <a
                                          onClick={() =>
                                            handleFileDelete(index)
                                          }
                                          className="dropdown-item"
                                        >
                                          <i className="fa fa-trash-o m-r-5" />{" "}
                                          Delete
                                        </a>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            );
                          }
                        })
                      : "No uploaded file(s) yet"}
                  </ul>
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
                          const { value, label, image, designation } = user;
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
                                      {designation?.label}
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
            </div>
          </div>
        </div>
        {deleteFile && (
          <DeleteModal
            deleteAction={dispatchFiles}
            indexToDelete={indexToEdit}
            dispatch={files}
            modalTitle={"File"}
          />
        )}
        {showSubTaskModal && (
          <AddSubTask
            dispatchSubTaskTitle={dispatchSubTaskTitle}
            indexToEdit={indexToEdit}
            subTaskTitle={subTaskTitle}
            taskId={taskId}
            selecetedTaskId={selecetedTaskId}
            dateTimeCreated={dateTimeCreated}
          />
        )}
        {deleteModal && (
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

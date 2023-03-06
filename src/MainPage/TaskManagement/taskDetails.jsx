import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  PlaceHolder,
  Attachment,
  Avatar_05,
  Avatar_02,
  Avatar_13,
  Avatar_16,
} from "../../Entryfile/imagepath";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import Editproject from "../../_components/modelbox/Editproject";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import {
  initTask,
  savedTaskReducer,
  initSubTask,
  savedSubTaskReducer,
  initTaskImage,
  savedTaskImageReducer,
} from "../../utils/localStorage";
import SmileImg from "../../assets/img/smile.png";
import { useParams, useLocation } from "react-router-dom";
import { Span } from "./style";
import AddSubTask from "../../_components/modelbox/AddSubTask";
import AddTaskImage from "../../_components/modelbox/AddTaskImage"
import { async } from "regenerator-runtime";
import CommentSection from "./component";

const TaskDetails = () => {
    const location = useLocation();
    const selecetedTaskId = location?.state?.id;

    const [showSubTaskModal] = useGlobalState("showSubTaskModal");
    const [showTaskImageModal] = useGlobalState("showTaskImageModal");

    const [tasks, dispatchTasks] = useReducer(savedTaskReducer, [], initTask);

    useEffect(() => {
      localStorage.setItem("task", JSON.stringify(tasks));
    }, [tasks]);

    const [taskList, setTaskList] = useState();
    useEffect(() => {
      setTaskList(tasks);
    }, [tasks]);

    const [taskImage, dispatchTaskImage] = useReducer(
      savedTaskImageReducer,
      [],
      initTaskImage
    );

    useEffect(() => {
      localStorage.setItem("taskImage", JSON.stringify(taskImage));
    }, [taskImage]);
    useEffect(() => {
      if (!showTaskImageModal) {
        setGlobalState("selectedTaskImage", "");
      }
    }, [showTaskImageModal]);

    const [taskImages, setTaskImages] = useState();
    useEffect(() => {
      setTaskImages(taskImage);
    }, [taskImage]);

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

    const selectedTask = taskList?.find((task) => task?.id === selecetedTaskId);

    const taskId = selectedTask?.id;
    const taskTitle = selectedTask?.taskTitle;
    const taskType = selectedTask?.taskType;
    const taskPriority = selectedTask?.taskPriority?.label;
    const timeAllocated = selectedTask?.timeAllocated;
    const taskDescription = selectedTask?.description;
    const totalAssignedEmployees = selectedTask?.employee;
    const managerName = selectedTask?.manager;
    const taskStatus = selectedTask?.taskStatus;
    const dateCreated = selectedTask?.dateCreated;

    console.log("selectedTaskId..", selecetedTaskId);
    console.log("taskId..", taskId);


    const handleSubTaskEdit = (index) => {
      setIndexToEdit(index);
      setGlobalState("showSubTaskModal", true);
      setGlobalState("selectedSubTaskInfo", subTaskTitle);
    };

    const handleSubTaskDelete = async (index) => {
      dispatchSubTaskTitle({
        type: "delete",
        payload: subTaskTitle[index],
      });
    };

    const handleTaskImageEdit = (index) => {
      setIndexToEdit(index);
      setGlobalState("showTaskImageModal", true);
      setGlobalState("selectedTaskImage", taskImage);
    };

    const handleDeleteImage = async (index) => {
      dispatchTaskImage({
        type: "delete",
        payload: taskImage[index],
      });
    }


    const toggleMobileMenu = () => {
      setMenu(!menu);
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
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
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
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Task Manager</li>
                </ul>
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
              <CommentSection
                selecetedTaskId={selecetedTaskId}
                taskId={taskId}
              />
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title m-b-20">
                    Uploaded image files{" "}
                    <span
                      className="action-circle large"
                      style={{ marginRight: "10px" }}
                      title="Upload Image"
                      onClick={() => setGlobalState("showTaskImageModal", true)}
                    >
                      <i className="material-icons">add</i>
                    </span>
                  </h5>
                  <div className="row">
                    {taskImages?.map((img, index) => {
                      const { id, image, imageName, selecetedTaskId, taskId } =
                        img;
                      if (taskId == selecetedTaskId) {
                        return (
                          <div
                            key={id}
                            className="col-md-3 col-sm-4 col-lg-4 col-xl-3"
                          >
                            <div className="uploaded-box">
                              {/* <span onClick={() => handleTaskImageEdit(index)}>
                                Edit
                              </span> */}
                              <span>
                                <a
                                  className="delete-icon"
                                  onClick={() => handleDeleteImage(index)}
                                >
                                  <i className="fa fa-trash-o" />
                                </a>
                              </span>{" "}
                              <br />
                              <div className="uploaded-img">
                                <img
                                  style={{
                                    maxWidth: "264px",
                                    maxHeight: "184px",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "3px",
                                  }}
                                  src={image}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="uploaded-img-name">
                                {imageName}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title m-b-20">Uploaded files</h5>
                  <ul className="files-list">
                    <li>
                      <div className="files-cont">
                        <div className="file-type">
                          <span className="files-icon">
                            <i className="fa fa-file-pdf-o" />
                          </span>
                        </div>
                        <div className="files-info">
                          <span className="file-name text-ellipsis">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              AHA Selfcare Mobile Application Test-Cases.xls
                            </a>
                          </span>
                          <span className="file-author">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              John Doe
                            </a>
                          </span>{" "}
                          <span className="file-date">May 31st at 6:53 PM</span>
                          <div className="file-size">Size: 14.8Mb</div>
                        </div>
                        <ul className="files-action">
                          <li className="dropdown dropdown-action">
                            <a
                              href=""
                              className="dropdown-toggle btn btn-link"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="material-icons">more_horiz</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="">
                                Download
                              </a>
                              <a
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#share_files"
                              >
                                Share
                              </a>
                              <a className="dropdown-item" href="">
                                Delete
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="files-cont">
                        <div className="file-type">
                          <span className="files-icon">
                            <i className="fa fa-file-pdf-o" />
                          </span>
                        </div>
                        <div className="files-info">
                          <span className="file-name text-ellipsis">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              AHA Selfcare Mobile Application Test-Cases.xls
                            </a>
                          </span>
                          <span className="file-author">
                            <a
                              href="#"
                              onClick={(event) => event.preventDefault()}
                            >
                              Richard Miles
                            </a>
                          </span>{" "}
                          <span className="file-date">May 31st at 6:53 PM</span>
                          <div className="file-size">Size: 14.8Mb</div>
                        </div>
                        <ul className="files-action">
                          <li className="dropdown dropdown-action">
                            <a
                              href=""
                              className="dropdown-toggle btn btn-link"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="material-icons">more_horiz</i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="">
                                Download
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#share_files"
                              >
                                Share
                              </a>
                              <a className="dropdown-item" href="">
                                Delete
                              </a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="project-task">
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
                                    taskId,
                                    selecetedTaskId,
                                    subTask,
                                    checkToComplete,
                                  } = subtasks;
                                  if (taskId == selecetedTaskId) {
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
                                            {subTask}
                                          </span>
                                          <span className="task-action-btn ">
                                            <span
                                              className="action-circle large"
                                              title="Update"
                                              onClick={() =>
                                                handleSubTaskEdit(index)
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
                                    taskId,
                                    selecetedTaskId,
                                    subTask,
                                    checkToComplete,
                                  } = subtasks;
                                  if (checkToComplete != true) {
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
                                            {subTask}
                                          </span>
                                          <span className="task-action-btn ">
                                            <span
                                              className="action-circle large"
                                              title="Update"
                                              onClick={() =>
                                                handleSubTaskEdit(index)
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
                                    taskId,
                                    selecetedTaskId,
                                    subTask,
                                    checkToComplete,
                                  } = subtasks;
                                  if (checkToComplete == true) {
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
                                            {subTask}
                                          </span>
                                          <span className="task-action-btn ">
                                            <span
                                              className="action-circle large"
                                              title="Update"
                                              onClick={() =>
                                                handleSubTaskEdit(index)
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
                              (taskPriority == "highest" && "#f62d51") ||
                              (taskPriority == "medium" && "#ff9b44") ||
                              (taskPriority == "low" && "#55CE63"),
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
                            backgroundColor:
                              taskStatus == "In-progress" && "#55CE63",
                            color: "#fff",
                          }}
                          className="text-end"
                        >
                          {taskStatus}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="m-b-5">
                    Progress <span className="text-success float-end">40%</span>
                  </p>
                  <div className="progress progress-xs mb-0">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      data-bs-toggle="tooltip"
                      title="40%"
                      style={{ width: "40%" }}
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
                            <li>
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
                                        src={image}
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
        {showTaskImageModal && (
          <AddTaskImage
            dispatchTaskImage={dispatchTaskImage}
            indexToEdit={indexToEdit}
            subTaskTitle={subTaskTitle}
            taskId={taskId}
            selecetedTaskId={selecetedTaskId}
          />
        )}
        {showSubTaskModal && (
          <AddSubTask
            dispatchSubTaskTitle={dispatchSubTaskTitle}
            indexToEdit={indexToEdit}
            subTaskTitle={subTaskTitle}
            taskId={taskId}
            selecetedTaskId={selecetedTaskId}
          />
        )}
        {/* /Page Content */}
        {/* /Assign User Modal */}
        {/* Edit Project Modal */}
        <Editproject />
        {/* /Edit Project Modal */}
      </div>
    </div>
  );
};

export default TaskDetails;

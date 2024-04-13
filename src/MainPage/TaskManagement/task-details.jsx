import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DefaultImage from "../../assets/img/placeholder.jpg";
import { DivContainer } from "./style";
import AddTaskAssignment from "../../_components/modelbox/AddTaskAssignment";
import AddTaskDocument from "../../_components/modelbox/AddTaskDocument";
import AddTask from "../../_components/modelbox/AddTask";
import CommentSection from "./component";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import {
  add_update_delete_task,
  add_update_delete_task_assignment,
  add_update_delete_task_document,
} from "../../utils/sendToServer";
import {
  useTaskFetching,
  useDataFetching,
  useResidentFetching,
  useTaskAssignmentFetching,
  useTaskDocumentFetching,
  useHouseFetching,
  useResidentBoroughFetching
} from "../../utils/employeeCustomFetchHook";
import moment from "moment";
import AssignmentBody from "./component/assignmentBody";
import { Wrapper } from "../ServiceWork/style";
import "./loadspiner.css"
import { ProgressDiv, ProgressSpan } from "../../utils/helperFucntions";
import { Popup, Segment  } from "semantic-ui-react";
import { CardWidth } from "../Employees/Employees/styles";
import { handleFileDownload } from "../../utils/helperFucntions";
import DisplayFileType from "../../_components/fileExtension";
import { DualLineLoader, Loader } from "../../_components/Loader";

const TaskDetails = () => {

  const location = useLocation();
  const selectedTaskId = location?.state?.id;
  const selectedTaskIndex = location?.state?.index;

  const { taskData, isTaskLoading } = useTaskFetching();
  const { data: allEmployees, isLoading } = useDataFetching();
  const { residentData, isResidentLoading } = useResidentFetching();
  const { taskAssignmentData, isTaskAssignmentLoading } = useTaskAssignmentFetching();
  const { taskDocumentData, isTaskDocumentLoading } = useTaskDocumentFetching();
  const { houseData } = useHouseFetching();
  const { residentBoroughData } = useResidentBoroughFetching();

  const [showTaskModal] = useGlobalState("showTaskModal");
  const [showTaskAssignmentModal] = useGlobalState("showTaskAssignmentModal");
  const [deleteTaskAssignment] = useGlobalState("deleteTaskAssignment");
  const [showTaskDocumentModal] = useGlobalState("showTaskDocumentModal");
  const [deleteTaskDocument] = useGlobalState("deleteTaskDocument");

  const [taskState, dispatchTasks] = useReducer(add_update_delete_task, []);
  const [taskAssState, dispatchTaskAssignment] = useReducer(add_update_delete_task_assignment, []);
  const [taskDocState, dispatchTaskDocument] = useReducer(add_update_delete_task_document, []);

  useEffect(() => {
    if (!showTaskAssignmentModal) {
      setGlobalState("selectedTaskAssignmentInfo", "");
    }
  }, [showTaskAssignmentModal]);

  useEffect(() => {
    if (!showTaskDocumentModal) {
      setGlobalState("selectedTaskDocumentInfo", "");
    }
  }, [showTaskDocumentModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [taskAssId, setTaskAssId] = useState();
  const [taskDocId, setTaskDocId] = useState();
  const [taskIndexToEdit, setTaskIndexToEdit] = useState();

  const selectedTask = taskData?.find((task) => task?.id === selectedTaskId);

  const taskId = selectedTask?.id;
  const taskName = selectedTask?.name;
  const taskType = selectedTask?.is_paid;
  const taskPriority = selectedTask?.priority;
  const timeAllocated = selectedTask?.hours;
  const taskDescription = selectedTask?.description;
  const totalAssignedEmployees = selectedTask?.employees;
  const totalAssignedResident = selectedTask?.residents;
  const totalAssignedManagers = selectedTask?.managers;
  const taskProgress = selectedTask?.progress;
  const taskDuration = selectedTask?.task_duration;
  const taskConcluded = selectedTask?.concluded;
  const taskStartAt = selectedTask?.start_at;
  const taskEndAt = selectedTask?.end_at;
  const totalAssignedHouse = selectedTask?.house_residents;
  const totalAssignedBorough = selectedTask?.borough_residents;

  const formattedName = taskName?.charAt(0).toUpperCase() + taskName?.slice(1);
  

  const handleTaskEdit = (index, id) => {
    setTaskIndexToEdit(index);
    setGlobalState("showTaskModal", true);
    setGlobalState("selectedTaskInfo", taskData);
  };

  const handleTaskAssignmentEdit = (index, id) => {
    setIndexToEdit(index);
    setTaskAssId(id);
    setGlobalState("showTaskAssignmentModal", true);
    setGlobalState("selectedTaskAssignmentInfo", taskAssignmentData);
  };

  const handleTaskAssignmentDelete = (id) => {
    setTaskAssId(id);
    setGlobalState("deleteTaskAssignment", true);
  };

  const handleEditTaskDocuments = (index, id) => {
    setIndexToEdit(index);
    setTaskDocId(id);
    setGlobalState("showTaskDocumentModal", true);
    setGlobalState("selectedTaskDocumentInfo", taskDocumentData);
  }

  const handleTaskDocumentDelete = (id) => {
    setTaskDocId(id);
    setGlobalState("deleteTaskDocument", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };


  const selectedTaskDocument = taskDocumentData?.find((doc) => doc?.task === selectedTaskId);
  const selectedTaskDocumentId = selectedTaskDocument?.task;

  const [taskAssignmentError] = useGlobalState("taskAssignmentError");
  const [taskDocumentError] = useGlobalState("taskDocumentError");

  const clearErrorMessage = () => {
    setGlobalState("taskAssignmentError", "");
    setGlobalState("taskDocumentError", "");
  };

  const getAllEmployees = (primaryKey) => {
    return allEmployees?.map((emp, index) => {
      const { id: empId, first_name, middle_name, last_name, photo } = emp;
      if (Array.isArray(primaryKey) ? primaryKey.includes(empId) : primaryKey === empId) {
        return (
          <img style={{ width: "25px", height: "25px"}} key={empId} title={`${first_name} ${middle_name} ${last_name}`} className='people-avatar' alt={'people'} src={photo ? photo : DefaultImage} />
        );
      }
      return null;
    });
  };

  const getAllResident = (primaryKey) => {
    return residentData?.map((emp, index) => {
      const { id: resId, first_name, middle_name, last_name, photo } = emp;
      if (Array.isArray(primaryKey) ? primaryKey.includes(resId) : primaryKey === resId) {
        return (
          <img style={{ width: "25px", height: "25px"}} key={resId} title={`${first_name} ${middle_name} ${last_name}`} className='people-avatar' alt={'people'} src={photo ? photo : DefaultImage} />
        );
      }
      return null;
    });
  };

  // Checks if the uploaded document contain any of this extentions.
  const regex = /(png|jpg|webp|JPG|PNG)/;

  const assignmentCategories = (
    index,
    id,
    description,
    managers_comment,
    manager,
    resident,
    employees,
    status,
    matchedDoc,
    report
  ) => {
    return (
      <li
        key={id}
        className={
          (status === "Approved" && "task") ||
          (status === "Rejected" && "task") ||
          (status === "Pending" && "task") ||
          (status === "Completed" && "completed")
        }
      >
        <AssignmentBody
          index={index}
          id={id}
          description={description}
          managers_comment={managers_comment}
          manager={manager}
          resident={resident}
          employees={employees}
          status={status}
          matchedDoc={matchedDoc}
          getAllEmployees={getAllEmployees}
          getAllResident={getAllResident}
          handleFileDownload={handleFileDownload}
          handleTaskAssignmentEdit={handleTaskAssignmentEdit}
          handleTaskAssignmentDelete={handleTaskAssignmentDelete}
          regex={regex}
          report={report}
        />
      </li>
    );
  };

  const [isDarkMode] = useGlobalState("isDarkMode");

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
                <h3 className="text-4xl text-orange-500">Task Details</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/taskmanagement/task-manager-table">All Tasks</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Task Manager</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => handleTaskEdit(selectedTaskIndex, selectedTaskId)}
                >
                  <i className="fa fa-edit" /> Edit Task
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-lg-8 col-xl-9">
              <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  {isTaskLoading ? (
                    <DualLineLoader />
                  ) : (
                    <>
                      <div className="project-title">
                        <h5 className="card-title">
                          {taskName === formattedName ? taskName : formattedName}
                        </h5>
                      </div>
                      <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>{taskDescription}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="project-task card border border-gray-300 rounded-md shadow-md bg-transparent">
                <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#comment_tab"
                      data-bs-toggle="tab"
                      aria-expanded="true"
                    >
                      Comment Tab
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#assignment_tab"
                      data-bs-toggle="tab"
                      aria-expanded="true"
                    >
                      Assignment Tab
                    </a>
                  </li>
                </ul>
                <div className="tab-content p-0">
                  <div className="tab-pane" id="assignment_tab">
                    <span style={{ color: "red", fontSize: "0.7rem" }}>
                      {taskAssignmentError?.length > 0 && (
                        <>
                          Error: {taskAssignmentError}
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
                    <div style={{ marginBottom: "20px", border: "none" }} className="project-task card bg-transparent">
                      <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0 bg-transparent">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#all_assignments"
                            data-bs-toggle="tab"
                            aria-expanded="true"
                          >
                            <span
                              className="action-circle large"
                              style={{ marginRight: "10px" }}
                              title="Add Task"
                              onClick={() => setGlobalState("showTaskAssignmentModal", true)}
                            >
                              <i className="material-icons">add</i>
                            </span>
                            All Assignments
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link flex"
                            href="#pending_assignments"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                          >
                            Pending Assignments{" "}
                            <span className="ml-1">
                              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#808080" stroke-width="1.5"/>
                                <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="#808080" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M11.992 17H12.001" stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link flex"
                            href="#completed_assignments"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                          >
                            Completed Assignments{" "}
                            <span className="ml-1">
                              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#35BA67" stroke-width="1.5"/>
                                <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#35BA67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link flex"
                            href="#approved_assignments"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                          >
                            Approved Assignments{" "}
                            <span className="ml-1">
                              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#EE6A0B" stroke-width="1.5"/>
                                <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="#EE6A0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </span>

                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link flex"
                            href="#rejected_assignments"
                            data-bs-toggle="tab"
                            aria-expanded="false"
                          >
                            Rejected Assignments{" "}
                            <span className="ml-1">
                              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1194 14.4L9.36 8.64M9.36061 14.4L15.12 8.64" stroke="#FF0000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21.84 11.52C21.84 6.21806 17.5419 1.92 12.24 1.92C6.93806 1.92 2.64 6.21806 2.64 11.52C2.64 16.8219 6.93806 21.12 12.24 21.12C17.5419 21.12 21.84 16.8219 21.84 11.52Z" stroke="#FF0000" stroke-width="1.44"/>
                              </svg>
                            </span>
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content p-2">
                        <div className="tab-pane show active" id="all_assignments">
                          <div className="task-wrapper">
                            <div className="task-list-container">
                              <div className="task-list-body">
                                <ul id="task-list">
                                  {taskAssignmentData
                                    ? taskAssignmentData?.map((assignment, index) => {
                                        const {
                                          id,
                                          description,
                                          managers_comment,
                                          manager,
                                          document,
                                          resident,
                                          employees,
                                          status,
                                          task,
                                          report,
                                        } = assignment;
                                        const matchedDoc = taskDocumentData?.filter((doc) =>
                                          document.includes(doc.id)
                                        );
                                        if (task === selectedTaskId) {
                                          return assignmentCategories(
                                            index,
                                            id,
                                            description,
                                            managers_comment,
                                            manager,
                                            resident,
                                            employees,
                                            status,
                                            matchedDoc,
                                            report
                                          );
                                        }
                                      })
                                    : "No task assignment available"}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="pending_assignments">
                          <div className="task-wrapper">
                            <div className="task-list-container">
                              <div className="task-list-body">
                                <ul id="task-list">
                                  {taskAssignmentData
                                    ? taskAssignmentData?.map((assignment, index) => {
                                        const {
                                          id,
                                          description,
                                          managers_comment,
                                          manager,
                                          document,
                                          resident,
                                          employees,
                                          status,
                                          task,
                                          report
                                        } = assignment;
                                        const matchedDoc = taskDocumentData?.filter((doc) =>
                                          document.includes(doc.id)
                                        );
                                        if (status === "Pending" && task === selectedTaskId) {
                                          return assignmentCategories(
                                            index,
                                            id,
                                            description,
                                            managers_comment,
                                            manager,
                                            resident,
                                            employees,
                                            status,
                                            matchedDoc,
                                            report
                                          );
                                        }
                                      })
                                    : "No task assignment available"}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="completed_assignments">
                          <div className="task-wrapper">
                            <div className="task-list-container">
                              <div className="task-list-body">
                                <ul id="task-list">
                                  {taskAssignmentData
                                    ? taskAssignmentData?.map((assignment, index) => {
                                        const {
                                          id,
                                          description,
                                          managers_comment,
                                          manager,
                                          document,
                                          resident,
                                          employees,
                                          status,
                                          task,
                                          report
                                        } = assignment;
                                        const matchedDoc = taskDocumentData?.filter((doc) =>
                                          document.includes(doc.id)
                                        );
                                        if (status === "Completed" && task === selectedTaskId) {
                                          return assignmentCategories(
                                            index,
                                            id,
                                            description,
                                            managers_comment,
                                            manager,
                                            resident,
                                            employees,
                                            status,
                                            matchedDoc,
                                            report
                                          );
                                        }
                                      })
                                    : "No task assignment available"}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="approved_assignments">
                          <div className="task-wrapper">
                            <div className="task-list-container">
                              <div className="task-list-body">
                                <ul id="task-list">
                                  {taskAssignmentData
                                    ? taskAssignmentData?.map((assignment, index) => {
                                        const {
                                          id,
                                          description,
                                          managers_comment,
                                          manager,
                                          document,
                                          resident,
                                          employees,
                                          status,
                                          task,
                                          report
                                        } = assignment;
                                        const matchedDoc = taskDocumentData?.filter((doc) =>
                                          document.includes(doc.id)
                                        );
                                        if (status === "Approved" && task === selectedTaskId) {
                                          return assignmentCategories(
                                            index,
                                            id,
                                            description,
                                            managers_comment,
                                            manager,
                                            resident,
                                            employees,
                                            status,
                                            matchedDoc,
                                            report
                                          );
                                        }
                                      })
                                    : "No task assignment available"}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="rejected_assignments">
                          <div className="task-wrapper">
                            <div className="task-list-container">
                              <div className="task-list-body">
                                <ul id="task-list">
                                  {taskAssignmentData
                                    ? taskAssignmentData?.map((assignment, index) => {
                                        const {
                                          id,
                                          description,
                                          managers_comment,
                                          manager,
                                          document,
                                          resident,
                                          employees,
                                          status,
                                          task,
                                          report
                                        } = assignment;
                                        const matchedDoc = taskDocumentData?.filter((doc) =>
                                          document.includes(doc.id)
                                        );
                                        if (status === "Rejected" && task === selectedTaskId) {
                                          return assignmentCategories(
                                            index,
                                            id,
                                            description,
                                            managers_comment,
                                            manager,
                                            resident,
                                            employees,
                                            status,
                                            matchedDoc,
                                            report
                                          );
                                        }
                                      })
                                    : "No task assignment available"}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane show active p-1  h-[435px]" id="comment_tab">
                    <CommentSection selecetedTaskId={selectedTaskId} task={taskId} />
                  </div>
                </div>
              </div>
              <div className="col-md-12 d-flex">
                <div className="card profile-box flex-fill border-gray-300 rounded-md shadow-md bg-transparent">
                  <div className="card-header  shadow-md">
				            <h4 className="card-title mb-0">
                      Upload Files{""}
                      <span style={{ color: "red", fontSize: "0.7rem" }}>
                        {taskDocumentError?.length > 0 && (
                          <>
                            Error: {taskDocumentError}
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
                        onClick={() => setGlobalState("showTaskDocumentModal", true)}
                      >
                        <i className="fa fa-plus" />
                      </a>
                    </h4>
				          </div>
                  <div className="card-body">
                    {isTaskLoading || isTaskDocumentLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <Wrapper>
                          {taskDocumentData?.length > 0 &&
                          selectedTaskDocumentId === selectedTaskId ? (
                            taskDocumentData.map((doc, index) => {
                              const { id, task, name, document } = doc;
                              if (task == selectedTaskId) {
                                return (
                                  <CardWidth key={id} className="card card-width card-file col-6 col-sm-4 col-md-3 col-lg-6 col-xl-3 border border-gray-300 rounded-md shadow-md bg-transparent">
                                      <div className="dropdown-file">
                                        <a href="" className="dropdown-link" data-bs-toggle="dropdown"><i className="fa fa-ellipsis-v" /></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleEditTaskDocuments(index, id)
                                            }
                                          >
                                            <i className="fa fa-pencil m-r-5" /> Edit
                                          </a>
                                          {document && (
                                            <a
                                              className="dropdown-item"
                                              onClick={() =>
                                                handleFileDownload(document)
                                              }
                                            >
                                              <i className="fa fa-download m-r-5" /> Download
                                            </a>
                                          )}
                                          <a
                                            className="dropdown-item"
                                            onClick={() => handleTaskDocumentDelete(id)}
                                          >
                                            <i className="fa fa-trash-o m-r-5" /> Delete
                                          </a>
                                        </div>
                                      </div>
                                      <div className="card-file-thumb">
                                        {document &&
                                          regex.test(document) ? (
                                            <img
                                              className="img-preview doc-image"
                                              src={document}
                                              alt="Preview"
                                            />
                                          ) : !document ? (
                                            <span>No File</span>
                                          ) : (
                                            <DisplayFileType file={document} />
                                        )}
                                      </div>
                                      <div className="card-body">
                                        <h6>
                                          <a href="">
                                            <Popup
                                              style={{ backgroundColor: 'transparent' }}
                                              inline
                                              hoverable
                                              position="top left"
                                              delay={{
                                                show: 300,
                                                hide: 800,
                                              }}
                                              content={
                                                <Segment.Group>
                                                      <Segment className="border" style={{ width: "250px", backgroundColor: `${isDarkMode ? '#110C08' : 'white'}` }}>
                                                        <div className="ui column relaxed divided grid">
                                                          <div className="column">
                                                            <h4 style={{color: `${isDarkMode ? '#898888' : '#625F5C'}`}}>{`Doc Name: ${name}`}</h4>
                                                          </div>
                                                        </div>
                                                      </Segment>
                                                </Segment.Group>
                                              }
                                              trigger={
                                                  <a style={{color: `${isDarkMode ? '#898888' : '#000'}`}}>
                                                    {name}
                                                  </a>
                                              }
                                            />
                                          </a>
                                        </h6>
                                      </div>
                                  </CardWidth>
                                );
                              }
                            })
                          ) : (
                            <></>
                          )}
                        </Wrapper>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="card border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  <h6 className="card-title m-b-15">Project details</h6>
                  <table className="table table-striped table-border">
                    <tbody>
                      {/* <tr>
                        <td>Task Type:</td>
                        {isTaskLoading ? (
                          <div class="spinner">
                            <div class="loader"></div>
                          </div>
                        ) : (
                          <td
                            style={{
                              backgroundColor: taskType === true ? "#55CE63" : "#ff9b44",
                              color: "#fff",
                            }}
                            className="text-end"
                          >
                            {taskType === true ? "Paid" : "Non Paid"}
                          </td>
                        )}
                      </tr> */}
                      <tr>
                        <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>Start At:</td>
                        {isTaskLoading ? (
                          <div class="spinner">
                            <div class="loader"></div>
                          </div>
                        ) : (
                          <>
                            <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="text-end">
                              {moment(taskStartAt).format("DD MMM YYYY")}
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>End At:</td>
                        {isTaskLoading ? (
                          <div class="spinner">
                            <div class="loader"></div>
                          </div>
                        ) : (
                          <>
                            <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="text-end">{moment(taskEndAt).format("DD MMM YYYY")}</td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>Priority:</td>
                        {isTaskLoading ? (
                          <div class="spinner">
                            <div class="loader"></div>
                          </div>
                        ) : (
                          <>
                            <td
                              style={{
                                backgroundColor:
                                  (taskPriority === "high" && "#55CE63") ||
                                  (taskPriority === "medium" && "#ff9b44") ||
                                  (taskPriority === "low" && "#f62d51"),
                                color: "#fff",
                              }}
                              className="text-end"
                            >
                              {(taskPriority === "high" && "High") ||
                                (taskPriority === "medium" && "Medium") ||
                                (taskPriority === "low" && "Low")}
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>Task Duration:</td>
                        {isTaskLoading ? (
                          <div class="spinner">
                            <div class="loader"></div>
                          </div>
                        ) : (
                          <>
                            <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="text-end">{taskDuration}hr</td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>Task Conclusion:</td>
                        {isTaskLoading ? (
                          <div class="spinner">
                            <div class="loader"></div>
                          </div>
                        ) : (
                          <>
                            <td
                              style={{
                                backgroundColor: taskConcluded === true ? "#55CE63" : "#ff9b44",
                                color: "#fff",
                              }}
                              className="text-end"
                            >
                              {taskConcluded === true ? "Concluded" : "In Progress"}
                            </td>
                          </>
                        )}
                      </tr>
                    </tbody>
                  </table>
                  <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="m-b-5">
                    Task Progress
                    {isTaskLoading ? (
                      <span style={{display: "inline"}} class="spinner">
                        <span class="loader"></span>
                      </span>
                    ) : (
                      <>
                        <ProgressSpan progress={taskProgress} />
                      </>
                    )}
                  </p>
                  <ProgressDiv progress={taskProgress} />
                </div>
              </div>
              <div className="card project-user border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  <h6 className="card-title m-b-20">House </h6>
                  <ul className="list-box">
                    {totalAssignedHouse?.length > 0
                      ? houseData?.map((house, index) => {
                          const { id: value, name, photo } = house;
                          if (totalAssignedHouse.includes(value)) {
                            return (
                              <li key={value}>
                                <Link
                                  to=""
                                  onClick={(event) => event.preventDefault()}
                                  title={`${name}`}
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
                                          src={photo ? photo : DefaultImage}
                                        />
                                      </span>
                                    </div>
                                    <div className="list-body">
                                      <span style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="message-author">
                                        {`${name}`}
                                      </span>
                                      <div className="clearfix" />
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            );
                          }
                        })
                      : <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>No house assigned</p>}
                  </ul>
                </div>
              </div>
              <div className="card project-user border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Borough </h6>
                  <ul className="list-box">
                    {totalAssignedBorough?.length > 0
                      ? residentBoroughData?.map((b, index) => {
                          const { id: value, borough_name } = b;
                          if (totalAssignedBorough.includes(value)) {
                            return (
                              <li key={value}>
                                <Link
                                  to=""
                                  onClick={(event) => event.preventDefault()}
                                  title={`${borough_name}`}
                                >
                                  <div className="list-item">
                                    <div className="">
                                      <span style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="message-author">
                                        {`${borough_name}`}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            );
                          }
                        })
                      : <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>No borough assigned</p>}
                  </ul>
                </div>
              </div>
              <div className="card project-user border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Assigned Leader </h6>
                  <ul className="list-box">
                    {totalAssignedManagers?.length > 0
                      ? allEmployees?.map((user, index) => {
                          const { id: value, first_name, middle_name, last_name, photo } = user;
                          if (totalAssignedManagers.includes(value)) {
                            return (
                              <li key={value}>
                                <Link
                                  to=""
                                  onClick={(event) => event.preventDefault()}
                                  title={`${first_name} ${middle_name} ${last_name}`}
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
                                          src={photo ? photo : DefaultImage}
                                        />
                                      </span>
                                    </div>
                                    <div className="list-body">
                                      <span style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="message-author">
                                        {`${first_name} ${middle_name} ${last_name}`}
                                      </span>
                                      <div className="clearfix" />
                                      <span style={{color: `${isDarkMode ? '#898888' : '#333'}`}} className="message-content">Team Lead</span>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            );
                          }
                        })
                      : <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>No Team Lead assigned</p>}
                  </ul>
                </div>
              </div>
              <div className="card project-user border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  <h6 className="card-title m-b-20">
                    Assigned Team
                  </h6>
                  <div className='flex gap-1'>
                    {totalAssignedEmployees?.length > 0
                      ? allEmployees?.map((user, index) => {
                          const { id: value, first_name, middle_name, last_name, photo } = user;
                          if (totalAssignedEmployees.includes(value)) {
                            return (
                              <img key={value} title={`${first_name} ${middle_name} ${last_name}`} className='people-avatar' alt={'people'} src={photo ? photo : DefaultImage} />
                            );
                          }
                        })
                      : <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>No Team assigned</p>}
                  </div>
                </div>
              </div>
              <div className="card project-user border border-gray-300 rounded-md shadow-md bg-transparent">
                <div className="card-body">
                  <h6 className="card-title m-b-20">Residents</h6>
                  <div className='flex gap-1'>
                    {totalAssignedResident?.length > 0
                      ? residentData?.map((user, index) => {
                          const { id: value, first_name, middle_name, last_name, photo } = user;
                          if (totalAssignedResident.includes(value)) {
                            return (
                              <img key={value} title={`${first_name} ${middle_name} ${last_name}`} className='people-avatar' alt={'people'} src={photo ? photo : DefaultImage} />
                            );
                          }
                        })
                      : <p style={{color: `${isDarkMode ? '#898888' : '#333'}`}}>No Resident assigned</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showTaskDocumentModal && (
          <>
            <AddTaskDocument
              dispatchTaskDocument={dispatchTaskDocument}
              indexToEdit={indexToEdit}
              id={taskDocId}
              task={selectedTaskId}
            />
          </>
        )}
        {deleteTaskDocument && (
          <DeleteModal
            deleteAction={dispatchTaskDocument}
            iDToDelete={taskDocId}
            modalTitle={"Task Document"}
          />
        )}
        {showTaskAssignmentModal && (
          <AddTaskAssignment
            dispatchTaskAssignment={dispatchTaskAssignment}
            indexToEdit={indexToEdit}
            id={taskAssId}
            task={selectedTaskId}
            totalAssignedEmployees={totalAssignedEmployees}
            totalAssignedManagers={totalAssignedManagers}
            totalAssignedResident={totalAssignedResident}
          />
        )}
        {deleteTaskAssignment && (
          <DeleteModal
            deleteAction={dispatchTaskAssignment}
            iDToDelete={taskAssId}
            modalTitle={"Task Assignment"}
          />
        )}
        {showTaskModal && (
          <AddTask 
            dispatchTasks={dispatchTasks} 
            indexToEdit={taskIndexToEdit} 
            id={taskId} 
          />
        )}
      </div>
    </DivContainer>
  );
};

export default TaskDetails;

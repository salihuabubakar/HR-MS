import React, { useEffect, useState, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AddTask from "../../_components/modelbox/AddTask";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import {
  initTask,
  savedTaskReducer,
} from "../../utils/localStorage";
import SmileImg from "../../assets/img/smile.png";
import { Span } from "./style";

const TaskManager = () => {
  const [tasks, dispatchTasks] = useReducer(
    savedTaskReducer,
    [],
    initTask
  );
  const [showTaskModal] = useGlobalState("showTaskModal");

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    if (!showTaskModal) {
      setGlobalState("selectedTaskInfo", "");
    }
  }, [showTaskModal]);

  const [taskList, setTaskList] = useState();
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);

  const handleTaskEdit = (id, index) => {
    setIndexToEdit(index);
    setGlobalState("showTaskModal", true);
    setGlobalState("selectedTaskInfo", tasks);
  };

  const handleTaskDelete = async (index) => {
    dispatchTasks({
      type: "delete",
      payload: tasks[index],
    });
  };

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
          <title>Employee - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Task Management</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Task Manager</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showTaskModal", true)}
                >
                  <i className="fa fa-plus" /> Add Task
                </a>
                <div className="view-icons">
                  <Link
                    to="/app/taskmanagement/task-manager"
                    className="grid-view btn btn-link active"
                  >
                    <i className="fa fa-th" />
                  </Link>
                  <Link
                    to="/app/taskmanagement/task-manager-table"
                    className="list-view btn btn-link"
                  >
                    <i className="fa fa-bars" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Task ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Task Title</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <a href="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          {/* Search Filter */}
          <div className="row staff-grid-row">
            {taskList
              ? taskList?.map((user, index) => {
                  const {
                    id,
                    taskTitle,
                    description,
                    employee,
                    taskType,
                    timeAllocated,
                  } = user;
                  return (
                    <div
                      key={id}
                      className="col-lg-4 col-sm-6 col-md-4 col-xl-3"
                    >
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
                                className="dropdown-item"
                                onClick={() => handleTaskEdit(id, index)}
                              >
                                <i className="fa fa-pencil m-r-5" /> Edit
                              </a>
                              <a
                                className="dropdown-item"
                                onClick={() => handleTaskDelete(index)}
                              >
                                <i className="fa fa-trash-o m-r-5" /> Delete
                              </a>
                            </div>
                          </div>
                          <h4 className="project-title">
                            <Link
                              to={{
                                pathname: "/app/taskmanagement/task-manager",
                                state: { id: id, index: index },
                              }}
                            >
                              {taskTitle}
                            </Link>
                          </h4>
                          <small className="block text-ellipsis m-b-15">
                            <Span
                              className="text-xs"
                              style={{
                                backgroundColor:
                                  taskType == "Paid Task"
                                    ? "#55CE63"
                                    : "#ff9b44",
                              }}
                            >
                              {taskType}
                            </Span>
                          </small>
                          <p className="text-muted">{description}</p>
                          <div className="pro-deadline m-b-15">
                            <div className="sub-title">Time Allocated:</div>
                            <div className="text-muted">
                              {timeAllocated ? timeAllocated + "hr" : "-"}
                            </div>
                          </div>
                          <div className="project-members m-b-15">
                            <div>Team:</div>
                            <ul
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              className="team-members"
                            >
                              {employee?.map((user, index) => {
                                const { value, label } = user;
                                return (
                                  <li key={value}>
                                    <a
                                      data-bs-toggle="tooltip"
                                      title="John Doe"
                                    >
                                      <img alt="" src={SmileImg} />
                                    </a>
                                    {label}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="pro-deadline m-b-15">
                            <div className="text-muted">
                              <span className="completed">
                                <input
                                  checked
                                  type="checkbox"
                                  name="check"
                                  id=""
                                />{" "}
                                Marked as completed
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "No task available"}
          </div>
        </div>

        {showTaskModal && (
          <AddTask dispatchTasks={dispatchTasks} indexToEdit={indexToEdit} />
        )}

        <div
          className="modal custom-modal fade"
          id="delete_employee"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Employee</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn">
                        Delete
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href=""
                        data-bs-dismiss="modal"
                        className="btn btn-primary cancel-btn"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Employee Modal */}
      </div>
    </div>
  );
};

export default TaskManager;

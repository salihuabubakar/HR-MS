import React, { useState, useReducer, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import { initTask, savedTaskReducer } from "../../utils/localStorage";
import SmileImg from "../../assets/img/smile.png";
import { Span } from "./style";
import AddTask from "../../_components/modelbox/AddTask";
import DeleteModal from "../../_components/modelbox/DeleteModal";

const TaskManagerTable = () => {
  const [tasks, dispatchTasks] = useReducer(savedTaskReducer, [], initTask);
  const [showTaskModal] = useGlobalState("showTaskModal");
  const [deleteModal] = useGlobalState("deleteModal");

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

  const handleTaskDelete = (index) => {
    setIndexToEdit(index);
    setGlobalState("deleteModal", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      // sorter: (a, b) => adept_id.length - b.dept_id.length,
    },
    {
      title: "Task Title",
      dataIndex: "taskTitle",
      render: (text, record, index) => {
        const { id, taskTitle } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                to={{
                  pathname: "/app/taskmanagement/task-manager-detail",
                  state: { id: id, index: index },
                }}
              >
                {taskTitle}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
      // sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Manager",
      dataIndex: "manager",
      render: (text, record, index) => {
        const { id, manager } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link
                to={{
                  pathname: "/app/taskmanagement/task-manager-detail",
                  state: { id: id, index: index },
                }}
                className="avatar"
              >
                <img alt="" src={SmileImg} />
              </Link>
              <Link
                to={{
                  pathname: "/app/taskmanagement/task-manager-detail",
                  state: { id: id, index: index },
                }}
              >
                {manager}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Assigned Team",
      dataIndex: "employee",
      render: (text, record, index) => {
        const { id, employee } = record;
        return (
          <React.Fragment>
            {employee?.map((user, index) => {
              const { value, label, image } = user;
              return (
                <h2 key={value} className="table-avatar">
                  <Link
                    to={{
                      pathname: "/app/taskmanagement/task-manager-detail",
                      state: { id: id, index: index },
                    }}
                    className="avatar"
                    data-bs-toggle="tooltip"
                    title={label}
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#00000000",
                      height: "100%",
                    }}
                  >
                    <img
                      style={{
                        width: "30px",
                        borderRadius: "50px",
                        backgroundColor: "#00000000",
                        height: "30px",
                      }}
                      alt=""
                      src={image}
                    />
                  </Link>
                  <Link
                    to={{
                      pathname: "/app/taskmanagement/task-manager-detail",
                      state: { id: id, index: index },
                    }}
                  ></Link>
                </h2>
              );
            })}
          </React.Fragment>
        );
      },
    },
    {
      title: "Hours Allocated",
      dataIndex: "timeAllocated",
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
    },
    {
      title: "Priority",
      dataIndex: "taskPriority",
      render: (text, record, index) => {
        const { taskPriority, id } = record;
        return (
          <h2
            key={id}
            style={{
              backgroundColor:
                (taskPriority?.label == "low" && "#f62d51") ||
                (taskPriority?.label == "medium" && "#ff9b44") ||
                (taskPriority?.label == "highest" && "#55CE63"),
              color: "#fff",
              padding: "5px",
              borderRadius: "5px",
            }}
            className="table-avatar"
          >
            <Link
              style={{
                color: "#fff",
              }}
              to={{
                pathname: "/app/taskmanagement/task-manager-detail",
                state: { id: id, index: index },
              }}
            >
              {taskPriority?.label}
            </Link>
          </h2>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "taskStatus",
      render: (text, record, index) => {
        const { taskStatus, id } = record;
        return (
          <h2
            style={{
              backgroundColor:
                (taskStatus?.label == "finish" && "#55CE63") ||
                (taskStatus?.label == "middle" && "#ff9b44") ||
                (taskStatus?.label == "start" && "#f62d51"),
              color: "#fff",
              padding: "5px",
              borderRadius: "5px",
            }}
            className="table-avatar"
          >
            <Link
              style={{
                color: "#fff",
              }}
              to={{
                pathname: "/app/taskmanagement/task-manager-detail",
                state: { id: id, index: index },
              }}
            >
              {((taskStatus?.label == "start" ||
                taskStatus?.label == "middle") &&
                "In-progress") ||
                (taskStatus?.label == "finish" && "Completed")}
            </Link>
          </h2>
        );
      },
    },
    {
      title: "Action",
      render: (text, record, index) => (
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
              onClick={() => handleTaskEdit(record.id, index)}
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
      ),
    },
  ];
  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className="page-wrapper">
        <Helmet>
          <title>Department - HRMS Admin Template</title>
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
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: taskList?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={taskList}
                  rowKey={(task) => task.id}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Department Modal */}
        {showTaskModal && (
          <AddTask dispatchTasks={dispatchTasks} indexToEdit={indexToEdit} />
        )}
        {/* /Add Department Modal */}
        {/* Delete Department Modal */}
        {deleteModal && (
          <DeleteModal
            deleteAction={dispatchTasks}
            indexToDelete={indexToEdit}
            dispatch={tasks}
            modalTitle={"Task"}
          />
        )}
        {/* /Delete Department Modal */}
      </div>
    </div>
  );
};

export default TaskManagerTable;

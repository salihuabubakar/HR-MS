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
import DefaultImage from "../../assets/img/placeholder.jpg";
import AddTask from "../../_components/modelbox/AddTask";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_task } from "../../utils/sendToServer";
import { useTaskFetching, useDataFetching } from "../../utils/employeeCustomFetchHook";
import SearchComponent from "../../_components/searchComponent";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";
import { TableDiv } from "../../_components/modelbox/styles";
import { isAdmin } from "../../utils/helperFucntions";

const TaskManagerTable = () => {
  const { taskData, isTaskLoading } = useTaskFetching();
  const { data: allEmployees } = useDataFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(taskData);
  let searchResult = !searchQuery ? taskData : filteredResults;
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: searchResult?.length,
    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [showTaskModal] = useGlobalState("showTaskModal");
  const [deleteModal] = useGlobalState("deleteModal");

  const [taskError] = useGlobalState("taskError");

  const clearErrorMessage = () => {
    setGlobalState("taskError", "");
  };

  const [taskState, dispatchTasks] = useReducer(
    add_update_delete_task,
    []
  );

  useEffect(() => {
    if (!showTaskModal) {
      setGlobalState("selectedTaskInfo", "");
    }
  }, [showTaskModal]);


  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [taskId, setTaskId] = useState("");

  const [isDarkMode] = useGlobalState("isDarkMode");

  const handleTaskEdit = (id, index) => {
    setTaskId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showTaskModal", true);
    setGlobalState("selectedTaskInfo", taskData);
    
  };

  const handleTaskDelete = (id) => {
    setTaskId(id);
    setGlobalState("deleteModal", true);
  };

  const toggleMobileMenu = () => {
    setMenu(!menu);
  };

  const currentIndex = (index) => {
    return (currentPage - 1) * itemsPerPage + index
  }

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Task Title",
      dataIndex: "name",
      render: (text, record, index) => {
        const { id, name } = record;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        return (
          <React.Fragment>
            <Link
              to={{
                pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                state: { id: id, index: currentIndex(index) },
              }}
            >
              {highlightSearchQuery(name === formattedName ? name : formattedName, searchQuery, isDarkMode)}
            </Link>
          </React.Fragment>
        );
      },
    },
    {
      title: "Manager",
      dataIndex: "managers",
      render: (text, record, index) => {
        const { id, managers } = record;
        return (
          <React.Fragment>
            {allEmployees?.map((user) => {
              const {
                id: value,
                first_name,
                middle_name,
                last_name,
                photo,
              } = user;
              if (managers.includes(value)) {
                return (
                  <h2 key={value} className="table-avatar">
                    <Link
                      to={{
                        pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                        state: { id: id, index: currentIndex(index) },
                      }}
                      className="avatar"
                      data-bs-toggle="tooltip"
                      title={`${first_name} ${middle_name} ${last_name}`}
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
                        src={photo ? photo : DefaultImage}
                      />
                    </Link>
                    <Link
                      to={{
                        pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                        state: { id: id, index: currentIndex(index) },
                      }}
                    ></Link>
                  </h2>
                );
              }
            })}
          </React.Fragment>
        );
      },
    },
    {
      title: "Assigned Team",
      dataIndex: "employees",
      render: (text, record, index) => {
        const { id, employees } = record;
        return (
          <React.Fragment>
            {allEmployees?.map((user) => {
              const {
                id: value,
                first_name,
                middle_name,
                last_name,
                photo,
              } = user;
              if (employees.includes(value)) {
                return (
                  <h2 key={value} className="table-avatar">
                    <Link
                      to={{
                        pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                        state: { id: id, index: currentIndex(index) },
                      }}
                      className="avatar"
                      data-bs-toggle="tooltip"
                      title={`${first_name} ${middle_name} ${last_name}`}
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
                        src={photo ? photo : DefaultImage}
                      />
                    </Link>
                    <Link
                      to={{
                        pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                        state: { id: id, index: currentIndex(index) },
                      }}
                    ></Link>
                  </h2>
                );
              }
            })}
          </React.Fragment>
        );
      },
    },
    {
      title: "Task Duration",
      dataIndex: "task_duration",
      render: (text, record, index) => {
        return <TableDiv isDarkMode={isDarkMode}>{text}</TableDiv>;
      },
    },
    // {
    //   title: "Task Type",
    //   dataIndex: "is_paid",
    //   render: (text, record, index) => {
    //     const { is_paid, id } = record;
    //     return (
    //       <h2
    //         key={id}
    //         style={{
    //           backgroundColor: is_paid === true ? "#55CE63" : "#ff9b44",
    //           color: "#fff",
    //           padding: "5px",
    //           borderRadius: "5px",
    //         }}
    //         className="table-avatar"
    //       >
    //         <Link
    //           style={{
    //             color: "#fff",
    //           }}
    //           to={{
    //             pathname: "/app/taskmanagement/task-manager-detail",
    //             state: { id: id, index: currentIndex(index) },
    //           }}
    //         >
    //           {is_paid === true ? "Paid" : "Non Paid"}
    //         </Link>
    //       </h2>
    //     );
    //   },
    // },
    {
      title: "Task Conclusion",
      dataIndex: "concluded",
      render: (text, record, index) => {
        const { concluded, id } = record;
        return (
          <h2
            key={id}
            style={{
              backgroundColor: concluded === true ? "#55CE63" : "#ff9b44",
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
                pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                state: { id: id, index: currentIndex(index) },
              }}
            >
              {concluded === true ? "Concluded" : "In Progress"}
            </Link>
          </h2>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (text, record, index) => {
        const { priority, id } = record;
        return (
          <h2
            key={id}
            style={{
              backgroundColor:
                (priority === "low" && "red") ||
                (priority === "medium" && "#ff9b44") ||
                (priority === "high" && "#55CE63"),
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
                pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                state: { id: id, index: currentIndex(index) },
              }}
            >
              {priority}
            </Link>
          </h2>
        );
      },
    },
    {
      title: "Progress",
      dataIndex: "progress",
      render: (text, record, index) => {
        const { progress, id } = record;
        let status = "";

        if (progress === 0) {
          status = "Not started";
        } else if (progress >= 1 && progress <= 24) {
          status = "Started";
        } else if (progress >= 25 && progress <= 49) {
          status = "Getting there";
        } else if (progress >= 50 && progress <= 75) {
          status = "Almost there";
        } else if (progress >= 76 && progress <= 85) {
          status = "Rounding up";
        } else if (progress >= 86 && progress <= 95) {
          status = "Completing";
        } else {
          status = "Completed";
        }

        return (
          <h2
            style={{
              backgroundColor:
                (status === "Not started" && "red") ||
                (status === "Started" && "#f20d91") ||
                (status === "Getting there" && "#FD7C5E") ||
                (status === "Almost there" && "#ff9b44") ||
                (status === "Rounding up" && "#73AB00") ||
                (status === "Completing" && "#55Ca52") ||
                (status === "Completed" && "#55CE63"),
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
                pathname: `/app/taskmanagement/task-manager-detail/${id}`,
                state: { id: id, index: currentIndex(index) },
              }}
            >
              {status}
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
              onClick={() => handleTaskDelete(record.id)}
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
          <title>Task Manager - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="text-4xl text-orange-500">Task Management</h3>
                <ul className="breadcrumb">
                  <Link style={{color: `${isDarkMode ? '#6C757D' : '#625F5C'}`}} className="breadcrumb-item" to="/app/main/dashboard">Dashboard</Link>
                  <li style={{color: `${isDarkMode ? '#625F5C' : '#6C757D'}`}} className="breadcrumb-item">Task Manager</li>
                </ul>
              </div>
              {isAdmin() && (
                <div className="col-auto float-end ml-auto">
                  <a className="btn add-btn" onClick={() => setGlobalState("showTaskModal", true)}>
                    <i className="fa fa-plus" /> Add Task
                  </a>
                </div>
              )}
            </div>
          </div>
          <SearchComponent
            searchType={"Task"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {taskError?.length > 0 && (
              <>
                Error: {taskError}
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
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={paginationSettings}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  bordered
                  dataSource={searchResult}
                  rowKey={(task) => task?.id}
                  loading={isTaskLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Department Modal */}
        {showTaskModal && (
          <AddTask dispatchTasks={dispatchTasks} indexToEdit={indexToEdit} id={taskId} />
        )}

        {/* Delete Department Modal */}
        {deleteModal && (
          <DeleteModal deleteAction={dispatchTasks} iDToDelete={taskId} modalTitle={"Task"} />
        )}
        {/* /Delete Department Modal */}
      </div>
    </div>
  );
};

export default TaskManagerTable;

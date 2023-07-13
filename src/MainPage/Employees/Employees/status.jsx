import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import AddStatus from "../../../_components/modelbox/AddStatus";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../../context/GlobalState";
import DeleteModal from "../../../_components/modelbox/DeleteModal";
import {
  add_update_delete_status,
} from "../../../utils/sendToServer";
import {
  useStatusFetching,
  useDataFetching,
} from "../../../utils/employeeCustomFetchHook";
import moment from "moment";
import DefaultImage from "../../../assets/img/placeholder.jpg";
import HoverText from "./HoverText";

const Status = () => {
  const { statusData, isStatusDataLoading } = useStatusFetching();
  const { data } = useDataFetching();
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: statusData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

const [showStatusModal] = useGlobalState("showStatusModal");
const [deleteStatusModal] = useGlobalState("deleteStatusModal");

const [statusState, dispatchStatus] = useReducer(
  add_update_delete_status,
  []
);

useEffect(() => {
  if (!showStatusModal) {
    setGlobalState("selectedStatus", "");
  }
}, [showStatusModal]);

const [menu, setMenu] = useState(false);
const [indexToEdit, setIndexToEdit] = useState();
const [statusId, setStatusId] = useState("");
const [isHover] = useGlobalState("isHover");
const [isHoverText] = useGlobalState("isHoverText");

useEffect(() => {
  if (!isHover) {
    setGlobalState("isHoverText", "");
  }
}, [isHover]);

const handleEditStatus = (id, index) => {
  setStatusId(id);
  setIndexToEdit((currentPage - 1) * itemsPerPage + index);
  setGlobalState("showStatusModal", true);
  setGlobalState("selectedStatus", statusData);
};

const handleDeleteStatus = (id) => {
  setStatusId(id);
  setGlobalState("deleteStatusModal", true);
};


  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const handleHoverEffect = (text) => {
    setGlobalState("isHover", true);
    setGlobalState("isHoverText", text);
  };

  const [statusError] = useGlobalState("statusError");

  const clearErrorMessage = () => {
    setGlobalState("statusError", "");
  };

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Employee",
      dataIndex: "employee",
      render: (text, record, index) => {
        const { employee } = record;
        const matchedEmployee = data?.find((e) => e.id === employee);
        if (matchedEmployee) {
          return (
            <React.Fragment>{`${matchedEmployee.first_name} ${matchedEmployee.middle_name} ${matchedEmployee.last_name}`}</React.Fragment>
          );
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Status",
      dataIndex: "statu",
      render: (text, record, index) => {
        const { status } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link to="#" onClick={(e) => e.preventDefault()}>
                {status}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Authorising Mananger",
      dataIndex: "authorising_manager",
    },
    {
      title: "Comment",
      dataIndex: "comments",
      render: (text, record, index) => {
        if (text && text) {
          return (
            <div>
              <span onMouseEnter={() => handleHoverEffect(text)}>Hover to show</span>
            </div>
          );
        } else {
          return;
        }
      },
    },

    {
      title: "Start Date",
      dataIndex: "start_date",
      render: (text, record, index) => {
        return <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>;
      },
    },

    {
      title: "End Date",
      dataIndex: "end_date",
      render: (text, record, index) => {
        return <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>;
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
            <a className="dropdown-item" onClick={() => handleEditStatus(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteStatus(record.id)}>
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
          <title>Employee - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Status</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Status</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a className="btn add-btn" onClick={() => setGlobalState("showStatusModal", true)}>
                  <i className="fa fa-plus" /> Add Status
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Employee Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <a href="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </a>
            </div>
          </div>
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {statusError?.length > 0 && (
              <>
                Error: {statusError}
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
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={paginationSettings}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  bordered
                  dataSource={statusData}
                  rowKey={(status) => status?.id}
                  loading={isStatusDataLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {isHover && (
          <>
            <HoverText isHoverText={isHoverText} />
          </>
        )}

        {showStatusModal && (
          <AddStatus dispatchStatus={dispatchStatus} indexToEdit={indexToEdit} id={statusId} />
        )}
        {deleteStatusModal && (
          <DeleteModal deleteAction={dispatchStatus} iDToDelete={statusId} modalTitle={"Status"} />
        )}
      </div>
    </div>
  );
};

export default Status;

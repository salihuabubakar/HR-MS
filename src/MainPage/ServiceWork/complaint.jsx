import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddComplaint from "../../_components/modelbox/AddComplaint";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_complaint } from "../../utils/sendToServer";
import {
  useComplaintFetching,
  useResidentFetching,
  useHouseFetching,
} from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";

const Complaint = () => {
  const { complaintData } = useComplaintFetching();
  const { residentData } = useResidentFetching();
  const { houseData } = useHouseFetching();
  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: complaintData?.length,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [showComplaintModal] = useGlobalState("showComplaintModal");
  const [deleteComplaintModal] = useGlobalState("deleteComplaintModal");
  const [complaintError] = useGlobalState("complaintError");

  const clearErrorMessage = () => {
    setGlobalState("complaintError", "");
  };

  const [complaintState, dispatchComplaint] = useReducer(
    add_update_delete_complaint,
    []
  );

  useEffect(() => {
    if (!showComplaintModal) {
      setGlobalState("selectedComplaint", "");
    }
  }, [showComplaintModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [complaintId, setComplaintId] = useState("");

  const handleEditComplaint = (id, index) => {
    setComplaintId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showComplaintModal", true);
    setGlobalState("selectedComplaint", complaintData);
  };

  const handleDeleteComplaint = (id) => {
    setComplaintId(id);
    setGlobalState("deleteComplaintModal", true);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        const actualIndex = (currentPage - 1) * itemsPerPage + index + 1;
        return <React.Fragment>{actualIndex}</React.Fragment>;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Complaint Date",
      dataIndex: "complaint_date",
      render: (text, record, index) => {
        return (
          <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>
        );
      },
    },
    {
      title: "Resolved Date",
      dataIndex: "resolved_date",
      render: (text, record, index) => {
        return (
          <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Resolved By",
      dataIndex: "resolved_by",
    },
    {
      title: "House",
      dataIndex: "house",
      render: (text, record, index) => {
        const { house } = record;
        const matchedHouse = houseData?.find((h) => h.id === house);
        if (matchedHouse) {
          return <React.Fragment>{matchedHouse.name}</React.Fragment>;
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Document",
      dataIndex: "documents",
      render: (text, record, index) => {
        const { documents } = record;
        return (
          <React.Fragment>
            <h2 className="table-avatar">
              <Link to="#" onClick={(e) => e.preventDefault()}>
                {documents}
              </Link>
            </h2>
          </React.Fragment>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record, index) => {
        return (
          <div style={{ width: "100%" }} data-title={text}>
            Hover to show
          </div>
        );
      },
    },
    {
      title: "Resolved Comment",
      dataIndex: "resolved_comment",
      render: (text, record, index) => {
        return (
          <div style={{ width: "100%" }} data-title={text}>
            Hover to show
          </div>
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
              onClick={() => handleEditComplaint(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteComplaint(record.id)}
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
          <title>Resident Complaint - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Complaint</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Complaint</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showComplaintModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Complaint
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
                <label className="focus-label">Resident Complaint ID</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Resident Complaint Name</label>
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
            {complaintError?.length > 0 && (
              <>
                Error: {complaintError}
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
                  dataSource={complaintData}
                  rowKey={(complaint) => complaint?.id}
                />
              </div>
            </div>
          </div>
        </div>

        {showComplaintModal && (
          <AddComplaint
            dispatchComplaint={dispatchComplaint}
            indexToEdit={indexToEdit}
            id={complaintId}
          />
        )}
        {deleteComplaintModal && (
          <DeleteModal
            deleteAction={dispatchComplaint}
            iDToDelete={complaintId}
            modalTitle={"Resident Complaint"}
          />
        )}
      </div>
    </div>
  );
};

export default Complaint;

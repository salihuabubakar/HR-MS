import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentRequest from "../../_components/modelbox/AddResidentRequest";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_request } from "../../utils/sendToServer";
import {
  useResidentRequestFetching,
  useResidentFetching,
} from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";

const request = () => {
  const { residentRequestData, residentRequestLoading } = useResidentRequestFetching();
  const { residentData } = useResidentFetching();
  const { searchQuery, setSearchQuery, handleSearch, filteredResults } = useSearch(residentRequestData);
  let searchResult = !searchQuery ? residentRequestData : filteredResults;
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

  const [showResidentRequestModal] = useGlobalState("showResidentRequestModal");
  const [deleteResidentRequestModal] = useGlobalState(
    "deleteResidentRequestModal"
  );
  const [residentRequestError] = useGlobalState("residentRequestError");

  const clearErrorMessage = () => {
    setGlobalState("residentRequestError", "");
  };

  const [residentRequestState, dispatchResidentRequest] = useReducer(
    add_update_delete_resident_request,
    []
  );

  useEffect(() => {
    if (!showResidentRequestModal) {
      setGlobalState("selectedResidentRequest", "");
    }
  }, [showResidentRequestModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentRequestId, setResidentRequestId] = useState("");

  const handleEditResidentRequest = (id, index) => {
    setResidentRequestId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentRequestModal", true);
    setGlobalState("selectedResidentRequest", residentRequestData);
  };

  const handleDeleteResidentRequest = (id) => {
    setResidentRequestId(id);
    setGlobalState("deleteResidentRequestModal", true);
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
      title: "Request",
      dataIndex: "request",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Request Date",
      dataIndex: "date_requested",
      render: (text, record, index) => {
        return <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Request Time",
      dataIndex: "time_requested",
    },
    {
      title: "Date Completed",
      dataIndex: "date_completed",
      render: (text, record, index) => {
        return <React.Fragment>{moment(text).format("DD MMM YYYY")}</React.Fragment>;
      },
    },
    {
      title: "Time Completed",
      dataIndex: "time_completed",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Approve By",
      dataIndex: "approved_by",
    },
    {
      title: "Resident",
      dataIndex: "resident",
      render: (text, record, index) => {
        const { resident } = record;
        const matchedResident = residentData?.find((r) => r.id === resident);
        if (matchedResident) {
          return (
            <React.Fragment>{`${matchedResident.first_name} ${matchedResident.middle_name} ${matchedResident.last_name}`}</React.Fragment>
          );
        } else {
          return null; // or return a default value if no match is found
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record, index) => {
        if (text && text) {
          return (
            <PopUpText text={text}/>
          );
        } else {
          return;
        }
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
              onClick={() => handleEditResidentRequest(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteResidentRequest(record.id)}>
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
          <title>Resident Request - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Request</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Request</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showResidentRequestModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Request
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Request"}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {residentRequestError?.length > 0 && (
              <>
                Error: {residentRequestError}
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
                  dataSource={searchResult}
                  rowKey={(residentRequest) => residentRequest?.id}
                  loading={residentRequestLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {showResidentRequestModal && (
          <AddResidentRequest
            dispatchResidentRequest={dispatchResidentRequest}
            indexToEdit={indexToEdit}
            id={residentRequestId}
          />
        )}
        {deleteResidentRequestModal && (
          <DeleteModal
            deleteAction={dispatchResidentRequest}
            iDToDelete={residentRequestId}
            modalTitle={"Resident Request"}
          />
        )}
      </div>
    </div>
  );
};

export default request;

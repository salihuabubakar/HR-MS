import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddShift from "../../_components/modelbox/AddShift";
import { useGlobalState, setGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_shift } from "../../utils/sendToServer";
import { useShiftFetching } from "../../utils/employeeCustomFetchHook";
import "../ServiceWork/style.css";
import moment from "moment";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";

const shift = () => {
  const { shiftData, isShiftLoading } = useShiftFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(shiftData);
  let shiftResult = !searchQuery ? shiftData : filteredResults;

  // Table pagination
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = startCount + itemsPerPage - 1;
  const paginationSettings = {
    total: shiftResult?.length,
    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    itemRender: itemRender,
    current: currentPage,
    onChange: setCurrentPage,
  };

  const [showShiftModal] = useGlobalState("showShiftModal");
  const [deleteShiftModal] = useGlobalState("deleteShiftModal");
  const [shiftError] = useGlobalState("shiftError");

  const clearErrorMessage = () => {
    setGlobalState("shiftError", "");
  };

  const [shiftState, dispatchShift] = useReducer(add_update_delete_shift, []);

  useEffect(() => {
    if (!showShiftModal) {
      setGlobalState("selectedShift", "");
    }
  }, [showShiftModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [shiftId, setShiftId] = useState("");

  const handleEditShift = (id, index) => {
    setShiftId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showShiftModal", true);
    setGlobalState("selectedShift", shiftData);
  };

  const handleDeleteShift = (id) => {
    setShiftId(id);
    setGlobalState("deleteShiftModal", true);
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

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return <React.Fragment>{index + 1}</React.Fragment>;
      },
    },
    {
      title: "Name",
      render: (text, record, index) => {
        const { name } = record;
        return <React.Fragment>{highlightSearchQuery(name, searchQuery)}</React.Fragment>
      },
    },

    {
      title: "Start Time",
      dataIndex: "start_time",
      render: (text, record, index) => {
        const { start_time } = record;
        return <React.Fragment>{moment(start_time, "HH:mm").format("hh:mm A")}</React.Fragment>;
      },
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      render: (text, record, index) => {
        const { end_time } = record;
        return <React.Fragment>{moment(end_time, "HH:mm").format("hh:mm A")}</React.Fragment>;
      },
    },
    {
      title: "Hours",
      dataIndex: "hours",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div className="dropdown dropdown-action">
          <a className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" onClick={() => handleEditShift(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteShift(record.id)}>
              <i className="fa fa-trash-o m-r-5" /> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Page Wrapper */}
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Shifts - Peepal Tree HRMS</title>
            <meta name="description" content="Login page" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Shifts</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/app/main/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Shifts</li>
                  </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                  <a
                    className="btn add-btn m-r-5"
                    onClick={() => setGlobalState("showShiftModal", true)}
                  >
                    Add Shifts
                  </a>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <SearchComponent
              searchType={"Shift"}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <span style={{ color: "red", fontSize: "0.7rem" }}>
              {shiftError?.length > 0 && (
                <>
                  Error: {shiftError}
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
            {/* Content Starts */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={paginationSettings}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    bordered
                    dataSource={shiftResult}
                    rowKey={(shift) => shift?.id}
                    loading={isShiftLoading}
                  />
                </div>
              </div>
            </div>
            {/* /Content End */}
          </div>
          {/* /Page Content */}
        </div>
      </div>
      {/* /Page Wrapper */}
      {showShiftModal && (
        <AddShift dispatchShift={dispatchShift} indexToEdit={indexToEdit} id={shiftId} />
      )}
      {deleteShiftModal && (
        <DeleteModal deleteAction={dispatchShift} iDToDelete={shiftId} modalTitle={"Shift"} />
      )}
    </>
  );
};

export default shift;

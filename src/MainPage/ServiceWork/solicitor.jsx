import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddSolicitor from "../../_components/modelbox/AddSolicitor";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_solicitor } from "../../utils/sendToServer";
import { useSolicitorFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";

const Solicitor = () => {
  const { solicitorData, solicitorDataLoading } = useSolicitorFetching();
  const { searchQuery, setSearchQuery, handleSearch, filteredResults } = useSearch(solicitorData);
  let searchResult = !searchQuery ? solicitorData : filteredResults;
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

  const [showSolicitorModal] = useGlobalState("showSolicitorModal");
  const [deleteSolicitorModal] = useGlobalState(
    "deleteSolicitorModal"
  );
  const [solicitorError] = useGlobalState("solicitorError");

  const clearErrorMessage = () => {
    setGlobalState("solicitorError", "");
  };

  const [solicitorState, dispatchSolicitor] = useReducer(
    add_update_delete_solicitor,
    []
  );

  useEffect(() => {
    if (!showSolicitorModal) {
      setGlobalState("selectedSolicitor", "");
    }
  }, [showSolicitorModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [solicitorId, setSolicitorId] = useState("");

  const handleEditSolicitor = (id, index) => {
    setSolicitorId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showSolicitorModal", true);
    setGlobalState("selectedSolicitor", solicitorData);
  };

  const handleDeleteSolicitor = (id) => {
    setSolicitorId(id);
    setGlobalState("deleteSolicitorModal", true);
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
      title: "Name",
      dataIndex: "solicitor_name",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Phone",
      dataIndex: "solicitor_phone_number",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Email",
      dataIndex: "solicitor_email",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Website",
      dataIndex: "solicitor_website",
      render: (text, record, index) => {
        const { solicitor_website } = record;
        if(solicitor_website.includes("https://") || 
            solicitor_website.includes("http://")
        ) {
          return <a href={solicitor_website} target="_blank">{solicitor_website}</a>;
        } else {
          return <a href={"https://" + solicitor_website} target="_blank">{"https://" + solicitor_website}</a>;
        }
      },
    },
    {
      title: "Address",
      dataIndex: "solicitor_address",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Post Code",
      dataIndex: "solicitor_postcode",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Description",
      dataIndex: "solicitor_description",
      render: (text, record, index) => {
        if (text && text) {
          return <PopUpText text={text} />;
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
            <a className="dropdown-item" onClick={() => handleEditSolicitor(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteSolicitor(record.id)}>
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
          <title>Solicitor - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Solicitor</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Solicitor</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showSolicitorModal", true)}
                >
                  <i className="fa fa-plus" /> Add Solicitor
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Solicitor"}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {solicitorError?.length > 0 && (
              <>
                Error: {solicitorError}
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
                  style={{ overflowX: "auto" }}
                  pagination={paginationSettings}
                  dataSource={searchResult}
                  columns={columns}
                  rowKey={(solicitorData) => solicitorData?.id}
                  bordered
                  loading={solicitorDataLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {showSolicitorModal && (
          <AddSolicitor
            dispatchSolicitor={dispatchSolicitor}
            indexToEdit={indexToEdit}
            id={solicitorId}
          />
        )}
        {deleteSolicitorModal && (
          <DeleteModal
            deleteAction={dispatchSolicitor}
            iDToDelete={solicitorId}
            modalTitle={"Solicitor"}
          />
        )}
      </div>
    </div>
  );
};

export default Solicitor;

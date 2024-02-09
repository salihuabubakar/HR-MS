import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddSchool from "../../_components/modelbox/AddSchool";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_school } from "../../utils/sendToServer";
import { useSchoolFetching } from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";
import { highlightSearchQuery } from "../../utils/highlightSearchQuery";

const School = () => {
  const { schoolData, isSchoolLoading } = useSchoolFetching();
  const { searchQuery, setSearchQuery, filteredResults } = useSearch(schoolData);
  let searchResult = !searchQuery ? schoolData : filteredResults;
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

  const [showSchoolModal] = useGlobalState("showSchoolModal");
  const [deleteSchoolModal] = useGlobalState(
    "deleteSchoolModal"
  );
  const [schoolError] = useGlobalState("schoolError");

  const clearErrorMessage = () => {
    setGlobalState("schoolError", "");
  };

  const [schoolState, dispatchSchool] = useReducer(
    add_update_delete_school,
    []
  );

  useEffect(() => {
    if (!showSchoolModal) {
      setGlobalState("selectedSchool", "");
    }
  }, [showSchoolModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [schoolId, setSchoolId] = useState("");

  const handleEditSchool = (id, index) => {
    setSchoolId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showSchoolModal", true);
    setGlobalState("selectedSchool", schoolData);
  };

  const handleDeleteSchool = (id) => {
    setSchoolId(id);
    setGlobalState("deleteSchoolModal", true);
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
      title: "Name",
      dataIndex: "school_name",
      render: (text, record, index) => {
        return <React.Fragment>{highlightSearchQuery(text, searchQuery)}</React.Fragment>;
      },
    },
    {
      title: "Phone",
      dataIndex: "telephone",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Website",
      dataIndex: "website",
      render: (text, record, index) => {
        const { website } = record;
        if(website.includes("https://") || 
            website.includes("http://")
        ) {
          return <a href={website} target="_blank">{website}</a>;
        } else {
          return <a href={"https://" + website} target="_blank">{"https://" + website}</a>;
        }
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Post Code",
      dataIndex: "postcode",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Description",
      dataIndex: "comments",
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
            <a className="dropdown-item" onClick={() => handleEditSchool(record.id, index)}>
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a className="dropdown-item" onClick={() => handleDeleteSchool(record.id)}>
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
          <title>School - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">School</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">School</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showSchoolModal", true)}
                >
                  <i className="fa fa-plus" /> Add School
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"School"}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {schoolError?.length > 0 && (
              <>
                Error: {schoolError}
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
                  rowKey={(schoolData) => schoolData?.id}
                  bordered
                  loading={isSchoolLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {showSchoolModal && (
          <AddSchool
            dispatchSchool={dispatchSchool}
            indexToEdit={indexToEdit}
            id={schoolId}
          />
        )}
        {deleteSchoolModal && (
          <DeleteModal
            deleteAction={dispatchSchool}
            iDToDelete={schoolId}
            modalTitle={"School"}
          />
        )}
      </div>
    </div>
  );
};

export default School;

import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import AddResidentDocumentType from "../../_components/modelbox/AddResidentDocumentType";
import Header from "../../initialpage/Sidebar/header";
import Sidebar from "../../initialpage/Sidebar/sidebar";
import { setGlobalState, useGlobalState } from "../../context/GlobalState";
import DeleteModal from "../../_components/modelbox/DeleteModal";
import { add_update_delete_resident_document_type } from "../../utils/sendToServer";
import {
  useResidentDocumentTypeFetching,
} from "../../utils/employeeCustomFetchHook";
import "./style.css";
import moment from "moment";
import PopUpText from "../../_components/modelbox/PopUpText";
import { useSearch } from "../../utils/Hooks/searchFunctionCustomHook";
import SearchComponent from "../../_components/searchComponent";

const documenttype = () => {
  const { residentDocumentTypeData, residentDocumentTypeLoading } = useResidentDocumentTypeFetching();
  const { searchQuery, setSearchQuery, handleSearch, filteredResults } = useSearch(residentDocumentTypeData);
  let searchResult = !searchQuery ? residentDocumentTypeData : filteredResults;
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

  const [showResidentDocumentTypeModal] = useGlobalState(
    "showResidentDocumentTypeModal"
  );
  const [deleteResidentDocumentTypeModal] = useGlobalState(
    "deleteResidentDocumentTypeModal"
  );
  const [residentDocumentTypeError] = useGlobalState(
    "residentDocumentTypeError"
  );

  const clearErrorMessage = () => {
    setGlobalState("residentDocumentTypeError", "");
  };

  const [residentDocumentTypeState, dispatchResidentDocumentType] = useReducer(
    add_update_delete_resident_document_type,
    []
  );

  useEffect(() => {
    if (!showResidentDocumentTypeModal) {
      setGlobalState("selectedResidentDocumentType", "");
    }
  }, [showResidentDocumentTypeModal]);

  const [menu, setMenu] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const [residentDocumentTypeId, setResidentDocumentTypeId] = useState("");

  const handleEditResidentDocumentType = (id, index) => {
    setResidentDocumentTypeId(id);
    setIndexToEdit((currentPage - 1) * itemsPerPage + index);
    setGlobalState("showResidentDocumentTypeModal", true);
    setGlobalState("selectedResidentDocumentType", residentDocumentTypeData);
  };

  const handleDeleteResidentDocumentType = (id) => {
    setResidentDocumentTypeId(id);
    setGlobalState("deleteResidentDocumentTypeModal", true);
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
      title: "Document Type",
      dataIndex: "document_type",
      render: (text, record, index) => {
        return <React.Fragment>{text}</React.Fragment>;
      },
    },
    {
      title: "Required",
      dataIndex: "required",
      render: (text, record, index) => {
        return <React.Fragment>{text ? "True" : "False"}</React.Fragment>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
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
            <a
              className="dropdown-item"
              onClick={() => handleEditResidentDocumentType(record.id, index)}
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </a>
            <a
              className="dropdown-item"
              onClick={() => handleDeleteResidentDocumentType(record.id)}
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
          <title>Resident Document Type - Peepal Tree HRMS</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Resident Document Type</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Resident Document Type</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a
                  className="btn add-btn"
                  onClick={() => setGlobalState("showResidentDocumentTypeModal", true)}
                >
                  <i className="fa fa-plus" /> Add Resident Document Type
                </a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <SearchComponent
            searchType={"Document Type"}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            setSearchQuery={setSearchQuery}
          />
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {residentDocumentTypeError?.length > 0 && (
              <>
                Error: {residentDocumentTypeError}
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
                  rowKey={(residentdocType) => residentdocType?.id}
                  bordered
                  loading={residentDocumentTypeLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {showResidentDocumentTypeModal && (
          <AddResidentDocumentType
            dispatchResidentDocumentType={dispatchResidentDocumentType}
            indexToEdit={indexToEdit}
            id={residentDocumentTypeId}
          />
        )}
        {deleteResidentDocumentTypeModal && (
          <DeleteModal
            deleteAction={dispatchResidentDocumentType}
            iDToDelete={residentDocumentTypeId}
            modalTitle={"Resident Document Type"}
          />
        )}
      </div>
    </div>
  );
};

export default documenttype;
